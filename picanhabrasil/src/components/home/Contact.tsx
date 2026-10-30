// Contact as on the restaurant's site: phone, e-mail, address. Big tap targets, nothing to fill in.
import { useSite } from "@/site";
import { ADDRESS, EMAIL, MAPS_URL, PHONE } from "@/content/facts";
import { IconExternal, IconMail, IconPhone, IconPin } from "../icons";

export function ContactSection() {
  const { t } = useSite();
  const card = "group flex flex-col justify-between gap-10 rounded-[var(--radius-card)] p-6 transition-transform duration-300 hover:-translate-y-1 min-h-[220px]";
  return (
    <section id="kontakt" data-anchor="kontakt" className="skin-mato py-24 md:py-32" aria-labelledby="contact-title">
      <div className="gutter">
        <div className="wrap">
          <p className="kicker text-[#9fd8b6]" data-lang-stagger>{t.contact.kicker}</p>
          <h2 id="contact-title" className="display mt-3 text-[clamp(3.2rem,9vw,9rem)]">{t.contact.title}</h2>
          <p className="lead mt-4 text-creme/85">{t.contact.lead}</p>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            <li>
              <a className={`${card} bg-ouro text-carvao`} href={PHONE.href}>
                <IconPhone size={34} />
                <span><span className="kicker block opacity-90">{t.a11y.phone}</span><span className="display mt-2 block text-[clamp(1.8rem,3vw,2.6rem)] tabular">{PHONE.display}</span></span>
              </a>
            </li>
            <li>
              <a className={`${card} bg-creme text-tinta`} href={`mailto:${EMAIL}`}>
                <IconMail size={34} />
                <span><span className="kicker block opacity-90">{t.a11y.email}</span><span className="mt-2 block break-all font-display text-[clamp(1.2rem,2vw,1.6rem)] font-bold">{EMAIL}</span></span>
              </a>
            </li>
            <li>
              <a className={`${card} bg-brasa text-carvao`} href={MAPS_URL} target="_blank" rel="noopener">
                <span className="flex items-center justify-between"><IconPin size={34} /><IconExternal size={20} /></span>
                <span><span className="kicker block opacity-90">{t.contact.address}</span><span className="display mt-2 block text-[clamp(1.6rem,2.6vw,2.3rem)]">{ADDRESS.street}<br />{ADDRESS.zip} {ADDRESS.city}</span></span>
                <span className="sr-only">{t.cta.openMaps} {t.a11y.newTab}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
