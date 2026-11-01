// The four languages of the site. German (Swiss usage) is the source language.
export const LANGS = ["de", "en", "fr", "it"] as const;
export type Lang = (typeof LANGS)[number];

export const isLang = (v: unknown): v is Lang => typeof v === "string" && (LANGS as readonly string[]).includes(v);

/** BCP 47 tags used for <html lang>, hreflang and Intl formatting. */
export const HTML_LANG: Record<Lang, string> = { de: "de-CH", en: "en", fr: "fr-CH", it: "it-CH" };
export const INTL_LOCALE: Record<Lang, string> = { de: "de-CH", en: "en-CH", fr: "fr-CH", it: "it-CH" };

/** Each language named in itself, as the selector shows it. */
export const LANG_NAMES: Record<Lang, string> = { de: "Deutsch", en: "English", fr: "Français", it: "Italiano" };

/** A text in all four languages. */
export type T = Record<Lang, string>;
export const t = (de: string, en: string, fr: string, it: string): T => ({ de, en, fr, it });
/** The same text in every language (proper names, brands). */
export const same = (s: string): T => ({ de: s, en: s, fr: s, it: s });
