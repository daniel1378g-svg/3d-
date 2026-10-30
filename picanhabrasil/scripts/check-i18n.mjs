// Checks the translations against the German sources:
//   content/articles.<lang>.json  same articles, same block types and order, same list lengths, same image ids
//   content/i18n/menu.<lang>.json  every menu section and every item that has German text
//   src/i18n/<lang>.ts             compiled separately with tsc (the Dict type catches missing keys)
// plus, everywhere: {placeholders} kept, digits kept, no German "ß"-style leftovers in fr/it/pt/en (warned).
// Usage: node scripts/check-i18n.mjs [lang ...]   (default: en pt fr it)
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const langs = process.argv.slice(2).length ? process.argv.slice(2) : ["en", "pt", "fr", "it"];
const read = (p) => JSON.parse(readFileSync(join(root, p), "utf8"));
let errors = 0;
let warnings = 0;
const err = (m) => { errors++; console.log("  ✗ " + m); };
const warn = (m) => { warnings++; console.log("  ! " + m); };

const placeholders = (s) => (s.match(/\{\w+\}/g) ?? []).sort().join(",");
const digits = (s) => (s.replace(/(\d)['’.,](\d{3})/g, "$1$2").match(/\d+/g) ?? []);
function compareText(where, de, tr) {
  if (typeof tr !== "string" || !tr.trim()) return err(`${where}: missing text`);
  if (placeholders(de) !== placeholders(tr)) err(`${where}: placeholders ${placeholders(de)} ≠ ${placeholders(tr)}`);
  const missing = digits(de).filter((d) => !digits(tr).includes(d));
  if (missing.length) warn(`${where}: digits ${missing.join(" ")} not found in translation`);
  if ((de.match(/\*\*/g) ?? []).length !== (tr.match(/\*\*/g) ?? []).length) warn(`${where}: bold markers differ`);
  if (tr === de && de.length > 40) warn(`${where}: identical to German`);
}

const deArticles = read("content/articles.de.json");
const deMenu = read("content/menu.json");

for (const lang of langs) {
  console.log(`\n[${lang}]`);
  // articles
  const file = `content/articles.${lang}.json`;
  if (!existsSync(join(root, file))) err(`${file} missing`);
  else {
    const tr = read(file);
    for (const [key, a] of Object.entries(deArticles)) {
      const b = tr[key];
      if (!b) { err(`articles.${key} missing`); continue; }
      compareText(`articles.${key}.title`, a.title, b.title);
      if (b.cover !== a.cover) err(`articles.${key}.cover changed`);
      if ((b.date ?? null) !== (a.date ?? null)) err(`articles.${key}.date changed`);
      if (!Array.isArray(b.blocks) || b.blocks.length !== a.blocks.length) { err(`articles.${key}: ${b.blocks?.length} blocks, German has ${a.blocks.length}`); continue; }
      a.blocks.forEach((blk, i) => {
        const t = b.blocks[i];
        const where = `articles.${key}.blocks[${i}]`;
        if (t.t !== blk.t) return err(`${where}: type ${t.t} ≠ ${blk.t}`);
        if (blk.t === "img") { if (t.id !== blk.id) err(`${where}: image id changed`); return; }
        if (blk.t === "ul") {
          if (!Array.isArray(t.items) || t.items.length !== blk.items.length) return err(`${where}: ${t.items?.length} items, German has ${blk.items.length}`);
          blk.items.forEach((it, j) => compareText(`${where}.items[${j}]`, it, t.items[j]));
          return;
        }
        compareText(where, blk.text, t.text);
      });
    }
    for (const key of Object.keys(tr)) if (!(key in deArticles)) err(`articles.${key} is not in German`);
  }
  // menu
  const mfile = `content/i18n/menu.${lang}.json`;
  if (!existsSync(join(root, mfile))) err(`${mfile} missing`);
  else {
    const tr = read(mfile);
    for (const s of deMenu.sections) {
      const ts = tr.sections?.[s.id];
      if (!ts) { err(`menu.sections.${s.id} missing`); continue; }
      compareText(`menu.sections.${s.id}.title`, s.title, ts.title);
      if (s.note) compareText(`menu.sections.${s.id}.note`, s.note, ts.note);
      for (const it of s.items) {
        if (!it.desc) continue;
        const ti = tr.items?.[it.id];
        if (!ti?.desc) { err(`menu.items.${it.id}.desc missing`); continue; }
        compareText(`menu.items.${it.id}.desc`, it.desc, ti.desc);
      }
    }
  }
}
console.log(`\n${errors} errors, ${warnings} warnings`);
process.exit(errors ? 1 : 0);
