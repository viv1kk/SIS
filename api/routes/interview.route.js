import express from "express";
import {getInterviewPostList} from "../controllers/interview.controller.js"

const router = express.Router()

router.post('/getInterviewPostList', getInterviewPostList)


export default router