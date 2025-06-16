const imageValidationService = require("../services/imageValidationService");

const Property = require("../Models/PropertiesModel");
const catchAsync = require("../Utils/CatchAsync");
const mongoose = require("mongoose");

exports.createProperty = catchAsync(async (req, res, next) => {
  const {
    streetAddress,

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

  console.log(agreement);
  console.log(typeof agreement);

  let validatedPhotos = [];

  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const imagePath = file.path;
      // const validation = await imageValidationService.validateImage(imagePath);

      validatedPhotos.push({
        url: `/uploads/photos/${file.filename}`,
        // isValid: validation.isValid,
        // validationScore: validation.confidence,
        // validationDetails: {
        //   isRealEstate: validation.isValid,
        //   categories: validation.categories,
        //   confidence: validation.confidence,
        // },
      });
    }
  }

  // const hasValidImage = validatedPhotos.some((img) => img.isValid);

  const newProperty = await Property.create({
    streetAddress,

    city,
    type,
    homeType,
    beds,
    baths,
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
      designType: features?.designType,
    },
    Kitchen: {
      kitchenCount: req.body["kitchenCount"],
      types: Kitchen?.types || [],
    },
    photos: validatedPhotos,
    agreement,
    // status: hasValidImage ? "approved" : "pending",
    status: "pending",
  });

  res.status(201).json({
    status: "success",
    data: newProperty,
    // message: hasValidImage
    //   ? "Propriété créée avec succès"
    //   : "Propriété créée mais en attente de validation des images",
    message: "Propriété créée mais en attente de validation des images",
  });
});

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
    "features.designType": designType,
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
  if (designType) query["features.designType"] = designType;

  const properties = await Property.find(query);

  res.status(200).json({
    status: "success",
    results: properties.length,
    data: properties,
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

  const estate = await estate.findByIdAndDelete(id);

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

////////////////////////////////////////////////////////
const path = require("path");

// Revalider une image
exports.revalidateImage = async (req, res) => {
  try {
    const { estateId, imageIndex } = req.params;

    const estate = await Estate.findById(estateId);
    if (!estate) {
      return res.status(404).json({
        success: false,
        message: "Bien immobilier non trouvé",
      });
    }

    const image = estate.images[imageIndex];
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image non trouvée",
      });
    }

    const imagePath = path.join(
      __dirname,
      "..",
      "uploads",
      "estates",
      path.basename(image.url)
    );
    const validation = await imageValidationService.validateImage(imagePath);

    estate.images[imageIndex] = {
      ...image,
      isValid: validation.isValid,
      validationScore: validation.confidence,
      validationDetails: {
        isRealEstate: validation.isValid,
        categories: validation.categories,
        confidence: validation.confidence,
      },
    };

    await estate.save();

    res.json({
      success: true,
      data: estate.images[imageIndex],
      message: "Image revalidée avec succès",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la revalidation",
      error: error.message,
    });
  }
};

// Obtenir tous les biens avec filtres
exports.getEstates = async (req, res) => {
  try {
    const { status, validImagesOnly } = req.query;

    let filter = {};
    if (status) filter.status = status;
    if (validImagesOnly === "true") {
      filter["images.isValid"] = true;
    }

    const estates = await Estate.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: estates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération",
      error: error.message,
    });
  }
};
