// Checks every language against the German source:
//   src/i18n/<lang>.ts   same keys, same array lengths, same {placeholders} in every string (tsc checks the shape too)
//   content/menu.json    every localized field (section titles and notes, dish names, descriptions, variant labels)
//                        present in all five languages
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
console.log("[menu]");
const menu = JSON.parse(readFileSync(join(root, "content/menu.json"), "utf8"));
const l10n = (path, o) => { if (o) for (const l of LANGS) if (!o[l]?.trim()) err(`${path}.${l}: missing`); };
for (const s of menu.sections) {
  l10n(`menu.${s.id}.title`, s.title);
  l10n(`menu.${s.id}.note`, s.note);
  for (const d of s.items) {
    l10n(`menu.${d.id}.nameI18n`, d.nameI18n);
    l10n(`menu.${d.id}.desc`, d.desc);
    d.variants.forEach((v, i) => { l10n(`menu.${d.id}.variants[${i}]`, v.label); if (!Number.isInteger(v.cents) || v.cents <= 0) err(`menu.${d.id}.variants[${i}]: cents ${v.cents}`); });
  }
}
console.log(`\n${errors} errors`);
process.exit(errors ? 1 : 0);
