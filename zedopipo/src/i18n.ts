// Languages, routes and the interface strings. French is the source; English and Portuguese reuse the
// owner's own texts where the live site has them; everything else is translated and needs a
// native-speaker check before launch.
export type Lang = "fr" | "en" | "pt" | "it" | "de";
export type PageKey = "home" | "menu";
export type Localized = Record<Lang, string>;

export const LANGS: Lang[] = ["fr", "en", "pt", "it", "de"];
export const NATIVE: Record<Lang, string> = { fr: "Français", en: "English", pt: "Português", it: "Italiano", de: "Deutsch" };
export const HTML_LANG: Record<Lang, string> = { fr: "fr", en: "en", pt: "pt-PT", it: "it", de: "de-CH" };
export const LOCALE: Record<Lang, string> = { fr: "fr-CH", en: "en-GB", pt: "pt-PT", it: "it-CH", de: "de-CH" };
export const SLUGS: Record<Lang, Record<PageKey, string>> = {
  fr: { home: "", menu: "menu" },
  en: { home: "", menu: "menu" },
  pt: { home: "", menu: "ementa" },
  it: { home: "", menu: "menu" },
  de: { home: "", menu: "speisekarte" },
};

export const isLang = (v: unknown): v is Lang => LANGS.includes(v as Lang);
export function pageFromSlug(lang: Lang, slug = ""): PageKey | null {
  const hit = (Object.keys(SLUGS[lang]) as PageKey[]).find((k) => SLUGS[lang][k] === slug.replace(/\/$/, ""));
  return hit ?? null;
}
export const pathFor = (lang: Lang, page: PageKey) => `/${lang}/${SLUGS[lang][page]}`;
export const fill = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));

export const L = (fr: string, en: string, pt: string, it: string, de: string): Localized => ({ fr, en, pt, it, de });

export const WELCOME: Record<Lang, { word: string; line: string }> = {
  fr: { word: "Bienvenue", line: "chez Zé-do-Pipo" },
  en: { word: "Welcome", line: "to Zé-do-Pipo" },
  pt: { word: "Bem-vindos", line: "ao Zé-do-Pipo" },
  it: { word: "Benvenuti", line: "da Zé-do-Pipo" },
  de: { word: "Willkommen", line: "bei Zé-do-Pipo" },
};

