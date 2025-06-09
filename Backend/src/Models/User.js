const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    FullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [3, "Name too short (minimum 3 characters)"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "agent", "client"],
      default: "client",
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      index: true,
      sparse: true,
    },
    verificationTokenExpires: Date,
    verificationCode: String,
    verificationCodeExpires: Date,
    Address: {
      type: String,
      trim: true,
      default: "",
    },
    gender: {
      type: String,
      enum: ["Female", "Male", "Other", ""],
      default: "",
    },
    notificationsSettings: {
      emailNotifications: { type: Boolean, default: true },
      pushNotifications: { type: Boolean, default: false },
      newsletter: { type: Boolean, default: true },
    },
    google: { type: Boolean, default: false },
    facebook: { type: Boolean, default: false },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Méthode pour comparer les mots de passe
userSchema.methods.correctPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Gestion des erreurs de duplication d'email
userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error("Email already exists"));
  } else {
    next(error);
  }
});

// Index pour améliorer les performances de recherche
userSchema.index({ email: 1 });
userSchema.index({ verificationToken: 1 });
userSchema.index({ phone: 1 });

const User = mongoose.model("User", userSchema);
module.exports = User;
