import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    semester : {
        type:Number,
        required:true,
    },
    subjectName : {
        type:String,
        required: true,
    },
    subjectCode : {
        type:String,
        required:true,
        unique:true
    },
}, {timestamps: true})

const Subject = mongoose.model('Subject', subjectSchema);

export default Subject;