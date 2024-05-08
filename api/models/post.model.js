import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId : {
        type:String,
        required:true,
    },
    postTitle : {
        type:String,
        required: true,
    },
    postContent : {
        type:String,
        required:true,
    },
}, {timestamps: true})

const Post = mongoose.model('Post', postSchema);

export default Post;