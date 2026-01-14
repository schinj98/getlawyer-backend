import pkg from "pg";
const { Pool } = pkg;

const {
  PG_HOST,
  PG_PORT,
  PG_DATABASE,
  PG_USER,
  PG_PASSWORD,
} = process.env;

// 🔥 HARD FAIL IF PASSWORD MISSING
if (!PG_PASSWORD || typeof PG_PASSWORD !== "string") {
  console.error("❌ PG_PASSWORD missing or invalid:", PG_PASSWORD);
  process.exit(1);
}

const pool = new Pool({
  host: PG_HOST,
  port: Number(PG_PORT),
  database: PG_DATABASE,
  user: PG_USER,
  password: String(PG_PASSWORD),
  ssl: false,
});

export default {
  query: (text, params) => pool.query(text, params),
};
