import db from "../../../lib/db.js";

export async function GET(req, res) {
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
}
