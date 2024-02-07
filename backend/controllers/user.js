import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Post from "../model/post.js";
import { now } from "mongoose";

export const register = async (req , res)=>{
    try {

        const {name , email , password} = req.body;
        let user = await User.findOne({email});

        if(user){
            return res
            .status(400)
            .json({
                success: false,
                message: "user alreasy exist",
            });
        }

        user = await User.create({
            name ,
            email ,
            password ,
            avatar:{
                public_id:"sample_id" ,
                url:"sampleurl",
            }
        });
                 // register time login
        const token = jwt.sign({ _id : user._id} , "process.env.JWT_SECRET");
        const options = {
            expires: new Date(Date.now()+90*24*60*60*1000),
            httpOnly: true
        }
        res.status(201).cookie("token" , token , options)
        .json({
            success:true,
            user,
            token
        });

    } catch (error) {
        res.status(501).json({
            success:false ,
            message:error.message
        });
    }
};


export const login = async (req , res)=>{
    try {
        const { email , password} = req.body;

        const loginUser = await User.findOne({email}).select("+password");
        if(!loginUser){
            return res.status(402).json({
                success:false,
                message:"user does not exist",
            })
        }
    
        const isMatch = await bcrypt.compare(password, loginUser.password); 
        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Incorrect Password"
            });
        }

        const token = jwt.sign( { _id : loginUser._id} , "process.env.JWT_SECRET" );
        const options = {
            expires: new Date( Date.now() + 90 * 24 * 60 * 60 * 1000 ),
            httpOnly: true,
        } 
        res.status(200).cookie("token" , token , options)
        .json({
            success:true,
            loginUser,
            token
        });

    } catch (error) {
            res.status(501).json({
            success:false,
            message:error.message,
        })
    }
}

export const logout = async(req , res)=>{
    try {
        res.status(200).cookie("token" ,null ,{expires: new Date(Date.now()) , httpOnly:true}).json({
            success:true,
            message:"Logged out"
        })
    } catch (error) {
        res.status(501).json({
            success:false,
            message:error.message,
        })
    }
}

export const deleteuser = async (req , res)=>{
    try {
        const user = await User.findById(req.user._id);
        const posts = user.posts; 
        const followers = user.followers;
        const following = user.following;
        const user_id = user._id;
        await user.deleteOne();

        for(let i = 0 ; i<posts.length ;i++){
            const post = await Post.findById(posts[i]);
            await post.deleteOne();
        }                   
        
        for(let i = 0 ; i < followers.length ;i++){
            const follower = await User.findById(followers[i]);

            const index = follower.following.indexOf(user_id);
            follower.following.splice(index , 1);
            await follower.save();

        }
        for(let i = 0 ; i < following.length ;i++){
            const follows = await User.findById(following[i]);

            const index = follows.followers.indexOf(user_id);
            follows.followers.splice(index , 1);
            await follows.save();

        }

        res.status(200).cookie("token" ,null ,{expires: new Date(Date.now()) , httpOnly:true}).json({
            success:true,
            message:"Account Deleted"
        });

    } catch (error) {
        res.status(501).json({
            success:false,
            message:error.message,
        })
    }
}

export const getUserPrfl = async (req , res)=>{
    try {
        const user = await User.findById(req.params.id);
        
        if(!user){
           return res.status(401).json({
               success:false,
               message:"user not found",
           })
        }
        res.status(200).json({
            success:true,
            user,
        });
    } catch (error) {
        res.status(501).json({
            success:false,
            message:error.message,
        })
    }
}

export const getAllUser = async (req , res)=>{
    try {
        const users = await User.find({});

        res.status(200).json({
            success:true,
            users,
        });

    } catch (error) {
        res.status(501).json({
            success:false,
            message:error.message,
        })
    }
}