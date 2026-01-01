import express from "express";
import list from "../blog/list/route.js";
import single from "../blog/[slug]/route.js";

const router = express.Router();

router.get("/list", list.GET);
router.get("/:slug", single.GET);

export default router;
