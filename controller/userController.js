const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;

    // Checking if a user is already exist or not
    const findUser = await User.findOne({email : email});
   

    if(!findUser){
        // Create a new user
        const newUser = await User.create(req.body);
        res.json(newUser);
        console.log("creating  user")
    }
    else{
        //User already exist
      throw new Error("User already exist........")
    }
})

module.exports = { createUser }