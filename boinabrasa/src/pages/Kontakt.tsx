import { useSite } from "@/site";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/home/Contact";
import { HoursLocation } from "@/components/home/HoursLocation";
import { Faq } from "@/components/home/Faq";
import { EMAIL, PHONE } from "@/content/facts";
import { IconMail, IconPhone } from "@/components/icons";

export function Kontakt() {
  const { t } = useSite();
  return (
    <>
      <PageHero kicker={t.contact.kicker} title={t.contact.title} image="header-gaucho_pferden">
        <div className="mt-8 flex flex-wrap gap-3">
          <a className="pill pill-cream" href={PHONE.href}><IconPhone size={18} />{PHONE.display}</a>
          <a className="pill pill-ghost text-creme" href={`mailto:${EMAIL}`}><IconMail size={18} />{EMAIL}</a>
        </div>
      </PageHero>
      <section className="skin-mato py-20 md:py-28"><div className="gutter"><div className="mx-auto max-w-[860px]"><ContactForm /></div></div></section>
      <HoursLocation />
      <Faq />
    </>
  );
}
