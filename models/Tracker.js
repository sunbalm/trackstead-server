const mongoose = require("mongoose");

const trackerFieldSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ["text", "number", "date", "time", "select", "boolean"],
      default: "text"
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

const milestoneSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ""
    },
    unlockAfterMinutes: {
      type: Number,
      required: true
    }
  },
  {
    _id: false
  }
);

const trackerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    type: {
      type: String,
      required: true,
      default: "custom"
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    startDate: {
      type: Date,
      required: true
    },
    goal: {
      type: String,
      default: ""
    },
    notes: {
      type: String,
      default: ""
    },
    fields: {
      type: [trackerFieldSchema],
      default: []
    },
    milestones: {
      type: [milestoneSchema],
      default: []
    },
    archived: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Tracker", trackerSchema);