import express from "express";
import { publish } from "../controllers/cms.controller.js";
import cmsAuth from "../middlewares/cmsAuth.js";

const router = express.Router();

// 🔥 THIS IS THE ROUTE YOUR FRONTEND IS HITTING
router.post("/cms/publish", cmsAuth, publish);

export default router;
