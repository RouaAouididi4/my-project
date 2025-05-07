const User = require("../Models/User.js");
const catchAsync = require("./../Utils/catchAsync.js");
// const bcrypt = require("bcryptjs"); // Décommentez cette ligne
const jwt = require("jsonwebtoken");

exports.signup = catchAsync(async (req, res, next) => {
  const { FullName, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = new User({
    FullName,
    email,
    password,
  });

  await user.save();

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET || "YosraRoua",
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    }
  );
  res.status(201).json({
    message: "User created successfully",
    token,
    user: {
      _id: user._id,
      FullName: user.FullName,
      email: user.email,
      phone: user.phone,
    },
  });
});

// User Login (Authentication) - Version corrigée
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide email and password",
      });
    }

    // 2) Check if user exists
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      console.log("User not found with email:", email);
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }

    // Vérifier si le mot de passe est disponible
    if (!user.password) {
      console.log("Password field is missing for user");
      return res.status(500).json({
        status: "error",
        message: "Authentication error",
      });
    }

    // 3) Vérification directe du mot de passe avec bcrypt
    // const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // if (!isPasswordCorrect) {
    //   console.log("Password incorrect for user:", email);
    //   return res.status(401).json({
    //     status: "fail",
    //     message: "Incorrect email or password",
    //   });
    // }

    // 4) If everything ok, send token to client
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "YosraRoua",
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
      }
    );

    // Ne pas renvoyer le mot de passe
    user.password = undefined;

    res.status(200).json({
      status: "success",
      token,
      user,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Get Current User
exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    FullName: user.FullName,
    email: user.email,
    phone: user.phone,
  });
});
