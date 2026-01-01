import express from "express";
import { submitLead } from "../controllers/lead.controller.js";

const router = express.Router();

router.post("/lead", submitLead);

export default router;
