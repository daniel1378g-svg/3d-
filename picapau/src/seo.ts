import { HTML_LANG, LANGS, pathFor, type L10n, type Lang, type PageKey } from "./i18n";
import { CONTACT } from "./contact";
import { CARTE } from "./content/carte";

export const ORIGIN = "https://picapau.ch";

// Titles and descriptions. The French home title and description are the live site's own.
export const SEO: Record<PageKey, { title: L10n; description: L10n }> = {
  home: {
    title: {
      fr: "Pica Pau - Restaurant portugais à Genève - L’Âme du Portugal",
      en: "Pica Pau - Portuguese restaurant in Geneva - The Soul of Portugal",
      pt: "Pica Pau - Restaurante português em Genebra - A Alma de Portugal",
      it: "Pica Pau - Ristorante portoghese a Ginevra - L'Anima del Portogallo",
      de: "Pica Pau - Portugiesisches Restaurant in Genf - Die Seele Portugals",
    },
    description: {
      fr: "Plongez au cœur des traditions avec une cuisine portugaise authentique et généreuse. Restaurant familial à Genève : Francesinha, Bacalhau, Poulpe à Lagareiro et bien plus de spécialités portugaises.",
      en: "Step into Portuguese traditions with authentic, generous cooking. A family restaurant in Geneva: Francesinha, Bacalhau, Polvo à Lagareiro and many more Portuguese specialities.",
      pt: "Mergulhe no coração das tradições com uma cozinha portuguesa autêntica e generosa. Restaurante familiar em Genebra: Francesinha, Bacalhau, Polvo à Lagareiro e muitas outras especialidades portuguesas.",
      it: "Immergetevi nel cuore delle tradizioni con una cucina portoghese autentica e generosa. Ristorante di famiglia a Ginevra: Francesinha, Bacalhau, Polvo à Lagareiro e molte altre specialità portoghesi.",
      de: "Tauchen Sie ein in die Traditionen mit einer authentischen und grosszügigen portugiesischen Küche. Familienrestaurant in Genf: Francesinha, Bacalhau, Polvo à Lagareiro und viele weitere portugiesische Spezialitäten.",
    },
  },
  carte: {
    title: {
      fr: "La carte - Pica Pau, restaurant portugais à Genève",
      en: "The menu - Pica Pau, Portuguese restaurant in Geneva",
      pt: "A carta - Pica Pau, restaurante português em Genebra",
      it: "Il menu - Pica Pau, ristorante portoghese a Ginevra",
      de: "Speisekarte - Pica Pau, portugiesisches Restaurant in Genf",
    },
    description: {
      fr: "Entrées, viandes, poissons, menu enfant, desserts et plats sur commande : la carte de Pica Pau, rue Hugo-de-Senger 3 à Genève.",
      en: "Starters, meat, fish, kids’ menu, desserts and pre-order dishes: the Pica Pau menu, Rue Hugo-de-Senger 3, Geneva.",
      pt: "Entradas, carnes, peixe, menu infantil, sobremesas e pratos por encomenda: a carta do Pica Pau, Rue Hugo-de-Senger 3, Genebra.",
      it: "Antipasti, carne, pesce, menu bambini, dessert e piatti su ordinazione: il menu del Pica Pau, Rue Hugo-de-Senger 3, Ginevra.",
      de: "Vorspeisen, Fleisch, Fisch, Kindermenü, Desserts und Gerichte auf Bestellung: die Speisekarte des Pica Pau, Rue Hugo-de-Senger 3, Genf.",
    },
  },
  privacy: {
    title: {
      fr: "Confidentialité & cookies - Pica Pau",
      en: "Privacy & cookies - Pica Pau",
      pt: "Privacidade e cookies - Pica Pau",
      it: "Privacy e cookie - Pica Pau",
      de: "Datenschutz & Cookies - Pica Pau",
    },
    description: {
      fr: "Le site Pica Pau n'utilise pas directement de cookies publicitaires ni de mesure d'audience.",
      en: "The Pica Pau website does not directly use advertising cookies or audience-measurement cookies.",
      pt: "O site Pica Pau não utiliza diretamente cookies publicitários nem cookies de medição de audiência.",
      it: "Il sito Pica Pau non utilizza direttamente cookie pubblicitari né di misurazione dell'audience.",
      de: "Die Website von Pica Pau verwendet selbst keine Werbe- oder Reichweiten-Cookies.",
    },
  },
};

