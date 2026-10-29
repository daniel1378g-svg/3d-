import { HTML_LANG, LANGS, NATIVE, UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, LINKS, TEXT } from "@/content/site";
import { asset, cn } from "@/lib/utils";
import { SplitReveal } from "./Reveal";
import { PillButton } from "./ui/Pill";
import { IconFacebook, IconPhone } from "./icons";
import { Sardine } from "./Illustrations";

export function Footer() {
  const { lang, book, requestLanguage, href, go } = useSite();
  return (
    <footer className="on-dark tex-wave relative overflow-hidden bg-oceano text-branco">
      <div className="container-x pt-20 md:pt-28">
        <SplitReveal as="p" text="LE PORTUGAIS" by="line" className="display w-full text-center text-[clamp(56px,15.2vw,300px)] font-extrabold leading-[0.82] text-sal" />
        <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-[24px] bg-branco/[0.06] p-5 shadow-[inset_0_0_0_1px_rgba(207,224,234,0.18)] md:flex-row md:items-center md:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <PillButton onClick={book}>{UI.reserve[lang]}</PillButton>
            <span className="eyebrow text-espuma">{TEXT.booking[lang]}</span>
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
            <h2 className="eyebrow text-dourado">{UI.address[lang]}</h2>
            <address className="mt-4 not-italic leading-relaxed">
              {BUSINESS.fullName}
              <br />
              {BUSINESS.street}
              <br />
              {BUSINESS.city}, {BUSINESS.country}
            </address>
            <a className="link mt-3 inline-block text-espuma" href={BUSINESS.mapUrl} target="_blank" rel="noopener noreferrer">
              {UI.planAcces[lang]} <span className="sr-only">{UI.externalNew[lang]}</span>
            </a>
            <p className="mt-5 font-bold">{TEXT.closed[lang]}</p>
          </div>
          <div>
            <h2 className="eyebrow text-dourado">{UI.contact[lang]}</h2>
            <ul className="mt-4 list-none space-y-2">
              {BUSINESS.phones.map((p) => (
                <li key={p.tel}>
                  <a className="link" href={`tel:${p.tel}`}>
                    {p.label}
                  </a>
                </li>
              ))}
              <li>
                <a className="link break-all" href={`mailto:${BUSINESS.email}`}>
                  {BUSINESS.email}
                </a>
              </li>
              <li className="pt-2">
                <a className="link inline-flex items-center gap-2" href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer">
                  <IconFacebook size={18} /> Facebook <span className="sr-only">{UI.externalNew[lang]}</span>
                </a>
              </li>
              <li className="pt-2">
                <a
                  className="link"
                  href={href("contact")}
                  onClick={(e) => {
                    e.preventDefault();
                    go("contact");
                  }}
                >
                  {UI.gettingThere[lang]}
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h2 className="eyebrow text-dourado">{UI.liens[lang]}</h2>
            <ul className="mt-4 grid list-none gap-x-8 gap-y-3 sm:grid-cols-2">
              {LINKS.map((k) => (
                <li key={k.url}>
                  <a className="group block" href={k.url} target="_blank" rel="noopener noreferrer">
                    <span className="link font-bold">{k.label}</span>
                    <span className="sr-only"> {UI.externalNew[lang]}</span>
                    <span className="mt-0.5 block text-[15px] text-espuma">{k.desc[lang]}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-espuma/20 py-8 md:flex-row md:items-center md:justify-between">
          <nav aria-label={UI.languages[lang]}>
            <ul className="flex list-none flex-wrap gap-x-5 gap-y-2">
              {LANGS.map((code) => (
                <li key={code}>
                  <button
                    type="button"
                    lang={HTML_LANG[code]}
                    aria-current={code === lang ? "true" : undefined}
                    onClick={() => requestLanguage(code)}
                    className={cn("link font-display text-[15px] font-semibold uppercase tracking-[0.12em]", code === lang ? "text-dourado" : "text-branco")}
                  >
                    {NATIVE[code]}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sal">
              <img src={asset("brand/logo.webp")} alt="Le Portugais" width={500} height={512} className="h-9 w-auto" loading="lazy" />
            </span>
            <p className="text-[14px] text-espuma">{BUSINESS.copyright}</p>
          </div>
        </div>
      </div>
      <Sardine className="pointer-events-none absolute -right-10 top-24 w-48 rotate-[-8deg] opacity-80 md:w-64" />
    </footer>
  );
}
