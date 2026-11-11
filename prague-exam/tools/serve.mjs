// Static server for the built game and the dev pages.
//
//   node tools/serve.mjs [port]      http://127.0.0.1:4173/        -> dist/site/
//                                    http://127.0.0.1:4173/dev/... -> dev/ (test pages)
//                                    /src/..., /data/...           -> source modules and raw packs
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { ROOT } from './lib/packio.mjs';

const port = Number(process.argv[2]) || 4173;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml',
  '.pack': 'application/octet-stream',
};

createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (path.endsWith('/')) path += 'index.html';
  const rel = normalize(path).replace(/^([/\\])+/, '');
  const top = rel.split(/[/\\]/)[0];
  // Built data scripts (data/<section>.js) live in dist/site; raw packs and sources in the project.
  const source = ['dev', 'src'].includes(top) || (top === 'data' && rel.endsWith('.pack'));
  const file = source ? join(ROOT, rel) : join(ROOT, 'dist', 'site', rel);
  if (!file.startsWith(ROOT)) { res.writeHead(403).end(); return; }
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain' }).end('not found');
  }
}).listen(port, '127.0.0.1', () => console.log(`http://127.0.0.1:${port}/`));
