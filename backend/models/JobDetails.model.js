const mongoose = require("mongoose");

const jobDetailsSchema = new mongoose.Schema(
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
        application_instruction:{
            type:String,
            required:true,
        },
        responsibilities:{
            type:String,
            required:true,
        },
        required_skills:{
            type:[String],
            required: true,
        },
        number_of_openings:{
            type:Number,
            required:true,
        },
        max_applicants:{
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
        max_positions:{
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
        additional_information:{
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
        posting_date:{
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
        rating: {
            type: Number,
            max: 5.0,
            default: -1.0,
            validate: {
              validator: function (value) {
                return value >= -1.0 && value <= 5.0;
              },
              msg: "Invalid rating",
            },
        },
    }
    ,{timestamps:true}
)
module.exports = mongoose.model("JobDetails",jobDetailsSchema);