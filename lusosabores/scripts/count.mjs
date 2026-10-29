// Checks content/menu.json against the saved copy of the live menu page (content/raw/menu.txt): 35 tiles in the
// live order with the names exactly as written, a photo file for each, alt text in five languages, no prices.
import { existsSync, readFileSync } from "node:fs";
const root = new URL("..", import.meta.url).pathname;
const menu = JSON.parse(readFileSync(root + "content/menu.json", "utf8"));
const raw = readFileSync(root + "content/raw/menu.txt", "utf8");
const start = raw.indexOf("48h à l'avance.") + 15;
const end = raw.indexOf("Pour réserver une table");
const live = raw.slice(start, end).split("\n").map((s) => s.trim()).filter(Boolean);
const names = menu.tiles.map((t) => t.name);
let ok = true;
const fail = (m) => ((ok = false), console.log("✗", m));
if (names.length !== 35) fail(`${names.length} tiles, expected 35`);
if (live.join("|") !== names.join("|")) fail("order or spelling differs from the live page");
for (const t of menu.tiles) {
  if (!existsSync(root + `public/images/${t.photo}.webp`)) fail(`missing photo ${t.photo}`);
  for (const l of ["fr", "en", "pt", "it", "de"]) if (!t.alt[l]) fail(`${t.name}: no ${l} alt`);
  if (/\d+[.,]-|CHF|€/.test(JSON.stringify(t))) fail(`${t.name}: looks like a price`);
}
const groups = {};
for (const t of menu.tiles) groups[t.group] = (groups[t.group] ?? 0) + 1;
console.log(`${names.length} tiles · ${new Set(names).size} names · ${new Set(menu.tiles.map((t) => t.photo)).size} photos · live list ${live.length} names`);
console.log("groups", groups);
console.log(ok ? "✓ menu matches the live page" : "✗ check the menu");
process.exit(ok ? 0 : 1);
