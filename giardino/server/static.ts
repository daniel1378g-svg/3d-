// Serves the pre-rendered site from dist/: one HTML file per page and language, hashed assets, images, fonts. Applies
// the permanent redirects of dist/_redirects (Netlify format, written by scripts/prerender.mjs) so old addresses keep
// working, and collects the hashes of inline scripts for the Content-Security-Policy.
import type { IncomingMessage, ServerResponse } from "node:http";
import { createReadStream, existsSync, readFileSync, readdirSync, statSync, type Stats } from "node:fs";
import { extname, join, posix, resolve, sep } from "node:path";
import { createHash } from "node:crypto";
import { gzipSync } from "node:zlib";
import { redirect, send } from "./http.ts";

const TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".vtt": "text/vtt; charset=utf-8",
  ".pdf": "application/pdf",
};
const COMPRESSIBLE = new Set([".html", ".js", ".mjs", ".css", ".json", ".map", ".webmanifest", ".xml", ".txt", ".svg", ".vtt"]);

export type Rule = {
  from: string;
  query: [string, string][];
  to: string;
  status: number;
  force: boolean;
  langs: string[] | null;
};

/**
 * Netlify `_redirects`: `from [key=value …] to [status[!]] [Language=xx,yy]`. Rules are tried top to bottom. A plain
 * rule only applies when no file exists at the path (Netlify "shadowing") unless it is forced with `!`; rules with
 * query conditions always apply, because the page at the same path never uses those parameters.
 */
export function parseRedirects(text: string): Rule[] {
  const rules: Rule[] = [];
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/(^|\s)#.*$/, "").trim();
    if (!line) continue;
    const tok = line.split(/\s+/);
    if (tok.length < 2 || !tok[0].startsWith("/")) continue;
    const from = tok[0];
    let i = 1;
    const query: [string, string][] = [];
    while (i < tok.length - 1 && /^[^/:=]+=[^/]*$/.test(tok[i])) {
      const [k, ...v] = tok[i].split("=");
      query.push([k, v.join("=")]);
      i++;
    }
    const to = tok[i++];
    if (!to) continue;
    let status = 301;
    let force = false;
    if (tok[i] && /^\d{3}!?$/.test(tok[i])) {
      status = parseInt(tok[i], 10);
      force = tok[i].endsWith("!");
      i++;
    }
    let langs: string[] | null = null;
    let supported = true;
    for (const cond of tok.slice(i)) {
      const [k, v = ""] = cond.split("=");
      if (k.toLowerCase() === "language") langs = v.split(",").map((s) => s.trim().toLowerCase().slice(0, 2)).filter(Boolean);
      else supported = false; // Country=, Role=, Cookie= … cannot be evaluated here: skip the rule
    }
    if (supported) rules.push({ from, query, to, status, force: force || query.length > 0, langs });
  }
  return rules;
}

const trimSlash = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

export function matchRule(rule: Rule, pathname: string, params: URLSearchParams, lang: string): string | null {
  const p = trimSlash(pathname);
  let splat = "";
  if (rule.from.endsWith("/*")) {
    const base = trimSlash(rule.from.slice(0, -2));
    if (p !== base && !p.startsWith(base === "/" ? "/" : base + "/")) return null;
    splat = p.slice(base === "/" ? 1 : base.length + 1);
  } else if (p !== trimSlash(rule.from)) return null;
  for (const [k, v] of rule.query) {
    const got = params.get(k);
    if (got === null) return null;
    if (!v.startsWith(":") && got !== v) return null;
  }
  if (rule.langs && !rule.langs.includes(lang)) return null;
  let to = rule.to.replace(":splat", splat);
  for (const [k, v] of rule.query) if (v.startsWith(":")) to = to.split(v).join(encodeURIComponent(params.get(k) ?? ""));
  return to;
}

