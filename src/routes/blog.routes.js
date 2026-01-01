import express from "express";
import listRouter from "../blog/list/route.js";
import slugRoutes from "../blog/[slug]/route.js";

const router = express.Router();

router.use("/list", listRouter);
router.use("/", slugRoutes);

export default router;
