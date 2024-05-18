import Notes from '../models/notes.model.js'
import { errorHandler } from '../utils/error.js';
import { generateUniqueFileName, s3Upload, generateS3DataUrl } from '../utils/utilityFunctions.js';


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

export const getNotesList = async (req, res, next)=>{
  try{
      const {subjectCode} = req.body

      if(!subjectCode) return next(errorHandler(401, "Invalid Request! Provide the Subject Code"))

      const getList = await Notes.find({subjectCode}) // implement a filter which filters out all the interview post from rest of the posts
      .sort({ updatedAt: -1 }) // Sort by createdAt field in descending order (latest first)
      // .limit(10) // Limit to 10 entries

      getList.forEach(item => {
        const link = generateS3DataUrl(item.fileLink, `${item.fileName}.${item.fileExt}`)
        item.fileLink = link;
        return item
      })
    
      console.log(getList)
      res.status(200).json(getList)
  }
  catch(error){
      console.log(error)
      next(error);
  }
}
