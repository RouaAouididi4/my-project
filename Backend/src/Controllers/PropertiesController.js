const Property = require("../Models/PropertiesModel");
const catchAsync = require("../Utils/CatchAsync");
const mongoose = require("mongoose");

// Get all properties
exports.getAllProperties = catchAsync(async (req, res, next) => {
  const properties = await Property.find();
  res.status(200).json({ status: "success", data: properties });
});

// Search properties
exports.searchProperties = catchAsync(async (req, res, next) => {
  const {
    streetAddress,
    city,
    type,
    minPrice,
    maxPrice,
    beds,
    homeType,
    management,
    "features.garden": garden,
    "features.parking": parking,
    "features.swimming-pool": swimmingPool,
    "features.balcony": balcony,
    "features.deseginType": deseginType,
  } = req.query;

  const query = {};

  if (streetAddress)
    query.streetAddress = { $regex: streetAddress, $options: "i" };
  if (city) query.city = { $regex: city, $options: "i" };
  if (type) query.type = type;
  if (homeType) query.homeType = homeType;
  if (management) query.management = management;

  // Price range
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  if (beds) query.beds = { $gte: Number(beds) };

  // Features
  if (garden) query["features.garden"] = garden === "true";
  if (parking) query["features.parking"] = parking === "true";
  if (swimmingPool) query["features.swimming-pool"] = swimmingPool === "true";
  if (balcony) query["features.balcony"] = balcony === "true";
  if (deseginType) query["features.deseginType"] = deseginType;

  const properties = await Property.find(query);

  res.status(200).json({
    status: "success",
    results: properties.length,
    data: properties,
  });
});

// Create a property
exports.createProperty = catchAsync(async (req, res, next) => {
  const {
    streetAddress,
    unit,
    zip,
    city,
    type,
    homeType,
    beds,
    baths,
    price,
    yearBuilt,
    management,
    phone,
    features,
    Kitchen,
    agreement,
  } = req.body;

  // Handle photos upload
  let photos = [];
  if (req.files && req.files.length > 0) {
    photos = req.files.map((file) => `/uploads/photos/${file.filename}`);
  }

  // Create the property
  const newProperty = await Property.create({
    streetAddress,
    unit,
    zip,
    city,
    type,
    homeType,
    beds,
    baths: {
      fullBaths: baths?.fullBaths || 0,
      halfBaths: baths?.halfBaths || 0,
    },
    price,
    yearBuilt,
    management,
    phone,
    features: {
      garden: features?.garden || false,
      parking: features?.parking || false,
      "swimming-pool": features?.["swimming-pool"] || false,
      balcony: features?.balcony || false,
      balconyLocation: features?.balconyLocation || [],
      deseginType: features?.deseginType,
    },
    Kitchen: {
      kitchenCount: Kitchen?.kitchenCount || 0,
      types: Kitchen?.types || [],
    },
    photos,
    agreement,
  });

  res.status(201).json({
    status: "success",
    data: newProperty,
  });
});

// Update a property
exports.updateProperty = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  // Handle photos update if needed
  if (req.files && req.files.length > 0) {
    updateData.photos = req.files.map(
      (file) => `/uploads/photos/${file.filename}`
    );
  }

  const updatedProperty = await Property.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedProperty) {
    return res.status(404).json({
      status: "error",
      message: "Property not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: updatedProperty,
  });
});

// Delete a property
exports.deleteProperty = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const property = await Property.findByIdAndDelete(id);

  if (!property) {
    return res.status(404).json({
      status: "error",
      message: "Property not found",
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// Get property by ID
exports.getPropertyById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid property ID format",
    });
  }

  const property = await Property.findById(id);

  if (!property) {
    return res.status(404).json({
      status: "error",
      message: "Property not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: property,
  });
});
