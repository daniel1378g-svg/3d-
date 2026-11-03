// Fetches the CURRENT "Novinky" module from the live site and stores it in content/news.json.
//
// The news list is maintained in Joomla; this static page must never freeze an old copy.
// Run `npm run sync-news` before every build/deploy (the build refuses to run without the file
// and prints its age). Only titles and links are taken: the module shows no dates, so none are
// stored or invented.
//
//   node scripts/sync-news.mjs [source-url]
import { writeFileSync } from "node:fs";

const ORIGIN = "https://www.sportovni-centrum.cz";
const source = process.argv[2] ?? `${ORIGIN}/krouzky/atleticka-pripravka`;

const res = await fetch(source, { headers: { "user-agent": "sportovni-centrum-redesign-news-sync/1.0" } });
if (!res.ok) throw new Error(`${source} → HTTP ${res.status}`);
const html = await res.text();

// The module: <div class="module mod-box mod-box-grey ..."> … <h3 class="module-title">Novinky</h3> <ul class="line line-icon"> <li><a href="…">…</a></li> … </ul>
const block = html.match(/<h3 class="module-title">\s*Novinky\s*<\/h3>\s*<ul[^>]*>([\s\S]*?)<\/ul>/);
if (!block) throw new Error("Novinky module not found – the Joomla markup changed; update the selector in scripts/sync-news.mjs");

const decode = (s) => s
  .replace(/&nbsp;/g, " ").replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&amp;/g, "&")
  .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n));

const items = [...block[1].matchAll(/<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map(([, href, text]) => ({
  title: decode(text.replace(/<[^>]+>/g, "")),
  href: new URL(decode(href), ORIGIN).href,
}));
if (!items.length) throw new Error("Novinky module is empty");

const out = { source, fetchedAt: new Date().toISOString(), items };
writeFileSync(new URL("../content/news.json", import.meta.url), JSON.stringify(out, null, 2) + "\n");
console.log(`content/news.json: ${items.length} items from ${source}`);
for (const i of items) console.log(` · ${i.title.trim()}  →  ${i.href}`);
