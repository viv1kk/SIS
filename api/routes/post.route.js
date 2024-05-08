import express from "express";
import { createPost, timelinePosts } from "../controllers/post.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router()

router.post('/createPost', verifyToken, createPost)
router.post('/timelinePosts', verifyToken, timelinePosts)

export default router