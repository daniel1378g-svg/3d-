// The restaurant's own words and facts: the German and Portuguese texts verbatim from content/texts.de.json
// and texts.pt.json (captured from https://www.daolafoes.ch), the other languages from content/translations/*.json,
// and the facts, which are the same in every language.
import de from "@content/texts.de.json";
import ptLive from "@content/texts.pt.json";
import pt from "@content/translations/pt.json";
import fr from "@content/translations/fr.json";
import it from "@content/translations/it.json";
import en from "@content/translations/en.json";
import type { L, Lang } from "@/i18n";

type Keys = Exclude<keyof typeof de, "_source">;
const T = { de, pt, fr, it, en } as Record<Lang, Record<string, string>>;
const PT_LIVE = ptLive as Record<string, string>;

/** A text in the five languages; the live Portuguese wins, a missing translation falls back to the German. */
export const t = (key: Keys): L => ({
  de: T.de[key],
  pt: PT_LIVE[key] || T.pt[key] || T.de[key],
  fr: T.fr[key] || T.de[key],
  it: T.it[key] || T.de[key],
  en: T.en[key] || T.de[key],
});
export const TX = new Proxy({} as Record<Keys, L>, { get: (_, k: string) => t(k as Keys) });
/** "{n}" placeholders. */
export const fill = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));

export const BUSINESS = {
  name: "Casa Dão Lafões",
  short: "Dão Lafões",
  claim: "Leitão à Bairrada",
  street: "Zürcherstrasse 164",
  city: "CH - 8952 Schlieren",
  plz: "8952",
  town: "Schlieren",
  canton: "Kanton Zürich",
  phones: [
    { show: "043 433 84 61", tel: "+41434338461" },
    { show: "078 831 28 07", tel: "+41788312807" },
  ],
  email: "info@daolafoes.ch",
  gps: { lat: 47.39503, lng: 8.469237, show: "47.395030, 8.469237" },
  founded: "2003",
  schlierenSince: "2014",
  founder: "Joaquim Sousa",
  pdf: "https://www.daolafoes.ch/files/menu/menu_de.pdf",
  pdfPt: "https://www.daolafoes.ch/files/menu/menu_pt.pdf",
  social: {
    facebook: "https://www.facebook.com/cdlschlieren",
    twitter: "https://twitter.com/casadaolafoes",
    vimeo: "https://vimeo.com/daolafoes",
  },
  // the live site has no map links; built from the address and the GPS point it publishes
  maps: {
    google: "https://www.google.com/maps/search/?api=1&query=47.395030%2C8.469237",
    apple: "https://maps.apple.com/?q=Casa%20D%C3%A3o%20Laf%C3%B5es&ll=47.395030,8.469237",
    waze: "https://waze.com/ul?ll=47.395030,8.469237&navigate=yes",
    embed: "https://www.google.com/maps?q=47.395030,8.469237&z=16&output=embed",
  },
  copyright: "DÃO LAFÕES © 2014 . All Rights Reserved",
  /** From the threshold on, the table widget shows the party services. */
  bigParty: 10,
};
