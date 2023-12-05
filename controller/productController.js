const Product = require("../models/productModel")
const asyncHandler = require("express-async-handler");
const slugify = require("slugify")

const createProduct = asyncHandler(async (req, res)=>{
    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }
       const newProduct = await  Product.create(req.body);
       res.json(newProduct);
    } catch (error) {
        throw new Error(error)
    }
})

const getAProduct = asyncHandler(async (req,res)=>{
    try {
        const findProduct = await Product.findById(req.params.id);
        res.json(findProduct)
    } catch (error) {
        throw new Error(error);
    }
})

const getAllProduct = asyncHandler(async (req,res)=>{
    try {
      const getAllProducts = await Product.find();
      res.json(getAllProducts);  
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {createProduct , getAProduct, getAllProduct}