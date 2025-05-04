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

module.exports = router;
