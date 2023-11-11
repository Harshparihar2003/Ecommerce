const User = require("../models/userModel");

const createUser = async (req, res) => {
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
        res.json({
            msg : "User already exist",
            success : false,
        })
    }
}

module.exports = { createUser }