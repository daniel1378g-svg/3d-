// Checks the content against the live capture: every German text in content/texts.de.json appears verbatim in
// the saved live pages, every key has its four translations, 34 photos, both sets of hours as on the site.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const de = JSON.parse(readFileSync(join(root, "content/texts.de.json"), "utf8"));
const raw = readdirSync(join(root, "content/raw")).filter((f) => f.endsWith(".txt")).map((f) => readFileSync(join(root, "content/raw", f), "utf8")).join("\n");
let ok = true;
const check = (cond, msg) => {
  console.log(`${cond ? "✓" : "✗"} ${msg}`);
  if (!cond) ok = false;
};
const live = Object.entries(de).filter(([k]) => !k.startsWith("ui_") && !k.startsWith("chapter") && !k.startsWith("_") && !k.endsWith("_title") && !k.endsWith("_desc"));
const missing = live.filter(([, v]) => !raw.includes(v)).map(([k]) => k);
check(missing.length === 0, `${live.length} live texts found verbatim in the captured pages${missing.length ? " (missing: " + missing.join(", ") + ")" : ""}`);
for (const l of ["en", "pt", "fr", "it"]) {
  const t = JSON.parse(readFileSync(join(root, `content/translations/${l}.json`), "utf8"));
  const miss = Object.keys(de).filter((k) => k !== "_source" && !t[k]);
  const ess = Object.values(t).filter((v) => /ß/.test(String(v))).length;
  check(miss.length === 0 && ess === 0, `${l}: ${Object.keys(t).length} keys${miss.length ? ", missing " + miss.join(", ") : ""}${ess ? ", ß found" : ""}`);
}
const photos = JSON.parse(readFileSync(join(root, "content/photos.list.json"), "utf8"));
check(photos.length === 34, `${photos.length} photos listed (35 files on the live site, one a duplicate variant)`);
for (const [n, v] of [["Mo - Do", "11:00"], ["Freitag", "1:00"], ["Samstag", "9:00"], ["Sonntag", "22:00"], ["Montag", "Geschlossen"], ["Di - Fr", "14:00"]]) check(raw.includes(n) && raw.includes(v), `hours: ${n} ${v}`);
process.exit(ok ? 0 : 1);
