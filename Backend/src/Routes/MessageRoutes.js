const { body, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();
const Message = require("../Models/MessageModel");

router.post(
  "/submit-message",
  [
    body("name").notEmpty().withMessage("Name is required."),
    body("email").isEmail().withMessage("Invalid email address."),
    body("phone").notEmpty().withMessage("Phone number is required."),
    body("subject").notEmpty().withMessage("Subject is required."),
    body("message").notEmpty().withMessage("Message is required."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      phone,
      email,
      subject,
      message,
      appointmentDate,
      appointmentTime,
      company,
      businessType,
    } = req.body;

    try {
      const newMessage = new Message({
        name,
        phone,
        email,
        subject,
        message,
        appointmentDate: subject === "appointment" ? appointmentDate : null,
        appointmentTime: subject === "appointment" ? appointmentTime : null, // Fixed typo here
        company: subject === "partner" ? company : null,
        businessType: subject === "partner" ? businessType : null,
      });

      await newMessage.save();
      res.status(200).json({ message: "Message sent successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to send message." });
    }
  }
);

module.exports = router; // This is crucial
