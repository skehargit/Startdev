const express = require("express");
const {login,signup, update, deleteAccount, forgotPassword}=require("../controllers/User.controller.js");
const {auth} =require('../middleware/Auth.middleware.js');

const Router = express.Router();

// Route for user login
Router.post("/login",login)

// Route for user signup
Router.post("/signup",signup)

// Route for Changing the password
Router.post("/changepassword",auth , changePassword)

//update user details
Router.put("/update",auth , update)

//delete user account
Router.delete("/delete",auth ,deleteAccount)

//forgot password
Router.post("/forgot",forgotPassword)

module.exports = Router