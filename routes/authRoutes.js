const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const User = require("../models/User");
const Tracker = require("../models/Tracker");
const TrackerEntry = require("../models/TrackerEntry");
const TrackerReset = require("../models/TrackerReset");

const router = express.Router();

router.get("/me", requireAuth, async (req, res) => {
  try {
    const firebaseUser = req.firebaseUser;

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

    res.json({
      user
    });
  } catch (error) {
    console.error("Get current user error:", error.message);

    res.status(500).json({
      message: "Could not load current user."
    });
  }
});

router.put("/me/onboarding", requireAuth, async (req, res) => {
  try {
    const firebaseUser = req.firebaseUser;

    const user = await User.findOneAndUpdate(
      {
        firebaseUid: firebaseUser.uid
      },
      {
        onboardingComplete: Boolean(req.body.onboardingComplete)
      },
      {
        new: true
      }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    res.json({
      user
    });
  } catch (error) {
    console.error("Update onboarding error:", error.message);

    res.status(500).json({
      message: "Could not update onboarding."
    });
  }
});

router.delete("/me", requireAuth, async (req, res) => {
  try {
    const firebaseUser = req.firebaseUser;

    const user = await User.findOne({
      firebaseUid: firebaseUser.uid
    });

    if (!user) {
      return res.json({
        success: true
      });
    }

    await TrackerReset.deleteMany({
  userId: user._id
});

    await TrackerEntry.deleteMany({
      userId: user._id
    });

    await Tracker.deleteMany({
      userId: user._id
    });

    await User.deleteOne({
      _id: user._id
    });

    res.json({
      success: true
    });
  } catch (error) {
    console.error("Delete account data error:", error.message);

    res.status(500).json({
      message: "Could not delete account data."
    });
  }
});

module.exports = router;