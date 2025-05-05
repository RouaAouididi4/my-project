const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const PropertiesRoutes = require("./src/Routes/PropertiesRoutes");
const MeetingRoutes = require("./src/Routes/MeetingRoutes.js");
const UserRoutes = require("./src/Routes/UserRoutes.js");
const AuthRoutes = require("./src/Routes/AuthRoutes");
const path = require("path");
const session = require("express-session");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
); // Enable CORS

// Session configuration (MUST come after app initialization)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "YourFallbackSecretKey", // Always use environment variables for secrets
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true, // Helps prevent XSS attacks
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Serve static files from 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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

// Error handling middleware (should be after all routes)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
