import db from "../../lib/db.js";

export async function GET(req, res) {
  const { slug } = req.params;

  const blog = await db.get(
    "SELECT * FROM blogs WHERE slug = ?",
    [slug]
  );

  if (!blog) {
    return res.status(404).json({ message: "Not found" });
  }

  blog.tags = JSON.parse(blog.tags || "[]");
  blog.faqs = JSON.parse(blog.faqs || "[]");

  res.json(blog);
}
