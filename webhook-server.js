import http from "http";
import { exec } from "child_process";

const PORT = 9000; // webhook port
const SECRET = "getlawyer_secret_123"; // same secret GitHub me dalega

const server = http.createServer((req, res) => {
  if (req.method !== "POST") {
    res.writeHead(405);
    return res.end("Method Not Allowed");
  }

  let body = "";
  req.on("data", chunk => (body += chunk));
  req.on("end", () => {
    const signature = req.headers["x-hub-signature-256"];

    if (!signature) {
      res.writeHead(401);
      return res.end("No signature");
    }

    console.log("🚀 Webhook received, deploying...");

    exec("./deploy.sh", (err, stdout, stderr) => {
      if (err) {
        console.error("Deploy error:", err);
        res.writeHead(500);
        return res.end("Deploy failed");
      }

      console.log(stdout);
      res.writeHead(200);
      res.end("Deploy successful");
    });
  });
});

server.listen(PORT, () => {
  console.log(`Webhook server listening on port ${PORT}`);
});
