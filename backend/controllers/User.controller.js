// const express = require("express");
const User = require("../models/User.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// signup 
exports.signup =async(req,res)=>{
    try {
        const {name,email,password} = req.body;

        //user already exist
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.json({
                success:false,
                message:"User is Already exist"
            })
        }

        // secure password using bcrypt
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password,10);
        } catch (error) {
            console.log("Error while Hashing password");
            console.log(error);
            res.json({
                success:false,
                message:"Error while Hashing password"
            })
        }

        //create data in database
        const user = await User.create({
            name,email,password:hashedPassword
        })
        res.json({
            success:true,
            message:"User created successfully"
        })

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error while creating user"
        })
    }
}

// login 
exports.login = async(req,res) =>{
    try {
        const {email,password} = req.body;

        if(!password || !email){
            res.json({
                success:false,
                message:"Please fill all detailes"
            })
        }

        let userExist = await User.findOne({email});
        if(!userExist){
            res.json({
                success:false,
                message:`No user find with this ${email}`
            })
        }
        const paylod = {
            email:userExist.email,
            id:userExist._id,
        }
        // validating password 
        if(await bcrypt.compare(password,userExist.password)){
            let token = jwt.sign(paylod,process.env.JWT_SECRET,{noTimestamp:true});
            
            // it only effect on user obj not in database
            userExist= userExist.toObject();
            userExist.token = token;
            userExist.password = undefined;

            // creating cookie
            const options ={
                maxAge: 3*24*60*60*1000,
                httpOnly:true
            } 
            res.cookie("token",token, options).json({
                success:true,
                message:"successfully login",
                token,
                userExist
            })
        }else{
            res.json({
                success:false,
                message:"Wrong Password"
            })
        }

    } catch (error) {
        console.log("Error",error)
        res.json({
            success:false,
            message:"Error while login"
        })
    }
}