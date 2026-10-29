import { HTML_LANG, LANGS, NATIVE, UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TX } from "@/content/site";
import { HoursList } from "./Contact";
import { asset, cn } from "@/lib/utils";
import { SplitReveal } from "./Reveal";
import { PillButton } from "./ui/Pill";
import { IconFacebook, IconMail, IconPhone, IconTwitter, IconVimeo } from "./icons";
import { Pig } from "./Illustrations";
import { NAV } from "./Header";

export function Footer() {
  const { lang, book, requestLanguage, href, go } = useSite();
  const links = [...NAV.map((n) => ({ page: n.page, label: UI[n.key][lang] })), { page: "bewertungen" as const, label: UI.bewertungen[lang] }, { page: "konto" as const, label: UI.konto[lang] }, { page: "warenkorb" as const, label: UI.warenkorb[lang] }];
  return (
    <footer className="on-dark tex-azulejo relative overflow-hidden bg-marca-escura text-fundo">
      <div className="container-x pt-20 md:pt-28">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <SplitReveal as="p" text={["Casa", "Dão Lafões"]} by="line" className="display font-display text-[clamp(56px,11vw,210px)] font-semibold leading-[0.9] text-fundo" />
          <Pig className="w-[min(50vw,260px)] opacity-90" />
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-[24px] bg-branco/[0.06] p-5 shadow-[inset_0_0_0_1px_rgba(253,249,246,0.14)] md:flex-row md:items-center md:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <PillButton onClick={book} variant="orange">
              {UI.reserve[lang]}
            </PillButton>
            <span className="text-[15px] text-fundo/80">{TX.n_svcResLine[lang]}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {BUSINESS.phones.map((a) => (
              <a key={a.tel} href={`tel:${a.tel}`} className="btn btn--ghost btn--sm text-fundo">
                <IconPhone size={16} />
                <span className="btn-roll">
                  <span>{a.show}</span>
                  <span aria-hidden="true">{a.show}</span>
                </span>
              </a>
            ))}
            <a href={`mailto:${BUSINESS.email}`} className="btn btn--ghost btn--sm normal-case tracking-[0.04em] text-fundo">
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
            <h2 className="eyebrow text-ember">{TX.kontakte[lang]}</h2>
            <address className="mt-4 not-italic leading-relaxed">
              {BUSINESS.name}
              <br />
              <span className="text-fundo/70">{TX.kantonZh[lang]}</span>
              <br />
              {BUSINESS.street}
              <br />
              {BUSINESS.city}
            </address>
            <p className="mt-3 text-[14px] text-fundo/70">
              {TX.gpsLabel[lang]} {BUSINESS.gps.show}
            </p>
          </div>
          <div>
            <h2 className="eyebrow text-ember">{TX.hoursLabel[lang].replace(/:$/, "")}</h2>
            <HoursList className="mt-4 text-[15px]" />
            <p className="mt-3 text-[13px] text-fundo/60">{TX.n_hoursSource[lang]}</p>
          </div>
          <div>
            <h2 className="eyebrow text-ember">{UI.menu[lang]}</h2>
            <ul className="mt-4 list-none space-y-2">
              {links.map((l) => (
                <li key={l.page}>
                  <a
                    className="link"
                    href={href(l.page)}
                    onClick={(e) => {
                      e.preventDefault();
                      go(l.page);
                    }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a className="link" href={BUSINESS.pdf} target="_blank" rel="noopener noreferrer">
                  {TX.n_pdfLink[lang]} <span className="sr-only">{UI.externalNew[lang]}</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="eyebrow text-ember">{TX.folgen[lang]}</h2>
            <ul className="mt-4 flex list-none gap-2">
              {[
                { href: BUSINESS.social.facebook, label: "Facebook", icon: <IconFacebook size={20} /> },
                { href: BUSINESS.social.twitter, label: "Twitter", icon: <IconTwitter size={18} /> },
                { href: BUSINESS.social.vimeo, label: "Vimeo", icon: <IconVimeo size={18} /> },
              ].map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} ${UI.externalNew[lang]}`} className="grid h-11 w-11 place-items-center rounded-full bg-branco/10 text-fundo transition hover:bg-destaque">
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
            <img src={asset("brand/logo-white.png")} alt="" width={352} height={181} loading="lazy" className="mt-6 w-40 opacity-80" />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-fundo/15 py-8 md:flex-row md:items-center md:justify-between">
          <nav aria-label={UI.languages[lang]}>
            <ul className="flex list-none flex-wrap gap-x-5 gap-y-2">
              {LANGS.map((code) => (
                <li key={code}>
                  <button type="button" lang={HTML_LANG[code]} aria-current={code === lang ? "true" : undefined} onClick={() => requestLanguage(code)} className={cn("link font-body text-[14px] font-semibold uppercase tracking-[0.12em]", code === lang ? "text-ember" : "text-fundo")}>
                    {NATIVE[code]}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-[13px] text-fundo/60">{BUSINESS.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
