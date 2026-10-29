// Page titles, descriptions, canonical/hreflang links and the Restaurant JSON-LD. Used at runtime (applyHead)
// and by scripts/postbuild-routes.mjs, which writes one static HTML file per page and language.
import { HTML_LANG, LANGS, PAGES, SLUGS, type L, type Lang, type PageKey } from "./i18n";
import { BUSINESS } from "./content/site";

export const ORIGIN = "https://www.leportugais.ch";
const l = (fr: string, en: string, pt: string, it: string, de: string): L => ({ fr, en, pt, it, de });

const TITLES: Record<PageKey, L> = {
  home: l("Le Portugais · Restaurant Marisqueira à Genève, Plainpalais, depuis 1973", "Le Portugais · Portuguese seafood restaurant in Geneva, Plainpalais, since 1973", "Le Portugais · Marisqueira portuguesa em Genebra, Plainpalais, desde 1973", "Le Portugais · Ristorante portoghese di pesce a Ginevra, Plainpalais, dal 1973", "Le Portugais · Portugiesisches Fischrestaurant in Genf, Plainpalais, seit 1973"),
  carte: l("La carte · Le Portugais, Genève", "Menu · Le Portugais, Geneva", "Ementa · Le Portugais, Genebra", "Menu · Le Portugais, Ginevra", "Speisekarte · Le Portugais, Genf"),
  vins: l("Les vins et portos · Le Portugais, Genève", "Wines and ports · Le Portugais, Geneva", "Vinhos e portos · Le Portugais, Genebra", "Vini e porti · Le Portugais, Ginevra", "Weine und Portweine · Le Portugais, Genf"),
  galerie: l("Galerie · Le Portugais, Genève", "Gallery · Le Portugais, Geneva", "Galeria · Le Portugais, Genebra", "Galleria · Le Portugais, Ginevra", "Galerie · Le Portugais, Genf"),
  presse: l("Presse · Le Portugais, Genève", "Press · Le Portugais, Geneva", "Imprensa · Le Portugais, Genebra", "Stampa · Le Portugais, Ginevra", "Presse · Le Portugais, Genf"),
  actualites: l("Actualités · Le Portugais, Genève", "News · Le Portugais, Geneva", "Novidades · Le Portugais, Genebra", "Notizie · Le Portugais, Ginevra", "Aktuelles · Le Portugais, Genf"),
  contact: l("Contact et accès · Le Portugais, Genève", "Contact and directions · Le Portugais, Geneva", "Contacto e acesso · Le Portugais, Genebra", "Contatti e accesso · Le Portugais, Ginevra", "Kontakt und Anfahrt · Le Portugais, Genf"),
};
const DESCRIPTIONS: Record<PageKey, L> = {
  home: l(
    "Depuis le 1er février 1973 à Plainpalais : bacalhau, poissons sauvages, fruits de mer, plats sur commande, vins et portos. Réservation par téléphone.",
    "In Plainpalais since 1 February 1973: bacalhau, wild fish, seafood, dishes to order, wines and ports. Bookings by phone.",
    "Em Plainpalais desde 1 de fevereiro de 1973: bacalhau, peixe selvagem, marisco, pratos por encomenda, vinhos e portos. Reservas por telefone.",
    "A Plainpalais dal 1° febbraio 1973: bacalhau, pesce selvaggio, frutti di mare, piatti su ordinazione, vini e porti. Prenotazione per telefono.",
    "Seit dem 1. Februar 1973 in Plainpalais: Bacalhau, Wildfisch, Meeresfrüchte, Gerichte auf Bestellung, Weine und Portweine. Reservation per Telefon.",
  ),
  carte: l("Entradas, pratos principais, plats sur commande dès 72 heures et sobremesas caseiras : la carte du Portugais avec ses prix.", "Starters, main courses, dishes to order 72 hours ahead and homemade desserts: Le Portugais’s menu with prices.", "Entradas, pratos principais, pratos por encomenda com 72 horas e sobremesas caseiras: a ementa do Le Portugais com preços.", "Antipasti, piatti principali, piatti su ordinazione 72 ore prima e dolci fatti in casa: il menu di Le Portugais con i prezzi.", "Vorspeisen, Hauptgerichte, Gerichte auf Bestellung 72 Stunden im Voraus und hausgemachte Desserts: die Karte des Le Portugais mit Preisen."),
  vins: l("43 vins portugais du Douro à l’Alentejo, rouges, rosés et blancs, et le service de vente et livraison de vins et portos.", "43 Portuguese wines from the Douro to the Alentejo, red, rosé and white, and wine and port sales and delivery.", "43 vinhos portugueses do Douro ao Alentejo, tintos, rosados e brancos, e venda e entrega de vinhos e portos.", "43 vini portoghesi dal Douro all’Alentejo, rossi, rosati e bianchi, e vendita e consegna di vini e porti.", "43 portugiesische Weine vom Douro bis zum Alentejo, rot, rosé und weiss, sowie Verkauf und Lieferung von Weinen und Portweinen."),
  galerie: l("La salle, les plats et les banquets du Portugais en 24 photos.", "Le Portugais’s dining room, dishes and banquets in 24 photos.", "A sala, os pratos e os banquetes do Le Portugais em 24 fotografias.", "La sala, i piatti e i banchetti di Le Portugais in 24 foto.", "Saal, Gerichte und Bankette des Le Portugais in 24 Fotos."),
  presse: l("Le Portugais dans la presse : Tribune de Genève, GaultMillau, Fines Gueules, L’Hebdo et d’autres.", "Le Portugais in the press: Tribune de Genève, GaultMillau, Fines Gueules, L’Hebdo and more.", "O Le Portugais na imprensa: Tribune de Genève, GaultMillau, Fines Gueules, L’Hebdo e outros.", "Le Portugais sulla stampa: Tribune de Genève, GaultMillau, Fines Gueules, L’Hebdo e altri.", "Le Portugais in der Presse: Tribune de Genève, GaultMillau, Fines Gueules, L’Hebdo und weitere."),
  actualites: l("Les messages d’Antonina et Fernando Martins, de 2016 à 2021.", "Messages from Antonina and Fernando Martins, 2016 to 2021.", "As mensagens de Antonina e Fernando Martins, de 2016 a 2021.", "I messaggi di Antonina e Fernando Martins, dal 2016 al 2021.", "Die Nachrichten von Antonina und Fernando Martins, 2016 bis 2021."),
  contact: l("Boulevard du Pont d’Arve 59, 1205 Genève. Réservation par téléphone, fermé le dimanche et le lundi, trams 15 et 17 arrêt Unimail.", "Boulevard du Pont d’Arve 59, 1205 Geneva. Bookings by phone, closed Sundays and Mondays, trams 15 and 17 stop Unimail.", "Boulevard du Pont d’Arve 59, 1205 Genebra. Reservas por telefone, encerrado ao domingo e à segunda, elétricos 15 e 17 paragem Unimail.", "Boulevard du Pont d’Arve 59, 1205 Ginevra. Prenotazione per telefono, chiuso domenica e lunedì, tram 15 e 17 fermata Unimail.", "Boulevard du Pont d’Arve 59, 1205 Genf. Reservation per Telefon, Sonntag und Montag geschlossen, Tram 15 und 17 Haltestelle Unimail."),
};

export const pagePath = (lang: Lang, page: PageKey) => `/${lang}/${SLUGS[lang][page]}`;

export function jsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: BUSINESS.name,
    alternateName: BUSINESS.fullName,
    url: `${ORIGIN}${pagePath(lang, "home")}`,
    image: `${ORIGIN}/brand/og-image.jpg`,
    logo: `${ORIGIN}/brand/logo.png`,
    address: { "@type": "PostalAddress", streetAddress: "Boulevard du Pont d’Arve 59", postalCode: "1205", addressLocality: "Genève", addressCountry: "CH" },
    geo: { "@type": "GeoCoordinates", latitude: 46.1937158, longitude: 6.1382858 },
    telephone: BUSINESS.phones.map((p) => p.tel),
    email: BUSINESS.email,
    servesCuisine: ["Portuguese", "Seafood"],
    foundingDate: BUSINESS.founded,
    founder: [{ "@type": "Person", name: "José Martins" }, { "@type": "Person", name: "Sotera Martins" }],
    hasMenu: `${ORIGIN}${pagePath(lang, "carte")}`,
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
    `<meta property="og:site_name" content="Le Portugais" />`,
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
