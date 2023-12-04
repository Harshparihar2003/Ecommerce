const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        index : true
    },
    lastName : {
        type : String,
        required : true,
        index : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    mobile : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        default : "user"
    }
})

// userSchema.pre = Defines a pre-save middleware function that is executed before saving a user document to the database.
userSchema.pre("save" , async function(next){
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.isPasswordMatched = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}


module.exports = mongoose.model("User", userSchema);