import Notes from '../models/notes.model.js'
import { generateUniqueFileName, splitAndTrim, s3Upload, generateS3ImageUrl } from '../utils/utilityFunctions.js';


export const uploadNotes = async(req, res, next)=>{
    try{
      const{fileData, fileDescription, fileType,  fileName, fileExt, subjectCode} = req.body
      if(!fileData || !fileName  || !subjectCode || !fileExt) return next(errorHandler(401, "Invalid Request! Provide all details"))
        
        const name = generateUniqueFileName(fileExt)
        let buf = Buffer.from(req.body.fileData.replace(`data:${fileType};base64,`, ""),'base64')
        s3Upload(buf, `notes/${name}`, req.body.fileType)
        
        const newDoc = new Notes({subjectCode, fileName, fileExt, fileDescription, fileType, fileLink : `notes/${name}`})
        await newDoc.save()
        
        res.status(201).json({message:"File Uploaded Successfully!"});
    }
    catch(error){
      return next(error)
    }
  }