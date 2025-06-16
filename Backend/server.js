const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");

const PropertiesRoutes = require("./src/Routes/PropertiesRoutes");
const MeetingRoutes = require("./src/Routes/MeetingRoutes.js");
const UserRoutes = require("./src/Routes/UserRoutes.js");
const AuthRoutes = require("./src/Routes/AuthRoutes");
const testSessionRoutes = require("./src/Routes/testSessionRoutes.js");
const MessageRoutes = require("./src/Routes/MessageRoutes.js");

// Load environment variables
dotenv.config();

const app = express();

// CORS Middleware - must be before session and routes
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "YosraSessionKey!123456789",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true si HTTPS en prod
      httpOnly: true,
      maxAge: 48 * 60 * 60 * 1000, // 1 jour
    },
  })
);

// Static files
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
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
app.use("/api/", testSessionRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/properties", PropertiesRoutes);
app.use("/api/meetings", MeetingRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/contact", MessageRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
