import express from "express";
import { getUserTimeline, getPeopleData } from "../controllers/feed.controller.js";

const router = express.Router()

router.post('/timeline', getUserTimeline)
router.post('/getPeopleData', getPeopleData)

export default router