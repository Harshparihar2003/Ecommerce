const express = require("express");
const router = express.Router();
const {authMiddleware, isAdmin} = require("../middleware/authMiddleware");
const { createBlog, updateBlog, getBlog, getAllBlogs, deleteBlog, likeBlog, disLikeBlog, uploadImages } = require("../controller/blogController");
const { blogImgResize, uploadPhoto } = require("../middleware/uploadImgMiddleware");

router.post("/",authMiddleware,isAdmin,createBlog);
router.put("/upload/:id", authMiddleware, isAdmin, uploadPhoto.array("images",10),blogImgResize, uploadImages)

router.put("/likes", authMiddleware,likeBlog);
router.put("/dislikes", authMiddleware,disLikeBlog);
router.put("/:id",authMiddleware,isAdmin,updateBlog);
router.get("/:id",getBlog);
router.get("/",getAllBlogs);
router.delete("/:id",authMiddleware,isAdmin, deleteBlog);


module.exports = router;