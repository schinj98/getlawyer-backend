import express from "express";
import db from "../../../lib/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

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
        star_rating   AS "starRating",
        star_total_rating AS "starTotalRating",
        likes,
        date_added AS "dateAdded",
        faqs
      FROM blogs
      ORDER BY id DESC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset]
    );

    res.json({
      blogs: rows.map(b => ({
        ...b,
        tags: JSON.parse(b.tags || "[]"),
        faqs: JSON.parse(b.faqs || "[]"),
      })),
      hasMore: rows.length === limit,
    });
  } catch (err) {
    console.error("❌ BLOG LIST ERROR:", err);
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
});

// GET /blogs/latest
router.get("/latest", async (req, res) => {
  try {
    const { rows } = await db.query(`
      SELECT 
        id,
        slug,
        title,
        description,
        author,
        category,
        date_added AS "dateAdded"
      FROM blogs
      ORDER BY date_added DESC
      LIMIT 3
    `);

    res.json(rows);
  } catch (err) {
    console.error("❌ LATEST BLOGS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch latest blogs" });
  }
});


export default router;
