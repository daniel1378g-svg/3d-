// Section 14: contact and access as a bento grid: today, the address and maps, getting there, phones and
// e-mail, and the contact form.
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TEXT } from "@/content/site";
import { SplitReveal } from "../Reveal";
import { ContactForm, GettingThere, MapLinks, OpenToday } from "../Contact";
import { IconFacebook, IconMail, IconPhone } from "../icons";

export function ContactSection() {
  const { lang } = useSite();
  const card = "rounded-[24px] bg-branco/[0.08] p-6 shadow-[inset_0_0_0_1px_rgba(255,250,242,0.14)] md:p-8";
  return (
    <section id="contact" className="relative overflow-hidden bg-azulejo py-24 text-branco md:py-36" aria-labelledby="contact-title">
      <div className="container-x">
        <p className="eyebrow text-dourado">14 / 15</p>
        <SplitReveal as="h2" id="contact-title" text={[UI.contact[lang]]} className="mt-4 fs-mega font-extrabold" />
        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          <div className={`${card} lg:col-span-4`}>
            <OpenToday />
          </div>
          <div className={`${card} lg:col-span-4`}>
            <p className="eyebrow text-espuma">{UI.address[lang]}</p>
            <address className="mt-3 font-display text-[clamp(26px,2.2vw,34px)] font-bold uppercase not-italic leading-[1.02]">
              {BUSINESS.street}
              <br />
              {BUSINESS.city}
            </address>
            <p className="mt-2 text-espuma">
              {BUSINESS.district} · {BUSINESS.country}
            </p>
            <MapLinks className="mt-6" />
          </div>
          <div className={`${card} lg:col-span-4`}>
            <p className="eyebrow text-espuma">{UI.phones[lang]}</p>
            <ul className="mt-3 list-none space-y-2">
              {BUSINESS.phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`} className="link inline-flex items-center gap-2 font-display text-[26px] font-bold">
                    <IconPhone size={20} /> {p.label}
                  </a>
                </li>
              ))}
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
            <p className="mt-4 text-[15px] text-espuma">{TEXT.booking[lang]}</p>
          </div>
          <div className={`${card} lg:col-span-5`}>
            <p className="eyebrow mb-4 text-espuma">{UI.gettingThere[lang]}</p>
            <GettingThere />
          </div>
          <div className={`${card} lg:col-span-7`}>
            <p className="eyebrow mb-4 text-espuma">{UI.form[lang]}</p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
