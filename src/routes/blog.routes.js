import express from "express";
import listRoutes from "../blog/list/route.js";
import slugRoutes from "../blog/[slug]/route.js";

const router = express.Router();

router.use("/list", listRoutes);
router.use("/", slugRoutes);

export default router;
