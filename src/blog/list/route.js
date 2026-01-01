import express from "express";
import db from "../../../lib/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const blogs = await db.all(`
      SELECT * FROM blogs
      ORDER BY id DESC
    `);

    const formatted = blogs.map(b => ({
      ...b,
      tags: JSON.parse(b.tags || "[]"),
      faqs: JSON.parse(b.faqs || "[]"),
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
});

export default router;
