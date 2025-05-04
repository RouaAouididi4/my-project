const express = require("express");
const userController = require("../Controllers/UserController");

const router = express.Router();

// Define routes for user operations
router.route("/").get(userController.getAllUsers); // Get all users

router
  .route("/:id")
  .get(userController.getUserById) // Get a specific user by ID
  .patch(userController.updateUser) // Update user details
  .delete(userController.deleteUser); // Delete a user

module.exports = router;
