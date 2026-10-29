// The restaurant's own photos: the 35 menu tiles (alt text in content/menu.json, each written after looking
// at the photo) and the "Privatisation pour évènements" photo. Sizes come from scripts/prepare_images.py.
// The old site's other pictures are Unsplash stock (and one pattern) and are not used.
import sizes from "@/data/image-sizes.json";
import type { L } from "@/i18n";
import { asset } from "@/lib/utils";
import { TILES } from "./site";

export type PhotoCat = "plats" | "evenements";
export type Photo = { id: string; cat: PhotoCat; alt: L; w: number; h: number; src: string; sm: string; dish?: string };

const SZ = sizes as unknown as Record<string, [number, number]>;
const make = (id: string, cat: PhotoCat, alt: L, dish?: string): Photo => {
  const [w, h] = SZ[id];
  return { id, cat, alt, w, h, src: asset(`images/${id}.webp`), sm: asset(`images/${id}-sm.webp`), dish };
};

export const PRIVATISATION = make("privatisation", "evenements", {
  fr: "Pièce de viande entière rôtie à la broche en plein air, lors d’un évènement",
  en: "A whole joint of meat roasting on a spit outdoors, at an event",
  pt: "Uma peça inteira de carne a assar no espeto ao ar livre, num evento",
  it: "Un intero pezzo di carne che arrostisce allo spiedo all’aperto, durante un evento",
  de: "Ein ganzes Stück Fleisch dreht sich bei einem Anlass im Freien am Spiess",
});

/** Every photo, in the live menu order, then the event photo (for the gallery). */
export const PHOTOS: Photo[] = [...TILES.map((t) => make(t.photo, "plats", t.alt, t.name)), PRIVATISATION];
export const photo = (id: string) => {
  const p = PHOTOS.find((x) => x.id === id);
  if (!p) throw new Error(`unknown photo ${id}`);
  return p;
};
export const srcSet = (p: Photo) => `${p.sm} 640w, ${p.src} 1200w`;

export const CUTOUTS = ["picanha", "frango", "frango-prato", "bacalhau", "salmao"] as const;
export type Cutout = (typeof CUTOUTS)[number];
export const cutout = (id: Cutout) => ({ src: asset(`cutouts/${id}.webp`), w: SZ[`cutouts/${id}`][0], h: SZ[`cutouts/${id}`][1] });
