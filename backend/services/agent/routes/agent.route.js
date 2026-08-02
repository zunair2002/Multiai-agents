// d:\python projects\MultiAgent\backend\services\agent\routes\agent.route.js

import express from "express";
import { agentcontroller } from "../controller/agent.controller.js";
// Yahan 'upload' naam se default export import ho raha hai
import upload from "../config/multer.js";

const router = express.Router();

// Aur yahan 'upload' object seedha istemal ho raha hai
router.post("/chat", upload.single("file"), agentcontroller);

export default router;