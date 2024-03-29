const Blog = require("../models/blogModels");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler")
const {validateMongoDbId} = require("../utils/validateMongoDb");
const {cloudinaryUploadImg} = require("../utils/cloudinary")

const createBlog = asyncHandler(async(req,res)=>{
    try {
        const newBlog = await Blog.create(req.body);
        res.json(newBlog)
    } catch (error) {
        throw new Error(error)
    }
})

const updateBlog = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    try {
        const updateBlog = await Blog.findByIdAndUpdate(id , req.body, {
            new : true,
        });
        res.json(updateBlog)
    } catch (error) {
        throw new Error(error)
    }
})

const getBlog = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    try {
        const getBlog = await Blog.findById(id).populate("likes").populate("disLikes")
        const updateViews = await Blog.findByIdAndUpdate(
            id, {
                $inc : { numViews : 1},
                },
                    {
                        new : true
                    }
        );
        res.json(getBlog)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllBlogs = asyncHandler(async(req,res)=>{
    try {
        const getBlogs = await Blog.find();
        res.json(getBlogs)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteBlog = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    try {
        const deletedBlog = await Blog.findByIdAndDelete(id)
        res.json(deletedBlog)
    } catch (error) {
        throw new Error(error)
    }
})

const likeBlog = asyncHandler(async(req,res)=>{
    const {blogId} = req.body;
    validateMongoDbId(blogId);

    // Find the blog which we want to be liked
    const blog = await Blog.findById(blogId);
    // Find the login user
    const loginUserId = req?.user?._id;
    // Find if the user has liked the post or not
    const isLiked = blog?.isLiked;
    // Find if the user has disliked the post 
    const alreadyDisliked = blog?.disLikes?.find(
        (userId)=> userId?.toString() === loginUserId?.toString());
    if(alreadyDisliked){
        const blog = await Blog.findByIdAndUpdate(
            blogId,
            {
                $pull : { disLikes: loginUserId },
                isDisliked : false,
            },
            { new : true }
        );
        res.json(blog)
    }
    if(isLiked){
        const blog = await Blog.findByIdAndUpdate(
            blogId,
            {
                $pull : { likes : loginUserId },
                isLiked : false,
            },
            { new : true }
        );
        res.json(blog)
    }else{
        const blog = await Blog.findByIdAndUpdate(
            blogId,
            {
                $push : { likes : loginUserId },
                isLiked : true,
            },
            { new : true }
        );
        res.json(blog)
    }
})

const disLikeBlog = asyncHandler(async(req,res)=>{
    const {blogId} = req.body;
    validateMongoDbId(blogId);

    // Find the blog which we want to be liked
    const blog = await Blog.findById(blogId);
    // Find the login user
    const loginUserId = req?.user?._id;
    // Find if the user has liked the post or not
    const isDisLiked = blog?.isDisliked;
    // Find if the user has disliked the post 
    const alreadyLiked = blog?.likes?.find(
        (userId)=> userId?.toString() === loginUserId?.toString());
    if(alreadyLiked){
        const blog = await Blog.findByIdAndUpdate(
            blogId,
            {
                $pull : { likes: loginUserId },
                isLiked : false,
            },
            { new : true }
        );
        res.json(blog)
    }
    if(isDisLiked){
        const blog = await Blog.findByIdAndUpdate(
            blogId,
            {
                $pull : { disLikes : loginUserId },
                isDisliked : false,
            },
            { new : true }
        );
        res.json(blog)
    }else{
        const blog = await Blog.findByIdAndUpdate(
            blogId,
            {
                $push : { disLikes : loginUserId },
                isDisliked : true,
            },
            { new : true }
        );
        res.json(blog)
    }
})

const uploadImages = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongoDbId(id);
    try {
        const uploader =  (path) => cloudinaryUploadImg(path,"images");
        const urls = [];
        const files = req.files;
        for(const file of files){
            const {path} = file;
            const newPath = await uploader(path);
            urls.push(newPath);
            // fs.unlinkSync(path);
        }
        const findBlog = await Blog.findByIdAndUpdate(id,{
            images : urls.map((file)=>{
                return file
            }),
        },{
            new : true
        });
        res.json(findBlog)
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {createBlog, updateBlog, getBlog, getAllBlogs, deleteBlog , likeBlog, disLikeBlog, uploadImages};