export const UI = {
  proposal: "Proposta de design · não é o site oficial",
  skip: L("Aller au contenu", "Skip to content", "Saltar para o conteúdo", "Vai al contenuto", "Zum Inhalt"),
  home: L("Accueil", "Home", "Início", "Home", "Startseite"),
  mainNav: L("Navigation principale", "Main navigation", "Navegação principal", "Navigazione principale", "Hauptnavigation"),
  infos: L("Infos", "About", "Sobre nós", "Chi siamo", "Über uns"),
  menu: L("Menu", "Menu", "Ementa", "Menù", "Speisekarte"),
  booking: L("Réservation", "Booking", "Reservas", "Prenotazione", "Reservation"),
  delivery: L("Livraison", "Delivery", "Entregas", "Consegna", "Lieferung"),
  book: L("Réserver", "Book a table", "Reservar", "Prenota", "Reservieren"),
  call: L("Appeler", "Call", "Ligar", "Chiama", "Anrufen"),
  writeUs: L("Nous écrire", "Write to us", "Escreva-nos", "Scriveteci", "Schreiben Sie uns"),
  openMenu: L("Ouvrir le menu", "Open the menu", "Abrir o menu", "Apri il menu", "Menü öffnen"),
  closeMenu: L("Fermer le menu", "Close the menu", "Fechar o menu", "Chiudi il menu", "Menü schliessen"),
  language: L("Langue", "Language", "Idioma", "Lingua", "Sprache"),
  chooserLabel: "Langue · Language · Idioma · Lingua · Sprache",
  chooserTitle: L("Choisissez votre langue", "Choose your language", "Escolha o seu idioma", "Scegliete la vostra lingua", "Wählen Sie Ihre Sprache"),
  newTab: L("s’ouvre dans un nouvel onglet", "opens in a new tab", "abre num novo separador", "si apre in una nuova scheda", "öffnet in neuem Tab"),
  welcomeSkip: L("Cliquez ou appuyez sur Échap pour passer", "Click or press Esc to skip", "Clique ou prima Esc para saltar", "Clicca o premi Esc per saltare", "Klicken oder Esc drücken zum Überspringen"),

  // hero
  slideshow: L("Diaporama", "Slideshow", "Apresentação", "Presentazione", "Diashow"),
  prevSlide: L("Diapositive précédente", "Previous slide", "Diapositivo anterior", "Diapositiva precedente", "Vorherige Folie"),
  nextSlide: L("Diapositive suivante", "Next slide", "Diapositivo seguinte", "Diapositiva successiva", "Nächste Folie"),
  slideOf: L("Diapositive {n} sur {total}", "Slide {n} of {total}", "Diapositivo {n} de {total}", "Diapositiva {n} di {total}", "Folie {n} von {total}"),
  pause: L("Mettre en pause", "Pause", "Pausar", "Metti in pausa", "Pausieren"),
  play: L("Reprendre", "Play", "Retomar", "Riprendi", "Fortsetzen"),
  mar: L("Mar", "Mar", "Mar", "Mar", "Mar"),
  terra: L("Terra", "Terra", "Terra", "Terra", "Terra"),
  dividerLabel: L("Partage entre la mer et la terre", "Share between sea and land", "Divisão entre o mar e a terra", "Divisione tra mare e terra", "Aufteilung zwischen Meer und Land"),
  dividerValue: L("{sea} % mer, {land} % terre", "{sea}% sea, {land}% land", "{sea}% mar, {land}% terra", "{sea}% mare, {land}% terra", "{sea} % Meer, {land} % Land"),
  dragHint: L("Glissez le logo", "Drag the logo", "Arraste o logótipo", "Trascina il logo", "Logo ziehen"),
  seaDishes: L("Côté mer", "Sea side", "Lado do mar", "Lato mare", "Meerseite"),
  landDishes: L("Côté terre, à la braise", "Land side, from the grill", "Lado da terra, na brasa", "Lato terra, alla brace", "Landseite, vom Grill"),

  // strip
  stripLabel: L("Bandeau Zé-do-Pipo", "Zé-do-Pipo strip", "Faixa Zé-do-Pipo", "Striscia Zé-do-Pipo", "Zé-do-Pipo-Laufband"),
  since1989: L("Depuis 1989", "Since 1989", "Desde 1989", "Dal 1989", "Seit 1989"),
  marETerra: L("Mar e Terra", "Mar e Terra", "Mar e Terra", "Mar e Terra", "Mar e Terra"),

  // teaser and menu
  perPerson: L("par personne", "per person", "por pessoa", "a persona", "pro Person"),
  from: L("dès", "from", "desde", "da", "ab"),
  open: L("Voir le plat", "See the dish", "Ver o prato", "Vedi il piatto", "Gericht ansehen"),
  close: L("Fermer", "Close", "Fechar", "Chiudi", "Schliessen"),
  alsoIn: L("Aussi dans « {s} »", "Also under “{s}”", "Também em «{s}»", "Anche in «{s}»", "Auch unter «{s}»"),
  filterLabel: L("Filtrer la carte", "Filter the menu", "Filtrar a ementa", "Filtra il menù", "Karte filtern"),
  all: L("Tout", "All", "Tudo", "Tutto", "Alles"),
  sea: L("Mar · la mer", "Mar · sea", "Mar", "Mar · mare", "Mar · Meer"),
  land: L("Terra · la terre", "Terra · land", "Terra", "Terra · terra", "Terra · Land"),
  sections: L("Rubriques", "Sections", "Secções", "Sezioni", "Rubriken"),
  search: L("Rechercher un plat", "Search the menu", "Pesquisar na ementa", "Cerca un piatto", "Gericht suchen"),
  searchPlaceholder: L("Rechercher…", "Search…", "Pesquisar…", "Cerca…", "Suchen…"),
  results: L("{n} plats", "{n} dishes", "{n} pratos", "{n} piatti", "{n} Gerichte"),
  resultsOne: L("{n} plat", "{n} dish", "{n} prato", "{n} piatto", "{n} Gericht"),
  noResults: L("Aucun plat pour « {q} ».", "No dishes for “{q}”.", "Nenhum prato para «{q}».", "Nessun piatto per «{q}».", "Keine Gerichte für «{q}»."),
  clear: L("Effacer", "Clear", "Limpar", "Cancella", "Löschen"),
  seaTag: L("Mer", "Sea", "Mar", "Mare", "Meer"),
  landTag: L("Terre", "Land", "Terra", "Terra", "Land"),
  bothTag: L("Mer et terre", "Sea and land", "Mar e terra", "Mare e terra", "Meer und Land"),
  menuPhotos: L("Photos de la rubrique", "Photos of this section", "Fotografias da secção", "Foto della sezione", "Fotos der Rubrik"),
  pricesChf: L("Prix en francs suisses", "Prices in Swiss francs", "Preços em francos suíços", "Prezzi in franchi svizzeri", "Preise in Schweizer Franken"),

  // plat du jour
  platTitle: L("Plat du jour et suggestions", "Daily special and suggestions", "Prato do dia e sugestões", "Piatto del giorno e suggerimenti", "Tagesgericht und Vorschläge"),
  today: L("Aujourd’hui", "Today", "Hoje", "Oggi", "Heute"),
  noPlatToday: L("Pas de plat du jour aujourd’hui : il revient du lundi au vendredi.", "No daily special today: it is back Monday to Friday.", "Hoje não há prato do dia: volta de segunda a sexta-feira.", "Oggi niente piatto del giorno: torna dal lunedì al venerdì.", "Heute kein Tagesgericht: es gibt es von Montag bis Freitag."),
  daysShort: L("Lu,Ma,Me,Je,Ve,Sa,Di", "Mon,Tue,Wed,Thu,Fri,Sat,Sun", "Seg,Ter,Qua,Qui,Sex,Sáb,Dom", "Lun,Mar,Mer,Gio,Ven,Sab,Dom", "Mo,Di,Mi,Do,Fr,Sa,So"),

  // groups
  groupType: L("Type de groupe", "Type of group", "Tipo de grupo", "Tipo di gruppo", "Art der Gruppe"),
  groupTeam: L("Repas d’équipe", "Team meal", "Refeição de equipa", "Pranzo di squadra", "Teamessen"),
  groupFriends: L("Sortie entre amis", "Outing with friends", "Saída entre amigos", "Uscita tra amici", "Ausflug mit Freunden"),
  groupTour: L("Excursion touristique", "Sightseeing tour", "Excursão turística", "Escursione turistica", "Reisegruppe"),
  guests: L("Nombre de convives", "Number of guests", "Número de pessoas", "Numero di ospiti", "Anzahl Gäste"),
  fewer: L("Une personne de moins", "One fewer", "Menos uma pessoa", "Una persona in meno", "Eine Person weniger"),
  more: L("Une personne de plus", "One more", "Mais uma pessoa", "Una persona in più", "Eine Person mehr"),
  date: L("Date", "Date", "Data", "Data", "Datum"),
  tableOf: L("Une table pour {n}", "A table for {n}", "Uma mesa para {n}", "Un tavolo per {n}", "Ein Tisch für {n}"),
  sendRequest: L("Envoyer la demande", "Send the request", "Enviar o pedido", "Invia la richiesta", "Anfrage senden"),
  groupMessage: L("Demande de groupe : {type}, {n} personnes, le {date}.", "Group request: {type}, {n} people, on {date}.", "Pedido de grupo: {type}, {n} pessoas, a {date}.", "Richiesta di gruppo: {type}, {n} persone, il {date}.", "Gruppenanfrage: {type}, {n} Personen, am {date}."),

  // story
  storyTitle: L("Notre histoire", "Our story", "A nossa história", "La nostra storia", "Unsere Geschichte"),
  since: L("Depuis", "Since", "Desde", "Dal", "Seit"),
  coinLabel: L("Pièce au logo de Zé-do-Pipo : glissez ou utilisez les flèches pour la faire tourner", "Zé-do-Pipo logo coin: drag or use the arrow keys to spin it", "Moeda com o logótipo do Zé-do-Pipo: arraste ou use as setas para a fazer girar", "Moneta con il logo di Zé-do-Pipo: trascinala o usa le frecce per farla girare", "Zé-do-Pipo-Münze: ziehen oder mit den Pfeiltasten drehen"),
  spin: L("Faire tourner", "Spin", "Girar", "Gira", "Drehen"),

  // gallery
  galleryTitle: L("Galerie", "Gallery", "Galeria", "Galleria", "Galerie"),
  galleryHint: L("Glissez le mur dans tous les sens, ou utilisez les flèches. Entrée ouvre la photo.", "Drag the wall in any direction, or use the arrow keys. Enter opens the photo.", "Arraste a parede em qualquer direção ou use as setas. Enter abre a fotografia.", "Trascina la parete in ogni direzione o usa le frecce. Invio apre la foto.", "Ziehen Sie die Wand in jede Richtung oder nutzen Sie die Pfeiltasten. Enter öffnet das Foto."),
  showGrid: L("Afficher en grille", "Show as grid", "Mostrar em grelha", "Mostra a griglia", "Als Raster zeigen"),
  showWall: L("Afficher le mur", "Show as wall", "Mostrar a parede", "Mostra la parete", "Als Wand zeigen"),
  photoOf: L("Photo {n} sur {total}", "Photo {n} of {total}", "Fotografia {n} de {total}", "Foto {n} di {total}", "Foto {n} von {total}"),
  prevPhoto: L("Photo précédente", "Previous photo", "Fotografia anterior", "Foto precedente", "Vorheriges Foto"),
  nextPhoto: L("Photo suivante", "Next photo", "Fotografia seguinte", "Foto successiva", "Nächstes Foto"),
  photosCount: L("{n} photos", "{n} photos", "{n} fotografias", "{n} foto", "{n} Fotos"),
  wallLabel: L("Mur de photos", "Photo wall", "Parede de fotografias", "Parete di foto", "Fotowand"),

  // book and order
  bookTitle: L("Réserver et commander", "Book and order", "Reservar e encomendar", "Prenotare e ordinare", "Reservieren und bestellen"),
  bookLead: L("Une table au restaurant, un repas livré chez vous, ou un coup de fil.", "A table at the restaurant, a meal delivered to your door, or a phone call.", "Uma mesa no restaurante, uma refeição entregue em casa ou um telefonema.", "Un tavolo al ristorante, un pasto consegnato a casa o una telefonata.", "Ein Tisch im Restaurant, ein Essen nach Hause oder ein Anruf."),
  drawerTitle: L("Réserver une table", "Book a table", "Reservar uma mesa", "Prenotare un tavolo", "Einen Tisch reservieren"),
  drawerNote: L("Le module de réservation MyLocalina se charge seulement à l’ouverture de ce panneau.", "The MyLocalina booking form loads only when this panel opens.", "O módulo de reservas MyLocalina só carrega quando este painel abre.", "Il modulo di prenotazione MyLocalina si carica solo all’apertura di questo pannello.", "Das MyLocalina-Reservationsformular lädt erst, wenn dieses Feld geöffnet wird."),
  drawerFallback: L("Ouvrir la réservation dans un nouvel onglet", "Open the booking page in a new tab", "Abrir as reservas num novo separador", "Apri la prenotazione in una nuova scheda", "Reservation in neuem Tab öffnen"),

  // contact
  contactTitle: L("Contact et horaires", "Contact and opening hours", "Contacto e horário", "Contatti e orari", "Kontakt und Öffnungszeiten"),
  address: L("Adresse", "Address", "Morada", "Indirizzo", "Adresse"),
  phone: L("Téléphone", "Phone", "Telefone", "Telefono", "Telefon"),
  hours: L("Horaires", "Opening hours", "Horário", "Orari", "Öffnungszeiten"),
  monSat: L("Du lundi au samedi", "Monday to Saturday", "De segunda a sábado", "Dal lunedì al sabato", "Montag bis Samstag"),
  sunday: L("Dimanche", "Sunday", "Domingo", "Domenica", "Sonntag"),
  closed: L("Fermé", "Closed", "Fechado", "Chiuso", "Geschlossen"),
  openNow: L("Ouvert", "Open", "Aberto", "Aperto", "Geöffnet"),
  closesIn: L("ferme dans {m} min", "closes in {m} min", "fecha dentro de {m} min", "chiude tra {m} min", "schliesst in {m} Min."),
  closesAt: L("jusqu’à {t}", "until {t}", "até às {t}", "fino alle {t}", "bis {t}"),
  opensAt: L("ouvre à {t}", "opens at {t}", "abre às {t}", "apre alle {t}", "öffnet um {t}"),
  opensTomorrow: L("ouvre demain à {t}", "opens tomorrow at {t}", "abre amanhã às {t}", "apre domani alle {t}", "öffnet morgen um {t}"),
  opensMonday: L("ouvre lundi à {t}", "opens Monday at {t}", "abre segunda-feira às {t}", "apre lunedì alle {t}", "öffnet Montag um {t}"),
  genevaTime: L("heure de Genève", "Geneva time", "hora de Genebra", "ora di Ginevra", "Genfer Zeit"),
  nearCornavin: L("À 5 minutes de la gare Cornavin", "5 minutes from Cornavin station", "A 5 minutos da estação de Cornavin", "A 5 minuti dalla stazione di Cornavin", "5 Minuten vom Bahnhof Cornavin"),
  showMap: L("Afficher la carte", "Show the map", "Mostrar o mapa", "Mostra la mappa", "Karte anzeigen"),
  openMaps: L("Ouvrir dans Google Maps", "Open in Google Maps", "Abrir no Google Maps", "Apri in Google Maps", "In Google Maps öffnen"),
  mapPrivacy: L("La carte Google se charge seulement après votre clic.", "The Google map loads only after you click.", "O mapa Google só carrega depois do seu clique.", "La mappa Google si carica solo dopo il tuo clic.", "Die Google-Karte lädt erst nach Ihrem Klick."),
  formName: L("Nom", "Name", "Nome", "Nome", "Name"),
  formPhone: L("Téléphone", "Phone", "Telefone", "Telefono", "Telefon"),
  formEmail: L("Email", "Email", "Email", "Email", "E-Mail"),
  formMessage: L("Votre message", "Your message", "A sua mensagem", "Il vostro messaggio", "Ihre Nachricht"),
  required: L("obligatoire", "required", "obrigatório", "obbligatorio", "Pflichtfeld"),
  send: L("Envoyer", "Send", "Enviar", "Invia", "Senden"),
  emailError: L("Indiquez une adresse email valide, par exemple nom@exemple.ch.", "Enter a valid email address, for example name@example.ch.", "Indique um email válido, por exemplo nome@exemplo.ch.", "Inserite un indirizzo email valido, per esempio nome@esempio.ch.", "Geben Sie eine gültige E-Mail-Adresse ein, zum Beispiel name@beispiel.ch."),
  messageError: L("Écrivez votre message.", "Write your message.", "Escreva a sua mensagem.", "Scrivete il vostro messaggio.", "Schreiben Sie Ihre Nachricht."),
  testMode: L(
    "Aperçu : le formulaire est en mode test et n’envoie rien tant que le restaurant n’a pas donné son adresse de réception.",
    "Preview: the form is in test mode and sends nothing until the restaurant gives its receiving address.",
    "Pré-visualização: o formulário está em modo de teste e não envia nada até o restaurante indicar o endereço de receção.",
    "Anteprima: il modulo è in modalità di prova e non invia nulla finché il ristorante non indica l’indirizzo di ricezione.",
    "Vorschau: Das Formular ist im Testmodus und sendet nichts, bis das Restaurant seine Empfangsadresse angibt.",
  ),
  testSent: L(
    "Message vérifié, mais pas envoyé : le formulaire est encore en mode test. Pour joindre le restaurant aujourd’hui, appelez le +41 22 738 88 21.",
    "Message checked but not sent: the form is still in test mode. To reach the restaurant today, call +41 22 738 88 21.",
    "Mensagem verificada, mas não enviada: o formulário ainda está em modo de teste. Para contactar o restaurante hoje, ligue para +41 22 738 88 21.",
    "Messaggio verificato ma non inviato: il modulo è ancora in modalità di prova. Per contattare il ristorante oggi, chiamate il +41 22 738 88 21.",
    "Nachricht geprüft, aber nicht gesendet: Das Formular ist noch im Testmodus. Um das Restaurant heute zu erreichen, rufen Sie +41 22 738 88 21 an.",
  ),
  sent: L("Merci, votre message est envoyé.", "Thank you, your message has been sent.", "Obrigado, a sua mensagem foi enviada.", "Grazie, il vostro messaggio è stato inviato.", "Danke, Ihre Nachricht wurde gesendet."),
  sendError: L("L’envoi n’a pas abouti. Réessayez ou appelez le +41 22 738 88 21.", "Sending failed. Try again or call +41 22 738 88 21.", "O envio falhou. Tente novamente ou ligue para +41 22 738 88 21.", "L’invio non è riuscito. Riprovate o chiamate il +41 22 738 88 21.", "Das Senden ist fehlgeschlagen. Versuchen Sie es erneut oder rufen Sie +41 22 738 88 21 an."),
  follow: L("Suivez-nous", "Follow us", "Siga-nos", "Seguiteci", "Folgen Sie uns"),
  copy: L("Copier", "Copy", "Copiar", "Copia", "Kopieren"),
  copied: L("Copié", "Copied", "Copiado", "Copiato", "Kopiert"),

  // preview only (claude.ai cannot embed other sites)
  previewNoEmbed: L(
    "Dans cet aperçu, la carte et la réservation s’ouvrent dans un nouvel onglet ; sur le site, elles s’affichent ici.",
    "In this preview the map and the booking form open in a new tab; on the website they show here.",
    "Nesta pré-visualização, o mapa e as reservas abrem num novo separador; no site, aparecem aqui.",
    "In questa anteprima la mappa e la prenotazione si aprono in una nuova scheda; sul sito compaiono qui.",
    "In dieser Vorschau öffnen sich Karte und Reservation in einem neuen Tab; auf der Website erscheinen sie hier.",
  ),
  mapTitle: L("Carte : Zé-do-Pipo, rue de Lausanne 57, Genève", "Map: Zé-do-Pipo, Rue de Lausanne 57, Geneva", "Mapa: Zé-do-Pipo, Rue de Lausanne 57, Genebra", "Mappa: Zé-do-Pipo, Rue de Lausanne 57, Ginevra", "Karte: Zé-do-Pipo, Rue de Lausanne 57, Genf"),
  country: L("Suisse", "Switzerland", "Suíça", "Svizzera", "Schweiz"),
  details: L("Détails", "Details", "Detalhes", "Dettagli", "Details"),
  marquee: L("Bandeau défilant", "Scrolling strip", "Faixa em movimento", "Striscia scorrevole", "Laufband"),
  welcomeIn: L("Bienvenue en {l}", "Welcome in {l}", "Bem-vindos em {l}", "Benvenuti in {l}", "Willkommen auf {l}"),
  current: L("langue actuelle", "current language", "idioma atual", "lingua attuale", "aktuelle Sprache"),

  // cursor words
  cursorDrag: L("Glisser", "Drag", "Arrastar", "Trascina", "Ziehen"),
  cursorView: L("Voir", "View", "Ver", "Vedi", "Ansehen"),
};

