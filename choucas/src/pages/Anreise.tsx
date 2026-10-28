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
            <strong className="block font-display text-2xl font-semibold text-ink">{RESERVATION.title[lang]}</strong>
            <span className="mt-2 block">{RESERVATION.text[lang]}</span>
          </>
        }
        photoId="terasse-pizzeria-choucas"
        dot="bg-beak"
      >
        <button type="button" onClick={book} className="inline-flex min-h-12 items-center rounded-full bg-beak px-6 font-semibold text-ink hover:bg-[#f5c55d]">
          {UI.bookTable[lang]}
        </button>
        <a href={CONTACT.tel} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/20 px-6 font-semibold hover:border-ink">
          <PhoneIcon />
          {CONTACT.phone}
        </a>
      </PageHero>
      <ContactSection id="kontakt" />
    </>
  );
}
