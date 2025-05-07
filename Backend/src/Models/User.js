const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
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
        return !v || /^\d{10}$/.test(v); // Permet null/undefined ou valide le format
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
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

// Middleware pour hasher le mot de passe avant de sauvegarder
// userSchema.pre("save", async function (next) {
//   // Seulement hasher le mot de passe s'il a été modifié
//   if (!this.isModified("password")) return next();

//   try {
//     // Hash le mot de passe avec un coût de 12
//     this.password = await bcrypt.hash(this.password, 12);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // Méthode pour comparer les mots de passe
// userSchema.methods.correctPassword = async function (
//   candidatePassword,
//   userPassword
// ) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

// Gestion des doublons d'email - correction pour les nouvelles versions de MongoDB
userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error("Email already exists"));
  } else {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
