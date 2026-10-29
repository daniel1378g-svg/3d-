// Checks the content against the live capture: every live German text in content/texts.de.json appears verbatim
// in the saved live pages, the live Portuguese likewise, every key has its four translations (Swiss "ss", no ß),
// 32 pictures listed, 35 web dishes, 80 PDF rows, 5 reviews, the live hours.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const de = JSON.parse(readFileSync(join(root, "content/texts.de.json"), "utf8"));
const ptLive = JSON.parse(readFileSync(join(root, "content/texts.pt.json"), "utf8"));
const rawDir = join(root, "content/raw");
const raw = readdirSync(rawDir).filter((f) => f.endsWith(".txt")).map((f) => readFileSync(join(rawDir, f), "utf8")).join("\n").replace(/\s+/g, " ");
let ok = true;
const check = (cond, msg) => {
  console.log(`${cond ? "✓" : "✗"} ${msg}`);
  if (!cond) ok = false;
};
const norm = (s) => s.replace(/\s+/g, " ").trim();
const live = Object.entries(de).filter(([k, v]) => !k.startsWith("n_") && !k.startsWith("_") && v);
const missing = live.filter(([, v]) => !raw.includes(norm(v))).map(([k]) => k);
check(missing.length === 0, `${live.length} live German texts found verbatim in the captured pages${missing.length ? " (missing: " + missing.join(", ") + ")" : ""}`);
const livePt = Object.entries(ptLive).filter(([k, v]) => !k.startsWith("_") && v);
const missingPt = livePt.filter(([, v]) => !raw.includes(norm(v))).map(([k]) => k);
check(missingPt.length === 0, `${livePt.length} live Portuguese texts found verbatim${missingPt.length ? " (missing: " + missingPt.join(", ") + ")" : ""}`);
for (const l of ["pt", "fr", "it", "en"]) {
  const t = JSON.parse(readFileSync(join(root, `content/translations/${l}.json`), "utf8"));
  const miss = Object.keys(de).filter((k) => k !== "_source" && !(k in t));
  const ess = Object.values(t).filter((v) => /ß/.test(String(v))).length;
  check(miss.length === 0 && ess === 0, `${l}: ${Object.keys(t).length} keys${miss.length ? ", missing " + miss.join(", ") : ""}${ess ? ", ß found" : ""}`);
}
check(!Object.values(de).some((v) => /ß/.test(String(v))), "German: Swiss ss, no ß");
const photos = JSON.parse(readFileSync(join(root, "content/photos.list.json"), "utf8"));
const alts = JSON.parse(readFileSync(join(root, "content/translations/photos.json"), "utf8"));
check(photos.length === 32 && photos.every((p) => alts[p.id] && ["de", "pt", "fr", "it", "en"].every((l) => alts[p.id][l])), `${photos.length} pictures listed, each with five alt texts`);
const menu = JSON.parse(readFileSync(join(root, "content/menu.json"), "utf8"));
const web = menu.web.flatMap((s) => s.items);
const rows = [...menu.pdf.takeaway, ...menu.pdf.anfrage, ...menu.pdf.restaurant];
check(web.length === 35, `${web.length} web dishes (7 Vorspeisen, 20 Hauptgerichte, 1 Suppe, 1 Salat, 6 Desserts)`);
const webMissing = web.filter((d) => !raw.includes(d.de) || !raw.includes(d.pt)).map((d) => d.id);
check(webMissing.length === 0, `web dish names verbatim (DE and PT)${webMissing.length ? ": missing " + webMissing.join(", ") : ""}`);
const pdfTxt = readFileSync(join(rawDir, "menu_de.txt"), "utf8").replace(/\s+/g, " ");
const pdfMissing = rows.filter((r) => !pdfTxt.includes(r.pt) || !pdfTxt.includes(`${r.price} ${r.unit}`)).map((r) => r.id);
check(rows.length === 80 && pdfMissing.length === 0, `${rows.length} PDF rows with their Portuguese line and price found in menu_de.pdf${pdfMissing.length ? ": " + pdfMissing.join(", ") : ""}`);
check(!JSON.stringify(menu).includes('"0 CHF"') && rows.every((r) => Number(r.price) > 0), "no 0 CHF price anywhere");
check(web.filter((d) => d.pdf).length === 18, `${web.filter((d) => d.pdf).length} web dishes carry a PDF price, ${web.filter((d) => !d.pdf).length} are 'auf Anfrage'`);
const reviews = JSON.parse(readFileSync(join(root, "content/reviews.json"), "utf8")).reviews;
check(reviews.length === 5 && reviews.map((r) => r.author).join("|") === "Sandrine Rodrigues|Katy Nail Designer|Susana Rodrigues|Rui Valentim|Nuno Coelho", "5 reviews in the supplied order");
for (const [n, v] of [["Mo, Mi – So", "9:30 Uhr bis 22:30 Uhr"], ["Ruhetag.", "Dienstag"]]) check(raw.includes(n) && raw.includes(v), `hours: ${n} ${v}`);
process.exit(ok ? 0 : 1);
