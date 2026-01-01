import express from "express";
import db from "../../../lib/db.js";

const router = express.Router();

router.get("/:slug", async (req, res) => {
  try {
    const blog = await db.get(
      "SELECT * FROM blogs WHERE slug = ?",
      [req.params.slug]
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.tags = JSON.parse(blog.tags || "[]");
    blog.faqs = JSON.parse(blog.faqs || "[]");

    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch blog" });
  }
});

export default router;
