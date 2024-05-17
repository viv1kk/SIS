import express from "express";
import { getSubjectData, addSubjectData, deleteSubjectData } from "../controllers/data.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router()

router.post('/getSubjectData', verifyToken, getSubjectData)
router.post('/addSubjectData', verifyToken, addSubjectData)
router.post('/deleteSubjectData', verifyToken, deleteSubjectData)



export default router