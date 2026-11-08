// Minimal static server for the built site (no caching, correct MIME types).
// Usage: node scripts/serve.mjs [dir=site] [port=8080] [--reference]
// --reference swaps in the published scripts of 23 Oct 2026 (reference/published-2026-10-23/js) for before/after captures.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const root = normalize(args[0] || new URL('../site', import.meta.url).pathname);
const port = +(args[1] || 8080);
const refJs = process.argv.includes('--reference') ? normalize(new URL('../reference/published-2026-10-23/js', import.meta.url).pathname) : null;
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.ktx2': 'image/ktx2' };
createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let f = normalize(join(root, p));
    if (!f.startsWith(root)) throw new Error('outside');
    if (refJs && /^\/(en\/)?assets\/js\/(home\.js|chunks\/)/.test(p.replace(/^\/en\//, '/'))) f = join(refJs, p.replace(/^.*assets\/js\//, ''));
    if ((await stat(f)).isDirectory()) f = join(f, 'index.html');
    const body = await readFile(f);
    res.writeHead(200, { 'content-type': TYPES[extname(f)] || 'application/octet-stream', 'cache-control': 'no-store' });
    res.end(body);
  } catch { res.writeHead(404); res.end('not found'); }
}).listen(port, '127.0.0.1', () => console.log(`serving ${root} on http://127.0.0.1:${port}`));
