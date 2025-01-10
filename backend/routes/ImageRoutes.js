const express = require("express");
const router = express.Router();
const imageController = require("../controllers/ImageController");
const multer = require("multer");
const authenticate = require("../middleware/Auth");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/upload", authenticate.authenticateSeller, upload.single("image"), imageController.uploadImage);
router.get("/", imageController.getAllImages);
router.get("/category/:categoryId", imageController.getImagesByCategory);
router.get("/:id", imageController.getImageById);
router.put("/:id", authenticate.authenticateSeller, imageController.updateImage);
router.delete("/:id", authenticate.authenticateSeller, imageController.deleteImage);

module.exports = router;
