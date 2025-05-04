const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  FullName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords don't match",
    },
  },
  phone: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  region: {
    type: String,
    enum: ["Europe", "Amérique", "Afrique", "Asie", "Océanie"],
  },
  gender: {
    type: String,
    enum: ["Féminin", "Masculin", "Autre"],
  },
  notificationsSettings: {
    emailNotifications: { type: Boolean, default: true },
    pushNotifications: { type: Boolean, default: false },
    newsletter: { type: Boolean, default: true },
  },
  google: { type: Boolean, default: false },
  facebook: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware de hachage du mot de passe
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined; // Ne pas stocker dans la DB
  next();
});

// Méthode pour comparer les mots de passe
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Gestion des doublons d'email
userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("Email already exists"));
  } else {
    next(error);
  }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
