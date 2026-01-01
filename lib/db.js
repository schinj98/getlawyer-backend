import sqlite3 from "sqlite3";
import { open } from "sqlite";

const db = await open({
  filename: "./data/blog.db",
  driver: sqlite3.Database,
});

await db.exec(`
  CREATE TABLE IF NOT EXISTS blogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE,
    title TEXT,
    description TEXT,
    content TEXT,
    tags TEXT,
    author TEXT,
    category TEXT,
    starRating TEXT,
    starTotalRating TEXT,
    likes TEXT,
    dateAdded TEXT,
    faqs TEXT
  )
`);

export default db;

