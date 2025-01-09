const path = require("path");
const fs = require("fs");
const Image = require("../models/Image");
const Category = require("../models/Category");

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../uploads/images');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Create a new image
exports.uploadImage = async (req, res) => {
  const { name, description, price, categories, tags } = req.body;
  const uploadedBy = req.user.id; // Assuming JWT authentication is in use

  try {
    logger.log("Incoming request body:", req.body);
    logger.log("Incoming file:", req.file);

    // Validate file upload
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Parse `categories` and `tags` from JSON strings
    let categoriesArray, tagsArray;
    try {
      categoriesArray = JSON.parse(categories || "[]");
      tagsArray = JSON.parse(tags || "[]");
    } catch (err) {
      logger.error("Error parsing categories or tags:", err.message);
      return res.status(400).json({ message: "Invalid categories or tags format." });
    }

    // Validate categories
    if (!Array.isArray(categoriesArray) || categoriesArray.length === 0) {
      return res.status(400).json({ message: "At least one category must be selected." });
    }

    // Validate price
    if (!price || isNaN(price)) {
      return res.status(400).json({ message: "Price must be a valid number." });
    }

    // Validate tags
    if (!Array.isArray(tagsArray) || tagsArray.length === 0) {
      return res.status(400).json({ message: "At least one tag must be provided." });
    }

    logger.log("Parsed categories:", categoriesArray);
    logger.log("Parsed tags:", tagsArray);

    // Convert category names to ObjectIds
    const categoryIds = await Category.find({
      name: { $in: categoriesArray }, // Match category names
    }).select("_id");

    if (categoryIds.length !== categoriesArray.length) {
      return res.status(400).json({
        message: "One or more selected categories are invalid.",
      });
    }

    // Save the file path
    const imagePath = path.join("uploads", req.file.filename);

    // Create a new image document
    const newImage = new Image({
      title: name,
      description,
      price,
      imagePath,
      uploadedBy,
      categories: categoryIds.map((category) => category._id), // Use the ObjectIds
      tags: tagsArray, // Array of strings
    });

    // Save to the database
    await newImage.save();

    res
      .status(201)
      .json({ message: "Image uploaded successfully!", image: newImage });
  } catch (error) {
    logger.error("Upload image error:", error);
    res.status(500).json({ message: error.message });
  }
};

// exports.uploadImage = async (req, res) => {
//     const { title, description, price, categories } = req.body;
//     const uploadedBy = req.user.id; // Assuming JWT authentication is in use

//     try {
//         // Validate file upload
//         if (!req.file) {
//             return res.status(400).json({ message: 'No file uploaded' });
//         }

//         // Validate categories
//         if (!categories || categories.length === 0) {
//             return res.status(400).json({ message: 'At least one category must be selected.' });
//         }

//         // Save file path
//         const imagePath = path.join(uploadDir, req.file.filename);

//         const newImage = new Image({
//             title,
//             description,
//             price,
//             imagePath,
//             uploadedBy,
//             categories: Array.isArray(categories) ? categories : [categories], // Ensure it's an array
//         });

//         await newImage.save();
//         res.status(201).json({ message: 'Image uploaded successfully!', image: newImage });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// Get all images
exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find().populate("categories uploadedBy"); // Populate category and user details
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get images by category
exports.getImagesByCategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const images = await Image.find({ categories: categoryId })
      .populate("categories uploadedBy"); // Populate category and user details
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update image details
exports.updateImage = async (req, res) => {
  const { title, description, price, categories } = req.body;
  try {
    const updatedImage = await Image.findByIdAndUpdate(
      req.params.id,
      { title, description, price, categories, updatedAt: Date.now() },
      { new: true }
    ).populate("categories uploadedBy"); // Populate category and user details
    res.status(200).json(updatedImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an image
exports.deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Delete the image file from the local server
    fs.unlinkSync(image.imagePath);

    // Delete the image record from the database
    await Image.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get image details by image ID
exports.getImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id).populate("categories uploadedBy");
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
