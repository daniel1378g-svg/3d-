// Contact details, links and the logo: used on every page, so kept apart from the page texts.
export const CONTACT = {
  name: "The Choucas Connection",
  street: "Dorfstrasse 9",
  city: "3954 Leukerbad",
  phone: "+41 27 470 24 13",
  tel: "tel:+41274702413",
  email: "info@choucas.ch",
  mailto: "mailto:info@choucas.ch",
  // The booking system embedded on https://choucas.ch/index.php?page=691 (resmio, id choucas-connection).
  booking: "https://app.resmio.com/choucas-connection/widget",
  bookingPage: "https://choucas.ch/index.php?page=691",
  yoordi: "https://yoordi.app/checkin/6936733935844669",
  menuPdf: "https://choucas.ch/web/images/content/Menu_Choucas2.pdf",
  facebook: "https://www.facebook.com/ChoucasConnection",
  instagram: "https://www.instagram.com/choucasrestaurants",
  youtube: "http://www.youtube.com/watch?v=6fHfRNMz3TE",
  flickr: "http://www.flickr.com/photos/59913690@N08/",
  tripadvisor: "http://www.tripadvisor.de/Restaurant_Review-g198859-d1755309-Reviews-Oasis_Steakhouse-Leukerbad_Valais_Swiss_Alps.html",
  kidsPizza: "http://www.leukerbad.ch/de/page.cfm/Familienferien-mit-Kindern/ChildprogrammLB/18024",
  maps: "https://www.google.com/maps/search/?api=1&query=Dorfstrasse+9%2C+3954+Leukerbad",
  mapsEmbed: "https://www.google.com/maps?q=Dorfstrasse+9,+3954+Leukerbad&output=embed",
  live: {
    family: "https://choucas.ch/index.php?page=285",
    playground: "https://choucas.ch/index.php?page=286",
    press: "https://choucas.ch/index.php?page=288",
    friends: "https://choucas.ch/index.php?page=306",
    jobs: "https://choucas.ch/index.php?page=290",
    recipe: "https://choucas.ch/index.php?page=291",
    colouring: "https://choucas.ch/index.php?page=680",
    kidsGrillNews: "http://www.choucas.ch/web/index.php?section=news&cmd=details&newsid=34",
  },
};

const base = () => import.meta.env.BASE_URL;
/** The main logo (468 × 122, orange hexagon with the chough and "CHOUCAS Pizzeria und Kid's Club"). */
export const logo = () => `${base()}brand/connectionlogoneu.webp`;
/** The orange hexagon alone, for round handles and favicons. */
export const mark = () => `${base()}brand/mark.webp`;
export const brandImg = (name: string) => `${base()}brand/${name}.webp`;

// The contact form posts JSON to a Formspree-compatible endpoint. Empty: test mode, nothing is sent.
export const FORM_ENDPOINT: string = import.meta.env.VITE_FORM_ENDPOINT ?? "";
