const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "A user must have a name"] },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: 6,
  },
  confirmPassword: {
    type: String,
    required: [false],
  },
  phone: {
    type: String,
    required: true,
  },
  google: { type: Boolean, default: false },
  facebook: { type: Boolean, default: false },
  phone: { type: String },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
