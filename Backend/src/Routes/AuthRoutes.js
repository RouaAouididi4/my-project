const express = require("express");
const router = express.Router();
const AuthController = require("./../Controllers/AuthController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const userController = require("../Controllers/UserController");

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.get("/me", AuthMiddleware, AuthController.getMe);
router.patch("/me", AuthMiddleware, userController.updateUser); // Assurez-vous que cette ligne est correcte
// router.patch("/change-password", AuthMiddleware, userController.changePassword);
// router.delete("/delete-account", AuthMiddleware, userController.deleteAccount);
// Logout route
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Logout failed" });
    }
    res.clearCookie("connect.sid"); // The name may vary depending on your configuration
    res.json({ success: true, message: "Logout successful" });
  });
});

// Route to check login status
router.get("/check", (req, res) => {
  if (req.session.userId) {
    res.json({
      isAuthenticated: true,
      user: {
        id: req.session.userId,
        email: req.session.userEmail,
      },
    });
  } else {
    res.json({ isAuthenticated: false });
  }
});

// Middleware to check authentication
const checkAuth = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ isAuthenticated: false });
  }
};

module.exports = router;
