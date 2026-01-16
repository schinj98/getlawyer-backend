import express from "express";
import cors from "cors";
import blogRoutes from "./routes/blog.routes.js";
import leadRoutes from "./routes/lead.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cmsRoutes from "./routes/cms.routes.js";

const app = express();

app.set("trust proxy", 1);

const allowedOrigins = [
  "http://localhost:3000",
  "https://www.getlawyer.me",
  "https://getlawyer.me",
];

/* -------------------- MANUAL CORS HANDLING -------------------- */
// This prevents duplicate headers by manually setting them
app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Check if origin is allowed
  if (!origin || allowedOrigins.includes(origin)) {
    // Only set if not already set (prevents duplicates)
    if (!res.getHeader('Access-Control-Allow-Origin')) {
      res.setHeader('Access-Control-Allow-Origin', origin || allowedOrigins[0]);
    }
    if (!res.getHeader('Access-Control-Allow-Credentials')) {
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    if (!res.getHeader('Access-Control-Allow-Methods')) {
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
    }
    if (!res.getHeader('Access-Control-Allow-Headers')) {
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }
  }

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  next();
});

/* -------------------- BODY PARSERS -------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------- ROUTES -------------------- */
app.use("/blog", blogRoutes);
app.use(leadRoutes);
app.use(authRoutes);
app.use("/cms", cmsRoutes);

export default app;