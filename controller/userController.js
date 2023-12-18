const { generateToken } = require("../config/jwtToken");
const mongoose = require("mongoose");
const crypto = require("crypto")
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Coupon = require("../models/couponModel")
const asyncHandler = require("express-async-handler");
const { validateMongoDbId } = require("../utils/validateMongoDb");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailController");
const { use } = require("../routes/authRoutes");
const secret_key = "secretkey";

// Create a user
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;

    // Checking if a user is already exist or not
    const findUser = await User.findOne({ email: email });


    if (!findUser) {
        // Create a new user
        const newUser = await User.create(req.body);
        res.send(newUser);
    }
    else {
        throw new Error("User already exist........")
    }
})

// Login a user
const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // Check if user exist or not
    const findUser = await User.findOne({ email: email })
    if (findUser && await findUser.isPasswordMatched(password)) {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateUser = await User.findByIdAndUpdate(findUser.id, {
            refreshToken: refreshToken
        }, {
            new: true,
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        })
        res.json({
            _id: findUser?.id,
            firstname: findUser?.firstName,
            lastname: findUser?.lastName,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id)
        })
    }
    else {
        throw new Error("Invalid credentials")
    }

})

// Admin login
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // Check if user exist or not
    const findAdmin = await User.findOne({ email: email })
    if (findAdmin.role !== "admin") throw new Error("Not authorizsed");
    if (findAdmin && await findAdmin.isPasswordMatched(password)) {
        const refreshToken = await generateRefreshToken(findAdmin?._id);
        const updateUser = await User.findByIdAndUpdate(findAdmin.id, {
            refreshToken: refreshToken
        }, {
            new: true,
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        })
        res.json({
            _id: findAdmin?.id,
            firstname: findAdmin?.firstName,
            lastname: findAdmin?.lastName,
            email: findAdmin?.email,
            mobile: findAdmin?.mobile,
            token: generateToken(findAdmin?._id)
        })
    }
    else {
        throw new Error("Invalid credentials")
    }

})


// Handle refresh token
const handleRefershToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No refresh token in cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) throw new Error("No refresh token present in db or not matched");
    jwt.verify(refreshToken, secret_key, (err, decoded) => {
        if (err || user.id !== decoded.id) {
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
const logOut = asyncHandler(async (req, res) => {
    try {
        const cookie = req.cookies;
        const refreshToken = cookie.refreshToken;
        if (!refreshToken) throw new Error("No refresh token found");
        const user = await User.findOne({ refreshToken });
        // if(!user) throw new Error("User not found");
        if (!user) {
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: true,
            });
            return res.status(204) // forbidden
        }
        // await User.updateOne({ _id: user._id }, {$unset: { refreshToken: "" }});
        await User.findOneAndUpdate({ refreshToken: refreshToken }, {
            refreshToken: "",
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
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
const updateUser = asyncHandler(async (req, res) => {
    const {_id } = req.user;
    validateMongoDbId(_id)
    try {
        const updateUser = await User.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true,
        });
      res.json(updateUser)
    } catch (error) {
        throw new Error(error)
    }

})

// save user address
const saveAddress = asyncHandler(async (req, res) => {
    console.log("address")
    const { _id } = req.user;
    console.log(_id)
    validateMongoDbId(_id)
    try {
        const updateUser = await User.findByIdAndUpdate(_id, {
            address : req?.body?.address
        }, {
            new: true,
        });
       res.json(updateUser);
    } catch (error) {
        throw new Error(error)
    }

})

// Get all the user
const getAllUser = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers)
    } catch (error) {
        throw new Error(error)
    }
})

// Get a user
const getAUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id);
    try {
        const getUser = await User.findById(id);
        if (getUser) {
            res.json(getUser)
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        throw new Error(error);
    }
})

// Delete a user
const deleteAUser = asyncHandler(async (req, res) => {
    validateMongoDbId(req.params.id)
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        if (deleteUser) {
            res.json({
                msg: "User deleted successfully",
                success: true
            })
        }
        else {
            throw new Error("User not found")
        }
    } catch (error) {
        throw new Error(error);
    }
})

