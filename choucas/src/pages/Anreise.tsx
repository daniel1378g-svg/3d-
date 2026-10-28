import { UI } from "@/i18n";
import { RESERVATION } from "@/copy";
import { CONTACT } from "@/content";
import { useSite } from "@/site";
import { PageHero } from "@/components/PageHero";
import { ContactSection } from "@/components/Contact";
import { PhoneIcon } from "@/components/icons";

export function Anreise() {
  const { lang, book } = useSite();
  return (
    <>
      <PageHero
        eyebrow={`${CONTACT.street} · ${CONTACT.city}`}
        title={UI.nav.anreise[lang]}
        lead={
          <>
            <strong className="block font-display text-2xl font-bold text-snow">{RESERVATION.title[lang]}</strong>
            <span className="mt-2 block">{RESERVATION.text[lang]}</span>
          </>
        }
        photoId="terasse-pizzeria-choucas"
        dot="bg-beak"
      >
        <button type="button" onClick={book} className="inline-flex min-h-12 items-center rounded-full bg-beak px-6 font-bold text-ink hover:bg-white">
          {UI.book[lang]}
        </button>
        <a href={CONTACT.tel} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-snow/45 px-6 font-bold hover:border-snow">
          <PhoneIcon />
          {CONTACT.phone}
        </a>
      </PageHero>
      <ContactSection id="kontakt" />
    </>
  );
}
