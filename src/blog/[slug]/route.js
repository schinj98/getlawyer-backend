import express from "express";
import db from "../../../lib/db.js";

const router = express.Router();

router.get("/:slug", async (req, res) => {
  try {
    const { rows } = await db.query(
      `
      SELECT
        id,
        slug,
        title,
        description,
        content,
        tags,
        author,
        category,
        star_rating AS "starRating",
        star_total_rating AS "starTotalRating",
        likes,
        date_added AS "dateAdded",
        faqs
      FROM blogs
      WHERE slug = $1
      LIMIT 1
      `,
      [req.params.slug]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const blog = rows[0];
    blog.tags = JSON.parse(blog.tags || "[]");
    blog.faqs = JSON.parse(blog.faqs || "[]");

    res.json(blog);
  } catch (err) {
    console.error("❌ BLOG SLUG ERROR:", err);
    res.status(500).json({ message: "Failed to fetch blog" });
  }
});

export default router;
