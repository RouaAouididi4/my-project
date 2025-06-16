const express = require("express");
const router = express.Router();
const User = require("../Models/User.js");
const AuthController = require("./../Controllers/AuthController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const userController = require("../Controllers/UserController");
const { verifyAccount } = require("../Controllers/VerifAccount.js");
// const { sendCode } = require("../Controllers/AuthController.js"); // Cette ligne est obsolète après la fusion des fonctions.
const { CodeVerif } = require("./../Controllers/AuthController");
const app = express();

app.use(express.json());
// Signup
router.post("/signup", AuthController.signup);

// Vérification du compte
router.get("/verify/:token", verifyAccount);

// Login
router.post("/login", AuthController.login);

// Récupération des infos de l'utilisateur
router.get("/me", AuthMiddleware, AuthController.getMe);
router.patch("/me", AuthMiddleware, userController.updateUser);

// Mot de passe oublié et envoi du code de vérification
router.post("/forget-password", AuthController.forgetPassword); // ✅ Fusionnée avec l'envoi du code.

// Vérification du code de vérification (après l'email)
router.post("/CodeVerif", AuthController.CodeVerif); // ✅ Ajoutée

// Réinitialisation du mot de passe
router.post("/reset-password", AuthController.resetPassword); // ✅ Ajoutée
router.post("/verify-reset-code", AuthController.verifyResetCode);

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

// Route: /api/activaterouter.post("/activate", async (req, res) => {
// Lire le token depuis les query params OU le body

router.post("/activate", async (req, res) => {
  // Accepter le token depuis query params OU body
  let token = req.query.token || req.body.token;

  if (!token) {
    return res.status(400).json({ error: "⛔ Token manquant" });
  }

  // Décoder le token (au cas où il a été encodé)
  token = decodeURIComponent(token);
  console.log("🔍 Token décodé:", token);

  try {
    // Chercher l'utilisateur avec le token
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      // Log supplémentaire pour débogage
      const expiredUser = await User.findOne({
        verificationToken: token,
        verificationTokenExpires: { $lte: Date.now() },
      });

      if (expiredUser) {
        console.log("⚠️ Token expiré trouvé");
        return res.status(400).json({ error: "⛔ Token expiré" });
      }

      console.log("🔎 Aucun utilisateur trouvé avec ce token");
      return res.status(400).json({ error: "⛔ Token invalide" });
    }

    // Activer le compte
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    console.log("✅ Compte activé pour:", user.email);
    res.json({ message: "✅ Compte activé avec succès" });
  } catch (error) {
    console.error("❌ Erreur d'activation:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get("/test-session", (req, res) => {
  if (req.session.user) {
    res.status(200).json({ session: true, user: req.session.user });
  } else {
    res.status(200).json({ session: false, message: "No session" });
  }
});
module.exports = router;
