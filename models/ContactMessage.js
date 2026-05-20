const mongoose = require("mongoose");

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: ""
    },
    email: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      default: ""
    },
    message: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "new"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("ContactMessage", contactMessageSchema);