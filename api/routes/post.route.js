import express from "express";
import { createPost, userPosts, editPost, deletePost } from "../controllers/post.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router()

router.post('/createPost', verifyToken, createPost)
router.post('/editPost', verifyToken, editPost)
router.post('/deletePost', verifyToken, deletePost)
router.post('/userPosts', verifyToken, userPosts)

export default router