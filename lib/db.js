import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;

console.log("🔌 PG CONFIG:", {
  host: process.env.PG_HOST,
  db: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  hasPassword: !!process.env.PG_PASSWORD,
});

const pool = new Pool({
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  ssl: false,

  connectionTimeoutMillis: 3000, // 🔥 CRITICAL
  idleTimeoutMillis: 10000,
  max: 5,
});

pool.on("connect", () => {
  console.log("✅ PostgreSQL connected");
});

pool.on("error", (err) => {
  console.error("❌ PG POOL ERROR:", err);
});

export default {
  query: (text, params) => pool.query(text, params),
};
