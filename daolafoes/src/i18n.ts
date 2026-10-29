// Languages, page addresses and the interface words. Facts (names, phones, addresses, times, prices) never
// pass through here; they live in src/content and stay identical in every language.
export const LANGS = ["de", "pt", "fr", "it", "en"] as const;
export type Lang = (typeof LANGS)[number];
export type L = Record<Lang, string>;
export const isLang = (v: unknown): v is Lang => typeof v === "string" && (LANGS as readonly string[]).includes(v);

export const HTML_LANG: Record<Lang, string> = { de: "de-CH", pt: "pt-PT", fr: "fr-CH", it: "it-CH", en: "en" };
export const LOCALE: Record<Lang, string> = { de: "de-CH", pt: "pt-PT", fr: "fr-CH", it: "it-CH", en: "en-GB" };
export const NATIVE: Record<Lang, string> = { de: "Deutsch", pt: "Português", fr: "Français", it: "Italiano", en: "English" };

export type PageKey = "home" | "speisekarte" | "takeaway" | "services" | "galerie" | "ueber" | "bewertungen" | "kontakt" | "konto" | "warenkorb";
export const PAGES: PageKey[] = ["home", "speisekarte", "takeaway", "services", "galerie", "ueber", "bewertungen", "kontakt", "konto", "warenkorb"];
export const SLUGS: Record<Lang, Record<PageKey, string>> = {
  de: { home: "", speisekarte: "speisekarte", takeaway: "take-away", services: "services", galerie: "galerie", ueber: "ueber-uns", bewertungen: "bewertungen", kontakt: "kontakt", konto: "konto", warenkorb: "warenkorb" },
  pt: { home: "", speisekarte: "ementa", takeaway: "take-away", services: "servicos", galerie: "galeria", ueber: "sobre-nos", bewertungen: "opinioes", kontakt: "contactos", konto: "conta", warenkorb: "carrinho" },
  fr: { home: "", speisekarte: "carte", takeaway: "a-l-emporter", services: "services", galerie: "galerie", ueber: "a-propos", bewertungen: "avis", kontakt: "contact", konto: "compte", warenkorb: "panier" },
  it: { home: "", speisekarte: "menu", takeaway: "da-asporto", services: "servizi", galerie: "galleria", ueber: "chi-siamo", bewertungen: "recensioni", kontakt: "contatti", konto: "account", warenkorb: "carrello" },
  en: { home: "", speisekarte: "menu", takeaway: "take-away", services: "services", galerie: "gallery", ueber: "about", bewertungen: "reviews", kontakt: "contact", konto: "account", warenkorb: "cart" },
};
export const pathFor = (lang: Lang, page: PageKey) => `/${lang}/${SLUGS[lang][page]}`;
export function pageFromSlug(lang: Lang, slug: string): PageKey | null {
  const s = slug.replace(/\/$/, "");
  return (Object.keys(SLUGS[lang]) as PageKey[]).find((p) => SLUGS[lang][p] === s) ?? null;
}

/** Home anchors, the same in every language. */
export const ANCHORS = ["start", "tagesgerichte", "klassiker", "speisekarte", "ueber-uns", "services", "galerie", "bewertungen", "reservieren"] as const;

const l = (de: string, pt: string, fr: string, it: string, en: string): L => ({ de, pt, fr, it, en });

export const WELCOME: Record<Lang, { word: string; line: string }> = {
  de: { word: "Willkommen", line: "in der Casa Dão Lafões" },
  pt: { word: "Bem-vindos", line: "à Casa Dão Lafões" },
  fr: { word: "Bienvenue", line: "à la Casa Dão Lafões" },
  it: { word: "Benvenuti", line: "alla Casa Dão Lafões" },
  en: { word: "Welcome", line: "to Casa Dão Lafões" },
};

