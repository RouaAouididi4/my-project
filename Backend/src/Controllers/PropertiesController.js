const { mongo } = require("mongoose");
const Property = require("../Models/PropertiesModel");
const catchAsync = require("../Utils/CatchAsync");

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

// Create a new property
exports.createProperty = catchAsync(async (req, res) => {
  const {
    streetAddress,
    type,
    price,
    title,
    size,
    bedrooms,
    bathrooms,

    management,
  } = req.body;

  // Create a new property with the status and management specified by the customer
  const newProperty = await Property.create({
    streetAddress,
    type,
    price,
    title,
    size,
    bedrooms,
    bathrooms,
    management: management || "Unmanaged", // 'managed' or 'unmanaged',
  });

  res.status(201).json({ message: "Listing added ✅", property: newProperty });
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
