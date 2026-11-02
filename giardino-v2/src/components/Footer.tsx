// The large dark footer: GIARDINO in giant letters, the reservation call to action, address, phone and e-mail, the
// hours, the four languages and every supporting destination of the current site (Jobs, Press, Arrival, Partner Hotels,
// legal pages), plus the external ones (vouchers, tour, Facebook, Tripadvisor).
import type { ReactNode } from "react";
import { HTML_LANG, LANGS, NATIVE, UI, type PageKey } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS } from "@/content/business";
import { TX } from "@/content/copy";
import { asset, cn } from "@/lib/utils";
import { SplitReveal } from "./Reveal";
import { PillButton } from "./ui/Pill";
import { ClosureNotice, HoursTable, OpenStatus } from "./Hours";
import { IconExternal, IconMail, IconPhone, IconPin } from "./icons";

export function Footer() {
  const { lang, book, requestLanguage, href, go } = useSite();
  const page = (p: PageKey, label: string, section?: string) => (
    <li>
      <a
        className="link"
        href={href(p, section)}
        onClick={(e) => {
          e.preventDefault();
          go(p, section);
        }}
      >
        {label}
      </a>
    </li>
  );
  const ext = (url: string, label: ReactNode) => (
    <li>
      <a className="inline-flex items-center gap-1.5" href={url} target="_blank" rel="noopener noreferrer">
        <span className="link">{label}</span>
        <IconExternal size={13} className="opacity-60" />
        <span className="sr-only"> ({UI.newTab[lang]})</span>
      </a>
    </li>
  );
  return (
    <footer className="tex-contour relative overflow-hidden bg-ink text-white">
      <div className="container-x pt-20 md:pt-28">
        <div className="flex items-end justify-between gap-6">
          <SplitReveal as="p" text={["GIARDINO"]} className="display w-full text-[clamp(72px,19vw,360px)] font-extrabold leading-[0.8] tracking-[-0.02em] text-cream" ariaHidden />
        </div>
        <p className="sr-only">Pizzeria Giardino</p>
        <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-[26px] bg-white/[0.06] p-5 shadow-[inset_0_0_0_1px_rgba(243,242,225,0.16)] md:flex-row md:items-center md:p-6">
          <div className="flex flex-wrap items-center gap-4">
            <PillButton onClick={book}>{UI.reserve[lang]}</PillButton>
            <span className="eyebrow text-cream/85">{TX.footerBook[lang]}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={`tel:${BUSINESS.tel}`} className="btn btn--ghost btn--sm text-white">
              <IconPhone size={16} />
              <span className="btn-roll">
                <span>{BUSINESS.phone}</span>
                <span aria-hidden="true">{BUSINESS.phone}</span>
              </span>
            </a>
            <a href={`mailto:${BUSINESS.email}`} className="btn btn--ghost btn--sm normal-case tracking-[0.04em] text-white">
              <IconMail size={16} />
              <span className="btn-roll">
                <span>{BUSINESS.email}</span>
                <span aria-hidden="true">{BUSINESS.email}</span>
              </span>
            </a>
          </div>
        </div>

        <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.1fr_1.3fr_1fr_1fr]">
          <div>
            <img src={asset("brand/logo-light.webp")} alt="Pizzeria Giardino" width={600} height={306} className="h-auto w-[180px]" loading="lazy" />
            <address className="mt-6 not-italic leading-relaxed">
              {BUSINESS.name}
              <br />
              {BUSINESS.hosts}
              <br />
              {BUSINESS.street}
              <br />
              {BUSINESS.postcode} {BUSINESS.town}
            </address>
            <a href={BUSINESS.maps.googleDirections} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 font-display text-[15px] font-semibold uppercase tracking-[0.12em] text-gold">
              <IconPin size={16} /> <span className="link">{TX.directions[lang]}</span>
              <span className="sr-only"> ({UI.newTab[lang]})</span>
            </a>
          </div>
          <div>
            <h2 className="eyebrow text-gold">{TX.hoursTitle[lang]}</h2>
            <OpenStatus className="mt-4" />
            <ClosureNotice tone="dark" className="mt-4 bg-white/[0.06] !p-4 text-[15px]" />
            <HoursTable className="mt-4 text-[15px]" caption={false} compact />
          </div>
          <nav aria-label={UI.footerNav[lang]}>
            <h2 className="eyebrow text-gold">Giardino</h2>
            <ul className="mt-4 list-none space-y-2.5 text-[16px]">
              {page("menu", UI.menu[lang])}
              {page("families", UI.families[lang])}
              {page("story", UI.story[lang])}
              {page("visit", UI.visit[lang])}
              {page("gallery", UI.gallery[lang])}
              {page("hotels", UI.hotels[lang])}
              {page("visit", UI.arrival[lang], "arrival")}
              {page("visit", UI.contact[lang], "contact")}
              {page("jobs", UI.jobs[lang])}
              {page("press", UI.press[lang])}
            </ul>
          </nav>
          <div>
            <h2 className="eyebrow text-gold">{TX.follow[lang]}</h2>
            <ul className="mt-4 list-none space-y-2.5 text-[16px]">
              {ext(BUSINESS.vouchers(lang), UI.vouchers[lang])}
              {ext(BUSINESS.tour(lang), UI.tour[lang])}
              {ext(BUSINESS.googleListing, "Google Maps")}
              {ext(BUSINESS.facebook, "Facebook")}
              {ext(BUSINESS.tripadvisor, "Tripadvisor")}
            </ul>
            <ul className="mt-8 list-none space-y-2.5 text-[15px] text-cream/85">
              {page("imprint", UI.imprint[lang])}
              {page("privacy", UI.privacy[lang])}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-cream/20 py-8 md:flex-row md:items-center md:justify-between">
          <nav aria-label={UI.languages[lang]}>
            <ul className="flex list-none flex-wrap gap-x-5 gap-y-2">
              {LANGS.map((code) => (
                <li key={code}>
                  <button
                    type="button"
                    lang={HTML_LANG[code]}
                    aria-current={code === lang ? "true" : undefined}
                    onClick={() => requestLanguage(code)}
                    className={cn("link min-h-11 font-display text-[15px] font-semibold uppercase tracking-[0.12em]", code === lang ? "text-gold" : "text-white")}
                  >
                    {NATIVE[code]}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-[14px] text-cream/80">{BUSINESS.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