export const UI = {
  proposal: "Proposta de design · não é o site oficial",
  skip: l("Zum Inhalt springen", "Saltar para o conteúdo", "Aller au contenu", "Vai al contenuto", "Skip to content"),
  skipIntro: l("Intro überspringen", "Saltar a introdução", "Passer l’intro", "Salta l’intro", "Skip intro"),
  home: l("Home", "Início", "Accueil", "Home", "Home"),
  speisekarte: l("Speisekarte", "Ementa", "Carte", "Menu", "Menu"),
  takeaway: l("Take Away", "Take Away", "À l’emporter", "Da asporto", "Take Away"),
  services: l("Services", "Serviços", "Services", "Servizi", "Services"),
  galerie: l("Galerie", "Galeria", "Galerie", "Galleria", "Gallery"),
  ueber: l("Über uns", "Sobre nós", "À propos", "Chi siamo", "About us"),
  bewertungen: l("Bewertungen", "Opiniões", "Avis", "Recensioni", "Reviews"),
  kontakt: l("Kontakt", "Contactos", "Contact", "Contatti", "Contact"),
  konto: l("Konto", "Conta", "Compte", "Account", "Account"),
  warenkorb: l("Warenkorb", "Carrinho", "Panier", "Carrello", "Cart"),
  reserve: l("Tisch reservieren", "Reservar mesa", "Réserver une table", "Prenotare un tavolo", "Book a table"),
  reserveShort: l("Reservieren", "Reservar", "Réserver", "Prenotare", "Book"),
  menu: l("Menü", "Menu", "Menu", "Menu", "Menu"),
  close: l("Schliessen", "Fechar", "Fermer", "Chiudi", "Close"),
  call: l("Anrufen", "Ligar", "Appeler", "Chiama", "Call"),
  email: l("E-Mail", "E-mail", "E-mail", "E-mail", "E-mail"),
  write: l("E-Mail schreiben", "Enviar e-mail", "Écrire un e-mail", "Scrivere un’e-mail", "Send an e-mail"),
  language: l("Sprache", "Língua", "Langue", "Lingua", "Language"),
  languages: l("Sprachen", "Línguas", "Langues", "Lingue", "Languages"),
  mainNav: l("Hauptnavigation", "Navegação principal", "Navigation principale", "Navigazione principale", "Main navigation"),
  homeLink: l("Casa Dão Lafões, Startseite", "Casa Dão Lafões, início", "Casa Dão Lafões, accueil", "Casa Dão Lafões, home", "Casa Dão Lafões, home"),
  scroll: l("Scrollen", "Deslize", "Faites défiler", "Scorri", "Scroll"),
  pause: l("Pause", "Pausa", "Pause", "Pausa", "Pause"),
  play: l("Weiter", "Retomar", "Reprendre", "Riprendi", "Play"),
  prev: l("Zurück", "Anterior", "Précédent", "Precedente", "Previous"),
  next: l("Weiter", "Seguinte", "Suivant", "Successivo", "Next"),
  externalNew: l("(neuer Tab)", "(novo separador)", "(nouvel onglet)", "(nuova scheda)", "(new tab)"),
  photo: l("Foto", "Foto", "Photo", "Foto", "Photo"),
  photos: l("Fotos", "fotografias", "photos", "foto", "photos"),
  openPhoto: l("Foto vergrössern", "Ampliar fotografia", "Agrandir la photo", "Ingrandisci la foto", "Enlarge photo"),
  translation: l("Übersetzung", "Tradução", "Traduction", "Traduzione", "Translation"),
  original: l("Original", "Original", "Original", "Originale", "Original"),
  // hours
  openNow: l("Jetzt geöffnet", "Aberto agora", "Ouvert maintenant", "Aperto ora", "Open now"),
  closedNow: l("Geschlossen", "Fechado", "Fermé", "Chiuso", "Closed"),
  until: l("bis", "até às", "jusqu’à", "fino alle", "until"),
  opens: l("öffnet", "abre", "ouvre", "apre", "opens"),
  at: l("um", "às", "à", "alle", "at"),
  tomorrow: l("morgen", "amanhã", "demain", "domani", "tomorrow"),
  today: l("Heute", "Hoje", "Aujourd’hui", "Oggi", "Today"),
  localTime: l("Zeit in Schlieren", "Hora de Schlieren", "Heure de Schlieren", "Ora di Schlieren", "Schlieren time"),
  closedDay: l("Ruhetag", "Dia de descanso", "Jour de repos", "Giorno di riposo", "Closed"),
  hours: l("Öffnungszeiten", "Horário", "Horaires", "Orari", "Opening hours"),
  // the table widget
  howMany: l("Wie viele sind Sie?", "Quantos são?", "Combien êtes-vous ?", "Quanti siete?", "How many are you?"),
  people: l("Personen", "pessoas", "personnes", "persone", "people"),
  person: l("Person", "pessoa", "personne", "persona", "person"),
  fewer: l("Eine Person weniger", "Menos uma pessoa", "Une personne de moins", "Una persona in meno", "One person fewer"),
  more: l("Eine Person mehr", "Mais uma pessoa", "Une personne de plus", "Una persona in più", "One person more"),
  dragHint: l("Ziehen oder ← → benutzen", "Arraste ou use ← →", "Glissez ou utilisez ← →", "Trascinate o usate ← →", "Drag or use ← →"),
  // menu
  all: l("Alle", "Todos", "Tous", "Tutti", "All"),
  search: l("Suchen", "Procurar", "Rechercher", "Cerca", "Search"),
  searchDish: l("Gericht suchen", "Procurar um prato", "Chercher un plat", "Cerca un piatto", "Search a dish"),
  noResults: l("Nichts gefunden.", "Nada encontrado.", "Aucun résultat.", "Nessun risultato.", "Nothing found."),
  portion: l("Portion", "Dose", "Portion", "Porzione", "Portion"),
  halfPortion: l("1/2 Portion", "1/2 Dose", "1/2 portion", "1/2 porzione", "1/2 portion"),
  // cart
  cart: l("Warenkorb", "Carrinho", "Panier", "Carrello", "Cart"),
  addToCart: l("In den Warenkorb", "Adicionar ao carrinho", "Ajouter au panier", "Aggiungi al carrello", "Add to cart"),
  added: l("Hinzugefügt", "Adicionado", "Ajouté", "Aggiunto", "Added"),
  remove: l("Entfernen", "Remover", "Retirer", "Rimuovi", "Remove"),
  quantity: l("Menge", "Quantidade", "Quantité", "Quantità", "Quantity"),
  fewerItems: l("Eins weniger", "Menos um", "Un de moins", "Uno in meno", "One fewer"),
  moreItems: l("Eins mehr", "Mais um", "Un de plus", "Uno in più", "One more"),
  subtotal: l("Zwischensumme", "Subtotal", "Sous-total", "Subtotale", "Subtotal"),
  total: l("Summe", "Total", "Total", "Totale", "Total"),
  emptyCart: l("Warenkorb leeren", "Esvaziar o carrinho", "Vider le panier", "Svuota il carrello", "Empty the cart"),
  items: l("Artikel", "artigos", "articles", "articoli", "items"),
  item: l("Artikel", "artigo", "article", "articolo", "item"),
  // forms
  required: l("Pflichtfeld", "obrigatório", "obligatoire", "obbligatorio", "required"),
  optional: l("optional", "opcional", "facultatif", "facoltativo", "optional"),
  send: l("Senden", "Enviar", "Envoyer", "Invia", "Send"),
  fieldMissing: l("Bitte füllen Sie dieses Feld aus.", "Preencha este campo.", "Merci de remplir ce champ.", "Compilate questo campo.", "Please fill in this field."),
  emailInvalid: l("Diese E-Mail-Adresse scheint nicht gültig zu sein.", "Este endereço de e-mail não parece válido.", "Cette adresse e-mail ne semble pas valide.", "Questo indirizzo e-mail non sembra valido.", "This e-mail address does not look valid."),
  passwordsDiffer: l("Die Passwörter stimmen nicht überein.", "As palavras-passe não coincidem.", "Les mots de passe ne correspondent pas.", "Le password non coincidono.", "The passwords do not match."),
  consentMissing: l("Bitte bestätigen Sie die Einwilligung.", "Confirme o consentimento.", "Merci de confirmer votre accord.", "Confermate il consenso.", "Please confirm your consent."),
  choose: l("Bitte wählen", "Escolher", "Choisir", "Scegliere", "Choose"),
  testMode: l("Testmodus", "Modo de teste", "Mode test", "Modalità test", "Test mode"),
  // misc
  address: l("Adresse", "Morada", "Adresse", "Indirizzo", "Address"),
  route: l("Route", "Itinerário", "Itinéraire", "Itinerario", "Directions"),
  appleMaps: l("Apple Karten", "Apple Mapas", "Apple Plans", "Apple Mappe", "Apple Maps"),
  phone: l("Telefon", "Telefone", "Téléphone", "Telefono", "Phone"),
  mapNote: l("Die Karte wird erst nach Ihrem Klick von Google geladen.", "O mapa só é carregado da Google depois do seu clique.", "La carte se charge chez Google seulement après votre clic.", "La mappa si carica da Google solo dopo il vostro clic.", "The map loads from Google only after you click."),
  followUs: l("Folgen Sie uns", "Siga-nos", "Suivez-nous", "Seguiteci", "Follow us"),
  readMore: l("Mehr lesen", "Ler mais", "Lire la suite", "Leggi tutto", "Read more"),
  readLess: l("Weniger", "Menos", "Réduire", "Meno", "Less"),
  of: l("von", "de", "sur", "di", "of"),
  stars: l("Sterne", "estrelas", "étoiles", "stelle", "stars"),
  flip: l("Karte umdrehen", "Virar o cartão", "Retourner la carte", "Gira la carta", "Flip the card"),
  expand: l("Aufklappen", "Abrir", "Ouvrir", "Apri", "Open"),
  collapse: l("Zuklappen", "Fechar", "Fermer", "Chiudi", "Close"),
  step: l("Schritt", "Passo", "Étape", "Passo", "Step"),
  dish: l("Gericht", "Prato", "Plat", "Piatto", "Dish"),
  price: l("Preis", "Preço", "Prix", "Prezzo", "Price"),
  lunch: l("Mittagsmenü", "Menu do dia", "Menu du midi", "Menu del giorno", "Lunch menu"),
  gridView: l("Als Raster anzeigen", "Ver em grelha", "Voir en grille", "Vedi a griglia", "Show as grid"),
  spaceView: l("Als Raum anzeigen", "Ver em sala", "Voir en espace", "Vedi come spazio", "Show as a room"),
} satisfies Record<string, L | string>;
