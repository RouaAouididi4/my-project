const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const analyzeImage = require("../Utils/analyzeImage.js");
const PropertiesController = require("../Controllers/PropertiesController.js");

// Configuration du stockage Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Utilisation de chemins relatifs pour les uploads
    const uploadDir = path.join(process.cwd(), "uploads", "photos");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "property-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const router = express.Router();
// Créer un bien avec images
// router.post("/", upload.array("images", 10), estateController.createEstate);

// Revalider une image
// router.post(
//   "/:propertyId/images/:imageIndex/revalidate",
//   estateController.revalidateImage
// );

// Route pour télécharger des fichiers
router.post("/upload", upload.array("photos", 10), (req, res) => {
  try {
    const fileUrls = req.files.map(
      (file) => `/uploads/photos/${file.filename}`
    );
    res.json({ message: "Fichiers téléchargés avec succès!", files: fileUrls });
  } catch (error) {
    console.error("Erreur lors du téléchargement:", error);
    res.status(500).json({ message: "Échec du téléchargement." });
  }
});
// Route pour obtenir les photos téléchargées
router.get("/photos", (req, res) => {
  const uploadDir = path.join(__dirname, "..", "uploads", "photos");
  const photos = fs
    .readdirSync(uploadDir)
    .map((file) => `/uploads/photos/${file}`);
  res.json(photos);
});

// Routes des propriétés
router.get("/search", PropertiesController.searchProperties);
router.post(
  "/add",
  upload.array("photos", 10),
  PropertiesController.createProperty
);

router.get("/", PropertiesController.getAllProperties);
router.get("/:id", PropertiesController.getPropertyById);
router.put("/:id", PropertiesController.updateProperty);
router.delete("/:id", PropertiesController.deleteProperty);

module.exports = router;
