import Post from "../models/post.model.js"
import User from "../models/user.model.js"
import { generateS3ImageUrl } from '../utils/utilityFunctions.js'


export const getUserTimeline = async (req, res, next)=>{
    try{
        const timelinePosts = await Post.find() // implement a filter which filters out all the interview post from rest of the posts
        .sort({ createdAt: -1 }) // Sort by createdAt field in descending order (latest first)
        .limit(10) // Limit to 10 entries
        res.status(200).json(timelinePosts)
   }
    catch(error){
        console.log(error)
        next(error);
    }
}

export const getPeopleData = async (req, res, next)=>{
    try{
        let people = await User.find({},'fullName email profilePicture') // implement a filter which filters out all the interview post from rest of the posts
        .sort({ createdAt: -1 }) 
  
        people.forEach(rest => {
            if(rest.profilePicture && rest.profilePicture !== ""){
                rest.profilePicture = generateS3ImageUrl(rest.profilePicture)
            }
        });
        
        // Sort by createdAt field in descending order (latest first)
        // .limit(10) Limit to 10 entries
        res.status(200).json(people)
   }
    catch(error){
        console.log(error)
        next(error);
    }
}

export const search = async (req, res, next)=>{
    try{
        let people = await User.find({$text : {$search : req.body.search}},'fullName email profilePicture') // implement a filter which filters out all the interview post from rest of the posts
        .sort({ createdAt: -1 }) 
  
        people.forEach(rest => {
            if(rest.profilePicture && rest.profilePicture !== ""){
                rest.profilePicture = generateS3ImageUrl(rest.profilePicture)
            }
        });

        let post = await Post.find({$text : {$search : req.body.search}})
        .sort({updatedAt: -1})
        
        // Sort by createdAt field in descending order (latest first)
        // .limit(10) Limit to 10 entries
        res.status(200).json({people , post})
   }
    catch(error){
        console.log(error)
        next(error);
    }
}