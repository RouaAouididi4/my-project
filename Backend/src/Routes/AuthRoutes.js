const express = require("express");
const router = express.Router();
const AuthController = require("./../Controllers/AuthController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const userController = require("../Controllers/UserController");
const { verifyAccount } = require("../Controllers/VerifAccount.js");
const { sendCode } = require("../Controllers/AuthController.js");
import { CodeVerif } from "./../Controllers/AuthController";
// Signup
router.post("/signup", AuthController.signup);

// Vérification du compte
router.get("/verify/:token", verifyAccount);
router.post("/send-code", sendCode);
router.post("/CodeVerif", CodeVerif);
// Login
router.post("/login", AuthController.login);

// Récupération des infos de l'utilisateur
router.get("/me", AuthMiddleware, AuthController.getMe);
router.patch("/me", AuthMiddleware, userController.updateUser);

// Mot de passe oublié
router.post("/forget-password", AuthController.forgotPassword);

// Vérification du code de vérification (après l'email)
router.post("/verify-code", AuthController.CodeVerif); // ✅ Ajoutée

// Réinitialisation du mot de passe
router.post("/reset-password", AuthController.resetPassword); // ✅ Ajoutée

// Logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    res.json({ success: true, message: "Logout successful" });
  });
});

module.exports = router;
