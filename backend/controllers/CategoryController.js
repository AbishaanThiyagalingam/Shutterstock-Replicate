const multer = require("multer");
const path = require("path");
const Category = require("../models/Category");
const fs = require("fs");

// Create uploads directory if it doesn't exist
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name with original extension
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    console.log("Multer File Received:", file); // Debug log
    const fileTypes = /jpeg|jpg|png|gif|webp/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only images are allowed!"));
    }
  },
});


// create category
exports.createCategory = async (req, res) => {
  console.log("File Received:", req.file); // Debug log
  const { name, description } = req.body;
  const thumbnail = req.file ? `uploads/${req.file.filename}` : null;

  if (!name || !description) {
    return res.status(400).json({ error: "Name and description are required." });
  }

  try {
    const newCategory = new Category({
      name,
      description,
      thumbnail,
    });
    console.log("Saving Category:", newCategory); // Debug log
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error Creating Category:", error); // Debug log
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
  const thumbnail = req.file ? `uploads/${req.file.filename}` : null;

  if (!name || !description) {
    return res.status(400).json({ error: "Name and description are required." });
  }

  try {
    const updateData = { name, description, updatedAt: Date.now() };
    if (thumbnail) {
      updateData.thumbnail = thumbnail;
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
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
  const filename = req.params.filename;
  const filePath = path.resolve(__dirname, "../uploads", filename);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Image not found." });
  }

  // Handle request abort
  req.on('aborted', () => {
    console.error(`Request aborted while sending file: ${filename}`);
  });

  // Send the file
  res.sendFile(filePath, (err) => {
    if (err) {
      if (err.code === 'ECONNABORTED') {
        console.error(`Request aborted for file: ${filename}`);
        return;
      }
      console.error("Error sending file:", err);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to send image." });
      }
    }
  });
};

// Export multer configuration
exports.upload = upload;
