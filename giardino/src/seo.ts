// Head tags per page and language (title, description, canonical, hreflang, Open Graph). The structured data is in
// seo-ld.ts, used by the prerender only. The proposal build is noindex and emits none of the SEO tags
// (scripts/prerender.mjs); `VITE_PROPOSAL=0` turns them on.
import { HTML_LANG, LANGS, type Dict, type Lang } from "@/i18n";
import { pathFor, type PageKey } from "@/routes";
import type { PageId } from "@/pages/registry";

export const ORIGIN = "https://pizzeriagiardino.ch";
const OG_LOCALE: Record<Lang, string> = { de: "de_CH", en: "en_GB", fr: "fr_CH", it: "it_CH" };

export function headFor(lang: Lang, page: PageId, t: Dict) {
  const known = page !== "notFound";
  const title = known ? t.meta.titles[page as PageKey] : t.meta.titles.notFound;
  const description = known ? t.meta.descriptions[page as PageKey] : t.meta.descriptions.notFound;
  const path = known ? pathFor(lang, page as PageKey) : `/${lang}`;
  const canonical = ORIGIN + path;
  // hreflang with the plain language codes (BRIEF §9); <html lang> keeps the regional tags (de-CH, fr-CH, it-CH)
  const alternates = known ? LANGS.map((l) => ({ hreflang: l, href: ORIGIN + pathFor(l, page as PageKey) })) : [];
  const image = `${ORIGIN}/images/${page === "menu" ? "pizza-rocket" : page === "kids" ? "ship-cliffs" : "garden-view"}-1600.webp`;
  return { title, description, canonical, alternates, image, locale: OG_LOCALE[lang], lang: HTML_LANG[lang] };
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
export function headHtml(lang: Lang, page: PageId, t: Dict) {
  const h = headFor(lang, page, t);
  const alt = h.alternates.map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`);
  if (h.alternates.length) alt.push(`<link rel="alternate" hreflang="x-default" href="${h.alternates[0].href}" />`);
  return [
    `<link rel="canonical" href="${h.canonical}" />`,
    ...alt,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(t.meta.siteName)}" />`,
    `<meta property="og:title" content="${esc(h.title)}" />`,
    `<meta property="og:description" content="${esc(h.description)}" />`,
    `<meta property="og:url" content="${h.canonical}" />`,
    `<meta property="og:image" content="${h.image}" />`,
    `<meta property="og:locale" content="${h.locale}" />`,
    ...LANGS.filter((l) => l !== lang).map((l) => `<meta property="og:locale:alternate" content="${OG_LOCALE[l]}" />`),
    `<meta name="twitter:card" content="summary_large_image" />`,
  ].join("\n    ");
}

