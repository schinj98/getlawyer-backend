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
export async function adminGetBlogById(req, res) {
  const { id } = req.params;

  const blog = await db.get(
    `SELECT * FROM blogs WHERE id = ?`,
    [id]
  );

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  // JSON fields parse
  blog.tags = JSON.parse(blog.tags || "[]");
  blog.faqs = JSON.parse(blog.faqs || "[]");

  res.json(blog);
}

export async function adminUpdateBlog(req, res) {
  const { id } = req.params;
  const body = req.body;

  await db.run(
    `
    UPDATE blogs SET
      slug = ?,
      title = ?,
      description = ?,
      content = ?,
      tags = ?,
      author = ?,
      category = ?,
      starRating = ?,
      starTotalRating = ?,
      likes = ?,
      faqs = ?
    WHERE id = ?
    `,
    [
      body.slug,
      body.title,
      body.description,
      body.content,
      JSON.stringify(body.tags || []),
      body.author,
      body.category,
      body.starRating,
      body.starTotalRating,
      body.likes,
      JSON.stringify(body.faqs || []),
      id,
    ]
  );

  res.json({ success: true, message: "Blog updated successfully ✨" });
}
