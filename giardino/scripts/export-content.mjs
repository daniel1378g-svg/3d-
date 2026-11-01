// Exports the site's data (TypeScript is the source of truth) as plain JSON for review and hand-off:
//
//   content/menu.json           every menu, section and item; prices in integer Rappen; source page, verification
//   content/hours.json          opening hours, kitchen hours, closures (BRIEF §4 "Hours")
//   content/facts.json          identity, address, contact, payment, services, partners, labels – with evidence files
//   content/i18n/<lang>.json    the flattened dictionary of each language: { key: { text, status[, fn, template] } }
//
// status: "source" (German master text, or a translation that occurs verbatim on the live site in that language),
// "translated" (written for this site), "needs-review" (listed in content/i18n/needs-review.json with a reason).
// Deterministic: the same sources always give byte-identical files (no timestamps).
//
// Usage: node scripts/export-content.mjs
import { build } from "esbuild";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const LANGS = ["de", "en", "fr", "it"];
const CHECKED = "2026-11-01";
const tmp = join(root, ".cache/export-content.cjs");
await build({
  stdin: {
    contents: `export * as menu from "./src/content/menu"; export * as restaurant from "./src/content/restaurant";
      export * as schedule from "./shared/schedule"; export * as format from "./src/lib/format"; export * as routes from "./src/routes";
      export { default as de } from "./src/i18n/de"; export { default as en } from "./src/i18n/en";
      export { default as fr } from "./src/i18n/fr"; export { default as it } from "./src/i18n/it";`,
    resolveDir: root,
    loader: "ts",
  },
  bundle: true, platform: "node", format: "cjs", outfile: tmp, logLevel: "error",
  alias: { "@": join(root, "src"), "@shared": join(root, "shared"), "@content": join(root, "content") },
  loader: { ".json": "json" },
  define: { __ARTIFACT__: "false", __PROPOSAL__: "true", "import.meta.env": "{}" },
});
const M = createRequire(import.meta.url)(tmp);
const { menu, restaurant: R, schedule: S, format: F } = M;
const dicts = { de: M.de, en: M.en, fr: M.fr, it: M.it };
const write = (file, data) => {
  mkdirSync(join(root, file, ".."), { recursive: true });
  writeFileSync(join(root, file), JSON.stringify(data, null, 1) + "\n");
  console.log(`  ${file}`);
};
const read = (file) => readFileSync(join(root, file), "utf8");
console.log("node scripts/export-content.mjs →");

