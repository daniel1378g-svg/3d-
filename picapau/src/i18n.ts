export const LANGS = ["fr", "en", "pt", "it", "de"] as const;
export type Lang = (typeof LANGS)[number];
export type PageKey = "home" | "carte" | "privacy";
export type L10n<T = string> = Record<Lang, T>;

export const HTML_LANG: L10n = { fr: "fr", en: "en", pt: "pt-PT", it: "it", de: "de-CH" };
export const NATIVE: L10n = { fr: "Français", en: "English", pt: "Português", it: "Italiano", de: "Deutsch" };
export const LOCALE: L10n = { fr: "fr-CH", en: "en-GB", pt: "pt-PT", it: "it-CH", de: "de-CH" };

/** URL slug of each page in each language; the home page is the language root. */
export const SLUGS: Record<Lang, Record<PageKey, string>> = {
  fr: { home: "", carte: "carte", privacy: "confidentialite" },
  en: { home: "", carte: "menu", privacy: "privacy" },
  pt: { home: "", carte: "ementa", privacy: "privacidade" },
  it: { home: "", carte: "menu", privacy: "privacy" },
  de: { home: "", carte: "speisekarte", privacy: "datenschutz" },
};

export const isLang = (v: unknown): v is Lang => typeof v === "string" && (LANGS as readonly string[]).includes(v);
export const pathFor = (lang: Lang, page: PageKey) => `/${lang}/${SLUGS[lang][page]}`;
export function pageFromSlug(lang: Lang, slug: string): PageKey | null {
  const entry = (Object.entries(SLUGS[lang]) as [PageKey, string][]).find(([, s]) => s === slug);
  return entry ? entry[0] : null;
}

/** The home sections keep the live site's anchors in every language. */
export const ANCHORS = ["accueil", "carte", "reservation", "galerie", "infos", "facebook-latest"] as const;

export const WELCOME: L10n<{ word: string; line: string }> = {
  fr: { word: "Bienvenue", line: "chez Pica Pau" },
  en: { word: "Welcome", line: "to Pica Pau" },
  pt: { word: "Bem-vindos", line: "ao Pica Pau" },
  it: { word: "Benvenuti", line: "al Pica Pau" },
  de: { word: "Willkommen", line: "im Pica Pau" },
};
