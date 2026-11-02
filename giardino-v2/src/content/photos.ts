// The restaurant's own photographs (src/content/photos.json, written by scripts/prepare_assets.py). Each exists as
// AVIF and WebP in the widths listed, never larger than the original. The preview build ships WebP up to 1440 px.
import data from "./photos.json";
import { asset } from "@/lib/utils";
import type { L, Lang } from "@/i18n";

export type PhotoGroup = "food" | "restaurant" | "families";
export type Photo = { id: string; w: number; h: number; widths: number[]; group: PhotoGroup; year: number; focus: string; alt: L; credit: string | null; people: string | null };
export const PHOTOS = data as Photo[];
const byId = new Map(PHOTOS.map((p) => [p.id, p]));

export function photo(id: string): Photo {
  const p = byId.get(id);
  if (!p) throw new Error(`unknown photo ${id}`);
  return p;
}

const MAX_PREVIEW = 1440;
export const widthsOf = (p: Photo) => (__ARTIFACT__ ? p.widths.filter((w) => w <= MAX_PREVIEW) : p.widths);
export const srcFor = (p: Photo, w: number, fmt: "webp" | "avif" = "webp") => asset(`images/${p.id}-${w}.${fmt}`);
export const srcSet = (p: Photo, fmt: "webp" | "avif") => widthsOf(p).map((w) => `${srcFor(p, w, fmt)} ${w}w`).join(", ");
/** The largest width not above `max`, for single-source uses (lightbox, preloads). */
export const bestWidth = (p: Photo, max = 1440) => [...widthsOf(p)].reverse().find((w) => w <= max) ?? widthsOf(p)[0];
export const altOf = (p: Photo, lang: Lang) => p.alt[lang];

/** The gallery: food, restaurant & terrace, families (in this order, best first). */
export const GALLERY: Record<PhotoGroup, string[]> = {
  food: ["pizza-rocket", "dish-prawns", "dish-chicken-risotto", "dessert-panna-cotta", "pizza-egg", "starter-salmon", "dish-pesto", "pizza-ham-rocket", "dish-lasagne", "dessert-coupe", "dish-penne", "dish-spaghetti-bacon", "detail-spaghetti", "dish-schnitzel", "dish-penne-chili"],
  restaurant: ["aerial-village", "terrace-view", "interior-bar", "hosts", "garden-view", "detail-bottle-light", "interior-stone", "terrace-flowers", "door-lettering", "entrance-terrace", "interior-room", "aerial-front", "detail-mini-bottles", "terrace-roof", "entrance-bar", "terrace-blooms", "door-hours", "aerial-terrace"],
  families: ["ship-cliffs", "playroom-climber", "ship-portrait", "playroom-ride-on", "ship-mountains", "playroom-football", "ship-above", "playroom-mural", "ship-slide", "playroom-slide", "toy-cars", "pirate-masts"],
};
