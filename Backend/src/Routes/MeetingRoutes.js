const express = require("express");
const Meeting = require("../Models/MeetingModel");
const router = express.Router();

// Ajouter une nouvelle réunion/partenariat
router.post("/", async (req, res) => {
  const newMeeting = new Meeting(req.body);
  await newMeeting.save();
  res
    .status(201)
    .json({ message: "Meeting/Partnership created ✅", meeting: newMeeting });
});

// Obtenir toutes les réunions/partenariats
router.get("/", async (req, res) => {
  const meetings = await Meeting.find();
  res.status(200).json({ status: "success", data: meetings });
});

// Obtenir une réunion/partenariat par ID
router.get("/:id", async (req, res) => {
  const meeting = await Meeting.findById(req.params.id);
  res.status(200).json({ status: "success", data: meeting });
});

// Mettre à jour une réunion/partenariat
router.put("/:id", async (req, res) => {
  const updatedMeeting = await Meeting.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res
    .status(200)
    .json({
      message: "Meeting/Partnership updated ✅",
      meeting: updatedMeeting,
    });
});

// Supprimer une réunion/partenariat
router.delete("/:id", async (req, res) => {
  await Meeting.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Meeting/Partnership deleted ✅" });
});

module.exports = router;
