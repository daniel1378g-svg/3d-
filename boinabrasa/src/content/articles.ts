// The long texts (articles, About, Churrasco, Dolcebrigadeiro) and the menu translations, one chunk per language,
// loaded when that language is used. German is the source; the other files are translations of it.
import { useEffect, useState } from "react";
import type { Lang } from "@/i18n";

export type Block = { t: "h2" | "h3" | "p" | "quote"; text: string } | { t: "ul"; items: string[] } | { t: "img"; id: string };
export type Article = { title: string; cover?: string; date?: string; blocks: Block[] };
export type Articles = Record<"churrasco" | "about" | "picanha" | "maminha" | "linguica" | "caipirinha" | "gerichte" | "gaucho" | "dolcebrigadeiro", Article>;
export type MenuTr = { sections: Record<string, { title: string; note?: string }>; items: Record<string, { desc?: string; name?: string }> };

const articleLoaders: Record<Lang, () => Promise<{ default: unknown }>> = {
  de: () => import("@content/articles.de.json"),
  en: () => import("@content/articles.en.json"),
  pt: () => import("@content/articles.pt.json"),
  fr: () => import("@content/articles.fr.json"),
  it: () => import("@content/articles.it.json"),
};
const menuLoaders: Record<Exclude<Lang, "de">, () => Promise<{ default: unknown }>> = {
  en: () => import("@content/i18n/menu.en.json"),
  pt: () => import("@content/i18n/menu.pt.json"),
  fr: () => import("@content/i18n/menu.fr.json"),
  it: () => import("@content/i18n/menu.it.json"),
};
const aCache = new Map<Lang, Articles>();
const mCache = new Map<Lang, MenuTr | null>();

export function loadArticles(lang: Lang) {
  return aCache.has(lang) ? Promise.resolve(aCache.get(lang)!) : articleLoaders[lang]().then((m) => { aCache.set(lang, m.default as Articles); return m.default as Articles; });
}
export function useArticles(lang: Lang) {
  const [a, setA] = useState<Articles | null>(() => aCache.get(lang) ?? null);
  useEffect(() => {
    let live = true;
    loadArticles(lang).then((x) => live && setA(x));
    return () => { live = false; };
  }, [lang]);
  return aCache.get(lang) ?? a;
}
export function useMenuTr(lang: Lang) {
  const [m, setM] = useState<MenuTr | null>(() => mCache.get(lang) ?? null);
  useEffect(() => {
    if (lang === "de") { mCache.set("de", null); setM(null); return; }
    let live = true;
    menuLoaders[lang]().then((x) => { mCache.set(lang, x.default as MenuTr); if (live) setM(x.default as MenuTr); });
    return () => { live = false; };
  }, [lang]);
  return lang === "de" ? null : mCache.get(lang) ?? m;
}
