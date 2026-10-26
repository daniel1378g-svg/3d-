// Minimal static server for the exported site (supports Range requests and throttling for QA).
// Usage: node scripts/serve.mjs [port] [--slow=<ms per request>]
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve("out");
const port = Number(process.argv[2]) || 3000;
const slow = Number((process.argv.find((a) => a.startsWith("--slow=")) || "").split("=")[1] || 0);
const types = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif",
  ".mp4": "video/mp4", ".woff2": "font/woff2", ".txt": "text/plain", ".ico": "image/x-icon",
};

http
  .createServer((req, res) => {
    let p = decodeURIComponent(req.url.split("?")[0]);
    if (p.endsWith("/")) p += "index.html";
    let f = path.join(root, p);
    if (!f.startsWith(root)) return res.writeHead(403).end();
    if (!fs.existsSync(f) && fs.existsSync(f + ".html")) f += ".html";
    fs.stat(f, (err, st) => {
      if (err || !st.isFile()) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end(fs.existsSync(path.join(root, "404.html")) ? fs.readFileSync(path.join(root, "404.html")) : "Not found");
      }
      const send = () => {
        const type = types[path.extname(f)] || "application/octet-stream";
        const range = req.headers.range;
        if (range) {
          const [s, e] = range.replace("bytes=", "").split("-");
          const start = Number(s);
          const end = e ? Number(e) : st.size - 1;
          res.writeHead(206, { "Content-Range": `bytes ${start}-${end}/${st.size}`, "Accept-Ranges": "bytes", "Content-Length": end - start + 1, "Content-Type": type });
          fs.createReadStream(f, { start, end }).pipe(res);
        } else {
          res.writeHead(200, { "Content-Length": st.size, "Content-Type": type, "Accept-Ranges": "bytes" });
          fs.createReadStream(f).pipe(res);
        }
      };
      slow && /\.(webp|avif|jpg|png|mp4)$/.test(f) ? setTimeout(send, slow) : send();
    });
  })
  .listen(port, () => console.log(`http://localhost:${port}${slow ? ` (slow ${slow} ms)` : ""}`));
