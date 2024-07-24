const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res,next)=>{
    try {
        const token = req.body.token;

        if(!token){
            res.json({
                success:false,
                message:"token is missing"
            })
        }
        
        // verify the token 
        try {
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log("problem while decode ",decode);
            req.body.userId = decode.id;
        } catch (error) {
            res.json({
                success:false,
                message:"Token is invalid"
            })
        }
        next();
    } catch (error) {
        res.json({
            success:false,
            message:"Somthing wrong while verifying the token"
        })
    }
}