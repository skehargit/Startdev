import express from "express";
const cors = require('cors')
require("dotenv").config();
const app=express();
app.use(express.json());
app.use(cors())
const port=process.env.PORT || 4000;

app.get("/",(req,res)=>{
    res.send("API WORKING")
})

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})

// mongodb connection
// const DBConnect = require("./config/db")
// DBConnect();

// api mounting

//for user 
app.use("/api/v1/user",require("./routes/User.route.js"))

//for job
app.use("/api/v1/job",require('./routes/Job.route.js'))

//for application 
app.use("/api/v1/application",require("./routes/Application.router.js"))