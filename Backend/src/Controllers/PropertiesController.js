const Property = require("../Models/PropertiesModel");
const catchAsync = require("../Utils/CatchAsync");
const mongoose = require("mongoose");

// Get all properties
exports.getAllProperties = catchAsync(async (req, res, next) => {
  const properties = await Property.find();
  res.status(200).json({ status: "success", data: properties });
});

// Get a property by ID
exports.searchProperties = async (req, res) => {
  try {
    const {
      streetAddress,
      type,
      minPrice,
      maxPrice,
      bedrooms,
      minSize,
      maxSize,
    } = req.query;
    const query = {};

    console.log(req.body);

    if (!address || !propertyID) {
      return res
        .status(400)
        .json({ message: "Address and PropertyID are required" });
    }
    const properties = await Property.find(query);
    res.status(200).json({
      status: "success",
      results: properties.length,
      properties,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Server error", error: error.message });
  }
};

exports.createProperty = catchAsync(async (req, res) => {
  console.log("Data received in req.body:", req.body);

  const {
    streetAddress,
    title,
    type,
    price,
    hometype, // attention ici
    size,
    bedrooms,
    bathrooms,
    management,
    city,
  } = req.body;

  // Tester les deux variables pour debug (casse)
  if (!hometype && !req.body.homeType) {
    console.error(
      "Error: Neither 'hometype' nor 'homeType' found in req.body!"
    );
  } else {
    console.log("Received hometype:", hometype);
    console.log("Received homeType:", req.body.homeType);
  }

  const propertyID = new mongoose.Types.ObjectId().toString();

  let photos = [];
  if (req.files && req.files.length > 0) {
    photos = req.files.map((file) => `/uploads/photos/${file.filename}`);
  }

  try {
    const newProperty = await Property.create({
      propertyID,
      streetAddress,
      title,
      type,
      city,
      price,
      // IMPORTANT : utiliser la bonne casse ici (selon ton schéma)
      homeType: hometype || req.body.homeType, // si ton schéma a 'homeType' avec un T majuscule
      size,
      bedrooms,
      bathrooms,
      management: management || "Unmanaged",
      photos,
    });

    res
      .status(201)
      .json({ message: "Listing added ✅", property: newProperty });
  } catch (error) {
    console.error("Error creating property:", error);
    res
      .status(500)
      .json({
        message: "Erreur serveur lors de la création",
        error: error.message,
      });
  }
});

// Update a property

exports.updateProperty = catchAsync(async (req, res, next) => {
  const { status, management } = req.body;

  // Check if a status or management is provided
  const updatedProperty = await Property.findByIdAndUpdate(
    req.params.id,
    {
      management: management || undefined, // If management is provided, update it
      // You can also add other fields if needed
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedProperty) {
    return res
      .status(404)
      .json({ status: "error", message: "Property not found" });
  }

  res.status(200).json({ status: "success", data: updatedProperty });
});
// Delete a property
exports.deleteProperty = catchAsync(async (req, res, next) => {
  await Property.findByIdAndDelete(req.params.id);
  res.status(204).json({ status: "success", data: null });
});

exports.getPropertyById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.types.ObjectId.isValid(id)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid property ID format",
    });
  }

  const property = await Property.findById(id);
  if (!property) {
    return res
      .status(404)
      .json({ status: "error", message: "Property not found" });
  }
  res.status(200).json({ status: "success", data: property });
});
