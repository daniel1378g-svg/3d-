// Checks content/carte.json against the saved live carte: same sections, same listings in the same
// order, same prices, FR/PT/EN descriptions and notes identical, IT/DE present for every text.
//   npm run count
import { readFileSync } from "node:fs";

const root = new URL("..", import.meta.url).pathname;
const live = JSON.parse(readFileSync(`${root}content/raw/live-data.json`, "utf8"));
const carte = JSON.parse(readFileSync(`${root}content/carte.json`, "utf8"));
const br = (s) => s.replace(/<br\s*\/?>/g, "\n");
const errors = [];
const check = (ok, msg) => ok || errors.push(msg);
const LANGS = ["fr", "en", "pt", "it", "de"];

const rows = [];
for (const section of carte.sections) {
  if (section.id === "commande") {
    check(JSON.stringify(section.items.map((i) => i.name)) === JSON.stringify(live.PREORDER), "sur commande list differs");
    check(section.items.every((i) => i.price === null && i.surCommande), "sur commande dishes must have no price");
    rows.push([section.title.fr, live.PREORDER.length, section.items.length]);
    continue;
  }
  const expected = live.MENU.filter((m) => m.cat === section.id);
  rows.push([section.title.fr, expected.length, section.items.length]);
  check(expected.length === section.items.length, `${section.id}: ${section.items.length} listings, live has ${expected.length}`);
  expected.forEach((m, n) => {
    const item = section.items[n];
    if (!item) return;
    check(item.name === m.name, `${section.id} #${n + 1}: name "${item.name}" ≠ "${m.name}"`);
    check(item.price === m.price, `${m.name}: price "${item.price}" ≠ "${m.price}"`);
    for (const l of ["fr", "pt", "en"]) {
      check(item.desc[l] === br(m[l]), `${m.name}: ${l} description differs`);
      if (m.note) check(item.note?.[l] === m.note[l], `${m.name}: ${l} note differs`);
      if (m.extra) check(item.extra?.[l] === (m.extra[l] ?? m.extra.fr), `${m.name}: ${l} extra differs`);
    }
    for (const l of LANGS) check(Boolean(item.desc[l]) && (!m.note || Boolean(item.note?.[l])), `${m.name}: missing ${l}`);
  });
}
console.log("Section            live  site");
for (const [name, a, b] of rows) console.log(`${name.padEnd(18)} ${String(a).padStart(4)}  ${String(b).padStart(4)}`);
console.log(`Total              ${String(rows.reduce((n, r) => n + r[1], 0)).padStart(4)}  ${String(rows.reduce((n, r) => n + r[2], 0)).padStart(4)}`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("OK: every listing, price and FR/PT/EN text matches the live carte; IT/DE complete.");
