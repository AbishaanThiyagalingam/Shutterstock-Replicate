// routes/imageRoutes.js
const express = require("express");
const router = express.Router();
const imageController = require("../controllers/ImageController");
const multer = require("multer");
const authenticate = require("../middleware/Auth"); // Assuming authentication middleware
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use current timestamp to avoid filename collisions
  },
});

const upload = multer({ storage: storage });

router.post("/upload", authenticate.authenticateSeller, upload.single("image"), imageController.uploadImage);
router.get("/images", imageController.getAllImages);
router.get("/images/category/:categoryId", imageController.getImagesByCategory);
router.get("/images/:id", imageController.getImageById);
router.put("/images/:id", authenticate.authenticateSeller, imageController.updateImage);
router.delete("/images/:id", authenticate.authenticateSeller, imageController.deleteImage);

module.exports = router;
