const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            trim:true,
            required:true,
        },
        email:{
            type:String,
            trim:true,
            required:[true,"password is required"],
            unique:[true,"email is alredy registered"],
            lowercase:true,
        },
        password:{
            type:String,
            required:true,
        }
    }
    ,{timestamps:true}
)
module.exports = mongoose.model("User",userSchema);