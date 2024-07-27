const mongoose = require("mongoose");
const JobModel = require("../models/Job.model.js");

//to add new job
exports.addnewjob = async (req, res) => {
  try {
    const user = req.user;

    if (user.type != "recruiter") {
      return res.status(401).json({
        message: "You don't have permissions to add jobs",
      });
    }
    const {
      name,
      description,
      applicationInstruction,
      responsibilities,
      requiredSkills,
      numberOfOpenings,
      maxApplicants,
      maxPositions,
      additionalInformation,
      location,
      jobType,
      duration,
      postingDate,
      deadline,
      salary,
    } = req.body;

    JobModel.create({
      name,
      description,
      applicationInstruction,
      responsibilities,
      requiredSkills,
      numberOfOpenings,
      maxApplicants,
      maxPositions,
      additionalInformation,
      location,
      jobType,
      duration,
      postingDate,
      deadline,
      salary,
    });

    res.json({
      success: true,
      msg: "Job ceated successfully",
    });
  } catch (error) {
    console.log("Error while creating Job", error);
    res.json({
      success: false,
      msg: "Error while creating Job",
    });
  }
};

//to get all the jobs
exports.getListedJobs = async (req, res) => {};

// to get info about a particular job
exports.getParticularJob = async (req, res) => {};

// to get info about a particular job
exports.updateParticularJob = async (req, res) => {};

// to delete a job
exports.deleteParticularJob = async (req, res) => {};
