const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const User = require("../models/User");
const Tracker = require("../models/Tracker");
const TrackerEntry = require("../models/TrackerEntry");

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

async function getOwnedTracker(trackerId, userId) {
  return Tracker.findOne({
    _id: trackerId,
    userId
  });
}

router.get("/:trackerId", requireAuth, async (req, res) => {
  try {
    const user = await getDbUser(req.firebaseUser);
    const tracker = await getOwnedTracker(req.params.trackerId, user._id);

    if (!tracker) {
      return res.status(404).json({
        message: "Tracker not found."
      });
    }

    const entries = await TrackerEntry.find({
      trackerId: tracker._id,
      userId: user._id
    }).sort({
      entryDate: -1
    });

    res.json({
      entries
    });
  } catch (error) {
    console.error("List tracker entries error:", error.message);

    res.status(500).json({
      message: "Could not load tracker entries."
    });
  }
});

router.post("/:trackerId", requireAuth, async (req, res) => {
  try {
    const user = await getDbUser(req.firebaseUser);
    const tracker = await getOwnedTracker(req.params.trackerId, user._id);

    if (!tracker) {
      return res.status(404).json({
        message: "Tracker not found."
      });
    }

    const { entryDate, values = [], notes = "" } = req.body;

    const entry = await TrackerEntry.create({
      userId: user._id,
      trackerId: tracker._id,
      entryDate: entryDate ? new Date(entryDate) : new Date(),
      values,
      notes
    });

    res.status(201).json({
      entry
    });
  } catch (error) {
    console.error("Create tracker entry error:", error.message);

    res.status(500).json({
      message: "Could not create tracker entry."
    });
  }
});

router.put("/:trackerId/:entryId", requireAuth, async (req, res) => {
  try {
    const user = await getDbUser(req.firebaseUser);
    const tracker = await getOwnedTracker(req.params.trackerId, user._id);

    if (!tracker) {
      return res.status(404).json({
        message: "Tracker not found."
      });
    }

    const { entryDate, values, notes } = req.body;

    const updates = {};

    if (entryDate !== undefined) updates.entryDate = new Date(entryDate);
    if (values !== undefined) updates.values = values;
    if (notes !== undefined) updates.notes = notes;

    const entry = await TrackerEntry.findOneAndUpdate(
      {
        _id: req.params.entryId,
        trackerId: tracker._id,
        userId: user._id
      },
      updates,
      {
        new: true
      }
    );

    if (!entry) {
      return res.status(404).json({
        message: "Entry not found."
      });
    }

    res.json({
      entry
    });
  } catch (error) {
    console.error("Update tracker entry error:", error.message);

    res.status(500).json({
      message: "Could not update tracker entry."
    });
  }
});

router.delete("/:trackerId/:entryId", requireAuth, async (req, res) => {
  try {
    const user = await getDbUser(req.firebaseUser);
    const tracker = await getOwnedTracker(req.params.trackerId, user._id);

    if (!tracker) {
      return res.status(404).json({
        message: "Tracker not found."
      });
    }

    const entry = await TrackerEntry.findOneAndDelete({
      _id: req.params.entryId,
      trackerId: tracker._id,
      userId: user._id
    });

    if (!entry) {
      return res.status(404).json({
        message: "Entry not found."
      });
    }

    res.json({
      entry
    });
  } catch (error) {
    console.error("Delete tracker entry error:", error.message);

    res.status(500).json({
      message: "Could not delete tracker entry."
    });
  }
});

module.exports = router;