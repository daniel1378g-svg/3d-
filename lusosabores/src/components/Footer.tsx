import { HTML_LANG, LANGS, NATIVE, UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, LISTINGS } from "@/content/site";
import { asset, cn } from "@/lib/utils";
import { SplitReveal } from "./Reveal";
import { PillButton } from "./ui/Pill";
import { HoursList } from "./Hours";
import { IconFacebook, IconInstagram, IconPhone } from "./icons";
import { Flame } from "./Illustrations";

export function Footer() {
  const { lang, book, requestLanguage, href, go } = useSite();
  const ext = <span className="sr-only"> {UI.externalNew[lang]}</span>;
  return (
    <footer className="on-dark tex-grill relative overflow-hidden bg-marca-escura text-branco">
      <div className="container-x pt-20 md:pt-28">
        <SplitReveal as="p" text="LUSO SABORES" by="line" className="display w-full text-center text-[clamp(56px,14.6vw,290px)] font-extrabold leading-[0.82] text-branco" />
        <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-[24px] bg-branco/[0.06] p-5 shadow-[inset_0_0_0_1px_rgba(246,194,191,0.18)] md:flex-row md:items-center md:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <PillButton onClick={book}>{UI.reserve[lang]}</PillButton>
            <span className="eyebrow text-suave">{UI.footerBook[lang]}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {BUSINESS.phones.map((p) => (
              <a key={p.tel} href={`tel:${p.tel}`} className="btn btn--ghost btn--sm text-branco">
                <IconPhone size={16} />
                <span className="btn-roll">
                  <span>{p.label}</span>
                  <span aria-hidden="true">{p.label}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="eyebrow text-destaque">{UI.address[lang]}</h2>
            <address className="mt-4 not-italic leading-relaxed">
              {BUSINESS.street}
              <br />
              {BUSINESS.city}
            </address>
            <a className="link mt-3 inline-block text-suave" href={BUSINESS.planUrl} target="_blank" rel="noopener noreferrer">
              {UI.plan[lang]}
              {ext}
            </a>
            <h2 className="eyebrow mt-8 text-destaque">{UI.hours[lang]}</h2>
            <HoursList className="mt-1 text-[15px] [&_dd]:text-[18px] [&_dt]:text-[18px]" />
          </div>
          <div>
            <h2 className="eyebrow text-destaque">{UI.phones[lang]}</h2>
            <ul className="mt-4 list-none space-y-2 font-display text-[22px] font-bold">
              {BUSINESS.phones.map((p) => (
                <li key={p.tel}>
                  <a className="link" href={`tel:${p.tel}`}>
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
            <h2 className="eyebrow mt-8 text-destaque">{UI.social[lang]}</h2>
            <ul className="mt-4 list-none space-y-2">
              <li>
                <a className="link inline-flex items-center gap-2" href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer">
                  <IconFacebook size={18} /> Facebook{ext}
                </a>
              </li>
              <li>
                <a className="link inline-flex items-center gap-2" href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer">
                  <IconInstagram size={18} /> Instagram{ext}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="eyebrow text-destaque">{UI.listings[lang]}</h2>
            <ul className="mt-4 list-none space-y-2">
              {LISTINGS.map((k) => (
                <li key={k.url}>
                  <a className="link font-bold" href={k.url} target="_blank" rel="noopener noreferrer">
                    {k.label}
                    {ext}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow text-destaque">Luso Sabores</h2>
            <ul className="mt-4 list-none space-y-2">
              {(["menu", "services", "galerie", "contact", "privacy"] as const).map((p) => (
                <li key={p}>
                  <a
                    className="link"
                    href={href(p)}
                    onClick={(e) => {
                      e.preventDefault();
                      go(p);
                    }}
                  >
                    {UI[p][lang]}
                  </a>
                </li>
              ))}
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
          <div className="flex flex-wrap items-center gap-4">
            <span className="grid h-12 w-[68px] shrink-0 place-items-center rounded-full bg-branco">
              <img src={asset("brand/logo.webp")} alt="Logo Luso Sabores" width={600} height={420} className="h-9 w-auto" loading="lazy" />
            </span>
            <p className="text-[14px] text-suave">
              {BUSINESS.copyright} |{" "}
              <a
                className="link"
                href={href("privacy")}
                onClick={(e) => {
                  e.preventDefault();
                  go("privacy");
                }}
              >
                Protection des données
              </a>
            </p>
          </div>
        </div>
      </div>
      <Flame className="pointer-events-none absolute -right-6 top-20 w-28 rotate-[8deg] opacity-90 md:w-40" />
    </footer>
  );
}
