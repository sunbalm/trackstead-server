const mongoose = require("mongoose");

const trackerResetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    trackerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tracker",
      required: true,
      index: true
    },
    resetDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    reason: {
      type: String,
      default: ""
    },
    notes: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("TrackerReset", trackerResetSchema);