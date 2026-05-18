const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const User = require("../models/User");
const Tracker = require("../models/Tracker");
const {
  getAllTrackerTemplates,
  getTrackerTemplate
} = require("../data/trackerTemplates");
const TrackerEntry = require("../models/TrackerEntry");
const TrackerReset = require("../models/TrackerReset");
const {
  isValidObjectId,
  isValidDate,
  cleanString,
  validateFields,
  validateMilestones
} = require("../utils/validation");
const TrackerEntry = require("../models/TrackerEntry");
const TrackerReset = require("../models/TrackerReset");

const router = express.Router();

async function getDbUser(firebaseUser) {
  let user = await User.findOne({
    firebaseUid: firebaseUser.uid
  });

  if (!user) {
    user = await User.create({
      firebaseUid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.name,
      photoURL: firebaseUser.picture
    });
  }

  return user;
}

router.get("/templates", requireAuth, async (req, res) => {
  res.json({
    templates: getAllTrackerTemplates()
  });
});

router.get("/", requireAuth, async (req, res) => {
  try {
    const user = await getDbUser(req.firebaseUser);
    const includeArchived = req.query.archived === "true";

    const trackers = await Tracker.find({
      userId: user._id,
      archived: includeArchived
    }).sort({
      createdAt: -1
    });

    res.json({
      trackers
    });
  } catch (error) {
    console.error("List trackers error:", error.message);

    res.status(500).json({
      message: "Could not load trackers."
    });
  }
});

router.post("/", requireAuth, async (req, res) => {
  try {
    const user = await getDbUser(req.firebaseUser);

    const {
  type = "custom",
  title,
  startDate,
  goal = "",
  notes = "",
  fields = [],
  milestones = []
} = req.body;

if (!title || !startDate) {
  return res.status(400).json({
    message: "Title and start date are required."
  });
}

if (!isValidDate(startDate)) {
  return res.status(400).json({
    message: "Start date is invalid."
  });
}

const tracker = await Tracker.create({
  userId: user._id,
  type: cleanString(type, 50) || "custom",
  title: cleanString(title, 120),
  startDate: new Date(startDate),
  goal: cleanString(goal, 300),
  notes: cleanString(notes, 2000),
  fields: validateFields(fields),
  milestones: validateMilestones(milestones)
});
    res.status(201).json({
      tracker
    });
  } catch (error) {
    console.error("Create tracker error:", error.message);

    res.status(500).json({
      message: "Could not create tracker."
    });
  }
});

router.post("/from-template", requireAuth, async (req, res) => {
  try {
    const user = await getDbUser(req.firebaseUser);

    const { type, startDate, title, notes = "", fieldValues = {} } = req.body;

    if (!type || !startDate) {
      return res.status(400).json({
        message: "Tracker type and start date are required."
      });
    }

    const template = getTrackerTemplate(type);

    const fields = template.fields.map(field => ({
      ...field,
      value:
        fieldValues[field.key] !== undefined ? fieldValues[field.key] : field.value
    }));

if (!isValidDate(startDate)) {
  return res.status(400).json({
    message: "Start date is invalid."
  });
}

const tracker = await Tracker.create({
  userId: user._id,
  type: template.type,
  title: cleanString(title || template.title, 120),
  startDate: new Date(startDate),
  goal: cleanString(template.goal, 300),
  notes: cleanString(notes, 2000),
  fields: validateFields(fields),
  milestones: validateMilestones(template.milestones)
});

    res.status(201).json({
      tracker
    });
  } catch (error) {
    console.error("Create tracker from template error:", error.message);

    res.status(500).json({
      message: "Could not create tracker."
    });
  }
});

router.get("/summary/insights", requireAuth, async (req, res) => {
  try {
    const user = await getDbUser(req.firebaseUser);

    const trackers = await Tracker.find({
      userId: user._id,
      archived: false
    }).sort({
      createdAt: -1
    });

    const trackerIds = trackers.map(tracker => tracker._id);

    const entries = await TrackerEntry.find({
      userId: user._id,
      trackerId: {
        $in: trackerIds
      }
    }).sort({
      entryDate: -1
    });

    const resets = await TrackerReset.find({
      userId: user._id,
      trackerId: {
        $in: trackerIds
      }
    }).sort({
      resetDate: -1
    });

    res.json({
      trackers,
      entries,
      resets
    });
  } catch (error) {
    console.error("Insights summary error:", error.message);

    res.status(500).json({
      message: "Could not load insights."
    });
  }
});

router.put("/:trackerId/restore", requireAuth, async (req, res) => {
  
    try {
        if (!isValidObjectId(req.params.trackerId)) {
  return res.status(400).json({
    message: "Invalid tracker ID."
  });
}
    const user = await getDbUser(req.firebaseUser);

    const tracker = await Tracker.findOneAndUpdate(
      {
        _id: req.params.trackerId,
        userId: user._id
      },
      {
        archived: false
      },
      {
        new: true
      }
    );

    if (!tracker) {
      return res.status(404).json({
        message: "Tracker not found."
      });
    }

    res.json({
      tracker
    });
  } catch (error) {
    console.error("Restore tracker error:", error.message);

    res.status(500).json({
      message: "Could not restore tracker."
    });
  }
});

