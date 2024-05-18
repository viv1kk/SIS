import express from "express";
import { uploadPYQ, getPYQList } from "../controllers/pyq.controller.js"
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router()

router.post('/uploadFile', verifyToken, uploadPYQ)
router.post('/getPYQList', verifyToken, getPYQList)
// router.post('/getPostById', verifyToken, getPostById)


export default router