import Post from "../models/post.model.js"
import {ObjectId} from 'mongoose'

export const getInterviewPostList = async (req, res, next)=>{
    try{
        const getPosts = await Post.find() // implement a filter which filters out all the interview post from rest of the posts
        .sort({ updatedAt: -1 }) // Sort by createdAt field in descending order (latest first)
        .limit(10) // Limit to 10 entries
        res.status(200).json(getPosts)
   }
    catch(error){
        console.log(error)
        next(error);
    }
}


export const getPostById = async (req, res, next)=>{
    try{
        const getPosts = await Post.findById(req.body.postId)
        res.status(200).json(getPosts)
   }
    catch(error){
        console.log(error)
        next(error);
    }
}