/** sha256 (base64) of every inline, executable <script> in the HTML (JSON-LD and other data blocks are skipped). */
export function inlineScriptHashes(markup: string) {
  const out: string[] = [];
  for (const m of markup.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
    const attrs = m[1];
    if (/\ssrc\s*=/i.test(attrs)) continue;
    const type = /\stype\s*=\s*["']?([^"'\s>]+)/i.exec(attrs)?.[1]?.toLowerCase();
    if (type && !["text/javascript", "application/javascript", "module"].includes(type)) continue;
    if (!m[2].trim()) continue;
    out.push(createHash("sha256").update(m[2], "utf8").digest("base64"));
  }
  return out;
}

function htmlFiles(dir: string, out: string[] = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) htmlFiles(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

export class StaticSite {
  readonly root: string;
  readonly rules: Rule[];
  readonly scriptHashes: string[];
  private gz = new Map<string, { mtime: number; data: Buffer }>();

  constructor(dir: string) {
    this.root = resolve(dir);
    const redirects = join(this.root, "_redirects");
    this.rules = existsSync(redirects) ? parseRedirects(readFileSync(redirects, "utf8")) : [];
    const hashes = new Set<string>();
    for (const f of htmlFiles(this.root)) for (const h of inlineScriptHashes(readFileSync(f, "utf8"))) hashes.add(h);
    this.scriptHashes = [...hashes].sort();
  }

  /** Absolute path of the file for a URL path, `null` when there is none, `"bad"` for malformed or escaping paths. */
  resolveFile(pathname: string): string | null | "bad" {
    let decoded: string;
    try {
      decoded = decodeURIComponent(pathname);
    } catch {
      return "bad";
    }
    if (decoded.includes("\0") || decoded.includes("\\")) return "bad";
    const rel = posix.normalize(decoded);
    if (rel.split("/").some((seg) => seg === "..")) return "bad";
    const abs = resolve(this.root, "." + rel);
    if (abs !== this.root && !abs.startsWith(this.root + sep)) return "bad";
    // never serve dotfiles or the host configuration
    if (rel.split("/").some((seg) => seg.startsWith(".")) || /\/_(redirects|headers)$/.test(rel)) return null;
    let s: Stats;
    try {
      s = statSync(abs);
    } catch {
      return null;
    }
    if (s.isFile()) return abs;
    if (s.isDirectory()) {
      const index = join(abs, "index.html");
      return existsSync(index) ? index : null;
    }
    return null;
  }

  handle(req: IncomingMessage, res: ServerResponse, url: URL, lang: string) {
    const method = req.method ?? "GET";
    const file = this.resolveFile(url.pathname);
    const exists = file !== null && file !== "bad";
    // redirects first when forced (or query-specific), otherwise only where no file exists
    for (const rule of this.rules) {
      const to = matchRule(rule, url.pathname, url.searchParams, lang);
      if (to === null) continue;
      if (!rule.force && exists) break;
      if (rule.status >= 300 && rule.status < 400) {
        const target = rule.query.length === 0 && url.search && !to.includes("?") ? to + url.search : to;
        return redirect(res, rule.status, target);
      }
      if (rule.status === 200 || rule.status === 404) {
        const rewritten = this.resolveFile(new URL(to, "http://x").pathname);
        if (rewritten && rewritten !== "bad") return this.serveFile(req, res, rewritten, rule.status);
      }
      break;
    }
    if (method !== "GET" && method !== "HEAD") return send(res, 405, "Method Not Allowed", { Allow: "GET, HEAD", "Content-Type": "text/plain; charset=utf-8" });
    if (file === "bad") return send(res, 400, "Bad Request", { "Content-Type": "text/plain; charset=utf-8" });
    if (exists) return this.serveFile(req, res, file, 200);
    return this.notFound(req, res);
  }

  notFound(req: IncomingMessage, res: ServerResponse) {
    const page = join(this.root, "404.html");
    if (existsSync(page)) return this.serveFile(req, res, page, 404);
    return send(res, 404, "Not Found", { "Content-Type": "text/plain; charset=utf-8" });
  }

  private serveFile(req: IncomingMessage, res: ServerResponse, file: string, status: number) {
    const s = statSync(file);
    const ext = extname(file).toLowerCase();
    const type = TYPES[ext] ?? "application/octet-stream";
    const rel = file.slice(this.root.length).split(sep).join("/");
    const cache =
      status !== 200 || ext === ".html"
        ? "no-cache"
        : rel.startsWith("/assets/")
          ? "public, max-age=31536000, immutable"
          : "public, max-age=604800";
    const etag = `W/"${s.size.toString(16)}-${Math.floor(s.mtimeMs).toString(16)}"`;
    const headers: Record<string, string | number> = { "Content-Type": type, "Cache-Control": cache, ETag: etag, "Last-Modified": s.mtime.toUTCString() };
    if (status === 200 && req.headers["if-none-match"] === etag) {
      res.writeHead(304, { ETag: etag, "Cache-Control": cache });
      return res.end();
    }
    const head = req.method === "HEAD";
    if (COMPRESSIBLE.has(ext)) {
      headers.Vary = "Accept-Encoding";
      const accepts = /\bgzip\b/.test(String(req.headers["accept-encoding"] ?? ""));
      if (accepts && s.size >= 512) {
        let c = this.gz.get(file);
        if (!c || c.mtime !== s.mtimeMs) {
          c = { mtime: s.mtimeMs, data: gzipSync(readFileSync(file), { level: 9 }) };
          this.gz.set(file, c);
        }
        res.writeHead(status, { ...headers, "Content-Encoding": "gzip", "Content-Length": c.data.length });
        return res.end(head ? undefined : c.data);
      }
      const data = readFileSync(file);
      res.writeHead(status, { ...headers, "Content-Length": data.length });
      return res.end(head ? undefined : data);
    }
    // binary files: single byte ranges (video needs them in Safari)
    headers["Accept-Ranges"] = "bytes";
    const range = /^bytes=(\d*)-(\d*)$/.exec(String(req.headers.range ?? ""));
    if (range && status === 200) {
      let start = range[1] === "" ? NaN : Number(range[1]);
      let end = range[2] === "" ? NaN : Number(range[2]);
      if (Number.isNaN(start)) {
        // suffix range: the last n bytes
        start = Math.max(0, s.size - end);
        end = s.size - 1;
      } else if (Number.isNaN(end) || end >= s.size) end = s.size - 1;
      if (Number.isNaN(start) || start > end || start >= s.size) {
        res.writeHead(416, { "Content-Range": `bytes */${s.size}` });
        return res.end();
      }
      res.writeHead(206, { ...headers, "Content-Range": `bytes ${start}-${end}/${s.size}`, "Content-Length": end - start + 1 });
      if (head) return res.end();
      return createReadStream(file, { start, end }).pipe(res);
    }
    res.writeHead(status, { ...headers, "Content-Length": s.size });
    if (head) return res.end();
    createReadStream(file).pipe(res);
  }
}
