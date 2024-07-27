const express = require("express");
const { auth } = require("../middleware/Auth.middleware");
const { addnewjob, getListedJobs, getParticularJob,updateParticularJob,deleteParticularJob } = require("../controllers/Job.controller.js");

const router = express.Router();

//recruiter can add new job
router.post('/add',auth,addnewjob)

//to get all the jobs
router.get('/get',auth,getListedJobs)

// to get info about a particular job
router.get('/get/:id',auth,getParticularJob)

//recruiter can update a particular job
router.put('/update/:id',auth,getParticularJob)

//recruiter can  delete a job
router.delete('/delete/:id',auth,getParticularJob)
