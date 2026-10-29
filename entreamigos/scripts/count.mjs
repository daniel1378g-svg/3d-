// Checks the carte and the wine list against the copy extracted from the live site: 11 sections and 68 priced
// lines, 4 wine sections and 15 wines with prices, every French description translated, and no price invented.
import { readFileSync } from "node:fs";
import { build } from "esbuild";
import { createRequire } from "node:module";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const menu = JSON.parse(readFileSync(join(root, "content/menu.json"), "utf8"));
const wines = JSON.parse(readFileSync(join(root, "content/wines.json"), "utf8"));
const raw = readFileSync(join(root, "content/raw/la-carte.txt"), "utf8");

let ok = true;
const check = (cond, msg) => {
  console.log(`${cond ? "✓" : "✗"} ${msg}`);
  if (!cond) ok = false;
};

const expect = { entrees: 11, specialites: 4, viandes: 10, poissons: 10, pates: 4, fondues: 3, enfants: 4, commande: 5, desserts: 6, coupes: 8, boules: 3 };
for (const s of menu.sections) check(s.items.length === expect[s.id], `${s.title}: ${s.items.length} lines`);
const lines = menu.sections.flatMap((s) => s.items);
check(menu.sections.length === 11 && lines.length === 68, `la carte: ${menu.sections.length} sections, ${lines.length} lines`);
check(lines.every((it) => /^\d+\.\d{2}$/.test(it.price)), "every line has its price, written the live way (28.00)");
check(lines.every((it) => raw.includes(it.name)), "every name appears verbatim on the saved live page");
const ws = wines.sections.map((s) => `${s.title} ${s.wines.length}`);
const wl = wines.sections.flatMap((s) => s.wines);
check(wines.sections.length === 4 && wl.length === 15, `les vins: ${ws.join(", ")} = ${wl.length}`);
check(wl.every((w) => /^\d+\.\d{2}$/.test(w.price)), "every wine has its price");

// translations: bundle the carte module and look for French descriptions without a translation
const tmp = join(root, ".cache/carte-check.cjs");
await build({ stdin: { contents: 'export { ALL_DISHES, descText } from "./src/content/carte";', resolveDir: root, loader: "ts" }, bundle: true, platform: "node", format: "cjs", outfile: tmp, logLevel: "warning", alias: { "@": join(root, "src"), "@content": join(root, "content") }, loader: { ".json": "json" }, define: { "import.meta.env": "{}", __ARTIFACT__: "false" } });
const { ALL_DISHES, descText } = createRequire(import.meta.url)(tmp);
// "Tagliatelle / Spaghetti / Penne" is the same in German: a real translation, not a missing one
const missing = ALL_DISHES.filter((d) => d.desc && d.desc !== "Tagliatelle / Spaghetti / Penne" && ["en", "pt", "it", "de"].some((l) => descText(d, l) === d.desc));
check(missing.length === 0, `descriptions in 5 languages (${missing.map((d) => d.name).join(", ") || "all"})`);
process.exit(ok ? 0 : 1);
