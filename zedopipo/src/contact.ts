// Contact details and the logo: used by the shell on every page, so kept apart from the menu data.
export const CONTACT = {
  street: "Rue de Lausanne 57",
  city: "1202 Genève",
  phone: "+41 22 738 88 21",
  tel: "tel:+41227388821",
  booking: "https://www.mylocalina.ch/widget/?id=f0ed8664-0477-4ffc-9d6e-644d8d959b7a",
  delivery: "https://www.eat.ch/speisekarte/restaurant-ze-do-pipo?utm_campaign=foodorder",
  instagram: "https://www.instagram.com/zedopipo.geneve/",
  facebook: "https://www.facebook.com/zedopipo/",
  maps: "https://www.google.com/maps/search/?api=1&query=Rue+de+Lausanne+57%2C+1202+Gen%C3%A8ve",
  mapsEmbed: "https://www.google.com/maps?q=Rue+de+Lausanne+57,+1202+Gen%C3%A8ve&output=embed",
};

export const logo = () => `${import.meta.env.BASE_URL}brand/logo.webp`;

// The contact form posts JSON to a Formspree-compatible endpoint. Empty: test mode, nothing is sent.
export const FORM_ENDPOINT: string = import.meta.env.VITE_FORM_ENDPOINT ?? "";
