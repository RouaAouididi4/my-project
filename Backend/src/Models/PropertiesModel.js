const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    streetAddress: { type: String, required: true },
    zip: { type: String, required: false },
    propertyID: { type: String, unique: true, required: true },
    type: { type: String, enum: ["rent", "sale"], required: true },
    city: { type: String, required: true },
    bedrooms: { type: Number, required: false },
    bathrooms: { type: Number, required: false },
    price: { type: Number, required: true },
    size: { type: Number, required: false },
    status: {
      type: String,
      enum: ["On hold", "Online", "In management"],
      default: "On hold",
    },
    management: {
      type: String,
      enum: ["Unmanaged", "Managed"],
      default: "Unmanaged",
    },
    photos: { type: [String], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
