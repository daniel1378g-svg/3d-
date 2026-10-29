import { HTML_LANG, LANGS, NATIVE, UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TX } from "@/content/site";
import { HoursList } from "./Contact";
import { asset, cn } from "@/lib/utils";
import { SplitReveal } from "./Reveal";
import { PillButton } from "./ui/Pill";
import { IconMail, IconPhone } from "./icons";
import { Azores } from "./Illustrations";

export function Footer() {
  const { lang, book, requestLanguage, href, go } = useSite();
  return (
    <footer className="on-dark tex-wave relative overflow-hidden bg-marca-escura text-branco">
      <div className="container-x pt-20 md:pt-28">
        <SplitReveal as="p" text="RESTAURANT OCEANO" by="line" className="display w-full text-center text-[clamp(40px,11.6vw,230px)] font-extrabold leading-[0.82] text-fundo" />
        <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-[24px] bg-branco/[0.06] p-5 shadow-[inset_0_0_0_1px_rgba(243,242,225,0.18)] md:flex-row md:items-center md:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <PillButton onClick={book}>{UI.reserve[lang]}</PillButton>
            <span className="eyebrow text-suave">{UI.bookingLine[lang]}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[BUSINESS.restaurant, BUSINESS.laden].map((a) => (
              <a key={a.tel} href={`tel:${a.tel}`} className="btn btn--ghost btn--sm text-branco">
                <IconPhone size={16} />
                <span className="btn-roll">
                  <span>{a.phone}</span>
                  <span aria-hidden="true">{a.phone}</span>
                </span>
              </a>
            ))}
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
            <h2 className="eyebrow text-destaque">{BUSINESS.name}</h2>
            <address className="mt-4 not-italic leading-relaxed">
              {BUSINESS.restaurant.street}
              <br />
              {BUSINESS.restaurant.city}
              <br />
              <a className="link" href={`tel:${BUSINESS.restaurant.tel}`}>
                {BUSINESS.restaurant.phone}
              </a>
            </address>
            <p className="eyebrow mt-5 text-suave">{TX.oeffnungszeitenRestaurant[lang]}</p>
            <HoursList place="restaurant" className="mt-2 text-[15px]" />
          </div>
          <div>
            <h2 className="eyebrow text-destaque">{BUSINESS.shop}</h2>
            <address className="mt-4 not-italic leading-relaxed">
              {BUSINESS.laden.street}
              <br />
              {BUSINESS.laden.city}
              <br />
              <a className="link" href={`tel:${BUSINESS.laden.tel}`}>
                {BUSINESS.laden.phone}
              </a>
            </address>
            <p className="eyebrow mt-5 text-suave">{TX.oeffnungszeitenLaden[lang]}</p>
            <HoursList place="laden" className="mt-2 text-[15px]" />
          </div>
          <div>
            <h2 className="eyebrow text-destaque">{UI.shop[lang]}</h2>
            <p className="mt-4 text-[15px] text-suave">{TX.shopLine[lang]}</p>
            <a className="btn btn--sm mt-4" href={BUSINESS.webShop} target="_blank" rel="noopener noreferrer">
              {TX.btnBestellen[lang]} <span className="sr-only">{UI.externalNew[lang]}</span>
            </a>
          </div>
          <div>
            <h2 className="eyebrow text-destaque">{TX.rechtliches[lang]}</h2>
            <ul className="mt-4 list-none space-y-2">
              <li>
                <a
                  className="link"
                  href={href("impressum")}
                  onClick={(e) => {
                    e.preventDefault();
                    go("impressum");
                  }}
                >
                  {UI.impressum[lang]}
                </a>
              </li>
              <li>
                <a className="link" href={BUSINESS.privacy} target="_blank" rel="noopener noreferrer">
                  {UI.privacy[lang]} <span className="sr-only">{UI.externalNew[lang]}</span>
                </a>
              </li>
              <li>
                <a
                  className="link"
                  href={href("galerie")}
                  onClick={(e) => {
                    e.preventDefault();
                    go("galerie");
                  }}
                >
                  {UI.galerie[lang]}
                </a>
              </li>
              <li>
                <a
                  className="link"
                  href={href("bewertungen")}
                  onClick={(e) => {
                    e.preventDefault();
                    go("bewertungen");
                  }}
                >
                  {UI.bewertungen[lang]}
                </a>
              </li>
            </ul>
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
            <img src={asset("brand/logo-white.png")} alt="Logo Restaurant Oceano" width={310} height={88} className="h-8 w-auto" loading="lazy" />
            <p className="text-[14px] text-suave">{BUSINESS.copyright}</p>
          </div>
        </div>
      </div>
      <Azores className="pointer-events-none absolute -right-6 top-24 w-44 opacity-80 md:w-64" />
    </footer>
  );
}
