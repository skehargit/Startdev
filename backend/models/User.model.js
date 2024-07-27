const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        contactNumber: {
            type: Number,
            trim: true,
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
        },
        accountType: {
            type: String,
            enum: ["applicant", "recruiter"],
            required: true,
        },
        gender: {
            type: String,
        },
        dateOfBirth: {
            type: String,
        },
        address:{
            type:String,
        },
        about: {
            type: String,
            trim: true,
        },
        bio:{
            type:String,
        }
        
    }
    ,{timestamps:true}
)
module.exports = mongoose.model("User",userSchema);