import express from "express";
import { publish } from "../controllers/cms.controller.js";
import { cmsAuth, adminOnly } from "../middlewares/cmsAuth.js";
import {
    adminGetAllBlogs,
    adminDeleteBlog
  } from "../controllers/cms.controller.js";

const router = express.Router();

// 🔥 THIS IS THE ROUTE YOUR FRONTEND IS HITTING
router.post("/cms/publish", cmsAuth, publish);
router.get(
    "/admin/blogs",
    cmsAuth,
    adminOnly,
    adminGetAllBlogs
  );
  
  router.delete(
    "/admin/blog/:id",
    cmsAuth,
    adminOnly,
    adminDeleteBlog
  );

export default router;
