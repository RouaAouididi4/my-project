const User = require("../Models/UserModel.js");
const catchAsync = require("./../Utils/catchAsync.js");

// User Signup (Registration)
exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword, phone } = req.body;

  // Create a new user without validating the required fields
  const user = await User.create({ name, email, password, phone });

  res.status(201).json({
    message: "User created ✅",
    _id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
  });
});

// User Login (Authentication)
exports.login = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  res.json({
    _id: user.id,
    name: user.name,
    email: user.email,
  });
});

// Get Current User
exports.getMe = catchAsync(async (req, res, next) => {
  res.status(200).json(req.user);
});
