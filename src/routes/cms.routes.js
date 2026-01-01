import express from "express";
import * as publish from "../cms/publish/route.js";
import cmsAuth from "../middlewares/cmsAuth.js";

const router = express.Router();

router.post("/publish", cmsAuth, publish.POST);

export default router;
