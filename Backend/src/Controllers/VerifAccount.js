const User = require("../Models/User");

exports.verifyAccount = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    user.emailVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
    res.redirect("http://localhost:3000/verify/" + token + "/login");
  } catch (error) {
    console.error("❌ Erreur de vérification:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
