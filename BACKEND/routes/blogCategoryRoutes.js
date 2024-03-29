const express = require("express");
const { createCategory, updateCategory, deleteCategory, getCategory, getAllCategory } = require("../controller/blogCategoryController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin ,createCategory);
router.get("/getcategory", authMiddleware, isAdmin , getAllCategory);
router.put("/:id", authMiddleware, isAdmin ,updateCategory);
router.delete("/:id", authMiddleware, isAdmin ,deleteCategory);
router.get("/:id", authMiddleware, isAdmin ,getCategory);

module.exports = router;