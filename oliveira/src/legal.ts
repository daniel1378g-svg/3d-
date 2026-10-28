// The Impressum, copied verbatim from https://www.oliveira-winterthur.ch/impressum-haftungsausschluss/,
// with courtesy translations, and a draft privacy notice for the owner to review.
import type { Lang } from "./i18n";

export type LegalBlock = { h: string; p: string[] };
export type LegalPage = { title: string; note?: string; blocks: LegalBlock[] };

const CONTACT_LINES = ["Restaurant Oliveira", "Stationsstrasse 3", "8406 Winterthur", "Schweiz", "info@oliveira-winterthur.ch"];

export const IMPRESSUM: Record<Lang, LegalPage> = {
  de: {
    title: "Impressum & Haftungsausschluss",
    blocks: [
      { h: "Kontaktadresse", p: CONTACT_LINES },
      { h: "Vertretungsberechtigte Personen", p: ["Arlindo Oliveira, Inhaber"] },
      { h: "Haftungsausschluss", p: ["Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen. Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen, durch Missbrauch der Verbindung oder durch technische Störungen entstanden sind, werden ausgeschlossen. Alle Angebote sind unverbindlich. Der Autor behält es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen."] },
      { h: "Haftung für Links", p: ["Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres Verantwortungsbereichs Es wird jegliche Verantwortung für solche Webseiten abgelehnt. Der Zugriff und die Nutzung solcher Webseiten erfolgen auf eigene Gefahr des Nutzers oder der Nutzerin."] },
      { h: "Urheberrechte", p: ["Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf der Website gehören ausschliesslich der Firma Restaurant Oliveira oder den speziell genannten Rechtsinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung der Urheberrechtsträger im Voraus einzuholen."] },
      { h: "Quelle", p: ["Dieses Impressum wurde am 17.02.2024 mit dem Impressum Generator der Webdesign Agentur Webkönig erstellt. Die Agentur Webkönig übernimmt keine Haftung."] },
    ],
  },
  pt: {
    title: "Aviso legal",
    note: "Tradução de cortesia. Só a versão alemã é vinculativa.",
    blocks: [
      { h: "Contacto", p: CONTACT_LINES },
      { h: "Pessoas com poderes de representação", p: ["Arlindo Oliveira, proprietário"] },
      { h: "Exclusão de responsabilidade", p: ["O autor não dá qualquer garantia quanto à correção, exatidão, atualidade, fiabilidade e integridade das informações. Ficam excluídas quaisquer reclamações contra o autor por danos materiais ou imateriais resultantes do acesso, da utilização ou da não utilização das informações publicadas, do uso indevido da ligação ou de falhas técnicas. Todas as ofertas são sem compromisso. O autor reserva-se expressamente o direito de alterar, completar ou apagar partes das páginas ou a oferta completa, ou de suspender a publicação temporária ou definitivamente, sem aviso prévio."] },
      { h: "Responsabilidade por ligações", p: ["As referências e ligações para sites de terceiros estão fora da nossa área de responsabilidade. Declinamos qualquer responsabilidade por esses sites. O acesso e a utilização desses sites são por conta e risco do utilizador ou da utilizadora."] },
      { h: "Direitos de autor", p: ["Os direitos de autor e todos os outros direitos sobre conteúdos, imagens, fotografias ou outros ficheiros do site pertencem exclusivamente à empresa Restaurant Oliveira ou aos titulares expressamente indicados. A reprodução de qualquer elemento exige o consentimento prévio, por escrito, dos titulares dos direitos de autor."] },
      { h: "Fonte", p: ["Este aviso legal foi criado em 17.02.2024 com o gerador de Impressum da agência de webdesign Webkönig. A agência Webkönig não assume qualquer responsabilidade."] },
    ],
  },
  en: {
    title: "Legal notice",
    note: "Courtesy translation. Only the German version is binding.",
    blocks: [
      { h: "Contact address", p: CONTACT_LINES },
      { h: "Authorised representatives", p: ["Arlindo Oliveira, owner"] },
      { h: "Disclaimer", p: ["The author gives no guarantee as to the correctness, accuracy, timeliness, reliability or completeness of the information. Liability claims against the author for material or immaterial damage arising from access to, use or non-use of the published information, from misuse of the connection or from technical faults are excluded. All offers are non-binding. The author expressly reserves the right to change, add to or delete parts of the pages or the entire offer, or to suspend publication temporarily or permanently, without separate notice."] },
      { h: "Liability for links", p: ["References and links to third-party websites lie outside our area of responsibility. Any responsibility for such websites is declined. Access to and use of such websites is at the user’s own risk."] },
      { h: "Copyright", p: ["The copyright and all other rights to content, images, photos or other files on the website belong exclusively to the company Restaurant Oliveira or to the specifically named rights holders. The written consent of the copyright holders must be obtained in advance for the reproduction of any element."] },
      { h: "Source", p: ["This legal notice was created on 17.02.2024 with the Impressum generator of the web design agency Webkönig. The agency Webkönig accepts no liability."] },
    ],
  },
  it: {
    title: "Note legali",
    note: "Traduzione di cortesia. Fa fede solo la versione tedesca.",
    blocks: [
      { h: "Indirizzo di contatto", p: CONTACT_LINES },
      { h: "Persone autorizzate a rappresentare", p: ["Arlindo Oliveira, titolare"] },
      { h: "Esclusione di responsabilità", p: ["L’autore non fornisce alcuna garanzia circa la correttezza, la precisione, l’attualità, l’affidabilità e la completezza delle informazioni. Sono escluse le pretese di responsabilità nei confronti dell’autore per danni materiali o immateriali derivanti dall’accesso, dall’uso o dal mancato uso delle informazioni pubblicate, dall’uso improprio della connessione o da guasti tecnici. Tutte le offerte sono senza impegno. L’autore si riserva espressamente il diritto di modificare, integrare o cancellare parti delle pagine o l’intera offerta, o di sospenderne la pubblicazione temporaneamente o definitivamente, senza preavviso."] },
      { h: "Responsabilità per i link", p: ["I rimandi e i link a siti web di terzi sono al di fuori della nostra responsabilità. Si declina ogni responsabilità per tali siti. L’accesso e l’uso di tali siti avvengono a rischio dell’utente."] },
      { h: "Diritti d’autore", p: ["I diritti d’autore e tutti gli altri diritti su contenuti, immagini, foto o altri file del sito appartengono esclusivamente alla ditta Restaurant Oliveira o ai titolari dei diritti espressamente indicati. Per la riproduzione di qualsiasi elemento occorre ottenere in anticipo il consenso scritto dei titolari dei diritti d’autore."] },
      { h: "Fonte", p: ["Queste note legali sono state create il 17.02.2024 con il generatore di Impressum dell’agenzia di web design Webkönig. L’agenzia Webkönig non si assume alcuna responsabilità."] },
    ],
  },
  fr: {
    title: "Mentions légales",
    note: "Traduction de courtoisie. Seule la version allemande fait foi.",
    blocks: [
      { h: "Adresse de contact", p: CONTACT_LINES },
      { h: "Personnes habilitées à représenter", p: ["Arlindo Oliveira, propriétaire"] },
      { h: "Exclusion de responsabilité", p: ["L’auteur ne garantit en aucune manière l’exactitude, la précision, l’actualité, la fiabilité et l’exhaustivité des informations. Toute prétention en responsabilité contre l’auteur pour des dommages matériels ou immatériels résultant de l’accès, de l’utilisation ou de la non-utilisation des informations publiées, d’un usage abusif de la connexion ou de pannes techniques est exclue. Toutes les offres sont sans engagement. L’auteur se réserve expressément le droit de modifier, compléter ou supprimer tout ou partie des pages ou de l’offre, ou d’en suspendre la publication temporairement ou définitivement, sans préavis."] },
      { h: "Responsabilité pour les liens", p: ["Les renvois et liens vers des sites de tiers sont hors de notre responsabilité. Toute responsabilité pour ces sites est déclinée. L’accès à ces sites et leur utilisation se font aux risques de l’utilisateur ou de l’utilisatrice."] },
      { h: "Droits d’auteur", p: ["Les droits d’auteur et tous les autres droits sur les contenus, images, photos ou autres fichiers du site appartiennent exclusivement à l’entreprise Restaurant Oliveira ou aux titulaires de droits expressément mentionnés. Toute reproduction d’un élément requiert l’accord écrit préalable des titulaires des droits d’auteur."] },
      { h: "Source", p: ["Ces mentions légales ont été créées le 17.02.2024 avec le générateur d’Impressum de l’agence de web design Webkönig. L’agence Webkönig décline toute responsabilité."] },
    ],
  },
};

