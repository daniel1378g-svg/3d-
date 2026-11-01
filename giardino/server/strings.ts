// The few texts the server renders itself (answers to the no-JavaScript forms), in the four languages of the site.
// Swiss conventions: German without «ß», French without a space before ; ! ?, Italian in the «voi» form.
import type { ScheduleError } from "../shared/schedule.ts";

export type Lang = "de" | "en" | "fr" | "it";
export const LANGS: Lang[] = ["de", "en", "fr", "it"];
export const isLang = (s: unknown): s is Lang => typeof s === "string" && (LANGS as string[]).includes(s);
export const HTML_LANG: Record<Lang, string> = { de: "de-CH", en: "en", fr: "fr-CH", it: "it-CH" };
export const INTL_LOCALE: Record<Lang, string> = { de: "de-CH", en: "en-CH", fr: "fr-CH", it: "it-CH" };

/** Paths of the pages the answers link to – the same as SLUGS in src/routes.ts (a test keeps them in step). */
export const PAGE_SLUGS: Record<Lang, { reserve: string; status: string; contact: string }> = {
  de: { reserve: "reservation", status: "reservation/status", contact: "allgemein/kontakt" },
  en: { reserve: "bookings", status: "bookings/status", contact: "meta/contact" },
  fr: { reserve: "reservation", status: "reservation/statut", contact: "meta/contact" },
  it: { reserve: "prenotazione", status: "prenotazione/stato", contact: "meta/contatto" },
};

export const PHONE = { display: "+41 27 530 05 84", href: "tel:+41275300584" };

export type FieldCode = "required" | "name" | "email" | "phone" | "consent" | "notesLong" | "childrenTooMany" | "invalid" | "tooLong";
export type FieldName =
  | "name"
  | "phone"
  | "email"
  | "consent"
  | "notes"
  | "party"
  | "children"
  | "seating"
  | "wishes"
  | "key"
  | "lang"
  | "website"
  | "message"
  | "address"
  | "zipCity"
  | "date"
  | "time";

type Texts = {
  siteName: string;
  received: string;
  receivedBody: string;
  duplicate: string;
  reference: string;
  date: string;
  time: string;
  party: string;
  statusLink: string;
  statusHint: string;
  phoneIntro: string;
  home: string;
  back: string;
  errorTitle: string;
  errorBody: string;
  rateLimited: string;
  serverError: string;
  messageReceived: string;
  messageBody: string;
  fields: Record<FieldName, string>;
  fieldErrors: Record<FieldCode, string>;
  schedule: Record<ScheduleError, string>;
};

