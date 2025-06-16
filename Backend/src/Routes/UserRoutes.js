const express = require("express");
const userController = require("../Controllers/UserController");
const AuthMiddleware = require("../middleware/AuthMiddleware"); // Assure-toi que le chemin est correct
const User = require("../Models/User");
const router = express.Router();

// Define routes for user operations
router.get("/users", async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ status: "success", data: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: err.message });
  }
});
// Ajoutez cette route existante
router.put("/password", AuthMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Mot de passe actuel incorrect" });
    }

    user.password = newPassword;
    await user.save();
    res.json({ msg: "Mot de passe mis à jour" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
});

router
  .route("/:id")
  .get(userController.getUserById) // Get a specific user by ID
  .patch(userController.updateUser); // Update user details
// Route existante
router.delete("/", AuthMiddleware, async (req, res) => {
  try {
    // Supprime l'utilisateur et ses données associées
    await User.findByIdAndDelete(req.user.id);

    // Optionnel : Supprimer aussi les notifications liées
    await Notification.deleteMany({ userId: req.user.id });

    res.json({ msg: "Compte supprimé" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
});

// Nouvelle route à ajouter
router.get("/notifications-settings", AuthMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "notificationsSettings"
    );
    res.json(
      user.notificationsSettings || {
        emailNotifications: true,
        pushNotifications: false,
        newsletter: true,
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
});
///notifications
router.put("/notifications-settings", AuthMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { notificationsSettings: req.body } },
      { new: true }
    );
    res.json(user.notificationsSettings);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
});

// Route existante
router.get("/me", AuthMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
});

router.put("/me", AuthMiddleware, async (req, res) => {
  try {
    const { FullName, phone, notificationsSettings } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: req.body },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
});
module.exports = router;