/** A draft only: the owner must review it before launch. */
export const DATENSCHUTZ: Record<Lang, LegalPage> = {
  de: {
    title: "Datenschutzerklärung",
    note: "Entwurf – vom Inhaber zu prüfen",
    blocks: [
      { h: "Verantwortlich", p: ["Restaurant Oliveira, Arlindo Oliveira, Stationsstrasse 3, 8406 Winterthur, Schweiz, info@oliveira-winterthur.ch"] },
      { h: "Keine Cookies, keine Analyse", p: ["Diese Website setzt keine Cookies und verwendet keine Analyse- oder Werbedienste. Ihre gewählte Sprache wird nur in Ihrem Browser gespeichert."] },
      { h: "Server-Protokolle", p: ["Beim Aufruf der Website speichert der Hosting-Anbieter technisch notwendige Daten (zum Beispiel IP-Adresse, Datum und Uhrzeit, aufgerufene Seite) für kurze Zeit, um den Betrieb und die Sicherheit zu gewährleisten."] },
      { h: "Online-Reservation (MyLocalina)", p: ["Das Reservationsformular stammt von MyLocalina und wird erst geladen, wenn Sie «Online Reservation» anklicken. Ihre Angaben gehen dann direkt an MyLocalina; es gilt deren Datenschutzerklärung."] },
      { h: "Karte (OpenStreetMap)", p: ["Die Karte wird erst geladen, wenn Sie «Karte laden» anklicken. Dabei wird Ihre IP-Adresse an die OpenStreetMap Foundation übermittelt."] },
      { h: "Kontakt per E-Mail oder Telefon", p: ["Wenn Sie uns schreiben oder anrufen, verwenden wir Ihre Angaben nur, um Ihre Anfrage oder Reservation zu bearbeiten."] },
      { h: "Ihre Rechte", p: ["Sie können jederzeit Auskunft über Ihre Daten verlangen sowie deren Berichtigung oder Löschung. Schreiben Sie dazu an info@oliveira-winterthur.ch."] },
    ],
  },
  pt: {
    title: "Política de privacidade",
    note: "Rascunho – a rever pelo proprietário",
    blocks: [
      { h: "Responsável", p: ["Restaurant Oliveira, Arlindo Oliveira, Stationsstrasse 3, 8406 Winterthur, Suíça, info@oliveira-winterthur.ch"] },
      { h: "Sem cookies, sem análise", p: ["Este site não usa cookies nem serviços de análise ou publicidade. A língua que escolher fica guardada apenas no seu navegador."] },
      { h: "Registos do servidor", p: ["Quando visita o site, o fornecedor de alojamento guarda durante pouco tempo dados tecnicamente necessários (por exemplo endereço IP, data e hora, página visitada) para garantir o funcionamento e a segurança."] },
      { h: "Reserva online (MyLocalina)", p: ["O formulário de reserva é da MyLocalina e só é carregado quando clica em «Reserva online». Os seus dados seguem diretamente para a MyLocalina, cuja política de privacidade se aplica."] },
      { h: "Mapa (OpenStreetMap)", p: ["O mapa só é carregado quando clica em «Carregar mapa». Nesse momento, o seu endereço IP é transmitido à OpenStreetMap Foundation."] },
      { h: "Contacto por e-mail ou telefone", p: ["Se nos escrever ou telefonar, usamos os seus dados apenas para tratar o seu pedido ou a sua reserva."] },
      { h: "Os seus direitos", p: ["Pode, a qualquer momento, pedir informação sobre os seus dados, bem como a sua correção ou eliminação, escrevendo para info@oliveira-winterthur.ch."] },
    ],
  },
  en: {
    title: "Privacy notice",
    note: "Draft – for the owner to review",
    blocks: [
      { h: "Controller", p: ["Restaurant Oliveira, Arlindo Oliveira, Stationsstrasse 3, 8406 Winterthur, Switzerland, info@oliveira-winterthur.ch"] },
      { h: "No cookies, no analytics", p: ["This website sets no cookies and uses no analytics or advertising services. The language you choose is stored only in your browser."] },
      { h: "Server logs", p: ["When you visit the website, the hosting provider briefly stores technically necessary data (for example IP address, date and time, page requested) to keep the site running and secure."] },
      { h: "Online booking (MyLocalina)", p: ["The booking form comes from MyLocalina and loads only when you click “Book online”. Your details then go directly to MyLocalina, whose privacy policy applies."] },
      { h: "Map (OpenStreetMap)", p: ["The map loads only when you click “Load the map”. Your IP address is then sent to the OpenStreetMap Foundation."] },
      { h: "Contact by email or phone", p: ["If you write to us or call, we use your details only to handle your request or booking."] },
      { h: "Your rights", p: ["You can ask at any time what data we hold about you and have it corrected or deleted. Write to info@oliveira-winterthur.ch."] },
    ],
  },
  it: {
    title: "Informativa sulla privacy",
    note: "Bozza – da verificare da parte del titolare",
    blocks: [
      { h: "Titolare", p: ["Restaurant Oliveira, Arlindo Oliveira, Stationsstrasse 3, 8406 Winterthur, Svizzera, info@oliveira-winterthur.ch"] },
      { h: "Niente cookie, niente analisi", p: ["Questo sito non usa cookie né servizi di analisi o pubblicità. La lingua scelta viene salvata solo nel vostro browser."] },
      { h: "Log del server", p: ["Quando visitate il sito, il fornitore di hosting conserva per breve tempo i dati tecnicamente necessari (per esempio indirizzo IP, data e ora, pagina richiesta) per garantire funzionamento e sicurezza."] },
      { h: "Prenotazione online (MyLocalina)", p: ["Il modulo di prenotazione è di MyLocalina e si carica solo quando cliccate su «Prenotazione online». I vostri dati vanno direttamente a MyLocalina, la cui informativa sulla privacy si applica."] },
      { h: "Mappa (OpenStreetMap)", p: ["La mappa si carica solo quando cliccate su «Carica la mappa». In quel momento il vostro indirizzo IP viene trasmesso alla OpenStreetMap Foundation."] },
      { h: "Contatto via e-mail o telefono", p: ["Se ci scrivete o ci chiamate, usiamo i vostri dati solo per gestire la vostra richiesta o prenotazione."] },
      { h: "I vostri diritti", p: ["Potete chiedere in qualsiasi momento informazioni sui vostri dati, la loro rettifica o cancellazione, scrivendo a info@oliveira-winterthur.ch."] },
    ],
  },
  fr: {
    title: "Déclaration de confidentialité",
    note: "Projet – à vérifier par le propriétaire",
    blocks: [
      { h: "Responsable", p: ["Restaurant Oliveira, Arlindo Oliveira, Stationsstrasse 3, 8406 Winterthur, Suisse, info@oliveira-winterthur.ch"] },
      { h: "Pas de cookies, pas d’analyse", p: ["Ce site ne dépose aucun cookie et n’utilise aucun service d’analyse ou de publicité. La langue choisie est enregistrée uniquement dans votre navigateur."] },
      { h: "Journaux du serveur", p: ["Lors de votre visite, l’hébergeur conserve brièvement les données techniquement nécessaires (par exemple adresse IP, date et heure, page consultée) pour assurer le fonctionnement et la sécurité du site."] },
      { h: "Réservation en ligne (MyLocalina)", p: ["Le formulaire de réservation provient de MyLocalina et ne se charge que lorsque vous cliquez sur «Réservation en ligne». Vos données vont alors directement à MyLocalina, dont la politique de confidentialité s’applique."] },
      { h: "Carte (OpenStreetMap)", p: ["La carte ne se charge que lorsque vous cliquez sur «Charger la carte». Votre adresse IP est alors transmise à l’OpenStreetMap Foundation."] },
      { h: "Contact par e-mail ou téléphone", p: ["Si vous nous écrivez ou nous appelez, nous utilisons vos données uniquement pour traiter votre demande ou votre réservation."] },
      { h: "Vos droits", p: ["Vous pouvez à tout moment demander quelles données nous détenons sur vous, ainsi que leur rectification ou leur suppression, en écrivant à info@oliveira-winterthur.ch."] },
    ],
  },
};
