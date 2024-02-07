import mongoose from "mongoose";
const DBconnect = async()=>{
    try {
       const connect = await mongoose.connect("mongodb://127.0.0.1:27017/something");
       console.log("db.....")
    } catch (error) {
        console.log("error db");
    }
}
DBconnect();