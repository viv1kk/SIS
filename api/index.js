import express from "express";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js"
import profileRoutes from "./routes/profile.route.js"
import postRoutes from "./routes/post.route.js"
import path from 'path'
import cors from 'cors'

dotenv.config()
const app = express()

const _dirname = path.dirname("")
const buildPath = path.join(_dirname, "./client/dist")
console.log(buildPath)
app.use(express.static(buildPath))
app.use(cors({
    origin:"*"
}))

app.get("*", function(req, res){
    res.sendFile(
        path.join(_dirname, "../client/dist/index.html"),
        function(err){
            if(err){
                res.status(500).send(err);
            }
        }
    )
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server listening on ${process.env.PORT}`)
})

mongoose.connect(process.env.MONGO_CONN)
.then(()=> console.log('Connected to MongoDB'))
.catch((err)=> console.log(err))


app.use(express.json({limit:'50mb'}))
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/post', postRoutes)

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    return res.status(statusCode).json({
        success:false,
        error:message,
        statusCode
    })
})