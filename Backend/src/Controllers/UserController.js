const User = require("../Models/User");

const catchAsync = require("../Utils/catchAsync");
// Get all users

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
// favory.js
exports.getUserFavorites = async (req, res) => {
  const user = await User.findById(req.user.id).populate("favorites");
  res.json(user.favorites);
};
