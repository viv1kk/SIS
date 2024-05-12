import { errorHandler } from "../utils/error.js";
import Post from "../models/post.model.js"
import User from "../models/user.model.js"
export const createPost = async (req, res, next)=>{
    try{
        const {postTitle, postContent, userId=req.user.id } = req.body
        if(!postTitle || !postContent || !userId) return next(errorHandler(401, "Invalid Post! Please give Title and Description"))
        const newPost = new Post({ postTitle, postContent, userId })
        await newPost.save()
        res.status(201).json({message:"Post Created Successfully", userId, postTitle, postContent})
    }
    catch(error){
        console.log(error)
        next(error);
    }
}

export const userPosts = async (req, res, next)=>{
    try{
        const userId= req.user.id;
        const getPosts = await Post.find({ userId })
        .sort({ createdAt: -1 }) // Sort by createdAt field in descending order (latest first)
        .limit(10) // Limit to 10 entries
        res.status(200).json(getPosts)
   }
    catch(error){
        console.log(error)
        next(error);
    }
}