export const SEO: Record<PageKey, { title: Localized; description: Localized }> = {
  home: {
    title: L("Zé-do-Pipo · Restaurant portugais à Genève, près de Cornavin", "Zé-do-Pipo · Portuguese restaurant in Geneva, near Cornavin", "Zé-do-Pipo · Restaurante português em Genebra, perto de Cornavin", "Zé-do-Pipo · Ristorante portoghese a Ginevra, vicino a Cornavin", "Zé-do-Pipo · Portugiesisches Restaurant in Genf, beim Bahnhof Cornavin"),
    description: L(
      "Depuis 1989, Maria & José vous accueillent du lundi au samedi rue de Lausanne 57 : bacalhau à lagareiro, poulet piri piri, plat du jour et vins portugais.",
      "Since 1989, Maria & José have welcomed you Monday to Saturday at Rue de Lausanne 57: bacalhau à lagareiro, piri piri chicken, a daily special and Portuguese wines.",
      "Desde 1989, Maria & José recebem-no de segunda a sábado na Rue de Lausanne 57: bacalhau à lagareiro, frango piri piri, prato do dia e vinhos portugueses.",
      "Dal 1989 Maria & José vi accolgono dal lunedì al sabato in Rue de Lausanne 57: bacalhau à lagareiro, pollo piri piri, piatto del giorno e vini portoghesi.",
      "Seit 1989 empfangen Sie Maria & José von Montag bis Samstag an der Rue de Lausanne 57: Bacalhau à lagareiro, Piri-Piri-Hähnchen, Tagesgericht und portugiesische Weine.",
    ),
  },
  menu: {
    title: L("Menu · Zé-do-Pipo, cuisine portugaise à Genève", "Menu · Zé-do-Pipo, Portuguese food in Geneva", "Ementa · Zé-do-Pipo, cozinha portuguesa em Genebra", "Menù · Zé-do-Pipo, cucina portoghese a Ginevra", "Speisekarte · Zé-do-Pipo, portugiesische Küche in Genf"),
    description: L(
      "La carte du Zé-do-Pipo : entrées, salades, viandes à la braise, poissons et desserts maison, avec leurs prix en francs suisses.",
      "The Zé-do-Pipo menu: starters, salads, grilled meat, fish and homemade desserts, with prices in Swiss francs.",
      "A ementa do Zé-do-Pipo: entradas, saladas, carnes na brasa, peixes e sobremesas caseiras, com preços em francos suíços.",
      "Il menù dello Zé-do-Pipo: antipasti, insalate, carni alla brace, pesce e dolci fatti in casa, con i prezzi in franchi svizzeri.",
      "Die Speisekarte des Zé-do-Pipo: Vorspeisen, Salate, Fleisch vom Grill, Fisch und hausgemachte Desserts, mit Preisen in Schweizer Franken.",
    ),
  },
};