// ---------------------------------------------------------------------------------------------------------------
// menu.json
const PDF = {
  food: { file: "Speisekarte-Menu.pdf", local: "content/raw/pdf/Speisekarte-Menu.pdf", live: R.MENU_PDF_LIVE?.food, linkLabel: "Speisekarte-Menu.pdf", reading: "ocr", renders: "content/raw/pdf/speisekarte/p-NN.png" },
  drinks: { file: "Getraenkekarte.pdf", local: "content/raw/pdf/Getraenkekarte.pdf", live: R.MENU_PDF_LIVE?.drinks, linkLabel: "Getraenkekarte.pdf", reading: "ocr", renders: "content/raw/pdf/getraenkekarte/p-NN.png" },
  kids: { file: "Speisekarte_Kids.pdf", local: "content/raw/pdf/Speisekarte-Kids.pdf", live: R.MENU_PDF_LIVE?.kids, linkLabel: "Speisekarte Kids.pdf", reading: "text-layer", renders: "content/raw/pdf/kids/p-NN.png" },
  desserts: { file: "Dessertkarte.PDF", local: "content/raw/pdf/Dessertkarte.pdf", live: R.MENU_PDF_LIVE?.desserts, linkLabel: "Dessertkarte.PDF", reading: "text-layer", renders: "content/raw/pdf/dessertkarte/p-NN.png" },
};
const ocr = (f) => read(`content/sources/ocr/${f}`);
const pageText = (pdf, page) => (pdf === "food" ? ocr(`speise-00${page - 1}.txt`) : pdf === "drinks" ? ocr(`getraenke-00${page - 1}.txt`) : pdf === "kids" ? ocr("kids-text-layer.txt") : ocr("dessert-text-layer.txt"));
const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[„“”«»"'’`´]/g, " ").replace(/ß/g, "ss").replace(/[^a-z0-9.,% -]/gi, " ").replace(/\s+/g, " ");
const words = (s) => norm(s).split(/[\s,.()/-]+/).filter((w) => w.length >= 3 && !/^\d/.test(w));
const rappenIn = (text) => new Set([...text.matchAll(/(?<![\d/])(\d{1,2})[.,](\d{2})(?![\d/])/g)].map((m) => Number(m[1]) * 100 + Number(m[2])));
// words changed on purpose while transcribing (MENU_CORRECTIONS) or added for clarity – not expected in the machine reading
const CORRECTED = new Set(["saltimbocca", "acqua", "fuze", "tea", "ramazzotti", "brulee", "vecchia", "puglia", "moroccan", "maitre", "holunderblute", "holunderbluete", "coca", "cola", "offenausschank", "zugedeckt", "kindersalat", "hausgemacht", "eichenholz", "glace", "bananen", "chocolat", "gepudert", "kakao", "noir", "pinot"]);
const rappen = (chf) => Math.round(chf * 100);
const size = (s) => (s ? { q: s.q, unit: s.u, printed: s.orig } : undefined);

function sourceFor(menuId, section, item) {
  // items shared by the dessert and kids leaflets carry the dessert page; inside the kids menu they cite the kids leaflet
  if (menuId === "kids") return { menu: "kids", file: PDF.kids.file, page: section.flavours ? 2 : 1 };
  if (menuId === "desserts") return { menu: "desserts", file: PDF.desserts.file, page: section.id === "coupes" ? 1 : 2 };
  return { menu: item.src.pdf, file: PDF[item.src.pdf].file, page: item.src.page };
}
function verify(menuId, section, item) {
  const src = sourceFor(menuId, section, item);
  const text = pageText(src.menu, src.page);
  const page = new Set(words(text));
  const w = words([item.name.de, item.desc?.de ?? ""].join(" ")).filter((x) => !CORRECTED.has(x));
  const wordRatio = w.length ? w.filter((x) => page.has(x)).length / w.length : 1;
  const printed = rappenIn(text);
  const pricesOk = item.prices.every((p) => printed.has(rappen(p.chf)));
  const agree = pricesOk && wordRatio >= 0.85;
  const reading = PDF[src.menu].reading;
  return {
    source: { file: src.file, page: src.page },
    verification: agree ? (reading === "ocr" ? "ocr+visual" : "text-layer+visual") : "visual",
    confidence: item.review ? "low" : agree ? "high" : "medium",
    machineReading: { reading, wordsMatched: Math.round(wordRatio * 100) / 100, pricesMatched: pricesOk },
  };
}
const invariant = (tx) => tx && LANGS.every((l) => tx[l] === tx.de);
const menus = menu.MENUS.map((m) => ({
  id: m.id,
  title: m.title,
  kicker: m.kicker,
  pdf: { file: PDF[m.id].file, linkLabel: PDF[m.id].linkLabel, liveUrl: PDF[m.id].live, localCopy: PDF[m.id].local, pages: m.pdf.pages, bytes: m.pdf.bytes, reading: PDF[m.id].reading, renders: PDF[m.id].renders },
  sections: m.sections.map((s) => ({
    id: s.id,
    title: s.title,
    ...(s.intro ? { intro: s.intro } : {}),
    ...(s.columns ? { columns: s.columns.map(size) } : {}),
    ...(s.flavours ? { flavours: true, pricePerScoopRappen: rappen(menu.SCOOP_CHF), creamSupplementRappen: rappen(menu.CREAM_CHF) } : {}),
    groups: s.groups.map((g) => ({
      id: g.id,
      ...(g.title ? { title: g.title } : {}),
      items: g.items.map((it) => ({
        id: it.id,
        name: it.name,
        ...(invariant(it.name) ? { nameInvariant: true } : {}),
        ...(it.desc ? { desc: it.desc } : {}),
        prices: it.prices.map((p) => ({ rappen: rappen(p.chf), ...(p.size ? { size: size(p.size) } : {}), ...(p.label ? { label: p.label } : {}) })),
        ...(it.abv !== undefined ? { abvPercent: it.abv } : {}),
        ...(it.tags?.length ? { tags: it.tags } : {}),
        ...(it.note ? { note: it.note } : {}),
        ...(it.review ? { unresolved: true, review: menu.MENU_REVIEW.find((r) => r.id === it.id)?.question ?? "see content/menu-review.md" } : {}),
        ...verify(m.id, s, it),
      })),
    })),
    ...(s.notes?.length ? { notes: s.notes } : {}),
  })),
  footnotes: m.footnotes,
}));
const countItems = (id, pred = () => true) => menu.MENUS.find((m) => m.id === id).sections.filter(pred).flatMap((s) => s.groups.flatMap((g) => g.items)).length;
const allItems = menus.flatMap((m) => m.sections.flatMap((s) => s.groups.flatMap((g) => g.items.map((i) => ({ ...i, menu: m.id })))));
write("content/menu.json", {
  about: "Generated by scripts/export-content.mjs from src/content/menu.ts (the source of truth – edit there). Transcribed from the four PDFs linked on pizzeriagiardino.ch, read 2026-11-01.",
  currency: "CHF",
  priceUnit: "Rappen (integer; 1 CHF = 100 Rappen); VAT included as printed",
  priceFormat: "rendered by one formatter as «CHF 12.90» (currency code, narrow no-break space U+202F, decimal point, two decimals) in all four languages",
  languages: "Names and descriptions DE (and FR where the PDF prints it) are the restaurant's wording; EN and IT are translations for this site. nameInvariant marks names kept in their original language in every locale.",
  verification: {
    "ocr+visual": "scanned page (no text layer): transcribed visually from the 300-dpi render and confirmed by Tesseract OCR (all prices and ≥ 85 % of the German words found on that page)",
    "text-layer+visual": "page with a PDF text layer (Frisco template): transcribed visually and confirmed by the text layer",
    visual: "transcribed visually; the machine reading did not confirm every word or price (see machineReading) – checked against the render",
  },
  confidence: { high: "machine reading and visual transcription agree", medium: "visual transcription only", low: "the printed menu itself leaves something open (unresolved, see content/menu-review.md)" },
  counts: {
    food: countItems("food"),
    drinks: countItems("drinks"),
    dessertsCoupesAndDesserts: countItems("desserts", (s) => s.id === "coupes"),
    dessertsIceNovelties: countItems("desserts", (s) => s.id === "frisco"),
    kidsDishes: countItems("kids", (s) => s.id === "kinder-essen"),
    kidsIce: countItems("kids", (s) => s.id === "kinder-glace"),
    flavours: menu.FLAVOURS.length,
    unresolved: allItems.filter((i) => i.unresolved).length,
    byVerification: Object.fromEntries(["ocr+visual", "text-layer+visual", "visual"].map((v) => [v, allItems.filter((i) => i.verification === v).length])),
  },
  menus,
  corrections: menu.MENU_CORRECTIONS,
  review: menu.MENU_REVIEW,
});

// ---------------------------------------------------------------------------------------------------------------
// hours.json
const WD = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const dd = (ymd, lang) => F.fmtDate(ymd, lang, { day: "numeric", month: "long", year: "numeric" });
write("content/hours.json", {
  about: "Generated by scripts/export-content.mjs from shared/schedule.ts (the source of truth for the website and the reservation server). The website is the master for hours, not the PDF menus.",
  timezone: S.TZ,
  checked: CHECKED,
  weekly: Object.fromEntries(["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((d) => [d, S.HOURS.closedWeekdays.includes(WD.indexOf(d)) ? [] : [S.HOURS.open]])),
  closed_weekdays: S.HOURS.closedWeekdays.map((i) => WD[i]),
  open: S.HOURS.open,
  kitchen: S.HOURS.kitchen,
  phone_reservations: S.HOURS.phone,
  closures: S.CLOSURES.map((c) => ({
    id: c.id,
    from: c.from,
    to: c.to,
    reopens: c.reopen,
    title: c.title,
    text: Object.fromEntries(LANGS.map((l) => [l, dicts[l].hours.closureText(dd(c.from, l), dd(c.to, l), F.fmtDayLong(c.reopen, l))])),
    source_verbatim: "Wir haben vom 01. November 2026 bis am 17. Dezember 2026 Betriebsferien und freuen uns Sie am Freitag den 18. Dezember 2026 wieder zu begrüßen",
  })),
  sources: [
    { what: "Öffnungszeiten 11:00–23:00, «Mittwoch Ruhetag», «Warme Küche von 11:30 bis 15:00 Uhr und 17:00 bis 21:30 Uhr.», Betriebsferien Herbst", evidence: "content/raw/live/de/home.txt (sidebar), content/sources/myls/business-hours.json, content/sources/myls/holidays-de.txt" },
    { what: "Mittwoch Ruhetag and 11.00–23.00 on the entrance door", evidence: "photograph door-hours (content/assets.json)" },
    { what: "telephone reservations 10:00–23:00", evidence: "content/raw/live/de/reservation.txt" },
  ],
  withheld: [
    {
      what: "meat-course hours printed on the food menu",
      printed: "Servieren wir von 11.30 - 14.00 und 17.00 bis 21.00 Uhr / Nous servons de 11.30 — 14.00 et de 17.00 au 21.00 heure",
      evidence: "Speisekarte-Menu.pdf p. 6 (content/sources/ocr/speise-005.txt)",
      decision: "not displayed: they differ from the website's kitchen hours (11:30–15:00, 17:00–21:30) and the website is the master for hours; open question for the owners (content/menu-review.md)",
    },
  ],
  booking_form_assumptions: {
    note: "Not published by the restaurant: these values only shape the online request form and are listed as Decisions in HANDOFF.md for the owners to confirm.",
    ...S.BOOKING,
  },
});

// ---------------------------------------------------------------------------------------------------------------
// facts.json
const live = (lang, slug) => `content/raw/live/${lang}/${slug}.txt`;
let linkStatus = {};
if (existsSync(join(root, "content/raw/links.csv"))) {
  const lines = read("content/raw/links.csv").trim().split("\n").slice(1);
  const parse = (line) => {
    const out = [];
    let cur = "", q = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (q) { if (c === '"' && line[i + 1] === '"') { cur += '"'; i++; } else if (c === '"') q = false; else cur += c; }
      else if (c === '"') q = true; else if (c === ",") { out.push(cur); cur = ""; } else cur += c;
    }
    out.push(cur);
    return out;
  };
  for (const l of lines) { const [url, , status, final, result, note] = parse(l); linkStatus[url] = { status, final, result, note }; }
}
const checked = (url) => (url && linkStatus[url] ? { link: linkStatus[url].result || "not checked", ...(linkStatus[url].note ? { linkNote: linkStatus[url].note } : {}) } : {});
write("content/facts.json", {
  about: "Generated by scripts/export-content.mjs from src/content/restaurant.ts and shared/schedule.ts. Every fact restates a source; evidence files are under content/raw and content/sources. Checked 2026-11-01.",
  checked: CHECKED,
  identity: {
    name: R.RESTAURANT.name,
    listingName: R.RESTAURANT.legalName,
    hosts: R.RESTAURANT.hosts,
    since: R.RESTAURANT.since,
    generation: "second generation (Gastgeber page: «seit 2012 in zweiter Generation»)",
    sons: R.RESTAURANT.sons,
    evidence: [live("de", "gastgeber"), live("de", "impressum")],
  },
  address: {
    street: R.RESTAURANT.street,
    postcode: R.RESTAURANT.postcode,
    town: R.RESTAURANT.town,
    region: R.RESTAURANT.region,
    country: R.RESTAURANT.country,
    authoritative: "Thermenstrasse 9 – footer of every page, Impressum, localsearch (myls) listing, sidebar «Sie finden uns an der Thermenstrasse 9»",
    discrepancy: { value: "Rathausstrasse 7", where: ["Kontakt page (all four locales)", "marker text of the Google Maps embed on the Anreise page"], status: "unresolved – question for the owners", evidence: [live("de", "allgemein_kontakt"), live("en", "meta_contact"), live("fr", "meta_contact"), live("it", "meta_contatto")] },
    evidence: [live("de", "home"), live("de", "impressum"), "content/sources/myls/business-hours.json"],
  },
  contact: {
    phone: R.RESTAURANT.phone,
    phoneDisplay: R.RESTAURANT.phoneDisplay,
    phoneHref: R.RESTAURANT.phoneHref,
    phoneReservations: S.HOURS.phone,
    email: R.RESTAURANT.email,
    evidence: [live("de", "reservation"), live("de", "allgemein_kontakt"), live("de", "impressum")],
  },
  geo: { ...R.RESTAURANT.geo, source: "localsearch (myls) listing; the Anreise page's map marker is 46.3793496, 7.6269692 (≈ 15 m away)", evidence: "content/sources/myls/business-hours.json, " + live("de", "allgemein_anreise") },
  hours: "see content/hours.json",
  payment: {
    wir: { accepted: true, quote: "Als 100-Prozent-WIR-Betrieb akzeptieren wir auch gerne WIR-Geld.", evidence: live("de", "essen-geniessen"), href: R.WIR.href, ...checked(R.WIR.href) },
    otherMethods: "not published – the site does not state card or cash payment",
  },
  vouchers: { shop: "felizzio", href: LANGS.map((l) => R.VOUCHERS.href(l)), options: R.VOUCHERS.options, freeAmount: R.VOUCHERS.freeAmount, validityYears: R.VOUCHERS.validityYears, evidence: "live felizzio shop page (read 2026-11-01); header link «Gutscheine» on every page", note: "felizzio offers de/en/fr; /it/ is linked by the new site's Italian pages – see content/raw/links.csv" },
  services: [
    { id: "terrace", text: "sonnenverwöhnte Terrasse mit freier Sicht auf die Gemmi und Torrent", evidence: live("de", "home") },
    { id: "playroom", text: "Spielzimmer zum Austoben", evidence: live("de", "kids") },
    { id: "playground", text: "grosser Aussenspielplatz; seit Sommer 2016 ein riesiges Piratenschiff (source spells «Seid Sommer 2016»)", evidence: live("de", "kids") },
    { id: "kids-menu", text: "extra kinderfreundliche Speisekarte", evidence: live("de", "kids") },
    { id: "virtual-tour", text: "Matterport 3D tour m=W51AKaLxmne", href: R.TOUR.href("de"), evidence: live("de", "allgemein_rundgang"), ...checked(R.TOUR.href("de")) },
  ],
  dietary: {
    printed: ["VEGAN marks on the apricot, lemon and raspberry sorbets (Dessertkarte p. 2)", "«Mocca* – *enthält Haselnuss» (Dessertkarte p. 2, Speisekarte Kids p. 2)", "«Bei Allergien wenden Sie sich bitte an die Servicemitarbeiter. Danke» (Speisekarte p. 6)"],
    glutenFree: "only signalled by the old <title> («Glutenfreie Pizzeria im Wallis») and the IG Zöliakie badge/link; no page or PDF marks gluten-free dishes – shown as the badge plus «ask the team»",
    notClaimed: ["vegetarian", "allergens per dish", "suitable for coeliacs"],
  },
  hotels: R.HOTELS.map((h) => ({ ...h, evidence: live("de", "partnerhotels"), ...checked(h.web) })),
  press: R.PRESS.map((p) => ({ id: p.id, title: p.title, source: p.source, href: p.href, youtubeId: p.youtubeId, evidence: live("de", "allgemein_presse"), ...(p.href ? checked(p.href) : { link: "dropped – the C&A article was taken down and its address redirects to a general page" }) })),
  jobs: { href: R.JOBS.href, roles: R.JOBS.roles, evidence: live("de", "allgemein_jobs"), ...checked(R.JOBS.href) },
  labels: (R.LABELS ?? []).map((l) => ({ id: l.id, alt: l.alt, href: l.href, ...checked(l.href) })),
  droppedLabels: [
    { id: "google-plus", href: "https://plus.google.com/+PizzeriaGiardinoLeukerbad/", reason: "Google+ was shut down in 2019", ...checked("https://plus.google.com/+PizzeriaGiardinoLeukerbad/") },
    { id: "food4family", href: "https://www.food4family.ch/restaurantsuche/wallis/giardino/", reason: "food4family.ch no longer resolves (no DNS)", ...checked("https://www.food4family.ch/restaurantsuche/wallis/giardino/") },
    { id: "family-destination", reason: "commented out in the live HTML; the mascot graphic is kept on the Kids page" },
  ],
  credits: {
    photography: { ...R.CREDITS.photography, scope: "credited in the Impressum; applies to the sets the Impressum credits – the 2025 photo and drone set and the video carry no credit", evidence: live("de", "impressum"), ...checked(R.CREDITS.photography.href) },
    originalWebsite: { name: "indual GmbH", note: "agency of the live site; not credited on the proposal (BRIEF §12)" },
  },
  brand: {
    logo: { file: "templates/pizzeriagiardino/img/logo.png", pixels: "300×153", description: "olive-tree illustration over the script «Giardino» and small caps «PIZZERIA»; a white variant exists; no SVG", evidence: "media/originals/logo.png" },
    colours: { darkOlive: "#29381b", lightOlive: "#a9ad81", evidence: "live brand CSS (templates/pizzeriagiardino)" },
  },
  leukerbadTherme: { liveMenuItem: "redirects to http://www.leukerbad-therme.ch/ (HTTP 400 on 2026-11-01)", newTarget: R.LEUKERBAD_THERME.href, ...checked(R.LEUKERBAD_THERME.href), evidence: "content/raw/live/index.json" },
});

// ---------------------------------------------------------------------------------------------------------------
// i18n/<lang>.json
const corpus = {};
const siteText = JSON.parse(read("content/sources/site-text.json"));
const nrm = (s) => String(s).normalize("NFKC").replace(/[   ]/g, " ").replace(/[’‘`´]/g, "'").replace(/[«»“”„"]/g, '"').replace(/[–—]/g, "-").toLowerCase().replace(/\s+/g, " ").trim().replace(/[.!?:;,…]+$/, "");
for (const l of LANGS) {
  const parts = Object.entries(siteText).filter(([f]) => f === `${l}.html` || f.startsWith(`${l}_`)).flatMap(([, v]) => [v.title, v.description, v.content, v.portlets, ...(v.captions ?? []), ...(v.alts ?? [])]);
  const text = parts.join("\n");
  corpus[l] = { all: nrm(text), lines: new Set(text.split(/\n|\s[|·]\s/).map(nrm).filter(Boolean)) };
}
const reviewFile = join(root, "content/i18n/needs-review.json");
const NEEDS_REVIEW = existsSync(reviewFile) ? JSON.parse(readFileSync(reviewFile, "utf8")).units ?? {} : {};
const sampleArgs = (key, names, lang) => {
  const closure = /closure/i.test(key);
  const day = F.fmtDate("2026-12-18", lang, { weekday: "long", day: "numeric", month: "long" });
  const v = {
    n: 3, count: 3, total: 6, i: 2, hours: 2, max: 12, pages: 6, years: 2, y: 2026, v: "17",
    name: "Anna", alt: "…", q: "pizza", list: "CHF 50, 100, 150", file: "Speisekarte-Menu.pdf", size: "10.3 MB",
    price: F.fmtChf(18), category: menu.MENUS[0].sections[2].title[lang], menu: menu.MENUS[0].title[lang],
    summary: `${F.fmtDate("2026-12-18", lang)}, 19:00, ${dicts[lang].reserve?.party?.persons?.(4) ?? 4}`,
    title: S.CLOSURES[0].title[lang], time: F.fmtTime("19:30", lang), day,
    from: closure ? dd("2026-11-01", lang) : F.fmtTime("11:00", lang),
    to: closure ? dd("2026-12-17", lang) : F.fmtTime("23:00", lang),
    until: closure ? F.fmtDate("2026-12-17", lang, { day: "numeric", month: "long" }) : F.fmtTime("23:00", lang),
    reopen: closure ? F.fmtDayLong("2026-12-18", lang) : day,
  };
  return names.map((p) => (p in v ? v[p] : `{${p}}`));
};
const paramsOf = (fn) => {
  const m = fn.toString().match(/^\s*(?:function\s*\w*\s*)?\(?([^)=]*)\)?\s*=>|^\s*function\s*\w*\s*\(([^)]*)\)/);
  const raw = (m?.[1] ?? m?.[2] ?? "").trim();
  return raw ? raw.split(",").map((p) => p.trim().replace(/=.*$/, "").trim()).filter(Boolean) : [];
};
function flatten(obj, prefix = "", out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object") flatten(v, key, out);
    else out[key] = v;
  }
  return out;
}
const flat = Object.fromEntries(LANGS.map((l) => [l, flatten(dicts[l])]));
const stats = {};
for (const l of LANGS) {
  const units = {};
  const counts = { source: 0, translated: 0, "needs-review": 0 };
  for (const key of Object.keys(flat.de)) {
    const v = flat[l][key];
    if (v === undefined) continue; // reported by check-i18n
    let unit;
    if (typeof v === "function") {
      const names = paramsOf(v);
      let text, template;
      try { text = String(v(...sampleArgs(key, names, l))); } catch (e) { text = `[error: ${e.message}]`; }
      try { template = String(v(...names.map((p) => `{${p}}`))); } catch { template = undefined; }
      unit = { text, fn: true, params: names, ...(template !== undefined && template !== text ? { template } : {}) };
    } else unit = { text: typeof v === "string" ? v : String(v) };
    const n = nrm(unit.template ?? unit.text);
    let status = "translated";
    if (l === "de") status = "source";
    else if (typeof v !== "function" && n.length >= 3 && (corpus[l].lines.has(n) || (n.length >= 24 && corpus[l].all.includes(n)))) status = "source";
    let flagged = NEEDS_REVIEW[`${l}:${key}`] ?? NEEDS_REVIEW[`*:${key}`];
    if (!flagged && l !== "de") {
      // numbers of the German text (times, prices, years, retention periods) must survive translation; ":00" minutes may be dropped
      const deUnit = flat.de[key];
      const deText = typeof deUnit === "function" ? (() => { try { return String(deUnit(...paramsOf(deUnit).map((p) => `{${p}}`))); } catch { return ""; } })() : String(deUnit);
      const nums = (s) => (s.replace(/(\d)['’.,\u202f ](\d{3})/g, "$1$2").match(/\d+/g) ?? []).filter((d) => !/^0+$/.test(d));
      const have = nums(unit.template ?? unit.text);
      const missing = nums(deText).filter((d) => !have.includes(d));
      if (missing.length) flagged = `German number(s) ${[...new Set(missing)].join(", ")} not found in this translation – check the facts.`;
    }
    if (flagged && l !== "de") { status = "needs-review"; unit.reviewNote = flagged; }
    unit.status = status;
    counts[status]++;
    units[key] = unit;
  }
  stats[l] = { keys: Object.keys(units).length, ...counts };
  write(`content/i18n/${l}.json`, {
    about: `Generated by scripts/export-content.mjs from src/i18n/${l}.ts (edit there). status: source = ${l === "de" ? "German master text" : "occurs verbatim on the live site in this language"}; translated = written for this site from the German; needs-review = see reviewNote.`,
    lang: l,
    counts: stats[l],
    units,
  });
}
console.log("i18n units:", JSON.stringify(stats));
