import express from "express";

import blogRoutes from "./routes/blog.routes.js";
import leadRoutes from "./routes/lead.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cmsRoutes from "./routes/cms.routes.js";


const app = express();
app.set("trust proxy", 1);



/* -------------------- BODY PARSERS -------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* -------------------- ROUTES -------------------- */
app.use("/blog", blogRoutes);
app.use(leadRoutes);
app.use(authRoutes);
app.use(cmsRoutes);

export default app;
