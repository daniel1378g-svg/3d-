// Les vins: every wine, producer, grape list and alcohol degree as written on the live page
// (content/vins.live.json). Only the few French words inside the details are translated here.
import live from "@content/vins.live.json";
import type { L, Lang } from "@/i18n";

const l = (fr: string, en: string, pt: string, it: string, de: string): L => ({ fr, en, pt, it, de });

export type ColourId = "tinto" | "rosado" | "branco";
export const COLOURS: { id: ColourId; pt: string; local: L; tone: string }[] = [
  { id: "tinto", pt: "Vinhos Tintos de Portugal", local: l("Vins Rouges du Portugal", "Red wines from Portugal", "Vinhos Tintos de Portugal", "Vini rossi del Portogallo", "Rotweine aus Portugal"), tone: "#7b1f33" },
  { id: "rosado", pt: "Vinhos Rosados de Portugal", local: l("Vins Rosés du Portugal", "Rosé wines from Portugal", "Vinhos Rosados de Portugal", "Vini rosati del Portogallo", "Roséweine aus Portugal"), tone: "#e59a8c" },
  { id: "branco", pt: "Vinhos Brancos de Portugal", local: l("Vins Blancs du Portugal", "White wines from Portugal", "Vinhos Brancos de Portugal", "Vini bianchi del Portogallo", "Weissweine aus Portugal"), tone: "#e8d79a" },
];

/** French phrases found in the live details, and their translations. */
const PHRASES: [string, L][] = [
  ["assemblage de vieux cépages traditionnels de la région", l("assemblage de vieux cépages traditionnels de la région", "blend of old traditional grape varieties of the region", "lote de castas tradicionais antigas da região", "assemblaggio di vecchi vitigni tradizionali della regione", "Assemblage alter traditioneller Rebsorten der Region")],
  ["assemblage de cépages du minho", l("assemblage de cépages du minho", "blend of Minho grape varieties", "lote de castas do Minho", "assemblaggio di vitigni del Minho", "Assemblage von Minho-Rebsorten")],
  ["vieilles vignes – INOX", l("vieilles vignes – INOX", "old vines – stainless steel", "vinhas velhas – inox", "vecchie vigne – acciaio inox", "alte Reben – Edelstahl")],
  ["et autres", l("et autres", "and others", "e outras", "e altri", "und andere")],
  ["Assemblage", l("Assemblage", "Blend", "Lote", "Assemblaggio", "Assemblage")],
  ["assemblage", l("assemblage", "blend", "lote", "assemblaggio", "Assemblage")],
];
const EXTRA: Record<string, L> = {
  INOX: l("INOX", "stainless steel", "inox", "acciaio inox", "Edelstahl"),
  "La coupe": l("La coupe", "by the glass", "à taça", "al calice", "im Glas"),
  "…": l("…", "…", "…", "…", "…"),
};
export const WINE_NOTES: Record<string, L> = {
  biodynamic: l("culture biodynamique", "biodynamic farming", "cultura biodinâmica", "coltura biodinamica", "biodynamischer Anbau"),
  sparkling: l("mousseux", "sparkling", "espumante", "spumante", "Schaumwein"),
};

function translateDetails(text: string, lang: Lang) {
  if (lang === "fr") return text;
  let out = text;
  for (const [fr, tr] of PHRASES) if (out.includes(fr)) out = out.replace(fr, tr[lang]);
  return out;
}

export type Wine = {
  id: string;
  name: string;
  producer: string;
  details: string;
  abv: string;
  extra?: string;
  notes: string[];
  colour: ColourId;
  region: string;
  regionName: string;
  live: string;
};
export type Region = { id: string; colour: ColourId; name: string; live: string; key: string; wines: Wine[] };

/** Map keys: one per wine region on the list (Douro and Setúbal appear under several colours). */
const keyOf = (name: string) => name.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z]+/g, "-");

export const REGIONS: Region[] = live.colours.flatMap((c) =>
  c.regions.map((r) => ({
    id: r.id,
    colour: c.id as ColourId,
    name: r.name,
    live: r.live,
    key: keyOf(r.name),
    wines: r.wines.map((w) => {
      const x = w as typeof w & { extra?: string; notes?: string[] };
      return { id: w.id, name: w.name, producer: w.producer, details: w.details, abv: w.abv, extra: x.extra, notes: x.notes ?? [], colour: c.id as ColourId, region: r.id, regionName: r.name, live: w.live };
    }),
  })),
);
export const WINES = REGIONS.flatMap((r) => r.wines);
export const FOOTNOTE = live.footnote as string;
export const FOOTNOTE_L = l(FOOTNOTE, "Other vintages are available on request", "Outras colheitas disponíveis a pedido", "Altre annate disponibili su richiesta", "Andere Jahrgänge auf Anfrage erhältlich");

export const wineDetails = (w: Wine, lang: Lang) => translateDetails(w.details, lang);
export const wineExtra = (w: Wine, lang: Lang) => (w.extra ? (EXTRA[w.extra]?.[lang] ?? w.extra) : null);

/**
 * The map: an original, simplified outline of mainland Portugal (equirectangular, x = (lon + 9.6) × 100,
 * y = (42.2 − lat) × 128) and the nine regions of the list placed at their approximate centres.
 */
export const MAP_REGIONS: { key: string; label: string; x: number; y: number; rx: number; ry: number; lx?: number; ly?: number; anchor?: "start" | "end" | "middle" }[] = [
  { key: "minho", label: "Minho", x: 120, y: 64, rx: 40, ry: 30, lx: 70, ly: 40, anchor: "end" },
  { key: "tras-os-montes", label: "Trás-os-Montes", x: 250, y: 58, rx: 62, ry: 34, lx: 250, ly: 14, anchor: "middle" },
  { key: "douro", label: "Douro", x: 205, y: 132, rx: 64, ry: 22, lx: 300, ly: 140, anchor: "start" },
  { key: "dao", label: "Dão", x: 175, y: 212, rx: 34, ry: 30, lx: 222, ly: 214, anchor: "start" },
  { key: "bairrada", label: "Bairrada", x: 112, y: 232, rx: 22, ry: 28, lx: 62, ly: 236, anchor: "end" },
  { key: "ribatejo", label: "Ribatejo", x: 105, y: 372, rx: 40, ry: 36, lx: 158, ly: 366, anchor: "start" },
  { key: "palmela", label: "Palmela", x: 64, y: 458, rx: 18, ry: 14, lx: 20, ly: 452, anchor: "end" },
  { key: "setubal", label: "Setúbal", x: 98, y: 494, rx: 20, ry: 16, lx: 42, ly: 506, anchor: "end" },
  { key: "alentejo", label: "Alentejo", x: 190, y: 485, rx: 74, ry: 66, lx: 190, ly: 488, anchor: "middle" },
];
export const PORTUGAL_PATH =
  "M 74 42 L 96 22 L 140 6 L 147 50 L 180 38 L 215 29 L 260 28 L 285 27 L 325 52 L 341 77 L 333 90 L 300 118 L 280 150 L 280 205 L 265 250 L 267 282 L 207 326 L 222 358 L 253 410 L 244 425 L 250 450 L 230 486 L 265 521 L 235 550 L 210 595 L 219 643 L 167 666 L 106 650 L 66 666 L 60 663 L 78 614 L 73 544 L 70 476 L 38 485 L 30 449 L 10 438 L 20 364 L 53 333 L 73 262 L 85 200 L 93 134 L 76 65 Z";
