// Section 14: contact and access as a bento grid: open now (Gland time) with the full hours, the address with
// "Plan", Waze and Apple Plans, "Itinéraire" as tabs, both phones with Facebook and Instagram. No form and no
// e-mail: the live site has neither.
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TEXT } from "@/content/site";
import { SplitReveal } from "../Reveal";
import { Itinerary, MapLinks } from "../Contact";
import { HoursList, OpenNow } from "../Hours";
import { IconFacebook, IconInstagram, IconPhone } from "../icons";

export const CARD = "min-w-0 rounded-[24px] bg-branco/[0.08] p-6 shadow-[inset_0_0_0_1px_rgba(255,251,232,0.16)] md:p-8";

export function ContactBento({ withTitle = true }: { withTitle?: boolean }) {
  const { lang } = useSite();
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <div className={`${CARD} lg:col-span-5`}>
        <p className="eyebrow text-suave">
          {UI.today[lang]} · {UI.glandTime[lang]}
        </p>
        <OpenNow big className="mt-3" />
        <h3 className="eyebrow mt-8 text-destaque">{TEXT.hoursTitle[lang]}</h3>
        <HoursList className="mt-1" />
        <p className="mt-5 font-display text-[18px] font-bold uppercase tracking-[0.04em] text-destaque">{TEXT.onSite[lang]}</p>
      </div>
      <div className={`${CARD} lg:col-span-7`}>
        <p className="eyebrow text-suave">{UI.address[lang]}</p>
        {withTitle && <p className="mt-3 font-display text-[18px] font-bold tracking-[0.14em] text-suave">{BUSINESS.upper}</p>}
        <address className="mt-2 font-display text-[clamp(32px,3.4vw,56px)] font-extrabold uppercase not-italic leading-[0.95]">
          {BUSINESS.street}
          <br />
          {BUSINESS.city}
        </address>
        <MapLinks className="mt-6" />
      </div>
      <div className={`${CARD} lg:col-span-7`}>
        <p className="eyebrow mb-4 text-suave">{UI.route[lang]}</p>
        <Itinerary id={withTitle ? "home-it" : "page-it"} />
      </div>
      <div className={`${CARD} lg:col-span-5`}>
        <p className="eyebrow text-suave">{UI.phones[lang]}</p>
        <ul className="mt-3 list-none space-y-2">
          {BUSINESS.phones.map((p) => (
            <li key={p.tel}>
              <a href={`tel:${p.tel}`} className="link inline-flex items-center gap-2 font-display text-[clamp(24px,2.2vw,32px)] font-bold">
                <IconPhone size={20} /> {p.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="eyebrow mt-6 text-suave">{UI.social[lang]}</p>
        <ul className="mt-3 flex list-none flex-wrap gap-2">
          <li>
            <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--sm text-branco">
              <IconFacebook size={16} /> <span className="btn-roll"><span>Facebook</span><span aria-hidden="true">Facebook</span></span>
              <span className="sr-only">{UI.externalNew[lang]}</span>
            </a>
          </li>
          <li>
            <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--sm text-branco">
              <IconInstagram size={16} /> <span className="btn-roll"><span>Instagram</span><span aria-hidden="true">Instagram</span></span>
              <span className="sr-only">{UI.externalNew[lang]}</span>
            </a>
          </li>
        </ul>
        <p className="mt-5 text-[15px] text-suave">{TEXT.toBook[lang]}</p>
      </div>
    </div>
  );
}

export function ContactSection() {
  const { lang } = useSite();
  return (
    <section id="contact" className="relative overflow-hidden bg-marca py-24 text-branco md:py-36" aria-labelledby="contact-title">
      <div className="container-x">
        <p className="eyebrow text-destaque">14 / 15</p>
        <SplitReveal as="h2" id="contact-title" text={[UI.contact[lang]]} className="mt-4 fs-mega font-extrabold" />
        <div className="mt-12">
          <ContactBento />
        </div>
      </div>
    </section>
  );
}
