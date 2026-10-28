import menuJson from "../content/menu.json";
import sizes from "./data/image-sizes.json";
import type { Lang, Localized } from "./i18n";
import { PHOTOS } from "./copy";
export { CONTACT, FORM_ENDPOINT, logo } from "./contact";

export type Side = "mar" | "terra" | "both" | "none";
export type Dish = {
  id: string;
  name: string;
  livePrice: string;
  price: string;
  from?: boolean;
  desc: Partial<Localized>;
  side: Side;
  notes?: Localized[];
  photo?: string;
  alsoIn?: string;
  piri?: boolean;
  added?: string[];
};
export type Section = { id: string; title: Localized; photos: string[]; items: Dish[] };
export const MENU = menuJson as unknown as { liveListings: number; sections: Section[] };
export const DISHES = MENU.sections.flatMap((s) => s.items.map((d) => ({ ...d, section: s.id })));
export const sectionTitle = (id: string, lang: Lang) => MENU.sections.find((s) => s.id === id)?.title[lang] ?? id;
export const findDish = (sectionId: string, name: string) => MENU.sections.find((s) => s.id === sectionId)!.items.find((d) => d.name === name)!;

/** "CHF 36.50", the same way in every language. */
export const chf = (d: Pick<Dish, "price">) => `CHF ${d.price}`;
export const descIn = (d: Dish, lang: Lang) => d.desc[lang] ?? "";

const base = () => import.meta.env.BASE_URL;
export const photo = (id: string, small = false) => `${base()}images/${id}${small ? "-sm" : ""}.webp`;
export const photoAlt = (id: string, lang: Lang) => PHOTOS[id]?.[lang] ?? "";
export const photoSize = (id: string) => (sizes as unknown as Record<string, [number, number]>)[id] ?? [500, 333];




/** "CHF 36.50", or "dès CHF 20.00" for a starting price. */
export const priceLabel = (d: Pick<Dish, "price" | "from">, lang: Lang, fromWord: Localized) => (d.from ? `${fromWord[lang]} ${chf(d)}` : chf(d));
