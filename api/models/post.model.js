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

postSchema.index({postTitle:'text', postContent:'text'})
const Post = mongoose.model('Post', postSchema);

export default Post;