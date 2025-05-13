const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    subject: String,
    message: String,
    appointmentDate: { type: Date, default: null },
    appointmentTime: { type: String, default: null },
    company: { type: String, default: null },
    businessType: { type: String, default: null },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
