// Contact: section 14 at full size, with the map (loading on tap) and the full "getting there" text.
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TEXT } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { ContactForm, GettingThere, MapEmbed, MapLinks, OpenToday } from "@/components/Contact";
import { PartySize } from "@/components/PartySize";
import { IconFacebook, IconMail, IconPhone } from "@/components/icons";
import { Tram } from "@/components/Illustrations";

export default function ContactPage() {
  const { lang } = useSite();
  const card = "rounded-[24px] bg-branco/[0.08] p-6 shadow-[inset_0_0_0_1px_rgba(255,250,242,0.14)] md:p-8";
  return (
    <>
      <PageHero lang={lang} eyebrow={BUSINESS.fullName} title={[UI.contact[lang]]}>
        <p className="mt-6 font-display text-[clamp(24px,2.4vw,38px)] font-semibold uppercase leading-tight text-espuma">
          {BUSINESS.street} · {BUSINESS.city} · {BUSINESS.district}
        </p>
      </PageHero>
      <section className="bg-azulejo pb-24 text-branco">
        <div className="container-x grid gap-4 lg:grid-cols-12">
          <div className={`${card} lg:col-span-4`}>
            <OpenToday />
          </div>
          <div className={`${card} lg:col-span-4`}>
            <p className="eyebrow text-espuma">{TEXT.booking[lang]}</p>
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
                  <IconMail size={20} /> {TEXT.emailLabel[lang]} : {BUSINESS.email}
                </a>
              </li>
              <li>
                <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-2 text-lg">
                  <IconFacebook size={20} /> Facebook <span className="sr-only">{UI.externalNew[lang]}</span>
                </a>
              </li>
            </ul>
          </div>
          <div className={`${card} lg:col-span-4`}>
            <p className="eyebrow text-espuma">{UI.groups[lang]}</p>
            <p className="mt-3 font-bold">{TEXT.groups[lang]}</p>
            <p className="mt-2">{TEXT.package[lang]}</p>
            <p className="mt-4 font-bold">{TEXT.closed[lang]}</p>
          </div>
          <div className={`${card} lg:col-span-6`}>
            <p className="eyebrow mb-4 text-espuma">{UI.gettingThere[lang]}</p>
            <GettingThere full />
            <div className="mt-8 space-y-2 border-t border-branco/15 pt-6 text-[15px] text-espuma">
              <p>
                {TEXT.tpg[lang]} : {TEXT.tramA[lang]}, {TEXT.tramB[lang]}, {TEXT.leman[lang]}
              </p>
              <p>{TEXT.parking[lang]}</p>
            </div>
            <Tram className="mt-8 w-[min(280px,80%)]" />
          </div>
          <div className={`${card} flex flex-col gap-5 lg:col-span-6`}>
            <p className="eyebrow text-espuma">{UI.address[lang]}</p>
            <MapLinks />
            <MapEmbed className="flex-1" />
          </div>
          <div className={`${card} lg:col-span-7`}>
            <p className="eyebrow mb-4 text-espuma">{UI.form[lang]}</p>
            <ContactForm />
          </div>
          <div className="lg:col-span-5">
            <PartySize />
          </div>
        </div>
      </section>
    </>
  );
}
