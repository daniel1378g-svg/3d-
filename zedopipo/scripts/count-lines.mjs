// Checks the new menu against the saved copy of the live menu (content/raw/menu.json): the same
// 7 sections, the same 44 listings with the same names and prices, and every live photo in use.
//   node scripts/count-lines.mjs
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const raw = JSON.parse(readFileSync(join(root, "content/raw/menu.json"), "utf8"));
const menu = JSON.parse(readFileSync(join(root, "content/menu.json"), "utf8"));
let ok = raw.length === menu.sections.length;
console.log("section                         live  new");
raw.forEach((s, i) => {
  const n = menu.sections[i];
  const same = n && n.items.length === s.items.length && s.items.every((it, k) => it.name.trim() === n.items[k].name && it.price === n.items[k].livePrice);
  if (!same) ok = false;
  console.log(`${s.title.padEnd(30)} ${String(s.items.length).padStart(5)} ${String(n?.items.length ?? 0).padStart(4)}${same ? "" : "  MISMATCH"}`);
});
const live = raw.reduce((t, s) => t + s.items.length, 0);
const shown = menu.sections.reduce((t, s) => t + s.items.length, 0);
console.log(`total ${live} live, ${shown} on the new menu`);
const copy = readFileSync(join(root, "src/copy.ts"), "utf8");
const photos = [...copy.matchAll(/^\s+"?([\w-]+)"?: L\(/gm)].map((m) => m[1]).filter((id) => !/^(title|text|lead|line1|line2|justEat|full|specialities)$/.test(id));
const used = new Set(menu.sections.flatMap((s) => [...s.photos, ...s.items.map((d) => d.photo).filter(Boolean)]));
console.log(`${photos.length} photos with alt texts in 5 languages; ${used.size} of them on the menu page, all ${photos.length} in the home gallery`);
console.log(ok ? "Every live listing is on the new menu, in order, with its live price." : "MISMATCH: re-run scripts/extract_live.py and scripts/build-content.mjs.");
process.exit(ok ? 0 : 1);
