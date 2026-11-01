// Small HTTP helpers: bodies with a size limit, JSON/HTML responses, security headers, client address, rate limits.
import type { IncomingMessage, ServerResponse } from "node:http";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import type { Limit } from "./config.ts";

export const MAX_BODY = 16 * 1024;

export const escapeHtml = (s: unknown) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export const sha256 = (s: string | Buffer) => createHash("sha256").update(s).digest();
export const sha256Hex = (s: string | Buffer) => createHash("sha256").update(s).digest("hex");
export const hmac = (secret: string, s: string) => createHmac("sha256", secret).update(s).digest("base64url");

/** Constant-time string comparison (hashing first, so lengths never leak through timing). */
export const safeEqual = (a: string, b: string) => timingSafeEqual(sha256(a), sha256(b));

export function send(res: ServerResponse, status: number, body: string | Buffer, headers: Record<string, string | number> = {}) {
  if (res.headersSent) return;
  const buf = typeof body === "string" ? Buffer.from(body) : body;
  res.writeHead(status, { "Content-Length": buf.length, ...headers });
  res.end(res.req?.method === "HEAD" ? undefined : buf);
}

export const json = (res: ServerResponse, status: number, data: unknown, headers: Record<string, string | number> = {}) =>
  send(res, status, JSON.stringify(data), { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...headers });

export const html = (res: ServerResponse, status: number, markup: string, headers: Record<string, string | number> = {}) =>
  send(res, status, markup, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", ...headers });

export const redirect = (res: ServerResponse, status: number, location: string, headers: Record<string, string | number> = {}) =>
  send(res, status, "", { Location: location, "Cache-Control": status === 301 || status === 308 ? "public, max-age=86400" : "no-store", ...headers });

export type Body =
  | { ok: true; kind: "json"; data: Record<string, unknown> }
  | { ok: true; kind: "form"; data: URLSearchParams }
  | { ok: false; status: 400 | 413 | 415; error: string };

/** Reads at most `limit` bytes; anything larger is refused (413) without buffering the rest. */
export function readText(req: IncomingMessage, limit = MAX_BODY): Promise<{ ok: true; text: string } | { ok: false }> {
  return new Promise((resolve, reject) => {
    const declared = Number(req.headers["content-length"]);
    if (Number.isFinite(declared) && declared > limit) {
      req.resume();
      return resolve({ ok: false });
    }
    const chunks: Buffer[] = [];
    let size = 0;
    let done = false;
    req.on("data", (c: Buffer) => {
      if (done) return;
      size += c.length;
      if (size > limit) {
        done = true;
        chunks.length = 0;
        req.resume();
        return resolve({ ok: false });
      }
      chunks.push(c);
    });
    req.on("end", () => {
      if (done) return;
      done = true;
      resolve({ ok: true, text: Buffer.concat(chunks).toString("utf8") });
    });
    req.on("error", (e) => {
      if (done) return;
      done = true;
      reject(e);
    });
  });
}

export async function readBody(req: IncomingMessage, limit = MAX_BODY): Promise<Body> {
  const type = String(req.headers["content-type"] ?? "").split(";")[0].trim().toLowerCase();
  if (type !== "application/json" && type !== "application/x-www-form-urlencoded") {
    req.resume();
    return { ok: false, status: 415, error: "unsupported-media-type" };
  }
  const t = await readText(req, limit);
  if (!t.ok) return { ok: false, status: 413, error: "too-large" };
  if (type === "application/x-www-form-urlencoded") return { ok: true, kind: "form", data: new URLSearchParams(t.text) };
  try {
    const data = JSON.parse(t.text);
    if (!data || typeof data !== "object" || Array.isArray(data)) return { ok: false, status: 400, error: "bad-json" };
    return { ok: true, kind: "json", data };
  } catch {
    return { ok: false, status: 400, error: "bad-json" };
  }
}

/** The visitor's address: the socket, or – behind `hops` trusted proxies – the matching X-Forwarded-For entry. */
export function clientIp(req: IncomingMessage, hops: number) {
  const socket = req.socket.remoteAddress ?? "unknown";
  if (hops <= 0) return socket;
  const xff = String(req.headers["x-forwarded-for"] ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  // each trusted proxy appends the address it saw: the client is `hops` entries from the right
  return xff.length >= hops ? xff[xff.length - hops] : (xff[0] ?? socket);
}

/** Fixed-window counters per bucket and address, kept in memory (a restart forgets them, which is fine). */
export class RateLimiter {
  private hits = new Map<string, { count: number; reset: number }>();
  private timer: ReturnType<typeof setInterval>;
  private clock: () => number;
  constructor(clock: () => number = Date.now) {
    this.clock = clock;
    this.timer = setInterval(() => this.sweep(), 60_000);
    this.timer.unref();
  }
  /** Counts one hit; `ok: false` when the limit was already reached in this window. */
  hit(bucket: string, ip: string, limit: Limit) {
    const now = this.clock();
    const k = `${bucket}|${ip}`;
    let e = this.hits.get(k);
    if (!e || e.reset <= now) {
      e = { count: 0, reset: now + limit.windowMs };
      this.hits.set(k, e);
    }
    e.count++;
    const ok = e.count <= limit.max;
    return { ok, retryAfter: ok ? 0 : Math.max(1, Math.ceil((e.reset - now) / 1000)) };
  }
  /** Whether the address is currently over the limit, without counting. */
  blocked(bucket: string, ip: string, limit: Limit) {
    const e = this.hits.get(`${bucket}|${ip}`);
    if (!e || e.reset <= this.clock()) return { blocked: false, retryAfter: 0 };
    return { blocked: e.count >= limit.max, retryAfter: Math.max(1, Math.ceil((e.reset - this.clock()) / 1000)) };
  }
  sweep() {
    const now = this.clock();
    for (const [k, e] of this.hits) if (e.reset <= now) this.hits.delete(k);
    // a flood of distinct addresses must not exhaust memory
    if (this.hits.size > 50_000) this.hits.clear();
  }
  stop() {
    clearInterval(this.timer);
  }
}

/** Content-Security-Policy for the site; inline scripts are admitted only by their hash. */
export function buildCsp(scriptHashes: string[]) {
  const scripts = ["'self'", ...scriptHashes.map((h) => `'sha256-${h}'`)].join(" ");
  return [
    "default-src 'self'",
    `script-src ${scripts}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://i.ytimg.com",
    "font-src 'self'",
    "connect-src 'self'",
    "media-src 'self'",
    "frame-src https://www.openstreetmap.org https://www.youtube-nocookie.com https://my.matterport.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ].join("; ");
}

export function securityHeaders(res: ServerResponse, csp: string, https: boolean) {
  res.setHeader("Content-Security-Policy", csp);
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("X-Frame-Options", "DENY");
  if (https) res.setHeader("Strict-Transport-Security", "max-age=31536000");
}

/** Preferred language from Accept-Language among de/en/fr/it (German otherwise). */
export function acceptLang(req: IncomingMessage): "de" | "en" | "fr" | "it" {
  const header = String(req.headers["accept-language"] ?? "");
  const tags = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      return { tag: tag.toLowerCase().slice(0, 2), q: q ? Number(q.slice(2)) || 0 : 1 };
    })
    .filter((t) => t.tag)
    .sort((a, b) => b.q - a.q);
  for (const t of tags) if (t.tag === "de" || t.tag === "en" || t.tag === "fr" || t.tag === "it") return t.tag;
  return "de";
}
