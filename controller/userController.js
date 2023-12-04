const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDb");

// Create a user
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;

    // Checking if a user is already exist or not
    const findUser = await User.findOne({email : email});
   

    if(!findUser){
        // Create a new user
        const newUser = await User.create(req.body);
        res.send(newUser);
        console.log(newUser)
    }
    else{
        //User already exist
    //   res.json({
    //     msg : "User already exist",
    //     success : false,
    //   })
      throw new Error("User already exist........")
    }
})

// Login a user
const loginUserCtrl = asyncHandler(async (req,res)=>{
    const {email , password} = req.body;
    // Check if user exist or not

    const findUser = await User.findOne({email : email})

    if(findUser && await findUser.isPasswordMatched(password)){
        res.json({
            _id : findUser?.id,
            firstname : findUser?.firstName,
            lastname : findUser?.lastName,
            email : findUser?.email,
            mobile : findUser?.mobile,
            token : generateToken(findUser?._id)
        })
    }
    else{
        throw new Error("Invalid credentials")
    }

})

// Updata a user

const updateUser = asyncHandler(async (req,res)=>{
    validateMongoDbId(req.params.id)
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if(updateUser){
            res.json({
                msg : "User updated successfully",
                success : true,
            })
        }
        else{
            throw new Error("User not found")
        }
    } catch (error) {
        throw new Error(error)
    }

})


// Get all the user
const getAllUser = asyncHandler(async (req,res)=>{
    try {
        const getUsers = await User.find();
        res.json(getUsers)
    } catch (error) {
        throw new Error(error)
    }
})

// Get a user

const getAUser = asyncHandler(async (req,res)=>{
    validateMongoDbId(req.params.id);
    try {
        const getUser = await User.findById(req.params.id);
        if(getUser){
            res.json(getUser)
        }
        else{
            throw new Error("User not found")
        }
    } catch (error) {
        throw new Error(error);
    }
})

// Delete a user
const deleteAUser = asyncHandler(async (req,res)=>{
    validateMongoDbId(req.params.id)
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        if(deleteUser){
            res.json({
                msg : "User deleted successfully",
                success : true
            })
        }
        else{
            throw new Error("User not found")
        }
    } catch (error) {
        throw new Error(error);
    }
})

const blockUser = asyncHandler(async (req,res)=>{
    validateMongoDbId(req.params.id)
    const {id} = req.params;
    try {
        const blockusr = await User.findByIdAndUpdate(id, {
            isBlock : true,
        },{
            new : true,
        }
        );
        // res.json({
        //     message : "User blocked"
        // })
        res.json(blockusr)
    } catch (error) {
        throw new Error(error);
    }
})

const unblockUser = asyncHandler(async (req,res)=>{
    validateMongoDbId(req.params.id)
    const {id} = req.params;
    try {
        const unblock = await User.findByIdAndUpdate(id, {
            isBlock : false,
        },{
            new : true,
        }
        );
        res.json({
            message : "User unblocked"
        })
    } catch (error) {
        throw new Error(error);
    }
})



module.exports = { createUser , loginUserCtrl , getAllUser , getAUser , deleteAUser , updateUser , blockUser, unblockUser}