const price = (p: string) => Number(p.replace(".-", "")).toFixed(2);

export function restaurantJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Pica Pau",
    alternateName: "Pica-Pau",
    url: `${ORIGIN}${pathFor(lang, "home")}`,
    logo: `${ORIGIN}/brand/icon-512.png`,
    image: `${ORIGIN}/brand/og-image.jpg`,
    telephone: CONTACT.phoneIntl,
    servesCuisine: ["Portuguese"],
    address: { "@type": "PostalAddress", streetAddress: CONTACT.street, postalCode: CONTACT.postcode, addressLocality: CONTACT.town, addressCountry: "CH" },
    openingHours: ["We-Su 12:00-15:00", "We-Su 19:00-23:00"],
    acceptsReservations: CONTACT.booking,
    paymentAccepted: "Visa, Mastercard, American Express, Twint, Cash, Debit card",
    currenciesAccepted: "CHF, EUR",
    sameAs: [CONTACT.facebook, CONTACT.instagram],
    hasMenu: {
      "@type": "Menu",
      url: `${ORIGIN}${pathFor(lang, "carte")}`,
      hasMenuSection: CARTE.map((s) => ({
        "@type": "MenuSection",
        name: s.title[lang],
        hasMenuItem: s.items.map((i) => ({
          "@type": "MenuItem",
          name: i.name,
          ...(i.desc ? { description: i.desc[lang].replace(/\n/g, ", ") } : {}),
          ...(i.price ? { offers: { "@type": "Offer", price: price(i.price), priceCurrency: "CHF" } } : {}),
        })),
      })),
    },
  };
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** Everything that goes in <head> for one page in one language (also used by the static build). */
export function headTags(lang: Lang, page: PageKey) {
  const { title, description } = SEO[page];
  const url = `${ORIGIN}${pathFor(lang, page)}`;
  return {
    title: title[lang],
    description: description[lang],
    html: [
      `<link rel="canonical" href="${url}" />`,
      ...LANGS.map((l) => `<link rel="alternate" hreflang="${HTML_LANG[l]}" href="${ORIGIN}${pathFor(l, page)}" />`),
      `<link rel="alternate" hreflang="x-default" href="${ORIGIN}${pathFor("fr", page)}" />`,
      `<meta property="og:type" content="restaurant.restaurant" />`,
      `<meta property="og:site_name" content="Pica Pau" />`,
      `<meta property="og:locale" content="${HTML_LANG[lang].replace("-", "_")}" />`,
      `<meta property="og:title" content="${esc(title[lang])}" />`,
      `<meta property="og:description" content="${esc(description[lang])}" />`,
      `<meta property="og:url" content="${url}" />`,
      `<meta property="og:image" content="${ORIGIN}/brand/og-image.jpg" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      page === "home" ? `<script type="application/ld+json">${JSON.stringify(restaurantJsonLd(lang)).replace(/</g, "\\u003c")}</script>` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  };
}

export function applyHead(lang: Lang, page: PageKey) {
  const head = headTags(lang, page);
  document.title = head.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", head.description);
  document.querySelectorAll('link[rel="canonical"], link[rel="alternate"], meta[property^="og:"], meta[name^="twitter:"], script[type="application/ld+json"]').forEach((n) => n.remove());
  const tpl = document.createElement("template");
  tpl.innerHTML = head.html;
  document.head.append(tpl.content);
}
