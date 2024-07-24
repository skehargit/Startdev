const express = require("express");
// const {login,signup}=require("../controllers/User.controller.js");
const {auth} =require('../middleware/Auth.middleware.js');
const { deleteAccount, updateProfile } = require("../controllers/Profile.controller.js");

const Router = express.Router();

Router.delete("/deleteProfile", auth, deleteAccount)
Router.put("/updateProfile", auth, updateProfile)

module.exports = Router