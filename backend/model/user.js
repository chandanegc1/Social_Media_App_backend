import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:[true , "please enter a name"],
    },
    avatar:{
        public_id:String,
        url:String,
    },
    email:{
        type:String,
        require:[true , "please enter an email"],
        unique:[true , "Email already exist"],
    },
    password:{
        type:String,
        require:[true , "please enter a password"],
        minlength:[6 ,"Password must be at least 6 characters"],
        select: false,
    },
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
        }
    ],
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
        }
    ],
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
        }
    ],

    resetPasswordToken:String,
    resetPasswordExpire:Date,
});

userSchema.pre("save" , async function(next){
    if(this.isModified("password"))
      this.password = await bcrypt.hash(this.password , 10);
    next();
});

userSchema.methods.getResetPasswordToken = function (){
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 10*60*1000;

    return resetToken;
}

export default mongoose.model("User" , userSchema);