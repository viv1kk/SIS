import express from "express";
import { updateProfile, getUserData } from "../controllers/profile.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router()

router.post('/update', verifyToken, updateProfile)
router.post('/getUserData', verifyToken, getUserData)
// router.post('profile/:id', verifyToken, getUserProfile)


export default router