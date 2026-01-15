// import dotenv from "dotenv";
// dotenv.config();

// import app from "./src/app.js";

// const PORT = process.env.PORT || 5050;

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`🚀 Backend running on port ${PORT}`);
// });
import express from "express";

const app = express();

app.get("/health", (req, res) => {
  res.send("OK");
});

app.listen(5050, "127.0.0.1", () => {
  console.log("🚀 IPv4 ONLY server running on 127.0.0.1:5050");
});
