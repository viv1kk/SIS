import Subject from '../models/subject.model.js'


export const getSubjectData = async(req, res, next)=>{
  try{
      const subjectData = await Subject.find()        
      if(subjectData)
          res.status(200).json(subjectData);
      else
          return next(errorHandler(400, "Error, Server could't fetch subject data!"))
  }
  catch(error){
    return next(error)
  }
}

export const addSubjectData = async(req, res, next)=>{
  try{
      const {semester, subjectName, subjectCode} = req.body
      if(!semester || !subjectName || !subjectCode)  return next(errorHandler(401, "Invalid Request! Provide all details"))
      const newSubject = new Subject({semester, subjectName, subjectCode})
      await newSubject.save()
      res.status(200).json({message:"Subject added Successfully!"});
  }
  catch(error){
    return next(error)
  }
}

export const deleteSubjectData = async(req, res, next)=>{
  try{
      const {subjectCode} = req.body
      if(!subjectCode) return next(errorHandler(401, "Error, subjectCode not provided!"))
      const r = await Subject.deleteOne({subjectCode})        
      if(r && r.deletedCount > 0)
          res.status(201).json({message:"Subject Deleted Successfully!"});
      else
          return next(errorHandler(400, "Error, Server could't fetch subject data!"))
  }
  catch(error){
    return next(error)
  }
}