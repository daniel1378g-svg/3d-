// Checks the carte and the wine list against the copy extracted from the live site: section and region
// counts, totals (35 listings, 43 wines), prices present where the live carte has them, and that every
// description has its four translations.
import { readFileSync } from "node:fs";
import { build } from "esbuild";
import { createRequire } from "node:module";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const carte = JSON.parse(readFileSync(join(root, "content/carte.live.json"), "utf8"));
const vins = JSON.parse(readFileSync(join(root, "content/vins.live.json"), "utf8"));

let ok = true;
const check = (cond, msg) => {
  console.log(`${cond ? "✓" : "✗"} ${msg}`);
  if (!cond) ok = false;
};

const expectCarte = { entradas: 7, pratos: 8, "sur-commande": 11, sobremesas: 9 };
for (const s of carte.sections) check(s.items.length === expectCarte[s.id], `${s.live}: ${s.items.length} listings`);
const listings = carte.sections.reduce((n, s) => n + s.items.length, 0);
check(listings === 35, `la carte: ${carte.sections.length} sections, ${listings} listings`);
const priced = carte.sections.filter((s) => s.id !== "sur-commande").flatMap((s) => s.items);
check(priced.every((d) => d.price), `prices: ${priced.length} priced listings all have their price (${priced.map((d) => d.price).join(" ")})`);

const expectVins = { tinto: 26, rosado: 3, branco: 14 };
for (const c of vins.colours) {
  const n = c.regions.reduce((k, r) => k + r.wines.length, 0);
  check(n === expectVins[c.id], `${c.live}: ${c.regions.map((r) => `${r.name} ${r.wines.length}`).join(", ")} = ${n}`);
}
const wines = vins.colours.flatMap((c) => c.regions.flatMap((r) => r.wines));
const groups = vins.colours.reduce((n, c) => n + c.regions.length, 0);
check(wines.length === 43 && groups === 14, `les vins: ${groups} regional groups, ${wines.length} wines`);
check(wines.every((w) => /%$/.test(w.abv)), "every wine has its alcohol degree");

// translations, through the same module the site uses
const tmp = join(root, ".cache/carte.cjs");
await build({ entryPoints: [join(root, "src/content/carte.ts")], bundle: true, platform: "node", format: "cjs", outfile: tmp, logLevel: "warning", alias: { "@": join(root, "src"), "@content": join(root, "content") }, loader: { ".json": "json" } });
const { ALL_DISHES } = createRequire(import.meta.url)(tmp);
const missing = ALL_DISHES.filter((d) => ["fr", "en", "pt", "it", "de"].some((l) => !d.desc[l]));
check(missing.length === 0, `descriptions in 5 languages for all ${ALL_DISHES.length} dishes`);
process.exit(ok ? 0 : 1);
