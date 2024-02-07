import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    caption:String,

    image:{
        public_id:String,
        url:String
    },
    
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },

    createdAt:{
        type:Date,
        default:Date.now,
    },

    likes:[
        {
           type:mongoose.Schema.Types.ObjectId,
           ref:"user",
        }
    ],

    comments:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"user",
            },
            comment:{
                type:String,
                require:true,
            }
        }
    ]
})

const Post = new mongoose.model("Post" , postSchema)

export default Post;