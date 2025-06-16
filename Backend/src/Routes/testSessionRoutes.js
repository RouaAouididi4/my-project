const express = require("express");
const router = express.Router();

router.get("/test-session", (req, res) => {
  console.log("Session actuelle:", req.session);

  if (req.session.user) {
    res.status(200).json({ session: true, user: req.session.user });
  } else {
    res.status(200).json({ session: false, message: "No session" });
  }
});

module.exports = router;
