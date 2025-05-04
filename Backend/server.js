const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const PropertiesRoutes = require("./src/Routes/PropertiesRoutes");
const MeetingRoutes = require("./src/Routes/MeetingRoutes.js");
const UserRoutes = require("./src/Routes/UserRoutes.js");
const AuthRoutes = require("./src/Routes/AuthRoutes");
const path = require("path"); // N'oublie pas d'ajouter ce module

dotenv.config();

// Initialize the Express application
const app = express();
app.use(express.json());

app.use(cors());

// Middleware pour servir des fichiers statiques depuis le dossier 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/properties", PropertiesRoutes);
app.use("/api/meetings", MeetingRoutes);
app.use("/api/users", UserRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
