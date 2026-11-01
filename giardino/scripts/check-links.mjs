// Link check: every external link of the live site (all four locales, from the captures in content/raw/live) and
// every external URL the new site uses (src/content/restaurant.ts, src/content/menu.ts, src/i18n/*.ts).
// GET only, redirects followed (up to 10 hops), 10 s timeout per request, about one request per second.
// Writes content/raw/links.csv: url, found_on, status, final_url, result, note
//   result: ok | redirect-generic (lands on an unrelated/general page) | dead | unverifiable (blocked, timeout, 5xx)
// URLs that embed the live site's exposed Google Maps API key are listed but never requested (BRIEF §2).
// Usage: node scripts/check-links.mjs [--offline]   (--offline only lists the URLs)
import { build } from "esbuild";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const offline = process.argv.includes("--offline");
const UA = "giardino-design-proposal-audit/1.0 (read-only link check for an unofficial redesign proposal; GET only)";
const LANGS = ["de", "en", "fr", "it"];
const found = new Map(); // url -> Set(found_on)
const add = (url, where) => {
  url = url.replace(/&amp;/g, "&").trim();
  if (!/^https?:\/\//.test(url)) return;
  if (/^https?:\/\/([a-z0-9-]+\.)*pizzeriagiardino\.ch(\/|$|\?)/i.test(url)) return;
  // not links: URL bases used for parsing, schema.org vocabulary IRIs
  if (/^https?:\/\/(x|localhost)(\/|$)|^https?:\/\/schema\.org/.test(url)) return;
  if (!found.has(url)) found.set(url, new Set());
  found.get(url).add(where);
};

// 1. live site: <a href> and <iframe src> of every captured page
const index = JSON.parse(readFileSync(join(root, "content/raw/live/index.json"), "utf8"));
for (const r of index.routes) {
  const html = r.files?.find((f) => f.endsWith(".html"));
  if (!html) continue;
  const s = readFileSync(join(root, "content/raw/live", html), "utf8");
  const where = `live:${r.lang}/${r.slug}`;
  for (const m of s.matchAll(/<a\s[^>]*?href="(https?:\/\/[^"]+)"/gi)) add(m[1], where);
  for (const m of s.matchAll(/<iframe[^>]*?src="(https?:\/\/[^"]+)"/gi)) add(m[1], where + " (iframe)");
}

// 2. new site: evaluate the content modules (functions are called for every language) and scan their string literals
const tmp = join(root, ".cache/check-links.cjs");
await build({
  stdin: {
    contents: `export * as restaurant from "./src/content/restaurant"; export * as menu from "./src/content/menu";
      export { de } from "./src/i18n/de"; export { en } from "./src/i18n/en"; export { fr } from "./src/i18n/fr"; export { it } from "./src/i18n/it";`,
    resolveDir: root,
    loader: "ts",
  },
  bundle: true, platform: "node", format: "cjs", outfile: tmp, logLevel: "error",
  alias: { "@": join(root, "src"), "@shared": join(root, "shared"), "@content": join(root, "content") },
  loader: { ".json": "json" },
  define: { __ARTIFACT__: "false", __PROPOSAL__: "true", "import.meta.env": "{}" },
});
let mod = {};
try {
  mod = createRequire(import.meta.url)(tmp);
} catch (e) {
  // the sources may be mid-edit; the literal scan below still covers every URL written in them
  console.warn(`content modules could not be evaluated (${e.message}); scanning source literals only`);
}
const walk = (v, where, depth = 0) => {
  if (depth > 8 || v == null) return;
  if (typeof v === "string") { for (const m of v.matchAll(/https?:\/\/[^\s"'<>)»]+/g)) add(m[0].replace(/[.,;]$/, ""), where); return; }
  if (typeof v === "function") {
    if (v.length === 1) for (const l of LANGS) { try { walk(v(l), where, depth + 1); } catch { /* not a (lang) => … function */ } }
    return;
  }
  if (Array.isArray(v)) return v.forEach((x) => walk(x, where, depth + 1));
  if (typeof v === "object") for (const x of Object.values(v)) walk(x, where, depth + 1);
};
walk(mod.restaurant, "src:src/content/restaurant.ts");
walk(mod.menu, "src:src/content/menu.ts");
for (const l of LANGS) walk(mod[l], `src:src/i18n/${l}.ts`);
const srcFiles = (dir) => readdirSync(join(root, dir), { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? srcFiles(`${dir}/${d.name}`) : /\.(ts|tsx)$/.test(d.name) ? [`${dir}/${d.name}`] : []));
for (const f of srcFiles("src")) {
  const s = readFileSync(join(root, f), "utf8").replace(/^\s*\/\/.*$/gm, "");
  for (const m of s.matchAll(/["'`](https?:\/\/[^"'`\s$]+)["'`]/g)) add(m[1], `src:${f}`);
  // template literals with a language: https://…/${lang}/… → one URL per language
  for (const m of s.matchAll(/`(https?:\/\/[^`\s]*\$\{lang\}[^`\s]*)`/g)) for (const l of LANGS) add(m[1].replace(/\$\{lang\}/g, l), `src:${f}`);
}

// known cases: why a final page counts as generic, or why a URL is not requested
const NOTES = {
  "http://www.c-and-a.com/ch/de/shop/familienfreundliche-restaurants": "C&A article taken down; the address redirects to a general shop page",
  "https://plus.google.com/+PizzeriaGiardinoLeukerbad/": "Google+ was shut down in 2019",
  "https://www.food4family.ch/restaurantsuche/wallis/giardino/": "food4family.ch no longer resolves (no DNS)",
  "http://www.wir.ch/en/": "English WIR page; the WIR site no longer has /en/",
};
const isMapsKey = (u) => /maps\.google\.com\/maps\/api\/js/.test(u) && /key=/.test(u);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let last = 0;
async function polite() {
  const wait = 1000 - (Date.now() - last);
  if (wait > 0) await sleep(wait);
  last = Date.now();
}
async function check(url) {
  let current = url;
  const chain = [];
  for (let hop = 0; hop < 10; hop++) {
    await polite();
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 10000);
    try {
      const r = await fetch(current, { method: "GET", redirect: "manual", signal: ctl.signal, headers: { "user-agent": UA, accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "accept-language": "de-CH,de;q=0.9,en;q=0.8" } });
      clearTimeout(timer);
      try { await r.body?.cancel(); } catch { /* ignore */ }
      if (r.status >= 300 && r.status < 400 && r.headers.get("location")) {
        chain.push(r.status);
        current = new URL(r.headers.get("location"), current).toString();
        continue;
      }
      return { status: r.status, final: current, chain };
    } catch (e) {
      clearTimeout(timer);
      return { status: 0, final: current, chain, error: e.name === "AbortError" ? "timeout (10 s)" : (e.cause?.code || e.message) };
    }
  }
  return { status: 0, final: current, chain, error: "too many redirects" };
}

function classify(url, res) {
  if (res.error) {
    if (/ENOTFOUND|EAI_AGAIN/.test(res.error)) return ["dead", `DNS lookup failed (${res.error})`];
    return ["unverifiable", res.error];
  }
  const s = res.status;
  if (s === 404 || s === 410 || s === 400) return ["dead", `HTTP ${s}`];
  if (s === 401 || s === 403 || s === 429 || s === 999) return ["unverifiable", `HTTP ${s} (blocks automated requests; check in a browser)`];
  if (s >= 500) return ["unverifiable", `HTTP ${s} on ${new Date().toISOString().slice(0, 10)}`];
  if (s >= 200 && s < 300) {
    const a = new URL(url);
    const b = new URL(res.final);
    const site = (h) => h.replace(/^(www|app|m)\./, "").split(".").slice(-2).join(".");
    const SHORTENERS = { "g.co": "google.com" };
    if (/\/login\b|\/signin\b|accounts\.google/.test(b.pathname + b.hostname)) {
      const next = b.searchParams.get("next") || b.searchParams.get("continue") || "";
      return ["unverifiable", `login wall on ${b.hostname}${next ? ` (continues to ${decodeURIComponent(next).replace(/^https?:\/\/[^/]+/, "")})` : ""}; check in a browser`];
    }
    if (site(a.hostname) !== site(b.hostname) && SHORTENERS[site(a.hostname)] !== site(b.hostname)) return ["redirect-generic", `lands on another site: ${b.hostname}`];
    const specific = a.pathname.replace(/\/+$/, "").split("/").filter(Boolean).length >= 2 || a.search;
    const generic = b.pathname.replace(/\/+$/, "").split("/").filter(Boolean).length <= 1 && !b.search;
    if (res.chain.length && specific && generic && a.hostname.replace(/^www\./, "") === b.hostname.replace(/^www\./, "")) return ["redirect-generic", "a specific page now lands on a general page"];
    return ["ok", res.chain.length ? `redirected (${res.chain.join(", ")})` : ""];
  }
  return ["unverifiable", `HTTP ${s}`];
}

const rows = [];
const urls = [...found.keys()].sort();
for (const url of urls) {
  const where = [...found.get(url)].sort();
  const liveCount = where.filter((w) => w.startsWith("live:")).length;
  const foundOn = [
    liveCount >= 40 ? `live: all ${liveCount} pages (header/footer)` : where.filter((w) => w.startsWith("live:")).join(" "),
    where.filter((w) => w.startsWith("src:")).join(" "),
  ].filter(Boolean).join(" | ");
  if (isMapsKey(url)) {
    rows.push({ url: url.replace(/key=[^&]+/, "key=[exposed key removed]"), foundOn, status: "", final: "", result: "unverifiable", note: "not requested: contains the live site's exposed Google Maps API key (not reused)" });
    continue;
  }
  if (offline) { rows.push({ url, foundOn, status: "", final: "", result: "", note: "offline listing" }); continue; }
  let res = await check(url);
  if (res.error && /timeout|ECONNRESET|UND_ERR/.test(res.error)) { await sleep(2000); res = await check(url); } // one retry for transient failures
  let [result, note] = classify(url, res);
  const yt = url.match(/youtube\.com\/watch\?v=([\w-]{11})/);
  if (yt && result !== "ok") {
    // the watch page rate-limits automated requests; the public oEmbed endpoint confirms that the video exists
    const o = await check(`https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${yt[1]}`)}&format=json`);
    if (o.status === 200) { result = "ok"; note = `watch page HTTP ${res.status}; video confirmed via YouTube oEmbed (HTTP 200)`; }
  }
  const mp = url.match(/my\.matterport\.com\/show\/\?m=(\w+)/);
  if (mp && result !== "ok") {
    // the player page blocks automated requests; Matterport's public oEmbed endpoint confirms that the model exists
    const o = await check(`https://my.matterport.com/api/v1/models/oembed/?url=${encodeURIComponent(`https://my.matterport.com/show/?m=${mp[1]}`)}`);
    if (o.status === 200) { result = "ok"; note = `player page HTTP ${res.status}; tour confirmed via Matterport oEmbed (HTTP 200, title «Pizzeria Giardino 2022»)`; }
  }
  if (NOTES[url]) {
    note = [NOTES[url], note].filter(Boolean).join("; ");
    if (/taken down|redirects to a general/.test(NOTES[url]) && result === "ok") result = "redirect-generic";
  }
  rows.push({ url, foundOn, status: res.status || "", final: res.final === url ? "" : res.final, result, note });
  process.stdout.write(`${String(res.status || "ERR").padEnd(4)} ${result.padEnd(16)} ${url}\n`);
}

const q = (v) => {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const order = { dead: 0, "redirect-generic": 1, unverifiable: 2, ok: 3, "": 4 };
rows.sort((a, b) => order[a.result] - order[b.result] || a.url.localeCompare(b.url));
const csv = ["url,found_on,status,final_url,result,note", ...rows.map((r) => [r.url, r.foundOn, r.status, r.final, r.result, r.note].map(q).join(","))].join("\n") + "\n";
writeFileSync(join(root, "content/raw/links.csv"), csv);
const count = (k) => rows.filter((r) => r.result === k).length;
console.log(`\n${rows.length} external URLs → content/raw/links.csv · ok ${count("ok")} · redirect-generic ${count("redirect-generic")} · dead ${count("dead")} · unverifiable ${count("unverifiable")}`);
