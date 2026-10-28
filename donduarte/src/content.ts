import platsJson from "../content/plats.json";
import vinsJson from "../content/vins.json";
import dessertsJson from "../content/desserts.json";
import type { Lang, Localized } from "./i18n";

type Partial5 = Partial<Localized> & { fr: string };
export type MenuItem = {
  id: string;
  raw: number[];
  name: Partial5;
  desc?: Partial5;
  prices: string[];
  priceLabels?: Localized[];
  notes?: Localized[];
  region?: string;
  grapes?: string;
  photo?: string;
  pdfOnly?: boolean;
  duplicates?: number[];
};
export type MenuSection = { id: string; title: Localized | null; items: MenuItem[]; map?: string };
export type MenuGroup = { id: string; title: Localized; note?: Localized; items?: MenuItem[]; sections?: MenuSection[]; winesFromPdf?: string[] };
export type Menu = { source: string; pdf: string; pdfHome?: string; note?: Localized; liveLines: number; shownLines: number; groups: MenuGroup[] };

export const PLATS = platsJson as unknown as Menu;
export const VINS = vinsJson as unknown as Menu;
export const DESSERTS = dessertsJson as unknown as Menu;

/** Sections of a group: wine groups have sub-sections, the other menus one untitled section. */
export const sectionsOf = (g: MenuGroup): MenuSection[] => g.sections ?? [{ id: g.id, title: null, items: g.items ?? [] }];
export const itemsOf = (m: Menu) => m.groups.flatMap((g) => sectionsOf(g).flatMap((s) => s.items));

// Owner's own translation for the language, else the Portuguese name, else the French one.
export function nameIn(item: MenuItem, lang: Lang): string {
  const n = item.name;
  if (n[lang]) return n[lang]!;
  return n.pt ?? n.fr;
}
export const descIn = (item: MenuItem, lang: Lang) => (item.desc ? item.desc[lang] ?? item.desc.fr : "");
export const chf = (p: string) => `CHF ${p}`;

export const findItem = (m: Menu, id: string) => itemsOf(m).find((i) => i.id === id);
export const TERRE_ET_MER = findItem(PLATS, "p11")!;

export const CONTACT = {
  street: "Rue du Môle 5",
  city: "1201 Genève",
  phone: "+41 22 731 44 30",
  tel: "tel:+41227314430",
  email: "donduarte@bluewin.ch",
  maps: "https://goo.gl/maps/ivbt8rGRTn2VAEQ67",
  mapsEmbed: "https://www.google.com/maps?q=Rue+du+M%C3%B4le+5,+1201+Gen%C3%A8ve&output=embed",
  facebook: "https://www.facebook.com/RestaurantDonDuarte",
  instagram: "https://www.instagram.com/restaurant_donduarte/",
};
