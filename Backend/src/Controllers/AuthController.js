const User = require("../Models/User.js");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Génération d'un code de vérification aléatoire
const generateCode = () => Math.floor(100000 + Math.random() * 900000);
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};
const mailTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true, // important pour le port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = (email, token) => {
  const encodedToken = encodeURIComponent(token);

  const mailDetails = {
    from: `"CasaTech" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Activate Your Account",
    html: `
      <h2>Welcome to CasaTech</h2>
      <p>Thank you for signing up. Click the link below to activate your account:</p>
      <a href="${process.env.FRONTEND_URL}/activate?token=${encodedToken}">Activate My Account</a>
    `,
  };

  mailTransporter.sendMail(mailDetails, (err, data) => {
    if (err) {
      console.error("❌ Error while sending verification email:", err);
    } else {
      console.log("✅ Verification email sent successfully.");
      console.log("📨 Message ID:", data.messageId);
    }
  });
};

const sendResetCodeEmail = (email, code) => {
  const mailDetails = {
    from: `"CasaTech" <contact@casatech.co>`,
    to: email,
    subject: "Password Reset Code",
    html: `
      <h2>Password Reset Request</h2>
      <p>Here is your code to reset your password:</p>
      <h3 style="background:#f4f4f4; padding:10px; display:inline-block;">${code}</h3>
      <p>This code is valid for 10 minutes.</p>
      <p>Thank you,<br/>The CasaTech Team 👩‍💻</p>
    `,
  };

  mailTransporter.sendMail(mailDetails, (err, data) => {
    if (err) {
      console.error("❌ Error while sending reset code email:", err);
    } else {
      console.log("✅ Reset code email sent successfully.");
      console.log("📨 Message ID:", data.messageId);
    }
  });
};

// Fonction de réinitialisation du mot de passe (Forget Password)
exports.forgetPassword = async (req, res) => {
  const { email } = req.body;

  // Vérifier si l'email est valide
  if (!email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }

  // Trouver l'utilisateur dans la base de données
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Générer un code de réinitialisation et une expiration
  const newCode = generateCode();
  const expiration = Date.now() + 10 * 60 * 1000; // Expiration dans 10 minutes

  // Sauvegarder le code et son expiration dans la base de données
  user.verificationCode = newCode;
  user.verificationCodeExpires = expiration;

  await user.save();

  // Envoyer le code de réinitialisation par email
  try {
    await sendResetCodeEmail(email, newCode);
    console.log("Code sent to:", email);
    return res.status(200).json({ message: "Code sent to your email!" });
  } catch (err) {
    console.error("Email error:", err);
    return res.status(500).json({ message: "Failed to send the code" });
  }
};

// Fonction pour vérifier le code de réinitialisation
exports.verifyResetCode = async (req, res) => {
  const { email, code, newPassword } = req.body;

  const user = await User.findOne({ email });

  if (
    !user ||
    user.verificationCode !== code ||
    Date.now() > user.verificationCodeExpires
  ) {
    return res.status(400).json({ message: "Invalid or expired code." });
  }

  // Le code est valide, on renvoie un message de succès
  return res.status(200).json({ message: "Code successfully verified." });
};

// Fonction pour réinitialiser le mot de passe
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User Not Found" });

  // Hashage du mot de passe
  user.password = newPassword;
  // Suppression des informations relatives au code de vérification
  user.verificationCode = undefined;
  user.verificationCodeExpires = undefined;

  await user.save();
  res.status(200).json({ message: "Password updated successfully" });
};

exports.signup = async (req, res) => {
  try {
    const {
      FullName,
      email,
      phone,
      location,
      password,
      confirmPassword,
      role,
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    let rolee = "client"; // Par défaut

    if (email.endsWith("@admin.com")) rolee = "admin";
    else if (email.endsWith("@agent.com")) rolee = "agent";

    const userr = new User({ ...req.body, rolee });
    await userr.save();
    res.status(201).json({ token: generateToken(userr), userr });
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationToken = crypto.randomBytes(32).toString("hex"); // ✅ Token
    console.log("📤 Token enregistré :", verificationToken);

    const user = await User.create({
      verificationToken,
      verificationTokenExpires: Date.now() + 3600000,

      FullName,
      phone,
      location,
      email,
      role: role || "client",
      isVerified: false,
      password: hashedPassword,
    });
    console.log("📝 Token stocké en base:", user.verificationToken);

    await sendVerificationEmail(email, verificationToken); // ✅ Envoie le même token
    console.log("📧 Token envoyé par email :", verificationToken);

    // 🔐 Générer un token JWT comme dans le login
    const token = jwt.sign(
      {
        id: user._id,
        FullName: user.FullName,
        email: user.email,
        phone: user.phone,
        location: user.location,

        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        FullName: user.FullName,
        email: user.email,
        phone: user.phone,
        location: user.location,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("❌ Error in signup:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.CodeVerif = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: "Email and code are required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (
      !user.verificationCode ||
      String(user.verificationCode) !== String(code)
    ) {
      console.log("Expected code:", user.verificationCode);
      console.log("Provided code:", code);
      return res.status(400).json({ message: "Incorrect code" });
    }
    if (
      !user.verificationCodeExpires ||
      Date.now() > user.verificationCodeExpires
    ) {
      console.log("Code expired at:", user.verificationCodeExpires);
      return res.status(400).json({ message: "Code expired" });
    }

    // ممكن تحذف الكود من DB أو تعيد تعيينه إذا تريد
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    await user.save();

    return res.status(200).json({ message: "Code verified successfully" });
  } catch (error) {
    console.error("Code verification error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Fonction login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Incorrect email" });
    }

    // تقارن كلمة السر اللي دخلها المستخدم مع اللي مخزنة
    const isMatch = await user.correctPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect  password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        FullName: user.FullName,
        email: user.email,
        phone: user.phone,
        location: user.location,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      status: "success",
      token,
      id: user._id,
      FullName: user.FullName,
      email: user.email,
      phone: user.phone,
      location: user.location,
      role: user.role,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Fonction getMe pour obtenir les informations du profil de l'utilisateur connecté
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "FullName email location phone"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      FullName: user.FullName,
      email: user.email,
      location: user.location,
      phone: user.phone,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
