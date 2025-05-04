const express = require("express");
const router = express.Router();
const AuthController = require("./../Controllers/AuthController");
router.post("/signup", AuthController.signup);

router.post("/login", AuthController.login);
// router.get("/me" UserController.getMe);

module.exports = router;
