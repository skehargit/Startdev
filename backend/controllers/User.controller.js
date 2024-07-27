// const express = require("express");
const User = require("../models/User.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Profile = require("../models/Profile.model.js");
require("dotenv").config();

// signup
exports.signup = async (req, res) => {
  try {
    // Destructure fields from the request body
    const { firstName, lastName, email, password, accountType } = req.body;

    // Check if All Details are there or not
    if (!firstName || !lastName || !email || !password) {
      return res.send({
        success: false,
        message: "All Fields are required",
      });
    }

    //user already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User is Already exist",
      });
    }

    // Hash the password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      console.log("Error while Hashing password");
      console.log(error);
      res.json({
        success: false,
        message: "Error while Hashing password",
      });
    }
    // Create the Additional Profile For User
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    //create user data in database
    const user = await User.create({
      firstName,
      lastName,
      accountType,
      additionalDetails: profileDetails._id,
      email,
      password: hashedPassword,
    });
    res.json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error while creating user",
    });
  }
};

// login
exports.login = async (req, res) => {
  try {
    // Get email and password from request body
    const { email, password } = req.body;

    // Check if email or password is missing
    if (!password || !email) {
      return res.json({
        success: false,
        message: "Please fill all detailes",
      });
    }

    // Find user with provided email
    let userExist = await User.findOne({ email }).populate("additionalDetails");

    // If user not found with provided email
    if (!userExist) {
      return res.json({
        success: false,
        message: `No user find with this ${email}`,
      });
    }

    const paylod = {
      email: userExist.email,
      id: userExist._id,
    };
    // validating password
    if (await bcrypt.compare(password, userExist.password)) {
      let token = jwt.sign(paylod, process.env.JWT_SECRET, {
        noTimestamp: true,
      });

      // it only effect on user obj not in database
      userExist = userExist.toObject();
      userExist.token = token;
      userExist.password = undefined;

      // creating cookie
      const options = {
        maxAge: 3 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      };
      res.cookie("token", token, options).json({
        success: true,
        message: "successfully login",
        token,
        userExist,
      });
    } else {
      res.json({
        success: false,
        message: "Wrong Password",
      });
    }
  } catch (error) {
    console.log("Error", error);
    res.json({
      success: false,
      message: "Error while login",
    });
  }
};


// Changing Password
exports.changePassword = async (req, res) => {
    try {
      // Get user data from req.user
      const userDetails = await User.findById(req.user.id)
  
      // Get old password, new password, and confirm new password from req.body
      const { oldPassword, newPassword } = req.body
  
      // Validate old password
      const isPasswordMatch = await bcrypt.compare(
        oldPassword,
        userDetails.password
      )
      // If old password does not match
      if (!isPasswordMatch) {
        return res
          .status(401)
          .json({ success: false, message: "The password is incorrect" })
      }
  
      // Update password
      const encryptedPassword = await bcrypt.hash(newPassword, 10)
      const updatedUserDetails = await User.findByIdAndUpdate(
        req.user.id,
        { password: encryptedPassword },
        { new: true }
      )
  
      // Return success response
      return res.json({ success: true, message: "Password updated successfully" })
    } catch (error) {
      console.error("Error occurred while updating password:", error)
      return res.json({
        success: false,
        message: "Error occurred while updating password",
        error: error.message,
      })
    }
}

//update user details
exports.update = async(req,res)=>{

}

//delete account 
exports.deleteAccount = async(req,res)=>{

}

//forgot password 
exports.forgotPassword = async(req,res)=>{

}