// Facts, identical in every language, from manna-acai.ch (home, range, about, contact/imprint) and the Archhöfe
// tenant directory (archhoefe.ch/geschaefte/manna-acaiteria), checked 30.10.2026 (captures in content/raw).
// Not published anywhere checked, so not shown: prices, cup sizes, topping lists, opening hours of the shop,
// delivery, online ordering, reservations, a Google rating.
export const NAME = "Manna Açaí";
export const SHOP = {
  name: "Açaíteria Manna",
  mall: "Archhöfe City Mall",
  street: "Archplatz 2",
  zip: "8400",
  city: "Winterthur",
  country: "CH",
  /** "im 1. OG, zwischen dem Männerwerk und dem Restaurant asiaway", "direkt neben dem Bahnhof" */
  floor: 1,
} as const;
/** The contact page prints "076 310 7195"; the Archhöfe directory links the same number. */
export const PHONE = { display: "076 310 71 95", intl: "+41 76 310 71 95", href: "tel:+41763107195" } as const;
/** The live page's link uses the broken href "Email: info@manna-acai.ch"; this is the working form. */
export const EMAIL = "info@manna-acai.ch";
/**
 * Social profiles: the contact page names both handles and links Facebook; the Archhöfe directory links
 * www.facebook.com/acaiteriamanna and www.instagram.com/acaiteriamanna. Both sites show login walls to scripts,
 * so the profiles' content was not read.
 */
export const SOCIAL = {
  instagram: { handle: "@acaiteriamanna", url: "https://www.instagram.com/acaiteriamanna" },
  facebook: { handle: "/acaiteriamanna", url: "https://www.facebook.com/acaiteriamanna" },
} as const;
/**
 * The WhatsApp QR on the contact page decodes to https://wa.me/message/JHYNT2V7GVYUI1, which WhatsApp answers with
 * "Link no longer valid" (30.10.2026): no WhatsApp link is offered.
 */
export const WHATSAPP_QR_TARGET = "https://wa.me/message/JHYNT2V7GVYUI1";

/** The imprint as published on the contact page (business address ≠ shop address). */
export const IMPRINT = {
  business: "Manna",
  owner: "Inhaberin da Cunha Buchheim",
  street: "Buechwiesenstrasse 4",
  place: "8544 Attikon",
  uid: "CHE-331.826.888",
  branch: "Filiale: Archplatz 2, 8400 Winterthur",
} as const;

export const URLS = {
  liveSite: "https://manna-acai.ch/",
  range: "https://manna-acai.ch/?page_id=108",
  about: "https://manna-acai.ch/?page_id=150",
  contact: "https://manna-acai.ch/?page_id=135",
  archhoefe: "https://archhoefe.ch/geschaefte/manna-acaiteria/",
  maps: "https://www.google.com/maps/search/?api=1&query=Manna%20A%C3%A7a%C3%ADteria%2C%20Archplatz%202%2C%208400%20Winterthur",
  appleMaps: "https://maps.apple.com/?address=Archplatz%202,8400%20Winterthur,Switzerland&q=Manna%20A%C3%A7a%C3%ADteria",
} as const;

export const CHECKED = "2026-10-30";
