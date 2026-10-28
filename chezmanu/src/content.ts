// Typed access to content/*.json and the generated image metadata.
import facts from "@content/facts.json";
import carte from "@content/carte.json";
import products from "@content/products.json";
import photos from "@content/photos.json";
import images from "@/data/images.json";
import { loc, type Lang, type Localized } from "./i18n";

export const CONTACT = facts;
export const mapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${facts.street}, ${facts.zip} ${facts.city}`)}`;
export const osmLink = `https://www.openstreetmap.org/?mlat=${facts.lat}&mlon=${facts.lng}#map=18/${facts.lat}/${facts.lng}`;
export const osmEmbed = (() => {
  const d = 0.0035;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${facts.lng - d * 1.6},${facts.lat - d},${facts.lng + d * 1.6},${facts.lat + d}&layer=mapnik&marker=${facts.lat},${facts.lng}`;
})();

/** "4.10" → "CHF 4.10", the same in every language. */
export const chf = (price: string) => `CHF ${Number(price).toFixed(2)}`;

type RawName = Partial<Localized> & { fr: string };
export type Tea = { name: string; kind: Localized };
export type CarteItem = {
  id: string;
  section: string;
  name: Localized;
  /** The live French name, shown under a translated name so it can be ordered at the counter. */
  liveName: string;
  desc?: Localized;
  gloss?: Partial<Localized>;
  price: string;
  cup?: string;
  tray?: string[];
  teas?: Tea[];
};
export type CarteSection = { id: string; title: Localized; items: CarteItem[] };

export const CARTE: CarteSection[] = carte.sections.map((s) => ({
  id: s.id,
  title: s.title,
  items: s.items.map((raw) => {
    const it = raw as { id: string; name: RawName; desc?: RawName; gloss?: Partial<Localized>; price: string; cup?: string; tray?: string[]; teas?: { name: string; kind: Localized }[] };
    return {
      id: it.id,
      section: s.id,
      name: loc(it.name),
      liveName: it.name.fr,
      desc: it.desc ? loc(it.desc) : undefined,
      gloss: it.gloss,
      price: it.price,
      cup: it.cup,
      tray: it.tray,
      teas: it.teas,
    };
  }),
}));
export const CARTE_ITEMS = CARTE.flatMap((s) => s.items);
export const TEAS: Tea[] = CARTE_ITEMS.find((i) => i.id === "sirocco")?.teas ?? [];
export const COFFEES = CARTE.find((s) => s.id === "cafes")!.items;

export type Origin = "pt" | "ch" | "both";
export type Product = { id: string; origin: Origin; group: string; icon: string; photo?: string; name: Localized; gloss?: Partial<Localized>; note?: Localized };
export const PRODUCTS: Product[] = products.products.map((p) => {
  const r = p as { id: string; origin: Origin; group: string; icon: string; photo?: string; name: RawName; gloss?: Partial<Localized>; note?: Localized };
  return { ...r, name: loc(r.name) };
});
export const GROUPS = products.groups as Record<string, Localized>;

export type PhotoMeta = { id: string; name: string; w: number; h: number; widths: number[]; lqip: string; alt: Localized };
const META = images as Record<string, { name: string; w: number; h: number; widths: number[]; lqip: string }>;
export const PHOTOS: PhotoMeta[] = photos.photos.map((p) => ({ ...META[p.id], id: p.id, alt: p.alt as Localized }));
export const photo = (id: string) => {
  const p = PHOTOS.find((x) => x.id === id);
  if (!p) throw new Error(`unknown photo ${id}`);
  return p;
};
/** The live gallery's 12 photos first, then every other shop photo: the wall shows all of them. */
export const WALL: PhotoMeta[] = [...photos.gallery.map(photo), ...PHOTOS.filter((p) => !photos.gallery.includes(p.id))];

/** Glosses only show where they say something new in that language. */
export const glossFor = (g: Partial<Localized> | undefined, lang: Lang) => (g ? g[lang] ?? "" : "");
