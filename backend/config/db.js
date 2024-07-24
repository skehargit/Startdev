const mongoose = require("mongoose");
require("dotenv").config();
const DBConnect =()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{console.log("DB connected successfully")})
    .catch((err)=>{
        console.log("Error while connecting to DB")
        console.log(err);
        process.exit(1);
    })
}
module.exports=DBConnect;