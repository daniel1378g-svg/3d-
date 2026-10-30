// Footer: visit details with today's status, the site map, languages, the unofficial-proposal notice and the
// platform that runs reservations and orders, and a giant wordmark.
import { LANGS, NATIVE, type Anchor, type PageKey } from "@/i18n";
import { useSite } from "@/site";
import { ADDRESS, EMAIL, PHONE, URLS } from "@/content/facts";
import { asset } from "@/lib/utils";
import { OpenBadge } from "./OpenBadge";

export function Footer() {
  const { t, lang, href, go, requestLanguage, openBooking } = useSite();
  const link = (page: PageKey, label: string, anchor?: Anchor) => (
    <li>
      <a href={href(page, { anchor })} onClick={(e) => { e.preventDefault(); go(page, { anchor }); }} className="link-u decoration-transparent hover:decoration-current">
        {label}
      </a>
    </li>
  );
  return (
    <footer className="skin-carvao relative overflow-hidden border-t border-creme/10 pt-20" aria-label={t.a11y.footerNav}>
      <div className="gutter">
        <div className="wrap grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-6">
            <img src={asset("/brand/logo.webp")} alt="" width={297} height={270} className="w-20" />
            <p className="display text-[2.4rem] text-creme">{t.footer.claim}</p>
            <button type="button" className="pill self-start" onClick={() => openBooking()}>{t.cta.reserveNow}</button>
          </div>
          <div>
            <h2 className="kicker mb-4 text-ouro">{t.footer.groups.visit}</h2>
            <address className="not-italic leading-relaxed text-creme/85">
              {ADDRESS.street}
              <br />
              {ADDRESS.zip} {ADDRESS.city}
              <br />
              <a className="link-u" href={PHONE.href}>{PHONE.display}</a>
              <br />
              <a className="link-u" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </address>
            <div className="mt-5"><OpenBadge /></div>
            <p className="mt-2 text-xs text-creme/75">{t.hours.basis}</p>
          </div>
          <div>
            <h2 className="kicker mb-4 text-ouro">{t.footer.groups.discover}</h2>
            <ul className="flex flex-col gap-2 text-creme/85">
              {link("home", t.nav.prato, "prato")}
              {link("karte", t.nav.karte)}
              {link("reservieren", t.nav.reservieren)}
              {link("bestellen", t.nav.bestellen)}
              {link("home", t.nav.gruppen, "gruppen")}
              {link("home", t.nav.bewertungen, "bewertungen")}
              {link("home", t.nav.galerie, "galerie")}
              {link("home", t.nav.faq, "faq")}
              {link("home", t.nav.kontakt, "kontakt")}
            </ul>
          </div>
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="kicker mb-4 text-ouro">{t.footer.groups.company}</h2>
              <ul className="flex flex-col gap-2 text-creme/85">
                {link("impressum", t.nav.impressum)}
                <li><a className="link-u decoration-transparent hover:decoration-current" href={URLS.liveSite} target="_blank" rel="noopener">picanha-brasil.ch<span className="sr-only"> {t.a11y.newTab}</span></a></li>
              </ul>
            </div>
            <div>
              <h2 className="kicker mb-3 text-ouro">{t.a11y.language}</h2>
              <ul className="flex flex-wrap gap-x-4 gap-y-2 text-creme/85">
                {LANGS.map((l) => (
                  <li key={l}>
                    <button type="button" lang={l} aria-current={l === lang ? "true" : undefined} className={l === lang ? "text-ouro" : "link-u decoration-transparent hover:decoration-current"} onClick={() => requestLanguage(l)}>
                      {NATIVE[l]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <svg aria-hidden="true" focusable="false" viewBox="0 0 1000 150" className="pointer-events-none mt-16 block w-full select-none">
        <text x="500" y="135" textAnchor="middle" className="display fill-creme/[0.06]" style={{ fontSize: "168px" }}>PICANHA BRASIL</text>
      </svg>
      <div className="gutter border-t border-creme/10 py-6 text-sm text-creme/70">
        <div className="wrap flex flex-col gap-2 md:flex-row md:justify-between">
          <p>{t.footer.copyright}</p>
          <p><strong className="text-ouro">{t.proposal}</strong> {t.footer.platform}</p>
        </div>
      </div>
    </footer>
  );
}
