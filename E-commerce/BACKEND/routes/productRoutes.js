const express = require("express");
const {createProduct, getAProduct, getAllProduct, updateProduct, deleteProduct, addToWishList, rating, uploadImages, deleteImages} = require("../controller/productController");
const router = express.Router();
const {isAdmin, authMiddleware} = require("../middleware/authMiddleware");
const { uploadPhoto, productImgResize } = require("../middleware/uploadImgMiddleware");

router.post("/",authMiddleware,isAdmin, createProduct)
router.put("/upload/", authMiddleware, isAdmin, uploadPhoto.array("images",10),productImgResize, uploadImages    )

router.get("/:id", getAProduct);
router.get("/", getAllProduct);
router.put("/wishlist", authMiddleware,addToWishList);
router.put("/rating", authMiddleware,rating);

router.put("/update/:id",authMiddleware,isAdmin, updateProduct);
router.delete("/delete/:id",authMiddleware,isAdmin, deleteProduct)
router.delete("/delete-img/:id",authMiddleware,isAdmin, deleteImages)


module.exports = router;