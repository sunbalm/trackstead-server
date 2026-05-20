const express = require("express");
const ContactMessage = require("../models/ContactMessage");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name = "", email, subject = "", message } = req.body;

    if (!email || !message) {
      return res.status(400).json({
        message: "Email and message are required."
      });
    }

    const contactMessage = await ContactMessage.create({
      name: String(name).trim().slice(0, 120),
      email: String(email).trim().slice(0, 160),
      subject: String(subject).trim().slice(0, 180),
      message: String(message).trim().slice(0, 3000)
    });

    res.status(201).json({
      message: "Message sent.",
      contactMessage
    });
  } catch (error) {
    console.error("Contact form error:", error.message);

    res.status(500).json({
      message: "Could not send message."
    });
  }
});

module.exports = router;