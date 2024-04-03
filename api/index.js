import express from "express";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js"

dotenv.config()
const app = express()

app.listen(process.env.PORT, ()=>{
    console.log(`Server listening on ${process.env.PORT}`)
})

mongoose.connect(process.env.MONGO_CONN)
.then(()=> console.log('Connected to MongoDB'))
.catch((err)=> console.log(err))


app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    return res.status(statusCode).json({
        success:false,
        error:message,
        statusCode
    })
})