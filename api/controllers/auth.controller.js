import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'
import { generateS3ImageUrl } from '../utils/utilityFunctions.js'


export const signup = async(req, res, next)=>{
    const {email, fullName, password, confirmPassword } = req.body
    try{
        if(!email || !fullName || !password || password !== confirmPassword) return next(errorHandler(401, "Invaid User Data"))
        const hashedPassword = bcryptjs.hashSync(password, 10)
        const newUser = new User({ email, fullName, password: hashedPassword })
        await newUser.save()
        res.status(201).json({message : "User created successfully."})
    }
    catch(error){
        // next(errorHandler(500, error.message))
        next(error)
    }
}

export const signin = async(req, res, next)=>{
    const { email, password } = req.body
    try{
        if(!email || !password)return next(errorHandler(401, "Wrong credentials"))
        const validUser = await User.findOne({email})
        if(!validUser) return next(errorHandler(404, 'User not found'))
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword) return next(errorHandler(401, 'Wrong credentials'))
        const token = jwt.sign({ id : validUser._id}, process.env.JWT_SECRET)
        const {password:hashedPassword, ...rest} = validUser._doc
        if(rest.profilePicture && rest.profilePicture !== ""){
            rest.profilePicture = generateS3ImageUrl(rest.profilePicture)
        }
        res.cookie('access_token', token, {httpOnly:true, expires: new Date(Date.now()+86400000)}).status(200).json(rest)
    }
    catch(error){
        // next(errorHandler(500, error.message))
        next(error)
    }
}

export const signout = (req, res, next)=>{
    res.clearCookie('access_token').status(200).json("Signout Success")
}