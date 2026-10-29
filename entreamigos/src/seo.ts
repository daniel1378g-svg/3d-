// Page titles, descriptions, canonical/hreflang links and the Restaurant JSON-LD. Used at runtime (applyHead)
// and by scripts/postbuild-routes.mjs, which writes one static HTML file per page and language.
import { HTML_LANG, LANGS, PAGES, SLUGS, type L, type Lang, type PageKey } from "./i18n";
import { BUSINESS } from "./content/site";

export const ORIGIN = "https://entreamigos.ch";
const l = (fr: string, en: string, pt: string, it: string, de: string): L => ({ fr, en, pt, it, de });

const TITLES: Record<PageKey, L> = {
  home: l("Café-Restaurant Entre Amigos · Spécialités portugaises et françaises à Chêne-Bougeries", "Café-Restaurant Entre Amigos · Portuguese and French specialities in Chêne-Bougeries", "Café-Restaurant Entre Amigos · Especialidades portuguesas e francesas em Chêne-Bougeries", "Café-Restaurant Entre Amigos · Specialità portoghesi e francesi a Chêne-Bougeries", "Café-Restaurant Entre Amigos · Portugiesische und französische Spezialitäten in Chêne-Bougeries"),
  carte: l("La carte · Entre Amigos, Chêne-Bougeries", "Menu · Entre Amigos, Chêne-Bougeries", "Ementa · Entre Amigos, Chêne-Bougeries", "Menu · Entre Amigos, Chêne-Bougeries", "Speisekarte · Entre Amigos, Chêne-Bougeries"),
  commande: l("Sur commande, pour minimum 10 personnes · Entre Amigos", "Pre-order, for at least 10 people · Entre Amigos", "Por encomenda, para um mínimo de 10 pessoas · Entre Amigos", "Su ordinazione, per almeno 10 persone · Entre Amigos", "Auf Bestellung, ab 10 Personen · Entre Amigos"),
  vins: l("Nos vins portugais · Entre Amigos, Chêne-Bougeries", "Our Portuguese wines · Entre Amigos, Chêne-Bougeries", "Os nossos vinhos portugueses · Entre Amigos, Chêne-Bougeries", "I nostri vini portoghesi · Entre Amigos, Chêne-Bougeries", "Unsere portugiesischen Weine · Entre Amigos, Chêne-Bougeries"),
  galerie: l("Galerie · Entre Amigos, Chêne-Bougeries", "Gallery · Entre Amigos, Chêne-Bougeries", "Galeria · Entre Amigos, Chêne-Bougeries", "Galleria · Entre Amigos, Chêne-Bougeries", "Galerie · Entre Amigos, Chêne-Bougeries"),
  acces: l("Plan d’accès · Entre Amigos, Av. des Cavaliers 1, Chêne-Bougeries", "Getting here · Entre Amigos, Av. des Cavaliers 1, Chêne-Bougeries", "Como chegar · Entre Amigos, Av. des Cavaliers 1, Chêne-Bougeries", "Come arrivare · Entre Amigos, Av. des Cavaliers 1, Chêne-Bougeries", "Anfahrt · Entre Amigos, Av. des Cavaliers 1, Chêne-Bougeries"),
};
/** Written from the pages' own sentences (the live site has no meta descriptions): no new claims. */
const DESCRIPTIONS: Record<PageKey, L> = {
  home: l(
    "Vous avez envie d’évasion, de soleil et de bord de mer ? Voyagez grâce aux parfums et aux saveurs des spécialités portugaises du Café-Restaurant Entre Amigos à Chêne-Bougeries.",
    "Longing for a getaway, sunshine and the seaside? Travel through the scents and flavours of Portuguese specialities at the Café-Restaurant Entre Amigos in Chêne-Bougeries.",
    "Tem vontade de evasão, de sol e de beira-mar? Viaje através dos aromas e sabores das especialidades portuguesas do Café-Restaurant Entre Amigos em Chêne-Bougeries.",
    "Avete voglia di evasione, di sole e di mare? Viaggiate grazie ai profumi e ai sapori delle specialità portoghesi del Café-Restaurant Entre Amigos a Chêne-Bougeries.",
    "Lust auf Urlaub, Sonne und Meer? Reisen Sie mit den Düften und Aromen der portugiesischen Spezialitäten des Café-Restaurant Entre Amigos in Chêne-Bougeries.",
  ),
  carte: l("Grand choix de plats portugais de l’entrée au dessert. Tous nos prix sont en CHF et incluent la TVA.", "A wide choice of Portuguese dishes from starter to dessert. All prices in CHF, VAT included.", "Grande escolha de pratos portugueses, da entrada à sobremesa. Todos os preços em CHF, IVA incluído.", "Ampia scelta di piatti portoghesi dall’antipasto al dolce. Tutti i prezzi in CHF, IVA inclusa.", "Grosse Auswahl portugiesischer Gerichte von der Vorspeise bis zum Dessert. Alle Preise in CHF inkl. MWST."),
  commande: l("Leitao, Cabrito no formo, Cozido à Portuguesa, Feijoada à Transmontana, Vitela no Formo : pour minimum 10 personnes, prix par personne.", "Leitao, Cabrito no formo, Cozido à Portuguesa, Feijoada à Transmontana, Vitela no Formo: for at least 10 people, priced per person.", "Leitao, Cabrito no formo, Cozido à Portuguesa, Feijoada à Transmontana, Vitela no Formo: mínimo 10 pessoas, preço por pessoa.", "Leitao, Cabrito no formo, Cozido à Portuguesa, Feijoada à Transmontana, Vitela no Formo: almeno 10 persone, prezzo a persona.", "Leitao, Cabrito no formo, Cozido à Portuguesa, Feijoada à Transmontana, Vitela no Formo: ab 10 Personen, Preis pro Person."),
  vins: l("Le Portugal est un pays avec une longue tradition viticole : Vinho Verde, Douro, Dão et Alentejo à la carte des vins d’Entre Amigos.", "Portugal has a long winemaking tradition: Vinho Verde, Douro, Dão and Alentejo on the Entre Amigos wine list.", "Portugal tem uma longa tradição vinícola: Vinho Verde, Douro, Dão e Alentejo na carta de vinhos do Entre Amigos.", "Il Portogallo ha una lunga tradizione vitivinicola: Vinho Verde, Douro, Dão e Alentejo nella carta dei vini di Entre Amigos.", "Portugal hat eine lange Weinbautradition: Vinho Verde, Douro, Dão und Alentejo auf der Weinkarte von Entre Amigos."),
  galerie: l("La terrasse, les plats et les desserts d’Entre Amigos en photos.", "The terrace, dishes and desserts of Entre Amigos in photos.", "A esplanada, os pratos e as sobremesas do Entre Amigos em fotografias.", "La terrazza, i piatti e i dolci di Entre Amigos in foto.", "Terrasse, Gerichte und Desserts von Entre Amigos in Bildern."),
  acces: l("Av. des Cavaliers 1 - 1224 Chêne-Bougeries. Bus A : Arrêt Cologny Gradelle. Bus 1 et 9 : Arrêt Cologny Clos du Môlan. Parking zone blanche.", "Av. des Cavaliers 1 - 1224 Chêne-Bougeries. Bus A: stop Cologny Gradelle. Buses 1 and 9: stop Cologny Clos du Môlan. White-zone parking.", "Av. des Cavaliers 1 - 1224 Chêne-Bougeries. Autocarro A: paragem Cologny Gradelle. Autocarros 1 e 9: paragem Cologny Clos du Môlan. Estacionamento em zona branca.", "Av. des Cavaliers 1 - 1224 Chêne-Bougeries. Bus A: fermata Cologny Gradelle. Bus 1 e 9: fermata Cologny Clos du Môlan. Parcheggio in zona bianca.", "Av. des Cavaliers 1 - 1224 Chêne-Bougeries. Bus A: Haltestelle Cologny Gradelle. Bus 1 und 9: Haltestelle Cologny Clos du Môlan. Parkieren in der weissen Zone."),
};

