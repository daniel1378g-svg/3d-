// Visiting is the conversion: where exactly (1st floor of the Archhöfe, next to the station), directions, call,
// e-mail and the two social profiles. No opening hours are published by Manna, so none are shown – the section says
// so and points to the phone. No WhatsApp link: the published QR code leads to an expired link.
import { useSite } from "@/site";
import { EMAIL, PHONE, SHOP, SOCIAL, URLS } from "@/content/facts";
import { Img } from "../Img";
import { IconExternal, IconFacebook, IconInstagram, IconMail, IconPhone, IconPin } from "../icons";

export function Visit() {
  const { t } = useSite();
  const v = t.visit;
  const card = "group flex min-h-[200px] flex-col justify-between gap-8 rounded-[var(--radius-card)] p-6 transition-transform duration-300 [transition-timing-function:var(--ease-out)] hover:-translate-y-1";
  return (
    <section id="besuch" data-anchor="besuch" className="skin-acai relative overflow-hidden py-24 md:py-32" aria-labelledby="visit-title">
      <div className="gutter">
        <div className="wrap">
          <p className="kicker text-lilac" data-lang-stagger>{v.kicker}</p>
          <h2 id="visit-title" className="display mt-3 text-[clamp(3.2rem,9vw,9rem)]">{v.title}</h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="lead max-w-[40rem] text-cream/90">{v.where}</p>
              <ul className="mt-8 flex flex-wrap gap-2 text-sm">
                <li className="rounded-full bg-lime px-4 py-2 font-bold text-ink">{v.floor}</li>
                <li className="rounded-full bg-cream/10 px-4 py-2">{SHOP.mall}</li>
                <li className="rounded-full bg-cream/10 px-4 py-2">{v.station}</li>
              </ul>
              <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                <li className="sm:col-span-2">
                  <a className={`${card} bg-plum text-cream`} href={URLS.maps} target="_blank" rel="noopener">
                    <span className="flex items-center justify-between"><IconPin size={34} /><IconExternal size={20} /></span>
                    <span>
                      <span className="kicker block text-lilac-3">{v.address}</span>
                      <span className="display mt-2 block text-[clamp(1.8rem,3.4vw,2.8rem)]">{SHOP.street}, {SHOP.zip} {SHOP.city}</span>
                      <span className="mt-3 inline-flex items-center gap-2 font-semibold underline decoration-lime decoration-2 underline-offset-4">{t.cta.directions}</span>
                      <span className="sr-only"> {t.a11y.newTab}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a className={`${card} bg-lime text-ink`} href={PHONE.href}>
                    <IconPhone size={32} />
                    <span><span className="kicker block">{t.a11y.phone}</span><span className="display mt-2 block text-[clamp(1.6rem,2.6vw,2.2rem)] tabular">{PHONE.display}</span></span>
                  </a>
                </li>
                <li>
                  <a className={`${card} bg-cream text-ink`} href={`mailto:${EMAIL}`}>
                    <IconMail size={32} />
                    <span><span className="kicker block text-plum">{t.a11y.email}</span><span className="mt-2 block break-all font-display text-[clamp(1.15rem,1.8vw,1.5rem)] font-extrabold">{EMAIL}</span></span>
                  </a>
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="kicker mr-1 text-cream/80">{v.routeWith}</span>
                <a className="chip text-cream" href={URLS.maps} target="_blank" rel="noopener">Google Maps<span className="sr-only"> {t.a11y.newTab}</span></a>
                <a className="chip text-cream" href={URLS.appleMaps} target="_blank" rel="noopener">Apple Maps<span className="sr-only"> {t.a11y.newTab}</span></a>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="rounded-[var(--radius-card)] bg-acai-3 p-6">
                <h3 className="font-display text-[1.4rem] font-extrabold text-lilac">{v.hoursTitle}</h3>
                <p className="mt-2 text-cream/90">{v.hoursNone}</p>
                <a className="pill pill-lime pill-sm mt-4" href={PHONE.href}><IconPhone size={16} />{t.cta.call}</a>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <figure><Img id="archhoefe" alt={v.mallAlt} sizes="(min-width: 1024px) 20vw, 45vw" className="aspect-[4/3] w-full rounded-[24px]" /></figure>
                <figure><Img id="kiosk" alt={v.kioskAlt} sizes="(min-width: 1024px) 20vw, 45vw" className="aspect-[4/3] w-full rounded-[24px]" /></figure>
              </div>
              <div className="rounded-[var(--radius-card)] bg-acai-3 p-6">
                <h3 className="font-display text-[1.2rem] font-extrabold text-lilac">{v.social}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a className="chip text-cream" href={SOCIAL.instagram.url} target="_blank" rel="noopener"><IconInstagram size={18} />{SOCIAL.instagram.handle}<span className="sr-only"> {t.a11y.newTab}</span></a>
                  <a className="chip text-cream" href={SOCIAL.facebook.url} target="_blank" rel="noopener"><IconFacebook size={18} />{SOCIAL.facebook.handle}<span className="sr-only"> {t.a11y.newTab}</span></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
