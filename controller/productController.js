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
    // Filtering
    const queryObj = {...req.query};
    const excludeField = ["page", "sort", "limit", "fields"];
    excludeField.forEach(el =>{
        delete queryObj[el];
    })
    console.log(queryObj, req.query);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match =>`$${match}`)
    let query = Product.find(JSON.parse(queryStr));

    // Sorting                                          

    if(req.query.sort){
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy)
    }else{
        query = query.sort("-createdAt");
    }

    // Limiting the fields
    if(req.query.fields){
        const fields = req.query.fields.split(',').join(' ');
        query = query.select(fields);
    }else{
        query = query.select('-__v');
    }

    // pagination
    const pageSize = parseInt(req.query.limit) || 25;
    const pageNumber = parseInt(req.query.page) || 1;
    const totalProducts = await Product.countDocuments();
    const skip = (pageNumber - 1)*pageSize
    query = query.skip(skip).limit(pageSize);
    if(req.query.pageNumber){
        if(skip >= totalProducts) throw new Error("This page does not exist")
    }    

    const products = await query;
    // const getAllProducts = await Product.find(queryObj);
    res.json(products);  
    } catch (error) {
        throw new Error(error)
    }
})

const updateProduct = asyncHandler(async (req, res)=>{
    const id = req.params;
    try{
        if(req.body.title){
            req.body.slug = slugify(req.body.title);
        }
        // const updateProduct = await Product.findOneAndUpdate({id},req.body,{
        //     new : true
        // });
        // res.json(updateProduct)
        const productToUpdate = await Product.findByIdAndUpdate(req.params.id, req.body , {
            new: true,
            runValidators:true,
            useFindAndModify: false
            })
            res.status(201).json({message:"Updated Successfully", data: productToUpdate});
            }catch(err){
                throw new Error(err)
                }
})

const deleteProduct = asyncHandler(async (req,res)=>{
    try{
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'Deleted successfully',data:deletedProduct});
        }catch(err){
            throw new Error(err)
            }
})

module.exports = {createProduct , getAProduct, getAllProduct , updateProduct, deleteProduct}