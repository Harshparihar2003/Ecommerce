const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDb");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken")
const secret_key = "secretkey";

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
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateUser = await User.findByIdAndUpdate(findUser.id, {
            refreshToken : refreshToken
        },{
            new : true,
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72*60*60*1000,
        })
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

// Handle refresh token
const handleRefershToken = asyncHandler(async (req,res)=>{
        const cookie = req.cookies;
        if(!cookie?.refreshToken) throw new Error("No refresh token in cookies");
        const refreshToken = cookie.refreshToken;
        const user = await User.findOne({ refreshToken});
        if(!user) throw new Error("No refresh token present in db or not matched");
        jwt.verify(refreshToken, secret_key, (err, decoded) => {
            if(err || user.id !== decoded.id){
                throw new Error("There is something wrong with refresh token")
            }
            const accessToken = generateToken(user?._id);
            res.json(accessToken);
        })
    })

        // const cookie = CookieExtractor(req);
        // const refeshCookie = req.cookies["refeshToken"];
        // console.log('refeshCookie',refeshCookie)
        // if(!refeshCookie){
        //     return res.status(401).send({msg:"You are not logged in"});
        //     }else{
        //         const user = await User.findByCredentials(cookie.email, cookie.password);
        //         if (!user) {
        //             throw new Error();
        //             }
        //             const newRefreshToken = await generateRefreshToken(user?._id);
        //             await User.updateOne({_id : user._id},{$set:{refreshToken : newRefreshToken}})
        //             res.clearCookie("refeshToken");
        //             res.cookie("refeshToken",newRefreshToken,{httpOnly :true,maxAge : 72 * 60
        //                 * 60 * 1000})
        //                 res.json({token : generateToken(user._id)})
        //                 }

// Logout the user
const logOut = asyncHandler(async (req,res)=> {
    try {
        const cookie = req.cookies;
        const refreshToken = cookie.refreshToken;
        if(!refreshToken) throw new Error("No refresh token found");
        const user = await User.findOne({ refreshToken });
        // if(!user) throw new Error("User not found");
        if(!user){
            res.clearCookie("refreshToken",{
                httpOnly : true,
                secure : true,
            });
            return res.status(204) // forbidden
        }
        // await User.updateOne({ _id: user._id }, {$unset: { refreshToken: "" }});
        await User.findOneAndUpdate({refreshToken : refreshToken }, {
            refreshToken : "",
        });
        res.clearCookie("refreshToken",{
            httpOnly : true,
            secure : true,
        });
        res.sendStatus(204)
        // res.clearCookie("refreshToken");
        // res.json({ msg: "Logged out successfully!" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
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



module.exports = { createUser , loginUserCtrl , getAllUser , getAUser , deleteAUser , updateUser , blockUser, unblockUser, handleRefershToken, logOut}