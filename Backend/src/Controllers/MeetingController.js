const Meeting = require("../Models/MeetingModel");

// Get all meetings
exports.getAllMeetings = catchAsync(async (req, res, next) => {
  const meetings = await Meeting.find();
  res.status(200).json({ status: "success", data: meetings });
});

// Get a meeting by ID
exports.getMeetingById = catchAsync(async (req, res, next) => {
  const meeting = await Meeting.findById(req.params.id);
  res.status(200).json({ status: "success", data: meeting });
});

// Create a new meeting
exports.createMeeting = catchAsync(async (req, res, next) => {
  const newMeeting = await Meeting.create(req.body);
  res.status(201).json({ status: "success", data: newMeeting });
});

// Update a meeting
exports.updateMeeting = catchAsync(async (req, res, next) => {
  const updatedMeeting = await Meeting.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({ status: "success", data: updatedMeeting });
});

// Delete a meeting
exports.deleteMeeting = catchAsync(async (req, res, next) => {
  await Meeting.findByIdAndDelete(req.params.id);
  res.status(204).json({ status: "success", data: null });
});
