import express from "express";
import "./DB/DBconnection.js";
import cookieParser from "cookie-parser";
const app = express();
import cors from "cors";

import dotenv from "dotenv";
dotenv.config({path:"back_end/config/config.env"});
const PORT = process.env.PORT || 4000;

// use middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


// import router
import post from "./routes/post.js";
import user from "./routes/user.js";

//use routes
app.use("/api/v1",post);
app.use("/api/v1",user);


app.listen(PORT , ()=>{
    console.log("connected...." ,PORT);
})