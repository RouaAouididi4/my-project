const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String, enum: ["appointment", "partner"], required: true },
    date: { type: Date, required: false }, // Pour les rendez-vous
    time: { type: String, required: false }, // Heure du rendez-vous
    company: { type: String, required: false }, // Pour les partenaires
    businessType: { type: String, required: false }, // Pour les partenaires
    message: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Meeting", meetingSchema);
