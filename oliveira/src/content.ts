import photosJson from "../content/photos.json";
import dishesJson from "../content/dishes.json";
import hoursJson from "../content/hours.json";
import images from "./data/images.json";
import type { Lang, Localized } from "./i18n";

export const CONTACT = {
  name: "Restaurante Oliveira",
  street: "Stationsstrasse 3",
  zip: "8406",
  city: "Winterthur",
  district: "Winterthur-Töss",
  phone: "044 730 71 71",
  phoneHref: "tel:+41447307171",
  phoneIntl: "+41 44 730 71 71",
  email: "info@oliveira-winterthur.ch",
  facebook: "https://www.facebook.com/RestauranteOliveiraWinterthur/",
  localinaId: "e029b875-9b04-46d5-bc61-592b59f3d9e1",
  localinaUrl: "https://www.mylocalina.ch/widget/?id=e029b875-9b04-46d5-bc61-592b59f3d9e1",
  // Geocoded from OpenStreetMap (Nominatim) for the map pin; the sun uses the same point.
  lat: 47.49133,
  lng: 8.70761,
};

type Living = { shimmer: boolean };
export type Photo = {
  id: string;
  name: string;
  source: "own" | "supplied";
  illustrative: boolean;
  alt: Localized;
  w: number;
  h: number;
  widths: number[];
  lqip: string;
  square?: boolean;
  living?: Living;
};
type ImageMeta = { w: number; h: number; widths: number[]; lqip: string; square?: boolean; living?: Living };
const meta = images as Record<string, ImageMeta>;

export const PHOTOS: Photo[] = photosJson.photos.map((p) => ({
  id: p.id,
  name: p.name,
  source: p.source as Photo["source"],
  illustrative: p.illustrative,
  alt: p.alt as Localized,
  ...meta[p.name],
}));
export const photo = (id: string) => {
  const hit = PHOTOS.find((p) => p.id === id);
  if (!hit) throw new Error(`Unknown photo ${id}`);
  return hit;
};

export type Cuisine = "pt" | "ch" | null;
export type Dish = {
  id: string;
  name: string | Localized;
  cuisine: Cuisine;
  photos: string[];
  source: "live-text" | "own-photo" | "supplied";
  onMenu: true | false | "unconfirmed";
  price: null;
  feature?: boolean;
  desc: Localized;
};
export const DISHES = dishesJson.dishes as unknown as Dish[];
export const TAGESMENUE: string[] = dishesJson.tagesmenue;
export const dishName = (d: Dish, lang: Lang) => (typeof d.name === "string" ? d.name : d.name[lang]);

export const HOURS = hoursJson as unknown as { confirmed: boolean; source: string; days: Record<string, [string, string][]> };
