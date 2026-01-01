import express from "express";
import { publish } from "../controllers/cms.controller.js";

const router = express.Router();

router.post("/cms/publish", publish);

export default router;
