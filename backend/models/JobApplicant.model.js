const mongoose = require("mongoose");

let applicantSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:"User"
    },
    name: {
      type: String,
      required: true,
    },
    education: [
      {
        institutionName: {
          type: String,
          required: true,
        },
        startYear: {
          type: Number,
          required: true,
          validate: [
            { validator: Number.isInteger, msg: "Year should be an integer" },
          ],
        },
        endYear: {
          type: Number,
          validate: [
            { validator: Number.isInteger, msg: "Year should be an integer" },
            {
              validator: function (value) {
                return this.startYear <= value;
              },
              msg: "End year should be greater than or equal to Start year",
            },
          ],
        },
      },
    ],
    skills: {
        type:[String],
        required:true
    },
    resume: {
      type: String,
    },
    profile: {
      type: String,
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
);

module.exports = mongoose.model("JobApplicantInfo", applicantSchema);
