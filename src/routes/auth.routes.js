import express from "express";
import { login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/cms/login", login);
router.post("/cms/logout", (req, res) => {
    res.clearCookie("cms_auth", {
      domain: ".getlawyer.me",
      path: "/",
    });
  
    res.clearCookie("cms_role", {
      domain: ".getlawyer.me",
      path: "/",
    });
  
    res.json({ success: true });
  });
  
export default router;
