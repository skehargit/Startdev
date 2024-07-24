const express = require("express");
const {login,signup}=require("../controllers/User.controller.js");
const {auth} =require('../middleware/Auth.middleware.js')
const Router = express.Router();

// Route for user login
Router.post("/login",login)

// Route for user signup
Router.post("/signup",signup)

// Route for Changing the password
Router.post("/changepassword",auth , changePassword)

module.exports = Router