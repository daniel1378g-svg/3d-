// Checks src/content/menu.ts against the text read from the PDFs (content/sources/ocr):
//   1. every entry's German words are found on its page (≥ 85 % of words of 3+ letters; corrections excepted)
//   2. every price of an entry is printed on its page
//   3. every price printed on a page belongs to an entry or a note (nothing on the PDF is left out)
// Exit code 1 on any failure.
import { build } from "esbuild";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const tmp = join(root, ".cache/check-menu.cjs");
await build({ entryPoints: [join(root, "src/content/menu.ts")], bundle: true, platform: "node", format: "cjs", outfile: tmp, logLevel: "warning", define: { __PROPOSAL__: "true", __ARTIFACT__: "false" } });
const { MENUS } = createRequire(import.meta.url)(tmp);

const ocr = (f) => readFileSync(join(root, "content/sources/ocr", f), "utf8");
const PAGES = {
  food: (p) => ocr(`speise-00${p - 1}.txt`),
  drinks: (p) => ocr(`getraenke-00${p - 1}.txt`),
  kids: () => ocr("kids-text-layer.txt"),
  desserts: () => ocr("dessert-text-layer.txt"),
};
// prices printed in notes rather than on an entry
// (the kids and dessert PDFs have a text layer covering both pages, so they are checked as one page)
const NOTE_PRICES = { "food:4": [3, 3, 2, 2], "food:6": [11.3, 14, 17, 21, 11.3, 14, 17, 21] /* serving hours of the meat dishes */, "kids:1": [4, 1.5], "desserts:1": [4, 1.5] };
// words changed on purpose (see MENU_CORRECTIONS) or added for clarity, ignored in check 1
const IGNORE = new Set(["saltimbocca", "acqua", "fuze", "tea", "ramazzotti", "brûlée", "vecchia", "puglia", "moroccan", "maître", "holunderblüte", "coca", "cola", "offenausschank", "zugedeckt", "kindersalat", "hausgemacht", "eichenholz", "glace", "bananen", "chocolat", "gepudert", "kakao"].map((w) => w.normalize("NFD").replace(/[\u0300-\u036f]/g, "")));

const norm = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[„“”«»"'’`´]/g, " ").replace(/ß/g, "ss").replace(/[^a-z0-9äöüéèêàâçœëïîôûù.,% -]/gi, " ").replace(/\s+/g, " ");
const words = (s) => norm(s).split(/[\s,.()/-]+/).filter((w) => w.length >= 3 && !/^\d/.test(w));
const pricesIn = (text) => [...text.matchAll(/(?<![\d/])(\d{1,2})[.,](\d{2})(?![\d/])/g)].map((m) => Number(`${m[1]}.${m[2]}`));

let failures = 0;
const fail = (msg) => { failures++; console.log("  ✗ " + msg); };

// group entries by the PDF page they come from
const pages = new Map();
const pageOf = (menu, section, item) => {
  if (item.src.pdf === menu.id) return item.src.page;
  return 1; // shared Frisco items printed on the kids menu too
};
const keyOf = (menu, section, item) => {
  const p = pageOf(menu, section, item);
  return menu.id === "kids" || menu.id === "desserts" ? `${menu.id}:1` : `${menu.id}:${p}`;
};
for (const menu of MENUS) {
  for (const section of menu.sections) {
    for (const group of section.groups) {
      for (const item of group.items) {
        const key = keyOf(menu, section, item);
        if (!pages.has(key)) pages.set(key, []);
        pages.get(key).push(item);
      }
    }
  }
}

let entries = 0;
for (const [key, items] of [...pages].sort()) {
  const [menu, p] = key.split(":");
  const text = PAGES[menu](Number(p));
  const ntext = norm(text);
  console.log(`${key}  ${items.length} entries`);
  for (const item of items) {
    entries++;
    const ws = words(`${item.name.de} ${item.desc?.de ?? ""}`).filter((w) => !IGNORE.has(w));
    const missing = ws.filter((w) => !ntext.includes(w));
    if (ws.length && missing.length / ws.length > 0.15) fail(`${item.id}: words not on page: ${missing.join(", ")}`);
    for (const pr of item.prices) {
      if (!pricesIn(text).some((x) => Math.abs(x - pr.chf) < 0.001)) fail(`${item.id}: price ${pr.chf.toFixed(2)} not on page`);
    }
  }
  // reverse: every printed price is used
  const printed = pricesIn(text);
  const used = [...items.flatMap((i) => i.prices.map((pr) => pr.chf)), ...(NOTE_PRICES[key] ?? [])];
  const pool = [...used];
  const unmatched = [];
  for (const x of printed) {
    const i = pool.findIndex((u) => Math.abs(u - x) < 0.001);
    if (i >= 0) pool.splice(i, 1);
    else unmatched.push(x);
  }
  if (unmatched.length) fail(`${key}: printed prices without an entry: ${unmatched.map((x) => x.toFixed(2)).join(", ")}`);
}
console.log(`\n${entries} entries checked on ${pages.size} pages – ${failures ? failures + " problem(s)" : "all words and prices match the PDFs"}`);
process.exit(failures ? 1 : 0);
