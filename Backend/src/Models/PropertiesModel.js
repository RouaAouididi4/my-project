const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    type: { type: String, enum: ["rent", "sale"], required: true },
    homeType: {
      type: String,
      enum: ["House", "Apartment", "Villa", "Studio"],
      required: true,
    },
    beds: { type: Number },
    baths: {
      type: Number,
      default: 0,
    },
    price: { type: Number, required: true },
    yearBuilt: { type: Number },
    management: {
      type: String,
      enum: ["Managed", "Unmanaged"],
      required: true,
    },
    phone: { type: String, required: true },
    features: {
      garden: { type: Boolean, default: false },
      parking: { type: Boolean, default: false },
      "swimming-pool": { type: Boolean, default: false },
      balcony: { type: Boolean, default: false },
      balconyLocation: [{ type: String }],
      designType: { type: String, enum: ["modern", "traditional"] },
    },
    Kitchen: {
      kitchenCount: { type: Number, default: 0 },
      types: [{ type: String, enum: ["Open", "Close", ""] }],
    },
    photos: [
      {
        url: String,
        isValid: Boolean,
        validationScore: Number,
        validationDetails: {
          isRealEstate: Boolean,
          categories: [String],
          confidence: Number,
        },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    createdAt: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    agreement: { type: Boolean, required: true },
  },
  { timestamps: true }
);

// Génération automatique de propertyID avant la sauvegarde
// propertySchema.pre("save", function (next) {
//   if (!this.propertyID) {
//     this.propertyID =
//       "PROP-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
//   }
//   next();
// });

module.exports = mongoose.model("Property", propertySchema);
