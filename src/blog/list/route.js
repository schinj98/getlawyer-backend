import express from "express";
import db from "../../../lib/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  const { rows } = await db.query(
    `
    SELECT * FROM blogs
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
});

export default router;
