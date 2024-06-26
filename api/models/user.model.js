import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type:String,
        required:true,
        unique:true
    },
    fullName : {
        type:String,
        required: true,
    },
    password : {
        type:String,
        required:true,
    },
    profilePicture :{
        type : String,
        default : "",
    },
    semester : {
        type : Number,
        default : null
    },
    tags : {
        type : [String],
        default : []
    },
    linkedin : {
        type : String,
        default : null
    }
}, {timestamps: true})

userSchema.index({email:'text', fullName:'text', tags:'text'})

const User = mongoose.model('User', userSchema);

export default User;