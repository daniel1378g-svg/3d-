import menuJson from "../content/menu.json";
import sizes from "./data/image-sizes.json";
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
export const photo = (id: string, small = false) => `${base()}images/${id}${small ? "-sm" : ""}.webp`;
export const photoAlt = (id: string, lang: Lang) => PHOTOS[id]?.[lang] ?? "";
export const photoSize = (id: string) => (sizes as unknown as Record<string, [number, number]>)[id] ?? [800, 533];
