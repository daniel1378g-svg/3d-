// Counts the sections and dishes in content/menu.json (the hand-off reports these numbers).
import { readFileSync } from "node:fs";
const menu = JSON.parse(readFileSync(new URL("../content/menu.json", import.meta.url), "utf8"));
let dishes = 0;
for (const s of menu.sections) {
  dishes += s.items.length;
  console.log(`${s.title.de.padEnd(22)} ${String(s.items.length).padStart(2)}  ${s.venue}`);
}
console.log(`${menu.sections.length} sections, ${dishes} dishes`);
