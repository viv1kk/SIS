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

export const editPost = async (req, res, next)=>{
    try{
        const {postTitle, postContent, postId, userId } = req.body
        if(!postTitle || !postContent || !postId || !userId) return next(errorHandler(401, "Invalid Post! Please give Title and Description"))
            if(req.user.id !== userId) return next(errorHandler(401, "Unauthorized to edit this Post"))

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {
              $set: {
                postTitle,
                postContent
              },
            },
            { new: true }
          );
        res.status(201).json({message:"Post Created Successfully", updatedPost})
    }
    catch(error){
        console.log(error)
        next(error);
    }
}
export const deletePost = async (req, res, next)=>{
    try{
        const {postId, userId} = req.body
        // const {postTitle, postContent, userId=req.user.id } = req.body
        if(!postId || !userId) return next(errorHandler(401, "Error! Couldn'd delete the Post"))
        if(userId !== req.user.id) return next(errorHandler(401, "Unauthorized to delete this Post!"))
                    
        const r = await Post.deleteOne({ _id: postId }); // returns {deletedCount: 1}

        if(r && r.deletedCount > 0){
            res.status(201).json({message:"Post Deleted Successfully!"})
        }
        else{
            next()
        }
    }
    catch(error){
        console.log(error)
        next(error);
    }
}


export const userPosts = async (req, res, next)=>{
    try{
        const userId= req.body.userId;
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