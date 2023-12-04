const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;

    // Checking if a user is already exist or not
    const findUser = await User.findOne({email : email});
   

    if(!findUser){
        // Create a new user
        const newUser = await User.create(req.body);
        res.send(newUser);
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

const loginUserCtrl = asyncHandler(async (req,res)=>{
    const {email , password} = req.body;
    // Check if user exist or not

    const findUser = await User.findOne({email : email})
    
    if(findUser && await findUser.isPasswordMatched(password)){
        res.json(findUser)
    }
    else{
        throw new Error("Invalid credentials")
    }

})

module.exports = { createUser , loginUserCtrl }