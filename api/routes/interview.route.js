import express from "express";
import {getInterviewPostList, getPostById} from "../controllers/interview.controller.js"
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router()

router.post('/getInterviewPostList', verifyToken, getInterviewPostList)
router.post('/getPostById', verifyToken, getPostById)


export default router