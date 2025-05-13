const User = require("../Models/User.js");
const crypto = require("crypto");
const catchAsync = require("./../Utils/catchAsync.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const generateCode = () => Math.floor(100000 + Math.random() * 900000);

const sendVerificationEmail = async (email, token) => {
  console.log("Preparing to send email to:", email);
  console.log("Token:", token);
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptionsVerif = {
    from: '"CasaTech" <casatech@gmail.com>',
    to: email,
    subject: "Verify Your Account",
    html: `
      <h2>Welcome to CasaTech</h2>
      <p>Thank you for signing up. Please click the link below to activate your account:</p>
      <a href="http://localhost:3000/login?token=${token}">Activate My Account</a>`,
  };

  try {
    await transporter.sendMail(mailOptionsVerif); // Envoi de l'email
    console.log("✅ Verification email sent.");
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

const sendVerificationCodeEmail = async (email, code) => {
  console.log("Preparing to send code to:", email);
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptionsCode = {
    from: '"CasaTech" <casatech@gmail.com>',
    to: email,
    subject: "Password Reset Code",
    html: `
      <h2>Password Reset Request</h2>
      <p>Here is your password reset code:</p>
          <h3 style="background: #f4f4f4; padding: 10px; display: inline-block;">${code}</h3>
      <p>The code is valid for 10 minutes.</p>
      <p>Thank you, <br/> The CASA TECH team 👩‍💻</p>`,
  };

  try {
    await transporter.sendMail(mailOptionsCode); // Envoi du code de réinitialisation
    console.log("✅ Password reset code sent.");
  } catch (error) {
    console.error("❌ Error sending password reset code:", error);
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Vérifier si l'email est valide
  if (!email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }

  // Recherche de l'utilisateur dans la base de données
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User Not Found" });

  const code = generateCode();
  const expiration = Date.now() + 10 * 60 * 1000; // 10 minutes

  user.verificationCode = code;
  user.verificationCodeExpires = expiration;

  await user.save();
  await sendVerificationCodeEmail(email, code);

  res
    .status(200)
    .json({ message: "Code sent to your email !", redirectUrl: "/CodeVerif" });
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User Not Found" });

  // Hashage du nouveau mot de passe avant de l'enregistrer
  const hashedPassword = await bcrypt.hash(newPassword, 12); // 12 est le nombre de rounds pour le salage
  user.password = hashedPassword;

  // Réinitialisation du code de vérification
  user.verificationCode = undefined;
  user.verificationCodeExpires = undefined;

  // Sauvegarde de l'utilisateur avec le mot de passe haché
  await user.save();

  res.status(200).json({ message: "Password updated successfully" });
};

// L'appel à la fonction sendVerificationEmail dans signup
exports.signup = async (req, res) => {
  try {
    const { FullName, email, password, confirmPassword, role } = req.body;

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ status: "error", message: "Passwords do not match" });
    }

    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "error", message: "User already exists" });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      FullName,
      email,
      verificationToken,
      role: role || "Client",
      isVerified: false,
      password,
    });

    await user.save();

    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      status: "success",
      message: "User created successfully",
    });
  } catch (err) {
    console.error("❌ Erreur dans registerUser:", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

exports.sendCode = async (req, res) => {
  const { email } = req.body;

  const code = Math.floor(100000 + Math.random() * 900000); // Code à 6 chiffres

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Utilisateur introuvable" });
  }

  user.verificationCode = code;
  user.verificationCodeExpires = Date.now() + 10 * 60 * 1000; // expire dans 10 min
  await user.save({ validateBeforeSave: false });

  try {
    await sendVerificationCode(email, code);
    res.status(200).json({
      status: "success",
      message: "Code envoyé",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Échec de l'envoi du code.",
    });
  }
};

exports.CodeVerif = async (req, res) => {
  const { email, code } = req.body;

  const user = await User.findOne({ email });
  if (
    !user ||
    String(user.verificationCode) !== String(code) ||
    Date.now() > user.verificationCodeExpires
  ) {
    return res.status(400).json({ message: "Code invalide ou expiré" });
  }

  res.status(200).json({ message: "Code verified successfully" });
};

// User Login (Authentication) - Version corrigée
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        status: "error",
        message: "Incorrect Email or mot de passe .",
      });
    }

    if (!user.isVerified) {
      return res
        .status(401)
        .json({ status: "error", message: "Please    your email first." });
    }

    const token = jwt.sign(
      {
        id: user._id,
        FullName: user.FullName,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      status: "success login",
      token,
      id: user._id,
      FullName: user.FullName,
      email: user.email,
      role: user.role,
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
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      FullName: user.FullName,
      email: user.email,
      phone: user.phone,
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
