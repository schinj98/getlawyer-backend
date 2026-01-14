import db from "../../lib/db.js";

export async function publish(req, res) {
  try {
    const body = req.body;

    if (body.status === "DRAFT") {
      return res.json({ message: "Draft saved" });
    }

    await db.run(
      `
      INSERT INTO blogs (
        slug, title, description, content,
        tags, author, category,
        starRating, starTotalRating,
        likes, dateAdded, faqs
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        body.slug,
        body.title,
        body.description,
        body.content,
        JSON.stringify(body.tags || []),
        body.author || "Content Writer",
        body.category || "General",
        body.starRating || "0",
        body.starTotalRating || "5.0",
        body.likes || "0",
        new Date().toDateString(),
        JSON.stringify(body.faqs || []),
      ]
    );

    res.json({ message: "Blog published successfully 🚀" });
  } catch (err) {
    console.error("Publish error:", err);
    res.status(500).json({ message: "Publish failed" });
  }
}

export async function adminGetAllBlogs(req, res) {
  const blogs = await db.all(`
    SELECT id, title, slug, author, dateAdded
    FROM blogs
    ORDER BY id DESC
  `);

  res.json(blogs);
}
export async function adminDeleteBlog(req, res) {
  const { id } = req.params;

  await db.run(`DELETE FROM blogs WHERE id = ?`, [id]);

  res.json({ success: true, message: "Blog deleted" });
}
