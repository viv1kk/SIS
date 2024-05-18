import express from "express";
import { uploadNotes, getNotesList } from "../controllers/notes.controller.js"
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router()

router.post('/uploadFile', verifyToken, uploadNotes)
router.post('/getNotesList', verifyToken, getNotesList)
// router.post('/getPostById', verifyToken, getPostById)


export default router