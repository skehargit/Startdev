const mongoose = require("mongoose");

let applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User',
      required: true,
    },
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Job",
      required: true,
    },
    status: {
      type: String,
      enum: [
        "applied", 
        "shortlisted", 
        "accepted",
        "rejected",
        "deleted",
      ],
      default: "applied",
      required: true,
    },
    dateOfApplication: {
      type: Date,
      default: Date.now,
    }
  },
  {timestamps:true}
);


module.exports = mongoose.model("application", applicationSchema);
