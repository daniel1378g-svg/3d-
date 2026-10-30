// Checks every language against the German source:
//   src/i18n/<lang>.ts   same keys, same array lengths, same {placeholders} in every string (tsc checks the shape too)
//   content/assets.json  every public image has an alt text
// Usage: node scripts/check-i18n.mjs
import { build } from "esbuild";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const out = join(root, ".cache/i18n.cjs");
await build({
  stdin: { contents: `export { de } from "./src/i18n/de"; export { en } from "./src/i18n/en"; export { pt } from "./src/i18n/pt"; export { fr } from "./src/i18n/fr"; export { it } from "./src/i18n/it";`, resolveDir: root, loader: "ts" },
  bundle: true, platform: "node", format: "cjs", outfile: out, logLevel: "warning",
});
const dicts = createRequire(import.meta.url)(out);
const LANGS = ["de", "en", "pt", "fr", "it"];
let errors = 0;
const err = (m) => { errors++; console.log("  ✗ " + m); };
const ph = (s) => (s.match(/\{\w+\}/g) ?? []).sort().join(",");

function compare(path, a, b) {
  if (typeof a === "string") {
    if (typeof b !== "string" || !b.trim()) return err(`${path}: missing`);
    if (ph(a) !== ph(b)) err(`${path}: placeholders ${ph(a)} ≠ ${ph(b)}`);
    return;
  }
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return err(`${path}: ${b?.length} items, German has ${a.length}`);
    return a.forEach((x, i) => compare(`${path}[${i}]`, x, b[i]));
  }
  for (const k of Object.keys(a)) compare(`${path}.${k}`, a[k], b?.[k]);
  for (const k of Object.keys(b ?? {})) if (!(k in a)) err(`${path}.${k}: not in German`);
}
for (const l of LANGS.slice(1)) {
  console.log(`[${l}]`);
  compare(l, dicts.de, dicts[l]);
}
// every public image has an alt text in the dictionary
const assets = JSON.parse(readFileSync(join(root, "content/assets.json"), "utf8")).assets;
console.log("[alts]");
for (const a of assets) if (a.public && !["video", "brand"].includes(a.category) && a.id !== "logo" && !dicts.de.alts[a.id]) err(`alts.${a.id}: missing`);
console.log(`\n${errors} errors`);
process.exit(errors ? 1 : 0);
