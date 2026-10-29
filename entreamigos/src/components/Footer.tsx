import { HTML_LANG, LANGS, NATIVE, UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TEXT } from "@/content/site";
import { DeliveryLinks, HoursList } from "./Contact";
import { asset, cn } from "@/lib/utils";
import { SplitReveal } from "./Reveal";
import { PillButton } from "./ui/Pill";
import { IconFacebook, IconMail, IconPhone } from "./icons";
import { Glasses } from "./Illustrations";

export function Footer() {
  const { lang, book, requestLanguage, href, go } = useSite();
  return (
    <footer className="on-dark tex-wave relative overflow-hidden bg-marca-escura text-branco">
      <div className="container-x pt-20 md:pt-28">
        <SplitReveal as="p" text="ENTRE AMIGOS" by="line" className="display w-full text-center text-[clamp(56px,15.2vw,300px)] font-extrabold leading-[0.82] text-fundo" />
        <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-[24px] bg-branco/[0.06] p-5 shadow-[inset_0_0_0_1px_rgba(242,217,221,0.18)] md:flex-row md:items-center md:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <PillButton onClick={book}>{UI.reserve[lang]}</PillButton>
            <span className="eyebrow text-suave">{UI.bookingLine[lang]}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={`tel:${BUSINESS.phoneTel}`} className="btn btn--ghost btn--sm text-branco">
              <IconPhone size={16} />
              <span className="btn-roll">
                <span>{BUSINESS.phone}</span>
                <span aria-hidden="true">{BUSINESS.phone}</span>
              </span>
            </a>
            <a href={`mailto:${BUSINESS.email}`} className="btn btn--ghost btn--sm normal-case tracking-[0.04em] text-branco">
              <IconMail size={16} />
              <span className="btn-roll">
                <span>{BUSINESS.email}</span>
                <span aria-hidden="true">{BUSINESS.email}</span>
              </span>
            </a>
          </div>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="eyebrow text-destaque">{TEXT.addressTitle[lang]}</h2>
            <address className="mt-4 not-italic leading-relaxed">
              {BUSINESS.short}
              <br />
              {BUSINESS.street}
              <br />
              {BUSINESS.city}
              <br />
              <a className="link" href={`mailto:${BUSINESS.email}`}>
                {BUSINESS.email}
              </a>
              <br />
              <a className="link" href={`tel:${BUSINESS.phoneTel}`}>
                {BUSINESS.phone}
              </a>
            </address>
            <a
              className="link mt-3 inline-block text-suave"
              href={href("acces")}
              onClick={(e) => {
                e.preventDefault();
                go("acces");
              }}
            >
              {UI.acces[lang]}
            </a>
          </div>
          <div>
            <h2 className="eyebrow text-destaque">{TEXT.hoursTitle[lang]}</h2>
            <HoursList className="mt-4 text-[16px]" />
          </div>
          <div>
            <h2 className="eyebrow text-destaque">{TEXT.deliveryTitle[lang]}</h2>
            <DeliveryLinks size="sm" className="mt-4" />
          </div>
          <div>
            <h2 className="eyebrow text-destaque">Facebook</h2>
            <a className="link mt-4 inline-flex items-center gap-2" href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer">
              <IconFacebook size={18} /> Facebook <span className="sr-only">{UI.externalNew[lang]}</span>
            </a>
            <p className="mt-3 text-[15px] text-suave">{TEXT.platsQ[lang]} {TEXT.platsA[lang]}</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-suave/20 py-8 md:flex-row md:items-center md:justify-between">
          <nav aria-label={UI.languages[lang]}>
            <ul className="flex list-none flex-wrap gap-x-5 gap-y-2">
              {LANGS.map((code) => (
                <li key={code}>
                  <button
                    type="button"
                    lang={HTML_LANG[code]}
                    aria-current={code === lang ? "true" : undefined}
                    onClick={() => requestLanguage(code)}
                    className={cn("link font-display text-[15px] font-semibold uppercase tracking-[0.12em]", code === lang ? "text-destaque" : "text-branco")}
                  >
                    {NATIVE[code]}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-4">
            <img src={asset("brand/logo.webp")} alt="Logo Entre Amigos" width={900} height={366} className="h-12 w-auto" loading="lazy" />
            <p className="text-[14px] text-suave">{BUSINESS.copyright}</p>
          </div>
        </div>
      </div>
      <Glasses className="pointer-events-none absolute -right-6 top-24 w-40 rotate-[-8deg] opacity-80 md:w-56" />
    </footer>
  );
}
