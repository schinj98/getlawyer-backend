import express from "express";
import cors from "cors";

import leadRoutes from "./routes/lead.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cmsRoutes from "./routes/cms.routes.js";

const app = express();

/**
 * ✅ CORS CONFIG (Express-safe, no wildcard crash)
 */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://getlawyer.me",
      "https://www.getlawyer.me",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/**
 * ⚠️ IMPORTANT
 * DO NOT use app.options("*", ...)
 * Express v5 + path-to-regexp crash hota hai
 */

app.use(express.json());

app.use(leadRoutes);
app.use(authRoutes);
app.use(cmsRoutes);


export default app;
