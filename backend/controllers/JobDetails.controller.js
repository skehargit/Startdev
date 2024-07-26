const mongoose = require("mongoose");
const JobdetailsModel = require("../models/Jobdetails.model");

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
    application_instruction,
    responsibilities,
    required_skills,
    number_of_openings,
    max_applicants,
    max_positions,
    additional_information,
    location,
    jobType,
    duration,
    posting_date,
    deadline,
    salary,
    rating,
  } = req.body;

  JobdetailsModel.create({name,
    description,
    application_instruction,
    responsibilities,
    required_skills,
    number_of_openings,
    max_applicants,
    max_positions,
    additional_information,
    location,
    jobType,
    duration,
    posting_date,
    deadline,
    salary,
    rating})
    
    res.json({
        success:true,
        msg:"Job ceated successfully"
    })
  } catch (error) {
    console.log("Error while creating Job",error)
    res.json({
        success:false,
        msg:"Error while creating Job"
    })
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
