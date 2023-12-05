const express = require("express");
const {createProduct, getAProduct, getAllProduct, updateProduct, deleteProduct} = require("../controller/productController");
const router = express.Router();
const {isAdmin, authMiddleware} = require("../middleware/authmiddleware")

router.post("/",authMiddleware,isAdmin, createProduct)
router.get("/:id", getAProduct);
router.get("/", getAllProduct);
router.put("/update/:id",authMiddleware,isAdmin, updateProduct);
router.delete("/delete/:id",authMiddleware,isAdmin, deleteProduct)


module.exports = router;