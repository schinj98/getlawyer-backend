import express from "express";
import cors from "cors";

import blogRoutes from "./routes/blog.routes.js";
import leadRoutes from "./routes/lead.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cmsRoutes from "./routes/cms.routes.js";

const app = express();

/* -------------------- PUBLIC CORS (BLOGS) -------------------- */
app.use(
  "/blog",
  cors({
    origin: "*",              // 🔓 public
    methods: ["GET"],
  })
);

/* -------------------- PRIVATE CORS (CMS / AUTH) -------------------- */
const privateCors = cors({
  origin: [
    "http://localhost:3000",
    "https://getlawyer.me",
    "https://www.getlawyer.me",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

/* -------------------- BODY PARSERS -------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------- ROUTES -------------------- */
app.use("/blog", blogRoutes);        // 🔓 public
app.use("/auth", privateCors, authRoutes);
app.use("/cms", privateCors, cmsRoutes);
app.use(privateCors, leadRoutes);    // form submit etc

export default app;
