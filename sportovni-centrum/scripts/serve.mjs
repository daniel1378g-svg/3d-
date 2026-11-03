// Local preview of dist/ with the production URL scheme: each rebuilt page answers at its original
// URL (src/routes.mjs), the trailing-slash variant redirects, "/" redirects to the first page.
// Only the rebuilt page exists here – every other destination links to the live website.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { pages } from "../src/routes.mjs";

const root = fileURLToPath(new URL("../dist/", import.meta.url));
const port = Number(process.env.PORT ?? 4310);
const routes = new Map(pages.map((p) => [p.path, p.file]));
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp",
  ".avif": "image/avif", ".ico": "image/vnd.microsoft.icon", ".woff2": "font/woff2", ".txt": "text/plain; charset=utf-8" };
const send = (res, code, body, headers = {}) => { res.writeHead(code, { "content-type": "text/plain; charset=utf-8", ...headers }); res.end(body); };

const server = createServer(async (req, res) => {
  let path;
  try { path = decodeURIComponent(new URL(req.url, "http://localhost").pathname); }
  catch { return send(res, 400, "Neplatná adresa."); }
  path = "/" + path.replace(/^\/+/, ""); // collapse leading slashes: redirects stay on this host
  if (path === "/") return send(res, 302, "", { location: pages[0].path });
  if (path.length > 1 && path.endsWith("/") && routes.has(path.slice(0, -1))) return send(res, 301, "", { location: path.slice(0, -1) });
  const rel = routes.get(path) ?? path.slice(1);
  const file = normalize(join(root, rel));
  if (!file.startsWith(root) || file.endsWith(sep)) return send(res, 404, "Stránka nenalezena.");
  try {
    if (!(await stat(file)).isFile()) throw new Error();
    const body = await readFile(file);
    send(res, 200, body, { "content-type": types[extname(file)] ?? "application/octet-stream", "cache-control": "no-cache" });
  } catch {
    send(res, 404, "Stránka nenalezena – v tomto náhledu je přestavěna pouze Atletická přípravka.");
  }
});
server.on("error", (err) => { console.error(`serve: ${err.message}`); process.exit(1); });
server.listen(port, () => console.log(`http://localhost:${server.address().port}${pages[0].path}`));
