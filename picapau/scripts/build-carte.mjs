// Builds content/carte.json, the one source of the carte for the site.
//   FR / PT / EN: verbatim from the live site (content/raw/live-data.json, see extract-live.mjs)
//   IT / DE:      content/carte-it-de.json
// Line breaks the live site writes as <br> become "\n". Prices stay exactly as the live site writes them.
//   node scripts/build-carte.mjs
import { readFileSync, writeFileSync } from "node:fs";

const root = new URL("..", import.meta.url).pathname;
const live = JSON.parse(readFileSync(`${root}content/raw/live-data.json`, "utf8"));
const tr = JSON.parse(readFileSync(`${root}content/carte-it-de.json`, "utf8"));
const LIVE = ["fr", "pt", "en"];
const br = (s) => s.replace(/<br\s*\/?>/g, "\n");
const five = (fromLive, extra) => ({ ...Object.fromEntries(LIVE.map((l) => [l, br(fromLive(l))])), it: br(extra.it), de: br(extra.de) });
const slug = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/&/g, "e").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Which of the restaurant's photos shows which listing, and which photos open each section.
const PHOTO = {
  "entrees/Salgados Tradicionais": "salgados-presunto",
  "viandes/Pica Pau & Companhia": "pica-pau-companhia",
  "poissons/Bacalhau à Braga": "bacalhau-a-braga",
  "poissons/Polvo à Lagareiro": "polvo-a-lagareiro",
  "poissons/Gambas ao Alho": "gambas-ao-alho",
};
const SECTION_PHOTOS = {
  entrees: ["salgados-presunto", "gambas-ao-alho"],
  viandes: ["pica-pau-companhia"],
  poissons: ["polvo-a-lagareiro", "bacalhau-a-braga", "polvo-batatas", "peixe-grelhado"],
  enfant: [],
  desserts: [],
  commande: [],
};
const TAB = { entrees: "entrees", viandes: "meats", poissons: "fish", enfant: "kids", desserts: "desserts", commande: "order" };

const sections = Object.keys(TAB).map((id) => {
  const section = {
    id,
    title: five((l) => live.T[l].tabs[TAB[id]], tr.sections[id]),
    photos: SECTION_PHOTOS[id],
    items: [],
  };
  if (id === "desserts") section.note = five((l) => live.T[l].menuData.desserts.note, tr.dessertsNote);
  if (id === "commande") {
    section.kicker = five((l) => live.T[l].menuData.orderKicker, tr.orderKicker);
    section.text = five((l) => live.T[l].menuData.orderText, tr.orderText);
    section.items = live.PREORDER.map((name) => ({ id: slug(name), name, price: null, surCommande: true }));
    return section;
  }
  for (const item of live.MENU.filter((m) => m.cat === id)) {
    const key = `${id}/${item.name}`;
    const t = tr.items[key];
    if (!t) throw new Error(`missing IT/DE for ${key}`);
    const out = { id: `${id}-${slug(item.name)}`, name: item.name, price: item.price, desc: five((l) => item[l], t), surCommande: false };
    if (item.extra) out.extra = five((l) => item.extra[l] ?? item.extra.fr, t.extra);
    if (item.note) out.note = five((l) => item.note[l], t.note);
    if (PHOTO[key]) out.photo = PHOTO[key];
    section.items.push(out);
  }
  return section;
});

const carte = {
  _source: `${live.source} (inline script: MENU, PREORDER, T.menuData), captured ${live.captured}. IT/DE: content/carte-it-de.json.`,
  sections,
};
writeFileSync(`${root}content/carte.json`, JSON.stringify(carte, null, 1) + "\n");
console.log(sections.map((s) => `${s.id} ${s.items.length}`).join(" · "));
