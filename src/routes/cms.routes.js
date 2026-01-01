import express from "express";
import { publish } from "../controllers/cms.controller.js";
import { cmsAuth } from "../middlewares/cmsAuth.js";


const router = express.Router();

router.post("/cms/publish", cmsAuth, publish);

export default router;
