import express from "express";
import {agentcontroller} from "../controller/agent.controller.js"

const router = express.Router()

router.post("/chat",agentcontroller)

export default router
