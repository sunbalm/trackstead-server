const mongoose = require("mongoose");

const entryValueSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      default: ""
    },
    unit: {
      type: String,
      default: ""
    }
  },
  {
    _id: false
  }
);

const trackerEntrySchema = new mongoose.Schema(
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
    entryDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    values: {
      type: [entryValueSchema],
      default: []
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

module.exports = mongoose.model("TrackerEntry", trackerEntrySchema);