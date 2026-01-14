import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { blogPosts as blogs } from "./blogData.js";

async function importBlogs() {
  const db = await open({
    filename: "./data/blog.db",
    driver: sqlite3.Database,
  });

  console.log(`📦 Found ${blogs.length} blogs to import`);

  for (const blog of blogs) {
    try {
      await db.run(
        `
        INSERT INTO blogs (
          slug,
          title,
          description,
          content,
          tags,
          author,
          category,
          starRating,
          starTotalRating,
          likes,
          dateAdded,
          faqs
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          blog.slug,
          blog.title,
          blog.description,
          blog.content,
          JSON.stringify(blog.tags || []),
          blog.author || "Content Writer",
          blog.category || "General",
          blog.starRating || "0",
          blog.starTotalRating || "5.0",
          blog.likes || "0",
          blog.dateAdded || new Date().toDateString(),
          JSON.stringify(blog.faqs || []),
        ]
      );
  
      console.log(`✅ Imported: ${blog.slug}`);
    } catch (err) {
      if (err.code === "SQLITE_CONSTRAINT") {
        console.warn(`⚠️ Skipped duplicate slug: ${blog.slug}`);
      } else {
        throw err;
      }
    }
  }
  

  console.log("🎉 All blogs imported successfully");
  process.exit(0);
}

importBlogs().catch((err) => {
  console.error("❌ Import failed:", err);
  process.exit(1);
});
