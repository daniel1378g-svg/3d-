// Pulls the texts and the carte out of the saved copy of picapau.ch (content/raw/live.html).
// The live page keeps them in one inline script: `const T = {fr, pt, en}`, `const MENU = [...]` and
// `const PREORDER = [...]`. Only those three object literals are evaluated, in an empty sandbox.
//   node scripts/extract-live.mjs   →   content/raw/live-data.json
import { readFileSync, writeFileSync } from "node:fs";
import vm from "node:vm";

const root = new URL("..", import.meta.url).pathname;
const html = readFileSync(`${root}content/raw/live.html`, "utf8");
const script = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).find((s) => s.includes("const MENU"));

/** The literal that follows `const name =`, matched by bracket depth (strings skipped). */
function literal(name) {
  const start = script.indexOf(`const ${name} =`);
  let i = script.indexOf("=", start) + 1;
  while (/\s/.test(script[i])) i++;
  const open = script[i], close = open === "{" ? "}" : "]";
  let depth = 0, quote = null;
  for (let j = i; j < script.length; j++) {
    const c = script[j];
    if (quote) {
      if (c === "\\") j++;
      else if (c === quote) quote = null;
      continue;
    }
    if (c === "'" || c === '"' || c === "`") quote = c;
    else if (c === open) depth++;
    else if (c === close && --depth === 0) return script.slice(i, j + 1);
  }
  throw new Error(`no literal for ${name}`);
}
const evaluate = (src) => vm.runInNewContext(`(${src})`, Object.create(null), { timeout: 200 });
const data = { source: "https://picapau.ch/", captured: "2026-10-29", T: evaluate(literal("T")), MENU: evaluate(literal("MENU")), PREORDER: evaluate(literal("PREORDER")) };

// The gallery alt texts live in another script (numbered photos 1.webp … 7.webp).
const gallery = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).find((s) => s.includes("altTexts"));
data.galleryAlt = evaluate(gallery.match(/const altTexts = (\{[\s\S]*?\});/)[1]);
const jsonld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
data.jsonLd = jsonld ? JSON.parse(jsonld[1]) : null;
writeFileSync(`${root}content/raw/live-data.json`, JSON.stringify(data, null, 1));
const counts = {};
for (const item of data.MENU) counts[item.cat] = (counts[item.cat] ?? 0) + 1;
console.log("listings per section", counts, "sur commande", data.PREORDER.length);
