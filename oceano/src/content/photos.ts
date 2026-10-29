// The restaurant's own photos (content/photos.list.json), each looked at and described in five languages by a
// second pass (content/translations/photos.json). The gallery's two groups from the live site: Restaurant and Laden.
import sizes from "@/data/image-sizes.json";
import list from "@content/photos.list.json";
import described from "@content/translations/photos.json";
import type { L } from "@/i18n";
import { asset } from "@/lib/utils";

export type PhotoCat = "restaurant" | "laden";
export type Shows = "burger" | "fleisch" | "fisch" | "meeresfruechte" | "nachspeise" | "getraenk" | "laden" | "raum" | "mehrere";
export type Photo = { id: string; cat: PhotoCat; shows: Shows; stock: boolean; alt: L; w: number; h: number; src: string; sm: string };
type Described = { id: string; cat: PhotoCat; shows: Shows; stock: boolean; alt: L };

const SZ = sizes as unknown as Record<string, [number, number]>;
const LIST = Array.isArray(described) ? (described as Described[]) : ((described as { photos?: Described[] }).photos ?? []);
const D = new Map(LIST.map((d) => [d.id, d]));
// what each photo shows, from looking at it (the describer's answer wins when it exists)
const SHOWS: Record<string, [PhotoCat, Shows]> = {
  "steak-chips": ["restaurant", "fleisch"], "burger-sauce": ["restaurant", "burger"], "bacalhau-chips": ["restaurant", "fisch"], "steak-sauce": ["restaurant", "fleisch"],
  "galerie-tapas": ["restaurant", "mehrere"], "galerie-tisch": ["restaurant", "mehrere"], "galerie-fisch": ["restaurant", "fisch"], "galerie-spiesse": ["restaurant", "fleisch"], "galerie-salat": ["restaurant", "mehrere"], "galerie-burger": ["restaurant", "burger"], "restaurant-saal": ["restaurant", "raum"],
  "steak-brett": ["restaurant", "fleisch"], schweinebauch: ["restaurant", "fleisch"], gebaeck: ["restaurant", "nachspeise"], "bacalhau-lagareiro": ["restaurant", "fisch"], polvo: ["restaurant", "meeresfruechte"], "kaese-gericht": ["restaurant", "mehrere"], dessert: ["restaurant", "nachspeise"], "platte-wein": ["restaurant", "fleisch"],
};
const fallbackAlt = (id: string): L => {
  const a = id.replace(/-/g, " ");
  return { de: a, en: a, pt: a, fr: a, it: a };
};

export const PHOTOS: Photo[] = (list as { id: string }[]).map(({ id }) => {
  const d = D.get(id);
  const [cat, shows] = SHOWS[id] ?? ["laden", "laden"];
  const [w, h] = SZ[id];
  return { id, cat: d?.cat ?? cat, shows: d?.shows ?? shows, stock: d?.stock ?? false, alt: d?.alt ?? fallbackAlt(id), w, h, src: asset(`images/${id}.webp`), sm: asset(`images/${id}-sm.webp`) };
});
export const photo = (id: string) => {
  const p = PHOTOS.find((x) => x.id === id);
  if (!p) throw new Error(`unknown photo ${id}`);
  return p;
};
export const CUTOUTS = ["burger", "bacalhau", "polvo", "steak", "platte", "gebaeck"] as const;
export type Cutout = (typeof CUTOUTS)[number];
export const cutout = (id: Cutout) => ({ src: asset(`cutouts/${id}.webp`), w: SZ[`cutouts/${id}`][0], h: SZ[`cutouts/${id}`][1] });
