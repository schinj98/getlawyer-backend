import express from "express";
import db from "../../../lib/db.js";

const router = express.Router();

router.get("/:slug", async (req, res) => {
  const { rows } = await db.query(
    "SELECT * FROM blogs WHERE slug = $1",
    [req.params.slug]
  );

  if (!rows.length) {
    return res.status(404).json({ message: "Blog not found" });
  }

  const blog = rows[0];
  blog.tags = JSON.parse(blog.tags || "[]");
  blog.faqs = JSON.parse(blog.faqs || "[]");

  res.json(blog);
});

export default router;
