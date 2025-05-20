const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    streetAddress: { type: String, required: true },
    zip: { type: String },
    propertyID: { type: String, unique: true, required: true },
    type: { type: String, enum: ["rent", "sale"], required: true },
    homeType: {
      type: String,
      enum: ["House", "Apartment", "Villa", "Studio"],
      required: true,
    },
    city: { type: String, required: true },
    beds: { type: Number },
    baths: { type: Number },
    price: { type: Number, required: true },
    size: { type: Number },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"], // ou d'autres statuts que tu veux
      default: "pending",
    },
    description: { type: String },
    management: {
      type: String,
      enum: ["Managed", "Unmanaged"],
      default: "Unmanaged",
    },
    photos: [
      {
        url: String,
        caption: String,
        isPrimary: Boolean,
      },
    ],
    yearBuilt: {
      type: Number,
      min: 1000,
      max: new Date().getFullYear(),
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
