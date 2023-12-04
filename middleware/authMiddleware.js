// This middleware is designed to authenticate incoming requests by verifying a JWT (JSON Web Token) in the Authorization header. If the token is valid, it attaches the corresponding user object to the request for further processing by subsequent middleware or route handlers. If the token is not present or invalid, it sends a 401 Unauthorized response.

const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler")
const secret_key = "secretkey";

const authMiddleware = asyncHandler(async (req, res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            // decode the token and get user data out of it
            const decoded = jwt.verify(token, secret_key);
            req.user = await User.findById(decoded.id);
            next();
            } catch (err) {
                console.error(`Error verifying token: ${err}`);
                res.status(401).send({message:"Not authorized to access this resource,Please login again"})
                }
                } else {
                    res.status(401).send({message:"No token provided"});
                    }
})

const isAdmin = asyncHandler(async (req,res,next)=>{
    const {email} = req.user;
    const adminUser = await User.findOne({email});
    if(adminUser.role !== "admin"){
        throw new Error("You are not an admin");
    }
    else{
        next();
    }
})

module.exports = {authMiddleware, isAdmin};