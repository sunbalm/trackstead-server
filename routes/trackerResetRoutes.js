const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const User = require("../models/User");
const Tracker = require("../models/Tracker");
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

    const resets = await TrackerReset.find({
      trackerId: tracker._id,
      userId: user._id
    }).sort({
      resetDate: -1
    });

    res.json({
      resets
    });
  } catch (error) {
    console.error("List resets error:", error.message);

    res.status(500).json({
      message: "Could not load resets."
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

    const { resetDate, reason = "", notes = "" } = req.body;

    const reset = await TrackerReset.create({
      userId: user._id,
      trackerId: tracker._id,
      resetDate: resetDate ? new Date(resetDate) : new Date(),
      reason,
      notes
    });

    res.status(201).json({
      reset
    });
  } catch (error) {
    console.error("Create reset error:", error.message);

    res.status(500).json({
      message: "Could not create reset."
    });
  }
});

router.delete("/:trackerId/:resetId", requireAuth, async (req, res) => {
  try {
    const user = await getDbUser(req.firebaseUser);
    const tracker = await getOwnedTracker(req.params.trackerId, user._id);

    if (!tracker) {
      return res.status(404).json({
        message: "Tracker not found."
      });
    }

    const reset = await TrackerReset.findOneAndDelete({
      _id: req.params.resetId,
      trackerId: tracker._id,
      userId: user._id
    });

    if (!reset) {
      return res.status(404).json({
        message: "Reset not found."
      });
    }

    res.json({
      reset
    });
  } catch (error) {
    console.error("Delete reset error:", error.message);

    res.status(500).json({
      message: "Could not delete reset."
    });
  }
});

module.exports = router;