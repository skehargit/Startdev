const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res,next)=>{
    try {
        const token = req.cookies.token ||
        req.body.token ||
        req.header("Authorization").replace("Bearer ", "");

        // If JWT is missing, return 401 Unauthorized response
		if (!token) {
			return res.json({ success: false, message: `Token Missing` });
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
        // If there is an error during the authentication process,
        console.log(error,"Somthing wrong while verifying the token")
        res.json({
            success:false,
            message:"Somthing wrong while verifying the token"
        })
    }
}