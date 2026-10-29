// Section 15: Kontakt as a bento grid: each place with its address, phone, e-mail and status, the Route tabs
// with the Restaurant / Laden switch, the contact form with the live fields, and "Online Reservierung".
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TX } from "@/content/site";
import { SplitReveal } from "../Reveal";
import { ContactForm, HoursList, OpenNow, RouteTabs } from "../Contact";
import { PillButton } from "../ui/Pill";
import { IconMail, IconPhone } from "../icons";

export function ContactBento({ full = false }: { full?: boolean }) {
  const { lang, book } = useSite();
  const card = "rounded-[24px] bg-branco/[0.08] p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)] md:p-8";
  const places = [
    { key: "restaurant" as const, name: BUSINESS.name, a: BUSINESS.restaurant },
    { key: "laden" as const, name: BUSINESS.shop, a: BUSINESS.laden },
  ];
  return (
    <div className="grid gap-4 lg:grid-cols-12">
      {places.map((p) => (
        <div key={p.key} className={`${card} lg:col-span-6`}>
          <p className="eyebrow text-suave">{p.name}</p>
          <address className="mt-3 font-display text-[clamp(26px,2.4vw,38px)] font-bold uppercase not-italic leading-[1.02]">
            {p.a.street}
            <br />
            {p.a.city}
          </address>
          <ul className="mt-4 list-none space-y-2">
            <li>
              <a href={`tel:${p.a.tel}`} className="link inline-flex items-center gap-2 font-display text-[26px] font-bold">
                <IconPhone size={20} /> {p.a.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${BUSINESS.email}`} className="link inline-flex items-center gap-2 break-all text-lg">
                <IconMail size={20} /> {BUSINESS.email}
              </a>
            </li>
          </ul>
          <OpenNow place={p.key} className="mt-6" />
          <HoursList place={p.key} className="mt-4 text-[15px]" />
        </div>
      ))}
      <div className={`${card} lg:col-span-5`}>
        <RouteTabs id={full ? "route-line-page" : "route-line"} />
        <div className="mt-8 border-t border-branco/15 pt-6">
          <p className="eyebrow text-suave">{TX.onlineReservierung[lang]}</p>
          <PillButton className="mt-3" onClick={book}>
            {UI.online[lang]}
          </PillButton>
        </div>
      </div>
      <div className={`${card} lg:col-span-7`}>
        <p className="eyebrow mb-4 text-suave">{TX.formTitle[lang]}</p>
        <ContactForm />
      </div>
    </div>
  );
}

export function ContactSection() {
  const { lang } = useSite();
  return (
    <section id="kontakt" className="relative overflow-hidden bg-marca py-24 text-branco md:py-36" aria-labelledby="contact-title">
      <div className="container-x">
        <p className="eyebrow text-destaque">15 / 16</p>
        <SplitReveal as="h2" id="contact-title" text={[UI.kontakt[lang]]} className="mt-4 fs-mega font-extrabold" />
        <div className="mt-12">
          <ContactBento />
        </div>
      </div>
    </section>
  );
}
