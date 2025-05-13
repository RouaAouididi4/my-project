const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    FullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },
    phone: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return !v || /^\d{10}$/.test(v); // Allows null/undefined or validates format
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    Address: {
      type: String,
      trim: true,
      default: "",
    },
    role: {
      type: String,
      enum: ["Admin", "Agent", "Client"],
      default: "Client",
    },
    gender: {
      type: String,
      enum: ["Female", "Male", "Other"],
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

    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    verificationTokenExpires: Date,

    verificationCode: String,
    verificationCodeExpires: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Méthode pour comparer les mots de passe
userSchema.methods.correctPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
// Handling duplicate email error – fix for newer MongoDB versions
userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error("Email already exists"));
  } else {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
