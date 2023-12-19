const Model = require("../models/brandModel");
const asyncHandler = require("express-async-handler")
const {validateMongoDbId} = require("../utils/validateMongoDb");

const createModel = asyncHandler(async(req,res)=>{
    try {
        const newModel = await Model.create(req.body);
        res.json(newModel);
    } catch (error) {
        throw new Error(error)  
    }
})

const updateModel = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongoDbId(id)
    try {
        const updateModel = await Model.findByIdAndUpdate(id, req.body, {
            new : true,
        });
        res.json(updateModel);
    } catch (error) {
        throw new Error(error)
    }
})

const deleteModel = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongoDbId(id);
    try {
        const deletedModel = await Model.findByIdAndDelete(id);
        res.json(deletedModel);
    } catch (error) {
        throw new Error(error)
    }
})

const getModel = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongoDbId(id);
    try {
        const Model = await Model.findById(id);
        res.json(Model);
        } catch (error) {
            throw new Error(error)
            }
})

const getAllModel = asyncHandler(async(req,res)=>{
    try {
        const categories = await Model.find();
        res.json(categories);
        } catch (error) {
            throw new Error(error)
            }
})

module.exports = {createModel, updateModel, deleteModel, getModel, getAllModel}

