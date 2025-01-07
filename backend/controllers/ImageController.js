// controllers/imageController.js
const path = require("path");
const fs = require("fs");
const Image = require("../models/Image");
const Category = require("../models/Category");

// Create a new image
exports.uploadImage = async (req, res) => {
  const { title, description, price, categories } = req.body;
  const uploadedBy = req.user.id; // Assuming you're using JWT authentication

  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imagePath = path.join(__dirname, "../uploads/images", req.file.filename);

    const newImage = new Image({
      title,
      description,
      price,
      imagePath,
      uploadedBy,
      categories,
    });

    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all images
exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find().populate("categories uploadedBy"); // Populate category and user details
    res.status(200).json(images);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    res.status(400).json({ error: error.message });
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
    res.status(400).json({ error: error.message });
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
    res.status(400).json({ error: error.message });
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
    res.status(400).json({ error: error.message });
  }
};
