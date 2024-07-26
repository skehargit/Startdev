const express = require("express");
const { auth } = require("../middleware/Auth.middleware");
const { addnewjob, getListedJobs, getParticularJob,updateParticularJob,deleteParticularJob } = require("../controllers/JobDetails.controller");

const router = express.Router();

//add new job
router.post('/add',auth,addnewjob)

//to get all the jobs
router.get('/get',auth,getListedJobs)

// to get info about a particular job
router.get('/get/:id',auth,getParticularJob)

// update a particular job
router.put('/update/:id',auth,getParticularJob)

// to delete a job
router.delete('/delete/:id',auth,getParticularJob)