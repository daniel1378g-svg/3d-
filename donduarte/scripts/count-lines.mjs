// Compares the number of menu lines on the live site with the content files.
//   node scripts/count-lines.mjs           counts content/raw (the saved copy of the live pages)
//   node scripts/count-lines.mjs --live    fetches the live pages again first
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const pages = { "carte-plats": "plats.json", "carte-vins": "vins.json", "carte-desserts": "desserts.json" };
const live = process.argv.includes("--live");
const itemsOf = (doc) => doc.groups.flatMap((g) => (g.sections ?? [{ items: g.items }]).flatMap((s) => s.items));

let ok = true;
console.log("page             live  saved  covered  shown  merged  pdf-only");
for (const [page, file] of Object.entries(pages)) {
  const doc = JSON.parse(readFileSync(join(root, "content", file), "utf8"));
  const saved = JSON.parse(readFileSync(join(root, "content/raw", `${page}.json`), "utf8")).length;
  let liveCount = "—";
  if (live) {
    const html = await (await fetch(`https://donduarte.ch/${page}/`)).text();
    liveCount = (html.match(/<div class='fmp-food-item food-menu'>/g) ?? []).length;
    if (liveCount !== saved) ok = false;
  }
  const items = itemsOf(doc);
  const covered = new Set(items.flatMap((i) => i.raw)).size;
  const merged = items.reduce((n, i) => n + (i.duplicates?.length ?? 0), 0);
  const pdfOnly = items.filter((i) => i.pdfOnly).length;
  if (covered !== saved) ok = false;
  console.log(`${page.padEnd(16)} ${String(liveCount).padStart(4)}  ${String(saved).padStart(5)}  ${String(covered).padStart(7)}  ${String(items.length).padStart(5)}  ${String(merged).padStart(6)}  ${String(pdfOnly).padStart(8)}`);
}
console.log(ok ? "Every live line is on the new site (merged duplicates count once)." : "MISMATCH: re-run scripts/extract_live.py and scripts/build-content.mjs.");
process.exit(ok ? 0 : 1);
