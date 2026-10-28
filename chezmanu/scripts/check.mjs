// Checks the facts the brief insists on, against the content files and the built site:
//   la carte: 5 sections, 35 listings, 13 teas, every price as on the live page (content/raw/ce-que-nous-proposons.txt)
//   products: every product from the live home page, none with a price
//   photos: all 18 shop photos in the gallery wall, each with alt text in five languages
//   strings: every text in five languages, no «ß» in the Swiss German, no template leftovers
//   legal: the translations have as many blocks as the French
//   build: 25 pages with their own <html lang>, title, hreflang and JSON-LD (after `npm run build`)
import { build } from "esbuild";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const tmp = join(root, ".cache/check.cjs");
await build({
  stdin: {
    contents: 'export * from "./src/i18n"; export { CARTE, CARTE_ITEMS, TEAS, PRODUCTS, PHOTOS, WALL, chf } from "./src/content"; export { LEGAL_COUNTS } from "./src/legal";',
    resolveDir: root,
    loader: "ts",
  },
  bundle: true, platform: "node", format: "cjs", outfile: tmp, logLevel: "warning",
  alias: { "@": join(root, "src"), "@content": join(root, "content") },
  define: { __ARTIFACT__: "false" },
});
const m = createRequire(import.meta.url)(tmp);
let failures = 0;
const ok = (cond, msg) => {
  console.log(`${cond ? "✓" : "✗"} ${msg}`);
  if (!cond) failures++;
};

