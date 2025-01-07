const Category = require("../models/Category");

// Create a new category
exports.createCategory = async (req, res) => {
  const { name, description, thumbnail } = req.body;
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
    res.status(400).json({ error: error.message });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  const { name, description, thumbnail } = req.body;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description, thumbnail, updatedAt: Date.now() },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
