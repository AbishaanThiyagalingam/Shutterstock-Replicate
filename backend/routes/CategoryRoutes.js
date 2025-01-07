const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.post("/", categoryController.upload.single("thumbnail"), categoryController.createCategory);
router.get("/", categoryController.getAllCategories);
router.put("/:id", categoryController.upload.single("thumbnail"), categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
