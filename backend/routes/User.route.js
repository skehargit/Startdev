const express = require("express");
const {login,signup}=require("../controllers/User.controller.js");
const Router = express.Router();

Router.post("/login",login)
Router.post("/signup",signup)

module.exports = Router