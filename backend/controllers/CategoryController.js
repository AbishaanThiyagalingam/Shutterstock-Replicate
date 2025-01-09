const Category = require("../models/Category");
const multer = require("multer");

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" }); // Change "uploads/" to your desired directory

// Create a new category
exports.createCategory = async (req, res) => {
  const { name, description } = req.body;
  const thumbnail = req.file ? req.file.path : null;

  if (!name || !description) {
    return res.status(400).json({ error: "Name and description are required." });
  }

  try {
    const newCategory = new Category({
      name,
      description,
      thumbnail,
    });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories." });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  const { name, description } = req.body;
  const thumbnail = req.file ? req.file.path : null;

  if (!name || !description) {
    return res.status(400).json({ error: "Name and description are required." });
  }

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description, thumbnail, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found." });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }
    res.status(200).json({ message: "Category deleted." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get image 
exports.getImage = (req, res) => {
  const filename = req.params.filename; // Get the filename from the URL
  const filePath = path.join(__dirname, "../uploads", filename); // Construct the file path

  res.sendFile(filePath, (err) => {
      if (err) {
          console.error("Error sending file:", err);
          res.status(404).json({ error: "Image not found." });
      }
  });
};

// Export multer configuration
exports.upload = upload;
