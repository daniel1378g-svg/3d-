// Les vins: names, sections, regions and prices verbatim from content/wines.json (the live wine page); this file
// adds the colours, the map regions and the translations.
import live from "@content/wines.json";
import type { L } from "@/i18n";

const l = (fr: string, en: string, pt: string, it: string, de: string): L => ({ fr, en, pt, it, de });

export type ColourId = "rouge" | "rose" | "blanc";
export const COLOURS: { id: ColourId; tone: string }[] = [
  { id: "blanc", tone: "#E9D9A6" },
  { id: "rose", tone: "#E7A3A0" },
  { id: "rouge", tone: "#8F0F0F" },
];

/** The live section titles, translated below. */
export const SECTION_L: Record<string, L> = {
  rose: l("Rosés Pétillants", "Sparkling rosés", "Rosés espumantes", "Rosati frizzanti", "Perlende Rosés"),
  verde: l("Vinho Verde", "Vinho Verde", "Vinho Verde", "Vinho Verde", "Vinho Verde"),
  rouge: l("Rouges Portugais", "Portuguese reds", "Tintos portugueses", "Rossi portoghesi", "Portugiesische Rotweine"),
  blanc: l("Blancs Portugais", "Portuguese whites", "Brancos portugueses", "Bianchi portoghesi", "Portugiesische Weissweine"),
};
const SECTION_COLOUR: Record<string, ColourId> = { rose: "rose", verde: "blanc", rouge: "rouge", blanc: "blanc" };

/** Map regions: from the live region headings (Dão, Douro, Alentejo 75cl), from the name (Douro Planalto,
 *  Alentejo Convento da Vila), and Vinho Verde from Minho, as the live text says. The sparkling rosés give no region. */
function regionOf(section: string, name: string, region?: string) {
  if (region) return region.toLowerCase().replace("ã", "a");
  if (section === "verde") return "minho";
  if (/^Douro/.test(name)) return "douro";
  if (/^Alentejo/.test(name)) return "alentejo";
  return null;
}

const MAP_LABEL: Record<string, string> = { minho: "Minho", douro: "Douro", dao: "Dão", bairrada: "Bairrada", alentejo: "Alentejo" };
export type Wine = { id: string; section: string; name: string; price: string; size?: string; colour: ColourId; region: string | null; regionName?: string; photo?: string };
const BOTTLES: Record<string, string> = { "Casal Garcia": "casal-gazela", Gazela: "casal-gazela", "Douro Planalto Reserva": "douro-planalto" };

export const WINE_SECTIONS = live.sections.map((s) => ({
  id: s.id,
  title: s.title,
  wines: s.wines.map((w, i) => {
    const r = regionOf(s.id, w.name, (w as { region?: string }).region);
    return {
      id: `${s.id}-${i}`,
      section: s.id,
      name: w.name,
      price: w.price,
      size: (w as { size?: string }).size,
      colour: SECTION_COLOUR[s.id],
      region: r,
      regionName: (w as { region?: string }).region ?? (r ? MAP_LABEL[r] : undefined),
      photo: BOTTLES[w.name],
    } as Wine;
  }),
}));
export const WINES: Wine[] = WINE_SECTIONS.flatMap((s) => s.wines);

/** The journey on the home page follows the live wine paragraph: Minho, then the Douro, then the Alentejo. */
export const JOURNEY = ["minho", "douro", "alentejo"] as const;

export const MAP_REGIONS: { key: string; label: string; x: number; y: number; rx: number; ry: number; lx?: number; ly?: number; anchor?: "start" | "end" | "middle" }[] = [
  { key: "minho", label: "Minho", x: 120, y: 64, rx: 40, ry: 30, lx: 70, ly: 40, anchor: "end" },
  { key: "douro", label: "Douro", x: 205, y: 132, rx: 64, ry: 22, lx: 300, ly: 140, anchor: "start" },
  { key: "dao", label: "Dão", x: 175, y: 212, rx: 34, ry: 30, lx: 222, ly: 214, anchor: "start" },
  { key: "alentejo", label: "Alentejo", x: 190, y: 485, rx: 74, ry: 66, lx: 190, ly: 488, anchor: "middle" },
];

export const PORTUGAL_PATH =
  "M 74 42 L 96 22 L 140 6 L 147 50 L 180 38 L 215 29 L 260 28 L 285 27 L 325 52 L 341 77 L 333 90 L 300 118 L 280 150 L 280 205 L 265 250 L 267 282 L 207 326 L 222 358 L 253 410 L 244 425 L 250 450 L 230 486 L 265 521 L 235 550 L 210 595 L 219 643 L 167 666 L 106 650 L 66 666 L 60 663 L 78 614 L 73 544 L 70 476 L 38 485 L 30 449 L 10 438 L 20 364 L 53 333 L 73 262 L 85 200 L 93 134 L 76 65 Z";
