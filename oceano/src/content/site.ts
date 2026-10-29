// The restaurant's own words and facts: the German texts verbatim from content/texts.de.json (captured from
// https://www.burguesa.ch), their translations from content/translations/*.json (checked by a second pass),
// and the facts, which are the same in every language.
import de from "@content/texts.de.json";
import en from "@content/translations/en.json";
import pt from "@content/translations/pt.json";
import fr from "@content/translations/fr.json";
import it from "@content/translations/it.json";
import type { L, Lang } from "@/i18n";

type Keys = Exclude<keyof typeof de, "_source">;
const T = { de, en, pt, fr, it } as Record<Lang, Record<string, string>>;

/** A text in the five languages; a missing translation falls back to the German. */
export const t = (key: Keys): L => ({ de: T.de[key], en: T.en[key] || T.de[key], pt: T.pt[key] || T.de[key], fr: T.fr[key] || T.de[key], it: T.it[key] || T.de[key] });
export const TX = new Proxy({} as Record<Keys, L>, { get: (_, k: string) => t(k as Keys) });

export const BUSINESS = {
  name: "Restaurant Oceano",
  shop: "Laden Oceano",
  restaurant: { street: "Zürcherstrasse 16", city: "8952 Schlieren", phone: "044 730 25 48", tel: "+41447302548" },
  laden: { street: "Lilienweg 2", city: "8952 Schlieren", phone: "043 495 07 74", tel: "+41434950774" },
  email: "oceanoimport.gmbh@bluewin.ch",
  booking: "https://www.mylocalina.ch/widget/?id=369c803d-b8c2-408a-a96f-8ef409b96801",
  webShop: "https://www.burguesa.ch/web-shop",
  privacy: "https://www.burguesa.ch/privacy",
  localCh: "https://www.local.ch/en/d/schlieren/8952/restaurant/oceano-restaurant-5AZgaykclbjk9Ibj0EtS4Q",
  searchCh: "https://tel.search.ch/schlieren/zuercherstrasse-16/restaurant-oceano",
  // new: the live site has no map links; built from the addresses
  maps: {
    restaurant: {
      google: "https://www.google.com/maps/search/?api=1&query=Restaurant%20Oceano%2C%20Z%C3%BCrcherstrasse%2016%2C%208952%20Schlieren",
      apple: "https://maps.apple.com/?q=Restaurant%20Oceano&address=Z%C3%BCrcherstrasse%2016%2C%208952%20Schlieren%2C%20Schweiz",
      waze: "https://waze.com/ul?q=Z%C3%BCrcherstrasse%2016%2C%208952%20Schlieren&navigate=yes",
      embed: "https://www.google.com/maps?q=Z%C3%BCrcherstrasse+16,+8952+Schlieren&output=embed",
    },
    laden: {
      google: "https://www.google.com/maps/search/?api=1&query=Laden%20Oceano%2C%20Lilienweg%202%2C%208952%20Schlieren",
      apple: "https://maps.apple.com/?q=Laden%20Oceano&address=Lilienweg%202%2C%208952%20Schlieren%2C%20Schweiz",
      waze: "https://waze.com/ul?q=Lilienweg%202%2C%208952%20Schlieren&navigate=yes",
      embed: "https://www.google.com/maps?q=Lilienweg+2,+8952+Schlieren&output=embed",
    },
  },
  // the live line is "© 2022 Realisiert durch localsearch.ch": the credit stays out (a decision, listed)
  copyright: "© 2022 Restaurant Oceano",
  founded: "2004",
};

export const STRIP = ["RESTAURANT OCEANO", "NICHT NUR BURGER", "PORTUGIESISCHE KÜCHE", "STOCKFISCH", "PASTÉIS DE NATA", "PORTWEIN", "LICOR BEIRÃO", "SCHLIEREN"];
