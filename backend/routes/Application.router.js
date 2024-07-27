const express = require('express');
const { auth } = require('../middleware/Auth.middleware.js');
const { getAppication, getJobs, updateStatus } = require('../controllers/Application.controller.js');

const Router = express.Router();

// recruiter can get all application of a job
Router.get('/job/:id/applications',auth,getAppication)

// recruiter can get jobs that he posted
Router.get('/getpostedjobs',auth,getJobs)

// recruiter can chage status of a applicant
Router.post('/job/:id/status',auth,updateStatus)