const blockUser = asyncHandler(async (req, res) => {
    validateMongoDbId(req.params.id)
    const { id } = req.params;
    try {
        const blockusr = await User.findByIdAndUpdate(id, {
            isBlock: true,
        }, {
            new: true,
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

const unblockUser = asyncHandler(async (req, res) => {
    validateMongoDbId(req.params.id)
    const { id } = req.params;
    try {
        const unblock = await User.findByIdAndUpdate(id, {
            isBlock: false,
        }, {
            new: true,
        }
        );
        res.json({
            message: "User unblocked"
        })
    } catch (error) {
        throw new Error(error);
    }
})

const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    const user = await User.findById(_id);
    if (password) {
        user.password = password;
        const updatePassword = await user.save();
        res.json(updatePassword);
    } else {
        res.json(user);
    }
})

const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email })
    if (!user) throw new Error("User not found with this email")
    try {
        const token = await user.createPasswordResetToken();
        await user.save()
        const resetURL = `Hi, Please follow the link to reset Your password. This link is valid till 10 minutes from now.<a href="http://localhost:5000/api/user/reset-password/${token}">Click Here</a>`;
        const data = {
            to: email,
            text: "Hey User",
            subject: "Forgot Password link",
            htm: resetURL
        }
        sendEmail(data);
        res.json(token)
    } catch (error) {
        throw new Error(error)
    }
})

const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    console.log(password, token)
    const hashToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
        passwordResetToken: hashToken,
        passwordResetExpires: { $gt: Date.now() }
    });
    if (!user) throw new Error("Token expired. Please try again later..")
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
})

const getWishList = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
        const findUser = await User.findById(_id).populate("wishlist");
        res.json(findUser);
    } catch (error) {
        throw new Error(error)
    }
})

const userCart = asyncHandler(async(req,res)=>{
    const {cart} = req.body;
    const {_id} = req.user;
    validateMongoDbId(_id);
    try {
        let products = [];
        const user = await User.findById(_id);
        const alreadyExistCart = await Cart.findOne({ orderby : user._id });
        if(alreadyExistCart){
            // alreadyExistCart.remove();
            alreadyExistCart.products = []
        }
        for(let i=0; i<cart.length; i++){
            let object = {};
            object.product = cart[i]._id;
            object.count = cart[i].count;
            object.color = cart[i].color;
            let getPrice = await Product.findById(cart[i]._id).select("price").exec();
            object.price = getPrice.price;
            products.push(object);
        }
        let cartTotal = 0;
        for(let i=0; i<products.length; i++){
            cartTotal += products[i].price * products[i].count;
        }
        let newCart = await new Cart({
            products, cartTotal, orderby: user?._id
        }).save()
        res.json(newCart);
    } catch (error) {
        throw new Error(error)
    }
})

const getUserCart = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    validateMongoDbId(_id);
    try {
        const cart = await Cart.findOne({ orderby : _id }).populate("products.product")
        res.json(cart)
    } catch (error) {
        throw new Error(error)
    }
});

const emptyCart = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    validateMongoDbId(_id);
    try {
        const user = await User.findOne({_id});
        const cart = await Cart.findOneAndDelete({orderby : user._id});
        res.json(cart)
    } catch (error) {
        throw new Error(error)
    }
});

const applyCoupon = asyncHandler(async(req,res)=>{
    const {coupon} = req.body;
    const {_id} = req.user;
    validateMongoDbId(_id)
    const validCoupon = await Coupon.findOne({name : coupon});
    if(validCoupon === null){
        throw new Error("Invalid coupon")
    }
    const user = await User.findOne({ _id })
    let {products, cartTotal} = await Cart.findOne({ orderby : user._id}).populate("products.product");
    let totalAfterDiscount = (cartTotal- (cartTotal * validCoupon.discount)/100).toFixed(2);
    await Cart.findOneAndUpdate({ orderby: user._id }, {totalAfterDiscount}, {new : true});
    res.json(totalAfterDiscount)
})

module.exports = { createUser, loginUserCtrl, getAllUser, getAUser, deleteAUser, updateUser, blockUser, unblockUser, handleRefershToken, logOut, updatePassword, forgotPasswordToken, resetPassword, loginAdmin, getWishList, saveAddress, userCart, getUserCart,emptyCart, applyCoupon }; 