import mongoose from "mongoose";

const pyqSchema = new mongoose.Schema({
    subjectCode : {
        type:String,
        required:true,
    },
    fileLink : {
        type:String,
        required:true,
    },
    fileName : {
        type:String,
        required:true,
    },
    fileExt : {
        type:String,
        required : true
    },
    examYear : {
        type:String,
        required : true
    },
    examType :{
        type: String,
        required : true
    },
    fileType : {
        type:String,
        required:true,
    }
}, {timestamps: true})


const PYQ = mongoose.model('PYQ', pyqSchema);

export default PYQ;