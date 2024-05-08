import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js'
import { generateUniqueFileName, splitAndTrim, s3ImageUpload, generateS3ImageUrl } from '../utils/utilityFunctions.js';

export const updateProfile = async(req, res, next)=>{
      try {
        // if (req.body.password) {
        //   req.body.password = bcryptjs.hashSync(req.body.password, 10);
        // }

        // IF THE USER UPDATED THE PROFILE PICTURE THEN UPLOAD IT TO S3 AND STORE THE FILE NAME IN THE DB

        if(req.body.profilePicture){
            const uplaodPFP = ()=>{
              const pfpname = generateUniqueFileName('jpeg')
              let buf = Buffer.from(req.body.profilePicture.replace(/^data:image\/\w+;base64,/, ""),'base64')
              s3ImageUpload(buf, `profilePictures/${pfpname}`)
              return pfpname
            }
            console.log("profile picture uploading")
            req.body.profilePicture = uplaodPFP()
        }

        if(req.body.tags){
          req.body.tags = splitAndTrim(req.body.tags);
        }

        // console.log(req.body)
        const updatedUser = await User.findByIdAndUpdate(
          req.user.id,
          {
            $set: {
              fullName : req.body.fullName,
              profilePicture: req.body.profilePicture,
              semester : req.body.semester,
              tags : req.body.tags
            },
          },
          { new: true }
        );
        // console.log(updatedUser)
        
        // generate URL for profile Picture

        const { password, ...rest } = updatedUser._doc;
        if(rest.profilePicture && rest.profilePicture !== ""){
          rest.profilePicture = generateS3ImageUrl(rest.profilePicture)
        }
        res.status(200).json(rest);
      } catch (error) {
        console.log(error)
        next(error);
      }
}

export const getUserData = async(req, res, next)=>{
  try{
    if(!req.body.userId) return next(errorHandler(401, "Invalid Request! Please provide the userId"))
      const user = await User.findOne({_id : req.body.userId})
      if(user){
        const {password , ...rest} = user._doc
        if(rest.profilePicture && rest.profilePicture !== ""){
          rest.profilePicture = generateS3ImageUrl(rest.profilePicture)
        }
        res.status(200).json(rest);
      }
  }
  catch(error){
    next(error)
  }
}