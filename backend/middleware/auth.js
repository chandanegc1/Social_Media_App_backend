import User from "../model/user.js";
import Jwt  from "jsonwebtoken";

export const isAuthenticated = async (req , res , next)=>{
   try {
    const {token} = req.cookies;
    if(!token){
        return res.status(401).json({
            message:"Please login first"
        });
    }
    
    const decoded = Jwt.verify(token ,"process.env.JWT_SECRET");
    req.user = await User.findById(decoded._id);
    next();

   } catch (error) {
    res.status(500).json({
        message:error.message,
    })
   }
}