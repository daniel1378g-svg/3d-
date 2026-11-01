// Locale formatting for prices, sizes, times and dates. Civil dates ("2026-12-18") are formatted in UTC so the
// visitor's own time zone can never shift them by a day.
import { INTL_LOCALE, type Lang } from "@/i18n/langs";
import type { Size } from "@/content/menu";

const nf = new Map<string, Intl.NumberFormat>();
const num = (lang: Lang, min: number, max: number) => {
  const key = `${lang}:${min}:${max}`;
  if (!nf.has(key)) nf.set(key, new Intl.NumberFormat(INTL_LOCALE[lang], { minimumFractionDigits: min, maximumFractionDigits: max, useGrouping: true }));
  return nf.get(key)!;
};

/**
 * The one price format of the site, the same in all four languages (BRIEF §4): 12.9 → "CHF 12.90" – currency code,
 * narrow no-break space, decimal point, two decimals, as on the printed menus. `lang` is accepted for symmetry only.
 */
export const fmtChf = (n: number, _lang?: Lang) => `CHF\u202F${fmtAmount(n)}`;
/** The amount part of fmtChf: 12.9 → "12.90", 1234 → "1’234.00" (Swiss grouping, never a decimal comma). */
export const fmtAmount = (n: number) => {
  const [int, dec] = Math.abs(n).toFixed(2).split(".");
  return `${n < 0 ? "−" : ""}${int.replace(/\B(?=(\d{3})+(?!\d))/g, "’")}.${dec}`;
};
/** 16.5 → "16.5" / "16,5" */
export const fmtDecimal = (n: number, lang: Lang) => num(lang, 0, 2).format(n);

export function fmtSize(size: Size, lang: Lang) {
  return `${fmtDecimal(size.q, lang)} ${size.u}`;
}

/** "11:30" → "11:30" (de, en, it) or "11 h 30" (fr). */
export function fmtTime(hhmm: string, lang: Lang) {
  if (lang !== "fr") return hhmm;
  const [h, m] = hhmm.split(":");
  return m === "00" ? `${Number(h)} h` : `${Number(h)} h ${m}`;
}

const df = new Map<string, Intl.DateTimeFormat>();
export function fmtDate(ymd: string, lang: Lang, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }) {
  const key = lang + JSON.stringify(opts);
  if (!df.has(key)) df.set(key, new Intl.DateTimeFormat(INTL_LOCALE[lang], { ...opts, timeZone: "UTC" }));
  const [y, m, d] = ymd.split("-").map(Number);
  let out = df.get(key)!.format(new Date(Date.UTC(y, m - 1, d)));
  // fr-CH / it-CH typography: no comma after the weekday, «1er novembre» / «1° novembre»
  if (lang === "fr" || lang === "it") {
    out = out.replace(/^(\p{L}+), /u, "$1 ");
    if (d === 1) out = out.replace(/(^|\s)1(\s)(?=\p{L})/u, `$1${lang === "fr" ? "1er" : "1°"}$2`);
  }
  return out;
}
export const fmtDayLong = (ymd: string, lang: Lang) => fmtDate(ymd, lang, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
export const fmtDayShort = (ymd: string, lang: Lang) => fmtDate(ymd, lang, { weekday: "short", day: "numeric", month: "short" });

/** Weekday names, Monday first, for the calendar header. */
export function weekdayNames(lang: Lang, style: "short" | "narrow" | "long" = "short") {
  const f = new Intl.DateTimeFormat(INTL_LOCALE[lang], { weekday: style, timeZone: "UTC" });
  return Array.from({ length: 7 }, (_, i) => f.format(new Date(Date.UTC(2026, 10, 2 + i)))); // 2 Nov 2026 is a Monday
}
export function monthName(year: number, month: number, lang: Lang) {
  return new Intl.DateTimeFormat(INTL_LOCALE[lang], { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(year, month - 1, 1)));
}

export function fmtBytes(n: number, lang: Lang) {
  return `${fmtDecimal(Math.round(n / 1e5) / 10, lang)} MB`;
}

/** Lists like "CHF 50, 100 und 150" */
export function fmtList(items: string[], lang: Lang) {
  return new Intl.ListFormat(INTL_LOCALE[lang], { style: "long", type: "conjunction" }).format(items);
}

/** Lower-case, accent-free text for searching ("Dôle" matches "dole"). */
export const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/ß/g, "ss");
