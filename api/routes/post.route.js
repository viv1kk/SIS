import express from "express";
import { createPost, userPosts } from "../controllers/post.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router()

router.post('/createPost', verifyToken, createPost)
router.post('/userPosts', verifyToken, userPosts)

export default router