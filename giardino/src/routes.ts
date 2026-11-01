// Every page in every language. The paths keep those of the current site (pizzeriagiardino.ch) wherever they exist;
// the few that change get permanent redirects (LEGACY_REDIRECTS), served by server/index.ts and written to
// dist/_redirects for static hosts.
import { LANGS, type Lang } from "./i18n/langs";

export const PAGE_KEYS = ["home", "menu", "reserve", "status", "kids", "hosts", "gallery", "visit", "contact", "hotels", "jobs", "press", "tour", "imprint", "privacy"] as const;
export type PageKey = (typeof PAGE_KEYS)[number];
/** pages that appear in navigation (everything but the personal status page) */
export type NavKey = Exclude<PageKey, "status">;

export const SLUGS: Record<Lang, Record<PageKey, string>> = {
  de: { home: "", menu: "essen-geniessen", reserve: "reservation", status: "reservation/status", kids: "kids", hosts: "gastgeber", gallery: "allgemein/impressionen", visit: "allgemein/anreise", contact: "allgemein/kontakt", hotels: "partnerhotels", jobs: "allgemein/jobs", press: "allgemein/presse", tour: "allgemein/rundgang", imprint: "impressum", privacy: "datenschutz" },
  en: { home: "", menu: "eat-enjoy", reserve: "bookings", status: "bookings/status", kids: "kids", hosts: "host", gallery: "meta/impressions", visit: "meta/arrival", contact: "meta/contact", hotels: "partner-hotels", jobs: "meta/jobs", press: "meta/press", tour: "meta/virtual-tour", imprint: "imprint", privacy: "privacy" },
  fr: { home: "", menu: "manger-et-savourer", reserve: "reservation", status: "reservation/statut", kids: "enfants", hosts: "hotes", gallery: "meta/impressions", visit: "meta/arrivee", contact: "meta/contact", hotels: "hotels-partenaires", jobs: "meta/emplois", press: "meta/presse", tour: "meta/tour-virtuel", imprint: "mentions-legales", privacy: "protection-des-donnees" },
  it: { home: "", menu: "mangia-e-divertiti", reserve: "prenotazione", status: "prenotazione/stato", kids: "kids", hosts: "la-casa", gallery: "meta/impressioni", visit: "meta/come-arrivare", contact: "meta/contatto", hotels: "alberghi-partner", jobs: "meta/lavoro", press: "meta/stampa", tour: "meta/tour-virtuale", imprint: "note-legali", privacy: "protezione-dei-dati" },
};

/** Pages that are part of the sitemap (the reservation status page is personal and stays out). */
export const INDEXED: PageKey[] = PAGE_KEYS.filter((p) => p !== "status");

export const pathFor = (lang: Lang, page: PageKey) => `/${lang}${SLUGS[lang][page] ? "/" + SLUGS[lang][page] : ""}`;

/** Finds the page for a path such as "/fr/meta/arrivee" (trailing slash and query ignored). */
export function matchPath(pathname: string): { lang: Lang; page: PageKey } | null {
  const clean = pathname.replace(/\/+$/, "") || "/";
  for (const lang of LANGS) {
    for (const page of PAGE_KEYS) {
      if (pathFor(lang, page) === clean) return { lang, page };
    }
  }
  return null;
}

/** Language-neutral section anchors (Italian, like the house): the same in every language, so a switch keeps them. */
export const ANCHORS = {
  welcome: "benvenuti",
  story: "la-casa",
  kitchen: "cucina",
  menu: "carta",
  hosts: "padroni",
  family: "famiglia",
  film: "film",
  gallery: "galleria",
  reserve: "prenota",
  visit: "visita",
  services: "servizi",
} as const;

const SPA = "https://www.leukerbad.ch/therme";
/** Old address → new address (permanent). */
export const LEGACY_REDIRECTS: Record<string, string> = {
  "/de/allgemein": "/de",
  "/en/meta": "/en",
  "/fr/meta": "/fr",
  "/it/meta": "/it",
  "/de/home": "/de",
  "/fr/empreinte": "/fr/mentions-legales",
  "/fr/hotel-partner": "/fr/hotels-partenaires",
  "/it/impronta": "/it/note-legali",
  "/it/partner-albergos": "/it/alberghi-partner",
  "/de/allgemein/leukerbad-therme": SPA,
  "/en/meta/leukerbad-therme": SPA,
  "/fr/meta/leukerbad-therme": SPA,
  "/it/meta/leukerbad-therme": SPA,
};

/** The PDF links of the current site use ?action=get_file&id=13&resource_link_id=… on the root. */
export const LEGACY_FILES: Record<string, string> = {
  "124": "/menus/Speisekarte-Menu.pdf",
  "15a": "/menus/Getraenkekarte.pdf",
  "158": "/menus/Speisekarte-Kids.pdf",
  "159": "/menus/Dessertkarte.pdf",
};
