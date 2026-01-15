import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;

if (!process.env.PG_PASSWORD) {
  console.error("❌ PG_PASSWORD missing");
  process.exit(1);
}

const pool = new Pool({
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD, // ✅ ONLY THIS
  ssl: false,
  connectionTimeoutMillis: 5000,
});

export default {
  query: (text, params) => pool.query(text, params),
};
