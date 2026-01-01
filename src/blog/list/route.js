import express from "express";
import db from "../../../lib/db.js";

const router = express.Router();

/**
 * GET /blog/list?limit=10&offset=0
 */
router.get("/", async (req, res) => {
  try {
    res.set("Cache-Control", "no-store"); // 🔥 ADD THIS

    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    const blogs = await db.all(
      `
      SELECT * FROM blogs
      ORDER BY id DESC
      LIMIT ? OFFSET ?
      `,
      [limit, offset]
    );

    const formatted = blogs.map(b => ({
      ...b,
      tags: JSON.parse(b.tags || "[]"),
      faqs: JSON.parse(b.faqs || "[]"),
    }));

    res.json({
      blogs: formatted,
      hasMore: blogs.length === limit,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
});
