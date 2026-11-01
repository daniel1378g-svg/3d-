// Checks the four dictionaries (src/i18n/{de,en,fr,it}.ts) and every translated text in the content modules
// (src/content/*.ts, shared/schedule.ts) against the German source (BRIEF §1.4 and §4):
//   errors   a key missing or extra in a language; a string turned function (or back); a different function arity;
//            {placeholders} or ${…} arguments lost; an empty text; Swiss German rules (no ß, «Reservation» not
//            «Reservierung»); fr-CH punctuation (no space before ; ! ?, guillemets without inner spaces);
//            a content text object that lacks a language
//   warnings digits of the German text missing in a translation; a long text identical to German (possible leak)
// Exit code 1 on any error. Usage: node scripts/check-i18n.mjs
import { build } from "esbuild";
import { createRequire } from "node:module";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const out = join(root, ".cache/check-i18n.cjs");
await build({
  stdin: {
    contents: `export { default as de } from "./src/i18n/de"; export { default as en } from "./src/i18n/en"; export { default as fr } from "./src/i18n/fr"; export { default as it } from "./src/i18n/it";
      export * as menu from "./src/content/menu"; export * as restaurant from "./src/content/restaurant"; export * as schedule from "./shared/schedule"; export { default as assets } from "./content/assets.json";`,
    resolveDir: root,
    loader: "ts",
  },
  bundle: true,
  platform: "node",
  format: "cjs",
  outfile: out,
  logLevel: "warning",
  alias: { "@": join(root, "src"), "@shared": join(root, "shared"), "@content": join(root, "content") },
  define: { __ARTIFACT__: "false", __PROPOSAL__: "true" },
});
const m = createRequire(import.meta.url)(out);
const LANGS = ["de", "en", "fr", "it"];
let errors = 0;
let warnings = 0;
const err = (s) => (errors++, console.log("  ✗ " + s));
const warn = (s) => (warnings++, console.log("  ! " + s));

// flatten a dictionary: path → string | function
function flat(o, prefix = "", acc = new Map()) {
  if (typeof o === "string" || typeof o === "function") acc.set(prefix, o);
  else if (Array.isArray(o)) o.forEach((v, i) => flat(v, `${prefix}[${i}]`, acc));
  else if (o && typeof o === "object") for (const [k, v] of Object.entries(o)) flat(v, prefix ? `${prefix}.${k}` : k, acc);
  else if (o !== undefined && o !== null) acc.set(prefix, String(o));
  return acc;
}
const sample = (fn) => {
  const args = Array.from({ length: fn.length }, (_, i) => (i === 0 ? 3 : `ARG${i}`));
  try {
    return String(fn(...args));
  } catch {
    return String(fn(...Array.from({ length: fn.length }, (_, i) => `ARG${i}`)));
  }
};
const placeholders = (s) => (s.match(/\{\w+\}|ARG\d/g) ?? []).sort().join(",");
const digits = (s) => s.replace(/(\d)['’.,   ](\d{3})/g, "$1$2").match(/\d+/g) ?? [];

// language-specific rules
const RULES = {
  de: [
    [/ß/, "Swiss German: «ss» instead of «ß»"],
    [/Reservierung/, "Swiss German: «Reservation», not «Reservierung»"],
  ],
  fr: [
    [/[   ][;!?](?!\w)/, "fr-CH: no space before ; ! ?"],
    [/«[   ]|[   ]»/, "fr-CH: « » without inner spaces"],
  ],
  en: [],
  it: [],
};
// proper names and codes that may stay identical to German
const SAME_OK = /^(Pizzeria Giardino|Leukerbad|Thermenstrasse|Gemmi|Torrent|Pascal|Anja|Janis|Niklas|WIR|CHF|Kids|Il film|Impressioni|Benvenuti|Prenota|[A-Z]{2}|Bella Italia.*|.*@.*|.*\+41.*)$/;

const dicts = Object.fromEntries(LANGS.map((l) => [l, flat(m[l])]));
const de = dicts.de;
console.log(`dictionaries: ${de.size} German entries`);
for (const lang of ["en", "fr", "it"]) {
  console.log(`\n[${lang}]`);
  const d = dicts[lang];
  for (const [key, src] of de) {
    if (!d.has(key)) {
      err(`${key}: missing`);
      continue;
    }
    const tr = d.get(key);
    if (typeof src !== typeof tr) {
      err(`${key}: ${typeof src} in German, ${typeof tr} in ${lang}`);
      continue;
    }
    if (typeof src === "function" && src.length !== tr.length) err(`${key}: ${src.length} arguments in German, ${tr.length} in ${lang}`);
    const a = typeof src === "function" ? sample(src) : src;
    const b = typeof tr === "function" ? sample(tr) : tr;
    if (!b.trim() && a.trim()) err(`${key}: empty`);
    if (placeholders(a) !== placeholders(b)) err(`${key}: placeholders ${placeholders(a)} ≠ ${placeholders(b)}`);
    const lost = digits(a).filter((x) => !digits(b).includes(x));
    if (lost.length) warn(`${key}: digits ${lost.join(" ")} of the German text not found`);
    if (a === b && a.length > 24 && !SAME_OK.test(a)) warn(`${key}: identical to German – «${a.slice(0, 60)}»`);
  }
  for (const key of d.keys()) if (!de.has(key)) err(`${key}: not in German`);
}
for (const lang of LANGS) {
  for (const [key, v] of dicts[lang]) {
    const s = typeof v === "function" ? sample(v) : v;
    for (const [re, msg] of RULES[lang]) if (re.test(s)) err(`${lang} ${key}: ${msg} – «${s.slice(0, 70)}»`);
  }
}

// content modules: every object that looks like a translated text must have all four languages
let texts = 0;
function scan(o, where, seen = new Set()) {
  if (!o || typeof o !== "object" || seen.has(o)) return;
  seen.add(o);
  const keys = Object.keys(o);
  const isText = keys.length > 0 && keys.every((k) => LANGS.includes(k)) && keys.some((k) => typeof o[k] === "string");
  if (isText) {
    texts++;
    for (const l of LANGS) {
      if (typeof o[l] !== "string" || !o[l].trim()) err(`${where}: no ${l} text`);
      else for (const [re, msg] of RULES[l]) if (re.test(o[l])) err(`${where} (${l}): ${msg} – «${o[l].slice(0, 70)}»`);
    }
    return;
  }
  for (const k of keys) if (typeof o[k] === "object") scan(o[k], `${where}.${k}`, seen);
}
scan({ menu: m.menu.MENUS, review: m.menu.TAG_INFO, restaurant: m.restaurant, closures: m.schedule.CLOSURES }, "content");
// alt texts of every photograph
for (const a of m.assets.assets) for (const l of LANGS) if (!a.alt?.[l]?.trim()) err(`assets.json ${a.id}: no ${l} alt text`);
console.log(`\ncontent: ${texts} translated texts checked, ${m.assets.assets.length} photographs × 4 alt texts`);
console.log(`\n${errors} errors, ${warnings} warnings`);
process.exit(errors ? 1 : 0);
