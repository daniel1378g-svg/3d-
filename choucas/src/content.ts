import menuJson from "../content/menu.json";
import images from "./data/images.json";
import type { Lang, Localized } from "./i18n";
import { PHOTOS } from "./copy";
export { CONTACT, FORM_ENDPOINT, logo, mark, brandImg } from "./contact";

export type Venue = "pizzeria" | "oasis" | "both";
export type Size = { label: Localized; price: string };
export type Dish = {
  name: string;
  price: string;
  desc: Localized;
  extra?: Localized;
  sizes?: Size[];
  photo?: string;
  hot?: boolean;
  tip?: boolean;
};
export type Section = { id: string; venue: Venue; title: Localized; note?: Localized; photos?: string[]; isNew?: boolean; items: Dish[] };
export const MENU = menuJson as unknown as { sections: Section[] };

/** "CHF 24.50", the same way in every language. */
export const chf = (price: string) => `CHF ${price}`;

const base = () => import.meta.env.BASE_URL;
export type ImageMeta = { w: number; h: number; widths: number[]; ph: string };
export const IMAGES = images as unknown as Record<string, ImageMeta>;
export const imageMeta = (id: string): ImageMeta => IMAGES[id] ?? { w: 800, h: 533, widths: [800], ph: "" };
/** One file of a photo: the smallest copy at least `want` px wide (or the largest there is). */
export const photo = (id: string, small = false, format: "webp" | "avif" = "webp") => {
  const { widths } = imageMeta(id);
  const want = small ? 480 : 1600;
  const w = widths.find((x) => x >= want) ?? widths[widths.length - 1];
  return `${base()}images/${id}-${w}.${format}`;
};
export const srcSet = (id: string, format: "webp" | "avif") => imageMeta(id).widths.map((w) => `${base()}images/${id}-${w}.${format} ${w}w`).join(", ");
export const photoAlt = (id: string, lang: Lang) => PHOTOS[id]?.[lang] ?? "";
export const photoSize = (id: string): [number, number] => {
  const m = imageMeta(id);
  return [m.w, m.h];
};
