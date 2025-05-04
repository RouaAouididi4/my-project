const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const AuthMiddleware = async (req, res, next) => {
  try {
    // 1. Récupération du token
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Veuillez vous connecter pour accéder à cette ressource",
      });
    }

    // 2. Vérification du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Vérification de l'utilisateur
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "L'utilisateur associé à ce token n'existe plus",
      });
    }

    // 4. Ajout des données utilisateur à la requête
    req.user = user;
    next(); // Passer au middleware suivant
  } catch (err) {
    console.error("Erreur lors de la vérification du token:", err);
    return res.status(401).json({
      success: false,
      message: "Session invalide ou expirée. Veuillez vous reconnecter",
    });
  }
};

module.exports = AuthMiddleware;
