import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;


if (!process.env.PG_PASSWORD) {
  throw new Error("❌ PG_PASSWORD missing or invalid");
}
// 🔥 HARD FAIL IF PASSWORD MISSING
if (!PG_PASSWORD || typeof PG_PASSWORD !== "string") {
  console.error("❌ PG_PASSWORD missing or invalid:", PG_PASSWORD);
  process.exit(1);
}

const pool = new Pool({
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: String(process.env.PG_PASSWORD),
  ssl: false,
});

export default {
  query: (text, params) => pool.query(text, params),
};
