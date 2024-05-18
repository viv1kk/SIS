import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
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
        type:String
    },
    fileDescription : {
        type:String,
    },
    fileType : {
        type:String,
        required:true,
    }
}, {timestamps: true})


const Notes = mongoose.model('Notes', notesSchema);

export default Notes;