export const pagePath = (lang: Lang, page: PageKey) => `/${lang}/${SLUGS[lang][page]}`;

export function jsonLd(lang: Lang) {
  const spec = (days: string[], opens: string, closes: string) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: days, opens, closes });
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: BUSINESS.name,
    url: `${ORIGIN}${pagePath(lang, "home")}`,
    image: `${ORIGIN}/brand/og-image.jpg`,
    logo: `${ORIGIN}/brand/logo.png`,
    address: { "@type": "PostalAddress", streetAddress: "Av. des Cavaliers 1", postalCode: "1224", addressLocality: "Chêne-Bougeries", addressCountry: "CH" },
    telephone: BUSINESS.phoneTel,
    email: BUSINESS.email,
    servesCuisine: ["Portuguese", "French"],
    openingHoursSpecification: [
      spec(["Monday"], "10:30", "14:30"),
      spec(["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], "10:30", "14:30"),
      spec(["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], "18:00", "23:00"),
      spec(["Sunday"], "10:30", "16:00"),
    ],
    hasMenu: `${ORIGIN}${pagePath(lang, "carte")}`,
    currenciesAccepted: "CHF",
    acceptsReservations: true,
    sameAs: [BUSINESS.facebook],
  };
}

export function headTags(lang: Lang, page: PageKey) {
  const title = TITLES[page][lang];
  const description = DESCRIPTIONS[page][lang];
  const url = `${ORIGIN}${pagePath(lang, page)}`;
  const alt = LANGS.map((l2) => `<link rel="alternate" hreflang="${HTML_LANG[l2]}" href="${ORIGIN}${pagePath(l2, page)}" />`);
  const html = [
    `<link rel="canonical" href="${url}" />`,
    ...alt,
    `<link rel="alternate" hreflang="x-default" href="${ORIGIN}${pagePath("fr", page)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Café-Restaurant Entre Amigos" />`,
    `<meta property="og:title" content="${title.replace(/"/g, "&quot;")}" />`,
    `<meta property="og:description" content="${description.replace(/"/g, "&quot;")}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${ORIGIN}/brand/og-image.jpg" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd(lang))}</script>`,
  ].join("\n    ");
  return { title, description, html };
}

/** Keeps the document head in step with the page and language in the browser. */
export function applyHead(lang: Lang, page: PageKey) {
  const { title, description } = headTags(lang, page);
  document.title = title;
  let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "description";
    document.head.appendChild(meta);
  }
  meta.content = description;
  if (__ARTIFACT__) return;
  document.querySelectorAll('link[rel="alternate"][hreflang], link[rel="canonical"]').forEach((n) => n.remove());
  const add = (rel: string, href: string, hreflang?: string) => {
    const link = document.createElement("link");
    link.rel = rel;
    link.href = href;
    if (hreflang) link.hreflang = hreflang;
    document.head.appendChild(link);
  };
  add("canonical", `${ORIGIN}${pagePath(lang, page)}`);
  for (const l2 of LANGS) add("alternate", `${ORIGIN}${pagePath(l2, page)}`, HTML_LANG[l2]);
  add("alternate", `${ORIGIN}${pagePath("fr", page)}`, "x-default");
}
export { PAGES };
