import PYQ from '../models/pyq.model.js'
import { errorHandler } from '../utils/error.js';
import { generateUniqueFileName, s3Upload, generateS3DataUrl } from '../utils/utilityFunctions.js';


export const uploadPYQ = async(req, res, next)=>{
  try{
    const{fileData, examType, fileType,  fileName, fileExt, subjectCode, year} = req.body
    if(!fileData || !fileName  || !subjectCode || !fileExt || !examType || !fileType || !year) return next(errorHandler(401, "Invalid Request! Provide all details"))
      
      const name = generateUniqueFileName(fileExt)
      let buf = Buffer.from(req.body.fileData.replace(`data:${fileType};base64,`, ""),'base64')
      s3Upload(buf, `pyq/${year}/${examType}/${name}`, req.body.fileType)
      
      const newDoc = new PYQ({subjectCode, fileName, examType, fileExt, fileType, examYear: year, fileLink : `pyq/${year}/${examType}/${name}`})
      await newDoc.save()
      
      res.status(201).json({message:"File Uploaded Successfully!"});
  }
  catch(error){
    return next(error)
  }
}

export const getPYQList = async (req, res, next)=>{
  try{
      const {subjectCode, examType} = req.body

      if(!subjectCode || !examType) return next(errorHandler(401, "Invalid Request! Provide all the details"))

      const getList = await PYQ.find({subjectCode, examType}) // implement a filter which filters out all the interview post from rest of the posts
      .sort({ examYear: -1 }) // Sort by createdAt field in descending order (latest first)
      // .limit(10) // Limit to 10 entries

      getList.forEach(item => {
        const link = generateS3DataUrl(item.fileLink, `${item.fileName}.${item.fileExt}`, item.fileType)
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
