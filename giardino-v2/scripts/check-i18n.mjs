// Every text exists in German, French, English and Italian; Swiss German writes "ss" (no ß); prose uses typographic
// apostrophes. Run with `npm run check:i18n`.
import { build } from "esbuild";
import { createRequire } from "node:module";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const out = join(root, ".cache/i18n-check.cjs");
await build({
  stdin: {
    contents: `export { UI, WELCOME } from "./src/i18n"; export { TX } from "./src/content/copy"; export { PX } from "./src/content/pages"; export { MENUS } from "./src/content/business"; export { CLOSURES } from "./src/content/hours"; export { REVIEWS } from "./src/content/reviews"; export { pageTitle, pageDescription } from "./src/seo"; export { PAGES } from "./src/i18n";`,
    resolveDir: root,
    loader: "ts",
  },
  bundle: true, platform: "node", format: "cjs", outfile: out, logLevel: "warning",
  alias: { "@": join(root, "src") }, loader: { ".json": "json" },
  define: { "import.meta.env": JSON.stringify({ BASE_URL: "/" }), __ARTIFACT__: "false" },
});
const m = createRequire(import.meta.url)(out);
const LANGS = ["de", "fr", "en", "it"];
const ALLOWED_EMPTY = new Set(["TX.vouchersLangNote"]);
const problems = [];
let count = 0;
const isL = (v) => v && typeof v === "object" && LANGS.every((l) => l in v) && Object.keys(v).length === 4;
function visit(v, path) {
  if (isL(v)) {
    count++;
    for (const l of LANGS) {
      const s = v[l];
      if (typeof s !== "string") problems.push(`${path}.${l}: not a string`);
      else if (!s.trim() && !(ALLOWED_EMPTY.has(path) && l !== "it")) problems.push(`${path}.${l}: empty`);
      if (l === "de" && /ß/.test(s)) problems.push(`${path}.de: ß (Swiss German writes ss)`);
      if (/[A-Za-zÀ-ÿ]'[A-Za-zÀ-ÿ]/.test(s) && !path.startsWith("REVIEWS")) problems.push(`${path}.${l}: straight apostrophe`);
    }
    return;
  }
  if (Array.isArray(v)) v.forEach((x, i) => visit(x, `${path}[${i}]`));
  else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) visit(x, `${path}.${k}`);
}
for (const name of ["UI", "TX", "PX", "MENUS", "CLOSURES", "REVIEWS"]) visit(m[name], name);
for (const page of m.PAGES) for (const l of LANGS) {
  count++;
  if (!m.pageTitle(l, page) || !m.pageDescription(l, page)) problems.push(`seo ${page}.${l}: missing`);
}
// the reviews keep their original wording, character for character
const ORIGINAL = [
  "Good Pizza and nice, cozy atmosphere! Would recommend!",
  "Really excellent pizza and pasta, both - surprisingly good for an obviously touristy place at the center of a touristy town!",
  "Reasonable priced, vegan options and suitable for family. Great pizzas and soups",
  "Goooood Pizzé Waitress are good and do care about how u doing, price are faire and the restaurant deco it's really nice",
  "Excellent. Tasty food, good service, very pleasant atmosphere. Price ok. I recommend it",
  "Good pizza, good pasta, nice place, and great for kids with lots of stuff for them to play with!",
];
m.REVIEWS.forEach((r, i) => r.text !== ORIGINAL[i] && problems.push(`review ${r.id}: wording changed`));
console.log(`${count} texts × 4 languages checked, ${m.REVIEWS.length} reviews verbatim`);
if (problems.length) {
  console.log(problems.join("\n"));
  process.exit(1);
}
console.log("ok");
