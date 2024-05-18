import express from "express";
import { uploadNotes } from "../controllers/notes.controller.js"
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router()

router.post('/uploadFile', verifyToken, uploadNotes)
// router.post('/getPostById', verifyToken, getPostById)


export default router