const User = require("../Models/UserModel");
const catchAsync = require("../Utils/CatchAsync");

// Get all users
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ status: "success", data: users });
});

// Get a user by ID
exports.getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({ status: "success", data: user });
});

// Update a user
exports.updateUser = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ status: "success", data: updatedUser });
});

// Delete a user
exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).json({ status: "success", data: null });
});