export const TEXTS: Record<Lang, Texts> = {
  de: {
    siteName: "Pizzeria Giardino, Leukerbad",
    received: "Anfrage erhalten – wartet auf Bestätigung",
    receivedBody: "Danke! Wir prüfen Ihre Anfrage und melden uns per Telefon oder E-Mail. Reserviert ist der Tisch erst mit unserer Bestätigung.",
    duplicate: "Diese Anfrage haben wir bereits erhalten – sie wurde nicht doppelt gespeichert.",
    reference: "Referenz",
    date: "Datum",
    time: "Zeit",
    party: "Personen",
    statusLink: "Status Ihrer Anfrage",
    statusHint: "Bewahren Sie diesen Link auf – damit sehen Sie jederzeit den Stand Ihrer Anfrage.",
    phoneIntro: "Lieber persönlich? Gerne stehen wir Ihnen jeweils von 10 bis 23 Uhr zur Verfügung:",
    home: "Zur Startseite",
    back: "Zurück zum Formular",
    errorTitle: "Ihre Anfrage wurde nicht gesendet",
    errorBody: "Bitte prüfen Sie die folgenden Angaben. Es wurde nichts gespeichert.",
    rateLimited: "Zu viele Anfragen in kurzer Zeit. Bitte warten Sie einen Moment – oder rufen Sie uns an.",
    serverError: "Es ist ein Fehler aufgetreten. Ihre Anfrage wurde nicht gespeichert. Bitte versuchen Sie es nochmals oder rufen Sie uns an.",
    messageReceived: "Danke für Ihre Nachricht",
    messageBody: "Wir haben Ihre Nachricht erhalten und melden uns so bald wie möglich.",
    fields: {
      name: "Name",
      phone: "Telefon",
      email: "E-Mail",
      consent: "Datenschutz",
      notes: "Mitteilung",
      party: "Personen",
      children: "Kinder",
      seating: "Platz",
      wishes: "Wünsche",
      key: "Formular",
      lang: "Sprache",
      website: "Formular",
      message: "Nachricht",
      address: "Adresse",
      zipCity: "PLZ/Ort",
      date: "Datum",
      time: "Zeit",
    },
    fieldErrors: {
      required: "Bitte ausfüllen.",
      name: "Bitte geben Sie Ihren Namen an.",
      email: "Bitte geben Sie eine gültige E-Mail-Adresse an.",
      phone: "Bitte geben Sie eine gültige Telefonnummer an (z. B. +41 79 123 45 67).",
      consent: "Bitte stimmen Sie der Datenschutzerklärung zu.",
      notesLong: "Der Text ist zu lang.",
      tooLong: "Der Text ist zu lang.",
      childrenTooMany: "Es können nicht mehr Kinder als Personen sein.",
      invalid: "Diese Angabe ist ungültig.",
    },
    schedule: {
      "date-invalid": "Bitte wählen Sie ein Datum.",
      "date-past": "Dieses Datum liegt in der Vergangenheit.",
      "date-weekly-closed": "Mittwochs ist Ruhetag.",
      "date-closure": "An diesem Tag haben wir Betriebsferien.",
      "date-beyond-horizon": "So weit im Voraus nehmen wir online noch keine Anfragen an.",
      "time-invalid": "Bitte wählen Sie eine Zeit.",
      "time-outside-hours": "Diese Zeit liegt ausserhalb der Küchenzeiten.",
      "time-past": "Diese Zeit ist bereits vorbei.",
      "party-invalid": "Bitte geben Sie die Personenzahl an.",
      "party-too-large": "Für grössere Gruppen rufen Sie uns bitte an.",
    },
  },
  en: {
    siteName: "Pizzeria Giardino, Leukerbad",
    received: "Request received – awaiting confirmation",
    receivedBody: "Thank you! We will review your request and get back to you by phone or e-mail. Your table is only reserved once we have confirmed it.",
    duplicate: "We have already received this request – it was not saved twice.",
    reference: "Reference",
    date: "Date",
    time: "Time",
    party: "Guests",
    statusLink: "Status of your request",
    statusHint: "Keep this link – it shows the status of your request at any time.",
    phoneIntro: "Prefer to talk to us? We are happy to help by phone from 10:00 to 23:00:",
    home: "Back to the home page",
    back: "Back to the form",
    errorTitle: "Your request was not sent",
    errorBody: "Please check the following details. Nothing has been saved.",
    rateLimited: "Too many requests in a short time. Please wait a moment – or give us a call.",
    serverError: "Something went wrong. Your request was not saved. Please try again or give us a call.",
    messageReceived: "Thank you for your message",
    messageBody: "We have received your message and will reply as soon as we can.",
    fields: {
      name: "Name",
      phone: "Phone",
      email: "E-mail",
      consent: "Privacy",
      notes: "Note to the team",
      party: "Guests",
      children: "Children",
      seating: "Seating",
      wishes: "Wishes",
      key: "Form",
      lang: "Language",
      website: "Form",
      message: "Message",
      address: "Address",
      zipCity: "Postcode/town",
      date: "Date",
      time: "Time",
    },
    fieldErrors: {
      required: "Please fill in this field.",
      name: "Please enter your name.",
      email: "Please enter a valid e-mail address.",
      phone: "Please enter a valid phone number (e.g. +41 79 123 45 67).",
      consent: "Please accept the privacy policy.",
      notesLong: "The text is too long.",
      tooLong: "The text is too long.",
      childrenTooMany: "There cannot be more children than guests.",
      invalid: "This entry is not valid.",
    },
    schedule: {
      "date-invalid": "Please choose a date.",
      "date-past": "This date is in the past.",
      "date-weekly-closed": "We are closed on Wednesdays.",
      "date-closure": "We are on our annual break on this day.",
      "date-beyond-horizon": "We do not take online requests that far ahead yet.",
      "time-invalid": "Please choose a time.",
      "time-outside-hours": "This time is outside our kitchen hours.",
      "time-past": "This time has already passed.",
      "party-invalid": "Please enter the number of guests.",
      "party-too-large": "For larger groups, please give us a call.",
    },
  },
  fr: {
    siteName: "Pizzeria Giardino, Loèche-les-Bains",
    received: "Demande reçue – en attente de confirmation",
    receivedBody: "Merci! Nous examinons votre demande et vous recontactons par téléphone ou par e-mail. La table n’est réservée qu’après notre confirmation.",
    duplicate: "Nous avons déjà reçu cette demande – elle n’a pas été enregistrée deux fois.",
    reference: "Référence",
    date: "Date",
    time: "Heure",
    party: "Personnes",
    statusLink: "Statut de votre demande",
    statusHint: "Conservez ce lien – il vous permet de suivre votre demande à tout moment.",
    phoneIntro: "Vous préférez nous parler? Nous sommes à votre disposition de 10 h à 23 h au",
    home: "Retour à l’accueil",
    back: "Retour au formulaire",
    errorTitle: "Votre demande n’a pas été envoyée",
    errorBody: "Veuillez vérifier les indications suivantes. Rien n’a été enregistré.",
    rateLimited: "Trop de demandes en peu de temps. Veuillez patienter un instant – ou appelez-nous.",
    serverError: "Une erreur s’est produite. Votre demande n’a pas été enregistrée. Veuillez réessayer ou nous appeler.",
    messageReceived: "Merci pour votre message",
    messageBody: "Nous avons bien reçu votre message et vous répondrons dès que possible.",
    fields: {
      name: "Nom",
      phone: "Téléphone",
      email: "E-mail",
      consent: "Protection des données",
      notes: "Message à l’équipe",
      party: "Personnes",
      children: "Enfants",
      seating: "Place",
      wishes: "Souhaits",
      key: "Formulaire",
      lang: "Langue",
      website: "Formulaire",
      message: "Message",
      address: "Adresse",
      zipCity: "NPA/Localité",
      date: "Date",
      time: "Heure",
    },
    fieldErrors: {
      required: "Champ obligatoire.",
      name: "Veuillez indiquer votre nom.",
      email: "Veuillez indiquer une adresse e-mail valable.",
      phone: "Veuillez indiquer un numéro de téléphone valable (p. ex. +41 79 123 45 67).",
      consent: "Veuillez accepter la déclaration de protection des données.",
      notesLong: "Le texte est trop long.",
      tooLong: "Le texte est trop long.",
      childrenTooMany: "Il ne peut pas y avoir plus d’enfants que de personnes.",
      invalid: "Cette indication n’est pas valable.",
    },
    schedule: {
      "date-invalid": "Veuillez choisir une date.",
      "date-past": "Cette date est passée.",
      "date-weekly-closed": "Le mercredi est notre jour de fermeture.",
      "date-closure": "Nous sommes en vacances annuelles ce jour-là.",
      "date-beyond-horizon": "Nous n’acceptons pas encore de demandes en ligne aussi longtemps à l’avance.",
      "time-invalid": "Veuillez choisir une heure.",
      "time-outside-hours": "Cette heure est en dehors des heures de cuisine.",
      "time-past": "Cette heure est déjà passée.",
      "party-invalid": "Veuillez indiquer le nombre de personnes.",
      "party-too-large": "Pour les groupes plus importants, merci de nous appeler.",
    },
  },
  it: {
    siteName: "Pizzeria Giardino, Leukerbad",
    received: "Richiesta ricevuta – in attesa di conferma",
    receivedBody: "Grazie! Esaminiamo la vostra richiesta e vi ricontattiamo per telefono o per e-mail. Il tavolo è riservato solo dopo la nostra conferma.",
    duplicate: "Questa richiesta l’abbiamo già ricevuta – non è stata registrata due volte.",
    reference: "Riferimento",
    date: "Data",
    time: "Ora",
    party: "Persone",
    statusLink: "Stato della vostra richiesta",
    statusHint: "Conservate questo link – vi permette di seguire la vostra richiesta in ogni momento.",
    phoneIntro: "Preferite parlarci di persona? Siamo a vostra disposizione dalle 10 alle 23 al numero",
    home: "Alla pagina iniziale",
    back: "Torna al modulo",
    errorTitle: "La vostra richiesta non è stata inviata",
    errorBody: "Vi preghiamo di verificare i dati seguenti. Non è stato registrato nulla.",
    rateLimited: "Troppe richieste in poco tempo. Attendete un momento – oppure chiamateci.",
    serverError: "Si è verificato un errore. La vostra richiesta non è stata registrata. Riprovate o chiamateci.",
    messageReceived: "Grazie per il vostro messaggio",
    messageBody: "Abbiamo ricevuto il vostro messaggio e vi risponderemo al più presto.",
    fields: {
      name: "Nome",
      phone: "Telefono",
      email: "E-mail",
      consent: "Protezione dei dati",
      notes: "Messaggio al team",
      party: "Persone",
      children: "Bambini",
      seating: "Posto",
      wishes: "Desideri",
      key: "Modulo",
      lang: "Lingua",
      website: "Modulo",
      message: "Messaggio",
      address: "Indirizzo",
      zipCity: "NPA/Località",
      date: "Data",
      time: "Ora",
    },
    fieldErrors: {
      required: "Campo obbligatorio.",
      name: "Indicate il vostro nome.",
      email: "Indicate un indirizzo e-mail valido.",
      phone: "Indicate un numero di telefono valido (ad es. +41 79 123 45 67).",
      consent: "Accettate la dichiarazione sulla protezione dei dati.",
      notesLong: "Il testo è troppo lungo.",
      tooLong: "Il testo è troppo lungo.",
      childrenTooMany: "I bambini non possono essere più delle persone.",
      invalid: "Questo dato non è valido.",
    },
    schedule: {
      "date-invalid": "Scegliete una data.",
      "date-past": "Questa data è già passata.",
      "date-weekly-closed": "Il mercoledì è il nostro giorno di riposo.",
      "date-closure": "In questo giorno siamo in vacanza.",
      "date-beyond-horizon": "Non accettiamo ancora richieste online con così tanto anticipo.",
      "time-invalid": "Scegliete un orario.",
      "time-outside-hours": "Questo orario è fuori dagli orari della cucina.",
      "time-past": "Questo orario è già passato.",
      "party-invalid": "Indicate il numero di persone.",
      "party-too-large": "Per gruppi più numerosi chiamateci, per favore.",
    },
  },
};

export const pagePath = (lang: Lang, page: "reserve" | "status" | "contact") => `/${lang}/${PAGE_SLUGS[lang][page]}`;

/** «Freitag, 8. Januar 2027» – a civil date, formatted without any time-zone shift. */
export function formatDate(lang: Lang, date: string) {
  const [y, m, d] = date.split("-").map(Number);
  if (!y || !m || !d) return date;
  return new Intl.DateTimeFormat(INTL_LOCALE[lang], { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(y, m - 1, d)));
}
