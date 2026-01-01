import db from "../../../lib/db.js";

export async function POST(req, res) {
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
        body.author,
        body.category,
        body.starRating,
        body.starTotalRating,
        body.likes,
        new Date().toDateString(),
        JSON.stringify(body.faqs || []),
      ]
    );

    res.json({ message: "Blog published successfully 🚀" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Publish failed" });
  }
}

