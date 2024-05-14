import express from "express";
import { getUserTimeline, getPeopleData, search } from "../controllers/feed.controller.js";

const router = express.Router()

router.post('/timeline', getUserTimeline)
router.post('/getPeopleData', getPeopleData)
router.post('/search', search)

export default router