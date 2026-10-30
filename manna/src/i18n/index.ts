// Languages, page addresses and dictionary loading. The interface words live in one dictionary per language
// (src/i18n/<lang>.ts); German is the source and its shape is the type every other language must satisfy, so a
// missing key is a build error. Facts (prices, hours, phone, address) never pass through here: they live in
// src/content/facts.ts and are identical in every language.
import type { Dict } from "./de";
export type { Dict } from "./de";

export const LANGS = ["de", "en", "pt", "fr", "it"] as const;
export type Lang = (typeof LANGS)[number];
export const isLang = (v: unknown): v is Lang => typeof v === "string" && (LANGS as readonly string[]).includes(v);

export const HTML_LANG: Record<Lang, string> = { de: "de-CH", en: "en", pt: "pt-BR", fr: "fr-CH", it: "it-CH" };
export const LOCALE: Record<Lang, string> = { de: "de-CH", en: "en-GB", pt: "pt-BR", fr: "fr-CH", it: "it-CH" };
export const NATIVE: Record<Lang, string> = { de: "Deutsch", en: "English", pt: "Português", fr: "Français", it: "Italiano" };
export const SHORT: Record<Lang, string> = { de: "DE", en: "EN", pt: "PT", fr: "FR", it: "IT" };

/** The word the language-switch transition shows, in the language being switched to. */
export const WELCOME: Record<Lang, string> = { de: "Willkommen", en: "Welcome", pt: "Bem-vindos", fr: "Bienvenue", it: "Benvenuti" };

export type PageKey = "home" | "angebot" | "impressum";
export const PAGES: PageKey[] = ["home", "angebot", "impressum"];

export const SLUGS: Record<Lang, Record<PageKey, string>> = {
  de: { home: "", angebot: "angebot", impressum: "impressum" },
  en: { home: "", angebot: "our-range", impressum: "imprint" },
  pt: { home: "", angebot: "nossos-produtos", impressum: "impressum" },
  fr: { home: "", angebot: "notre-offre", impressum: "mentions-legales" },
  it: { home: "", angebot: "la-nostra-offerta", impressum: "note-legali" },
};

export const pathFor = (lang: Lang, page: PageKey) => `/${lang}/${SLUGS[lang][page]}`.replace(/\/$/, "/");

export function routeFromSlug(lang: Lang, slug: string): { page: PageKey } | null {
  const s = slug.replace(/^\/|\/$/g, "");
  const page = (Object.keys(SLUGS[lang]) as PageKey[]).find((p) => SLUGS[lang][p] === s);
  return page ? { page } : null;
}

/** Home anchors (section ids), identical in every language so links and the language switch can keep them. */
export const ANCHORS = ["start", "entdecken", "becher", "waffeln", "ueber", "galerie", "besuch", "faq"] as const;
export type Anchor = (typeof ANCHORS)[number];

// One chunk per language: the dictionary (and the long texts) of a language are only fetched when it is used.
const loaders: Record<Lang, () => Promise<Dict>> = {
  de: () => import("./de").then((m) => m.de),
  en: () => import("./en").then((m) => m.en),
  pt: () => import("./pt").then((m) => m.pt),
  fr: () => import("./fr").then((m) => m.fr),
  it: () => import("./it").then((m) => m.it),
};
const cache = new Map<Lang, Dict>();
export async function loadDict(lang: Lang): Promise<Dict> {
  const hit = cache.get(lang);
  if (hit) return hit;
  const d = await loaders[lang]();
  cache.set(lang, d);
  return d;
}
export const cachedDict = (lang: Lang) => cache.get(lang);

/** "{n} Personen" → "4 Personen". Unknown names are left as they are, so a missing value is visible. */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (m, k) => (k in values ? String(values[k]) : m));
}

/** Picks the singular or plural form for a count, following the language's plural rules. */
export function plural(lang: Lang, n: number, forms: { one: string; other: string }) {
  return fill(new Intl.PluralRules(LOCALE[lang]).select(n) === "one" ? forms.one : forms.other, { n });
}
