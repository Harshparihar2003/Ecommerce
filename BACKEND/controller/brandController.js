const Brand = require("../models/brandModel");
const asyncHandler = require("express-async-handler")
const {validateMongoDbId} = require("../utils/validateMongoDb");

const createBrand = asyncHandler(async(req,res)=>{
    try {
        const newBrand = await Brand.create(req.body);
        res.json(newBrand);
    } catch (error) {
        throw new Error(error)  
    }
})

const updateBrand = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongoDbId(id)
    try {
        const updateBrand = await Brand.findByIdAndUpdate(id, req.body, {
            new : true,
        });
        res.json(updateBrand);
    } catch (error) {
        throw new Error(error)
    }
})

const deleteBrand = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongoDbId(id);
    try {
        const deletedBrand = await Brand.findByIdAndDelete(id);
        res.json(deletedBrand);
    } catch (error) {
        throw new Error(error)
    }
})

const getBrand = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongoDbId(id);
    try {
        const Brand = await Brand.findById(id);
        res.json(Brand);
        } catch (error) {
            throw new Error(error)
            }
})

const getAllBrand = asyncHandler(async(req,res)=>{
    try {
        const categories = await Brand.find();
        res.json(categories);
        } catch (error) {
            throw new Error(error)
            }
})

module.exports = {createBrand, updateBrand, deleteBrand, getBrand, getAllBrand}