router.post("/:trackerId/duplicate", requireAuth, async (req, res) => {
  try {
    if (!isValidObjectId(req.params.trackerId)) {
  return res.status(400).json({
    message: "Invalid tracker ID."
  });
}
    const user = await getDbUser(req.firebaseUser);

    const originalTracker = await Tracker.findOne({
      _id: req.params.trackerId,
      userId: user._id
    });

    if (!originalTracker) {
      return res.status(404).json({
        message: "Tracker not found."
      });
    }

    const duplicatedTracker = await Tracker.create({
      userId: user._id,
      type: originalTracker.type,
      title: `${originalTracker.title} Copy`,
      startDate: new Date(),
      goal: originalTracker.goal,
      notes: originalTracker.notes,
      fields: originalTracker.fields,
      milestones: originalTracker.milestones
    });

    res.status(201).json({
      tracker: duplicatedTracker
    });
  } catch (error) {
    console.error("Duplicate tracker error:", error.message);

    res.status(500).json({
      message: "Could not duplicate tracker."
    });
  }
});

router.delete("/:trackerId/permanent", requireAuth, async (req, res) => {
  try {
    const user = await getDbUser(req.firebaseUser);

    const tracker = await Tracker.findOne({
      _id: req.params.trackerId,
      userId: user._id,
      archived: true
    });

    if (!tracker) {
      return res.status(404).json({
        message: "Archived tracker not found."
      });
    }

    await TrackerEntry.deleteMany({
      trackerId: tracker._id,
      userId: user._id
    });

    await TrackerReset.deleteMany({
      trackerId: tracker._id,
      userId: user._id
    });

    await Tracker.deleteOne({
      _id: tracker._id,
      userId: user._id
    });

    res.json({
      success: true
    });
  } catch (error) {
    console.error("Permanent delete tracker error:", error.message);

    res.status(500).json({
      message: "Could not permanently delete tracker."
    });
  }
});

router.get("/:trackerId", requireAuth, async (req, res) => {
  try {
    if (!isValidObjectId(req.params.trackerId)) {
  return res.status(400).json({
    message: "Invalid tracker ID."
  });
}
    const user = await getDbUser(req.firebaseUser);

    const tracker = await Tracker.findOne({
      _id: req.params.trackerId,
      userId: user._id
    });

    if (!tracker) {
      return res.status(404).json({
        message: "Tracker not found."
      });
    }

    res.json({
      tracker
    });
  } catch (error) {
    console.error("Get tracker error:", error.message);

    res.status(500).json({
      message: "Could not load tracker."
    });
  }
});

router.put("/:trackerId", requireAuth, async (req, res) => {
  try {

    if (!isValidObjectId(req.params.trackerId)) {
  return res.status(400).json({
    message: "Invalid tracker ID."
  });
}

    const user = await getDbUser(req.firebaseUser);

const allowedUpdates = {};

if (req.body.title !== undefined) {
  allowedUpdates.title = cleanString(req.body.title, 120);
}

if (req.body.startDate !== undefined) {
  if (!isValidDate(req.body.startDate)) {
    return res.status(400).json({
      message: "Start date is invalid."
    });
  }

  allowedUpdates.startDate = new Date(req.body.startDate);
}

if (req.body.goal !== undefined) {
  allowedUpdates.goal = cleanString(req.body.goal, 300);
}

if (req.body.notes !== undefined) {
  allowedUpdates.notes = cleanString(req.body.notes, 2000);
}

if (req.body.fields !== undefined) {
  allowedUpdates.fields = validateFields(req.body.fields);
}

if (req.body.milestones !== undefined) {
  allowedUpdates.milestones = validateMilestones(req.body.milestones);
}

    const tracker = await Tracker.findOneAndUpdate(
      {
        _id: req.params.trackerId,
        userId: user._id
      },
      allowedUpdates,
      {
        new: true
      }
    );

    if (!tracker) {
      return res.status(404).json({
        message: "Tracker not found."
      });
    }

    res.json({
      tracker
    });
  } catch (error) {
    console.error("Update tracker error:", error.message);

    res.status(500).json({
      message: "Could not update tracker."
    });
  }
});

router.delete("/:trackerId", requireAuth, async (req, res) => {
  try {
    if (!isValidObjectId(req.params.trackerId)) {
  return res.status(400).json({
    message: "Invalid tracker ID."
  });
}
    const user = await getDbUser(req.firebaseUser);

    const tracker = await Tracker.findOneAndUpdate(
      {
        _id: req.params.trackerId,
        userId: user._id
      },
      {
        archived: true
      },
      {
        new: true
      }
    );

    if (!tracker) {
      return res.status(404).json({
        message: "Tracker not found."
      });
    }

    res.json({
      tracker
    });
  } catch (error) {
    console.error("Archive tracker error:", error.message);

    res.status(500).json({
      message: "Could not archive tracker."
    });
  }
});

module.exports = router;