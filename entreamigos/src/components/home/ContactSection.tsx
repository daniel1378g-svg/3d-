// Section 15: contact and access as a bento grid: open now with the full hours, the address with the
// "Itinéraire" tabs, the "Accès" tabs, and the phone, e-mail and Facebook. No form: the live site has none.
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS } from "@/content/site";
import { SplitReveal } from "../Reveal";
import { AccessTabs, HoursList, OpenNow, RouteTabs } from "../Contact";
import { IconFacebook, IconMail, IconPhone } from "../icons";

export function ContactBento({ full = false }: { full?: boolean }) {
  const { lang } = useSite();
  const card = "rounded-[24px] bg-branco/[0.08] p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)] md:p-8";
  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <div className={`${card} lg:col-span-5`}>
        <OpenNow large />
        <HoursList className="mt-6 text-[16px]" />
      </div>
      <div className={`${card} lg:col-span-7`}>
        <p className="eyebrow text-suave">{UI.address[lang]}</p>
        <address className="mt-3 font-display text-[clamp(28px,2.6vw,42px)] font-bold uppercase not-italic leading-[1.02]">
          {BUSINESS.street}
          <br />
          {BUSINESS.city}
        </address>
        <RouteTabs className="mt-6" id={full ? "route-line-page" : "route-line"} />
      </div>
      <div className={`${card} lg:col-span-7`}>
        <AccessTabs id={full ? "access-line-page" : "access-line"} />
      </div>
      <div className={`${card} lg:col-span-5`}>
        <p className="eyebrow text-suave">{UI.phone[lang]}</p>
        <ul className="mt-3 list-none space-y-3">
          <li>
            <a href={`tel:${BUSINESS.phoneTel}`} className="link inline-flex items-center gap-2 font-display text-[30px] font-bold">
              <IconPhone size={22} /> {BUSINESS.phone}
            </a>
          </li>
          <li>
            <a href={`mailto:${BUSINESS.email}`} className="link inline-flex items-center gap-2 break-all text-lg">
              <IconMail size={20} /> {BUSINESS.email}
            </a>
          </li>
          <li>
            <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-2 text-lg">
              <IconFacebook size={20} /> Facebook <span className="sr-only">{UI.externalNew[lang]}</span>
            </a>
          </li>
        </ul>
        <p className="mt-4 text-[15px] text-suave">{UI.bookingLine[lang]}</p>
      </div>
    </div>
  );
}

export function ContactSection() {
  const { lang } = useSite();
  return (
    <section id="contact" className="relative overflow-hidden bg-marca py-24 text-branco md:py-36" aria-labelledby="contact-title">
      <div className="container-x">
        <p className="eyebrow text-destaque">15 / 16</p>
        <SplitReveal as="h2" id="contact-title" text={[UI.acces[lang]]} className="mt-4 fs-mega font-extrabold" />
        <div className="mt-12">
          <ContactBento />
        </div>
      </div>
    </section>
  );
}
