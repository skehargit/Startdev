const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description:{
            type:String,
            required:true
        },
        applicationInstruction:{
            type:String,
            required:true,
        },
        responsibilities:{
            type:String,
            required:true,
        },
        requiredSkills:{
            type:[String],
            required: true,
        },
        numberOfOpenings:{
            type:Number,
            required:true,
        },
        maxApplicants:{
            type:Number,
            validate: [
                {
                  validator: Number.isInteger,
                  msg: "Max applicants should be an integer",
                },
                {
                  validator: function (value) {
                    return value > 0;
                  },
                  msg: "Max applicants should greater than 0",
                },
              ],
        },
        maxPositions:{
            type:Number,
            validate: [
                {
                  validator: Number.isInteger,
                  msg: "Max postions should be an integer",
                },
                {
                  validator: function (value) {
                    return value > 0;
                  },
                  msg: "Max positions should greater than 0",
                },
              ],
        },
        additionalInformation:{
            type:String
        },
        location:{
            type:String,
            required:true,
        },
        jobType:{
            type:String,
            required:true,
        },
        duration:{
            type:String,
            required:true,
            min:0,
            validate: [
                {
                  validator: Number.isInteger,
                  msg: "Duration should be an integer",
                },
              ],
        },
        postingDate:{
            type: Date,
            default: Date.now,
        },
        deadline:{
            type:Date,
            required:true,
            validate: [
                {
                  validator: function (value) {
                    return this.posting_date < value;
                  },
                  msg: "deadline should be greater than posting date",
                },
              ],
        },
        salary:{
            type:Number,
            required:true,
            validate: [
                {
                  validator: Number.isInteger,
                  msg: "Salary should be an integer",
                },
                {
                  validator: function (value) {
                    return value >= 0;
                  },
                  msg: "Salary should be positive",
                },
              ],
        },
    }
    ,{timestamps:true}
)
module.exports = mongoose.model("Job",jobSchema);