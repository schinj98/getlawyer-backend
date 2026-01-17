import db from "../../lib/db.js";

/* ---------------- PUBLISH ---------------- */
export async function publish(req, res) {
  try {
    const body = req.body;

    if (body.status === "DRAFT") {
      return res.json({ message: "Draft saved" });
    }

    await db.query(
      `
      INSERT INTO blogs (
        slug, title, description, content,
        tags, author, category,
        star_rating, star_total_rating,
        likes, date_added, faqs
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
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

/* ---------------- ADMIN LIST ---------------- */
export async function adminGetAllBlogs(req, res) {
  const { rows } = await db.query(`
    SELECT 
      id,
      title,
      slug,
      author,
      category,
      date_added AS "dateAdded"
    FROM blogs
    ORDER BY id DESC
  `);

  res.json(rows);
}








/* ---------------- DELETE (BLOCKED) ---------------- */
export async function adminDeleteBlog(req, res) {
  console.error("🚨 DELETE ATTEMPT BLOCKED", req.params.id);
  return res.status(403).json({
    success: false,
    message: "Delete is disabled in production",
  });
}

/* ---------------- GET BY ID ---------------- */
export async function adminGetBlogById(req, res) {
  const { rows } = await db.query(
    `SELECT * FROM blogs WHERE id = $1`,
    [req.params.id]
  );

  if (!rows.length) {
    return res.status(404).json({ message: "Blog not found" });
  }

  const blog = rows[0];
  blog.tags = JSON.parse(blog.tags || "[]");
  blog.faqs = JSON.parse(blog.faqs || "[]");

  res.json(blog);
}

/* ---------------- UPDATE ---------------- */
export async function adminUpdateBlog(req, res) {
  const body = req.body;

  await db.query(
    `
    UPDATE blogs SET
      slug=$1,
      title=$2,
      description=$3,
      content=$4,
      tags=$5,
      author=$6,
      category=$7,
      star_rating=$8,
      star_total_rating=$9,
      likes=$10,
      faqs=$11
    WHERE id=$12
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
      req.params.id,
    ]
  );

  res.json({ success: true, message: "Blog updated successfully ✨" });
}
