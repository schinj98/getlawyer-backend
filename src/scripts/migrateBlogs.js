import db from "../lib/db.js";
import { blogPosts } from "../legacy/blogData.js";

async function migrate() {
  console.log("🚀 Starting blog migration...");

  let inserted = 0;
  let skipped = 0;

  for (const post of blogPosts) {
    try {
      await db.run(
        `
        INSERT INTO blogs (
          slug, title, description, content,
          tags, author, category,
          starRating, starTotalRating,
          likes, dateAdded, faqs
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          post.slug,
          post.title,
          post.description || "",
          post.content,
          JSON.stringify(post.tags || []),
          post.author || "Admin",
          post.category || "General",
          post.starRating || "0",
          post.starTotalRating || "5.0",
          post.likes || "0",
          post.dateAdded || new Date().toDateString(),
          JSON.stringify(post.faqs || []),
        ]
      );

      inserted++;
    } catch (err) {
      if (err.message.includes("UNIQUE")) {
        skipped++;
      } else {
        console.error("❌ Error inserting:", post.slug, err.message);
      }
    }
  }

  console.log(`✅ Migration done`);
  console.log(`➕ Inserted: ${inserted}`);
  console.log(`⏭️ Skipped (duplicates): ${skipped}`);

  process.exit(0);
}

migrate();
