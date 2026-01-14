import express from "express";
import { publish, adminGetAllBlogs, adminDeleteBlog ,
    adminGetBlogById,
    adminUpdateBlog} from "../controllers/cms.controller.js";
import { cmsAuth, adminOnly } from "../middlewares/cmsAuth.js";

const router = express.Router();

// ✅ POST /cms/publish
router.post("/publish", cmsAuth, publish);

// ✅ GET /cms/admin/blogs
router.get(
  "/admin/blogs",
  cmsAuth,
  adminOnly,
  adminGetAllBlogs
);

// ✅ DELETE /cms/admin/blog/:id
router.delete(
  "/admin/blog/:id",
  cmsAuth,
  adminOnly,
  adminDeleteBlog
);
router.get(
    "/admin/blog/:id",
    cmsAuth,
    adminOnly,
    adminGetBlogById
);

router.put(
    "/admin/blog/:id",
    cmsAuth,
    adminOnly,
    adminUpdateBlog
);
export default router;