// La carte
const sections = m.CARTE.map((s) => `${s.title.fr} ${s.items.length}`);
ok(m.CARTE.length === 5, `5 carte sections (${sections.join(", ")})`);
ok(m.CARTE_ITEMS.length === 35, `35 listings (${m.CARTE_ITEMS.length})`);
ok(m.TEAS.length === 13, `13 Sirocco teas (${m.TEAS.length})`);
const expected = { cafes: 8, thes: 1, "petit-dejeuner": 2, "petites-restaurations": 10, "autres-boissons": 14 };
ok(m.CARTE.every((s) => expected[s.id] === s.items.length), "listings per section 8 / 1 / 2 / 10 / 14");
const live = readFileSync(join(root, "content/raw/ce-que-nous-proposons.txt"), "utf8");
const livePrices = [...live.matchAll(/^(\d+\.\d+) ?chf$/gim)].map((x) => Number(x[1]).toFixed(2));
const ourPrices = m.CARTE.flatMap((s) => (s.id === "petit-dejeuner" ? [s.items[0].price] : s.items.map((i) => i.price))).map((p) => Number(p).toFixed(2));
ok(JSON.stringify(livePrices) === JSON.stringify(ourPrices), `prices in live order match (${livePrices.length}: ${livePrices.join(" ")})`);
const liveNames = m.CARTE_ITEMS.filter((i) => !["pdj-1", "pdj-2"].includes(i.id)).map((i) => i.liveName.replace(/\s*\(.*$/, ""));
const missing = liveNames.filter((n) => !live.includes(n));
ok(missing.length === 0, `every listing name appears on the live page${missing.length ? ": missing " + missing.join(", ") : ""}`);
ok(m.TEAS.every((t) => live.includes(t.name)), "every tea name appears on the live page");
ok(m.chf("12.0") === "CHF 12.00" && m.chf("4.10") === "CHF 4.10", "prices written CHF 4.10 / CHF 12.00");

// Products
ok(m.PRODUCTS.length === 32, `32 products (${m.PRODUCTS.filter((p) => p.origin === "pt").length} pt, ${m.PRODUCTS.filter((p) => p.origin === "ch").length} ch, ${m.PRODUCTS.filter((p) => p.origin === "both").length} both)`);
ok(m.PRODUCTS.every((p) => !("price" in p)), "no product carries a price");
const home = readFileSync(join(root, "content/raw/home.txt"), "utf8") + readFileSync(join(root, "content/raw/ce-que-nous-proposons.txt"), "utf8");
const notOnLive = m.PRODUCTS.filter((p) => !home.toLowerCase().includes(p.name.fr.toLowerCase().replace(/^(gâteau|biscuits) /, "")));
ok(notOnLive.length === 0, `every product name comes from the live text${notOnLive.length ? ": " + notOnLive.map((p) => p.name.fr).join(", ") : ""}`);

// Photos
ok(m.PHOTOS.length === 18 && m.WALL.length === 18, `18 shop photos, all on the gallery wall (${m.WALL.length})`);
ok(m.PHOTOS.every((p) => m.LANGS.every((l) => p.alt[l] && p.alt[l].length > 10)), "every photo has alt text in fr, en, pt, it, de");

// Strings
const ALLOWED_EMPTY = new Set(["UI.proposalLocal.pt", "UI.legalCheck.fr", "UI.showFrench.fr", "UI.showTranslation.fr"]);
let strings = 0;
const empty = [];
const eszett = [];
for (const [group, rec] of [["TEXT", m.TEXT], ["UI", m.UI], ...Object.entries(m.SEO).flatMap(([k, v]) => [[`SEO.${k}.title`, { t: v.title }], [`SEO.${k}.description`, { t: v.description }]])]) {
  for (const [key, val] of Object.entries(rec)) {
    if (typeof val === "string") continue;
    for (const l of m.LANGS) {
      strings++;
      const id = `${group}.${key}.${l}`.replace(".t.", ".");
      if (!val[l] && !ALLOWED_EMPTY.has(id)) empty.push(id);
      if (l === "de" && val[l]?.includes("ß")) eszett.push(id);
    }
  }
}
ok(empty.length === 0, `${strings} interface strings, none empty${empty.length ? ": " + empty.join(", ") : ""}`);
ok(eszett.length === 0, `no «ß» in the Swiss German${eszett.length ? ": " + eszett.join(", ") : ""}`);
const src = readdirSync(join(root, "src"), { recursive: true }).filter((f) => /\.(tsx?|json)$/.test(f)).map((f) => readFileSync(join(root, "src", f), "utf8")).join("\n") + readFileSync(join(root, "content/carte.json"), "utf8") + readFileSync(join(root, "content/products.json"), "utf8");
const leftovers = ["Slide title", "Write your caption here", "Share by:", "Sips Corner", "Sips corner", ">Button<"].filter((s) => src.includes(s));
ok(leftovers.length === 0, `no template leftovers${leftovers.length ? ": " + leftovers.join(", ") : ""}`);
ok(Object.values(m.LEGAL_COUNTS.translated).every(([p, n]) => p === m.LEGAL_COUNTS.privacy && n === m.LEGAL_COUNTS.notice), `legal translations block for block (${m.LEGAL_COUNTS.privacy} + ${m.LEGAL_COUNTS.notice})`);

// Built site
const dist = join(root, "dist");
if (existsSync(dist)) {
  let pages = 0;
  const bad = [];
  for (const l of m.LANGS)
    for (const [page, slug] of Object.entries(m.SLUGS[l])) {
      const f = join(dist, l, slug, "index.html");
      if (!existsSync(f)) {
        bad.push(`${l}/${slug} missing`);
        continue;
      }
      const html = readFileSync(f, "utf8");
      pages++;
      if (!html.includes(`<html lang="${m.HTML_LANG[l]}">`)) bad.push(`${l}/${slug} lang`);
      if (!html.includes(`<title>${m.SEO[page].title[l].replace(/&/g, "&amp;")}</title>`)) bad.push(`${l}/${slug} title`);
      if ((html.match(/hreflang=/g) ?? []).length !== 6) bad.push(`${l}/${slug} hreflang`);
      if (!html.includes('"@type":"Bakery"') || !html.includes('"Mo-Fr 06:30-18:30"') || !html.includes('"Sa,Su 06:30-18:00"')) bad.push(`${l}/${slug} JSON-LD`);
    }
  ok(pages === 25 && bad.length === 0, `25 built pages with lang, title, hreflang and Bakery JSON-LD${bad.length ? ": " + bad.join(", ") : ""}`);
  ok(readFileSync(join(dist, "_redirects"), "utf8").includes("/mentions-legales  /fr/mentions-legales  301"), "old addresses redirect to the French pages");
} else console.log("· dist/ not built: run `npm run build` first for the page checks");

console.log(failures ? `\n${failures} check(s) failed` : "\nall checks passed");
process.exit(failures ? 1 : 0);
