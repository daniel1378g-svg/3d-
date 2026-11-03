// Local preview of dist/ that behaves like the production URL scheme:
// /krouzky/atleticka-pripravka is served without a trailing slash, "/" redirects to it
// (only this page is rebuilt; every other destination links to the live website).
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = new URL("../dist/", import.meta.url).pathname;
const port = Number(process.env.PORT ?? 4310);
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp",
  ".avif": "image/avif", ".ico": "image/vnd.microsoft.icon", ".woff2": "font/woff2", ".txt": "text/plain; charset=utf-8" };

createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  let path = decodeURIComponent(url.pathname);
  if (path === "/") { res.writeHead(302, { location: "/krouzky/atleticka-pripravka" }); return res.end(); }
  if (path.endsWith("/") && path !== "/") { res.writeHead(301, { location: path.slice(0, -1) }); return res.end(); }
  let file = normalize(join(root, path));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
  try { if ((await stat(file)).isDirectory()) file = join(file, "index.html"); } catch {}
  try {
    const body = await readFile(file);
    res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream", "cache-control": "no-cache" });
    res.end(body);
  } catch {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Stránka nenalezena – v tomto náhledu je přestavěna pouze Atletická přípravka.");
  }
}).listen(port, () => console.log(`http://localhost:${port}/krouzky/atleticka-pripravka`));
