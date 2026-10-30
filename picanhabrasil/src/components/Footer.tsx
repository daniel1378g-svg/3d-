// Footer: a giant wordmark, visit details with today's status, the site map, legal links, languages, social.
import { LANGS, NATIVE, type PageKey } from "@/i18n";
import { useSite } from "@/site";
import { ADDRESS, EMAIL, PHONE, SOCIAL } from "@/content/facts";
import { BULL_OUTLINE, BULL_VIEWBOX } from "@/brand/bull";
import { OpenBadge } from "./OpenBadge";
import { IconFacebook, IconInstagram } from "./icons";

export function Footer() {
  const { t, lang, href, go, requestLanguage, openBooking } = useSite();
  const link = (page: PageKey, label: string) => (
    <li>
      <a href={href(page)} onClick={(e) => { e.preventDefault(); go(page); }} className="link-u decoration-transparent hover:decoration-current">
        {label}
      </a>
    </li>
  );
  return (
    <footer className="skin-carvao relative overflow-hidden border-t border-creme/10 pt-20" aria-label={t.a11y.footerNav}>
      <div className="gutter">
        <div className="wrap grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-6">
            <svg viewBox={BULL_VIEWBOX} className="h-16 w-16 text-boi" aria-hidden="true"><path d={BULL_OUTLINE} fill="currentColor" /></svg>
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
            <p className="mt-4 text-sm text-creme/70">{t.location.cards}</p>
          </div>
          <div>
            <h2 className="kicker mb-4 text-ouro">{t.footer.groups.discover}</h2>
            <ul className="flex flex-col gap-2 text-creme/85">
              {link("ueber", t.nav.ueber)}
              {link("churrasco", t.nav.churrasco)}
              {link("spiesse", t.nav.spiesse)}
              {link("preise", t.nav.preise)}
              {link("gruppen", t.nav.gruppen)}
              {link("catering", t.nav.catering)}
              {link("gutscheine", t.nav.gutscheine)}
              {link("wissen", t.nav.wissen)}
              {link("dolce", t.nav.dolce)}
              {link("kontakt", t.nav.kontakt)}
            </ul>
          </div>
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="kicker mb-4 text-ouro">{t.footer.groups.company}</h2>
              <ul className="flex flex-col gap-2 text-creme/85">
                {link("datenschutz", t.nav.datenschutz)}
                {link("impressum", t.nav.impressum)}
                {link("agb", t.nav.agb)}
                <li><a href={__ARTIFACT__ ? "#zh" : "/zh/"} lang="zh-Hant" className="link-u decoration-transparent hover:decoration-current">{t.nav.chinese}</a></li>
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
            <div className="flex gap-2">
              <a className="icon-btn" href={SOCIAL.instagram} target="_blank" rel="noopener" aria-label={`Instagram ${t.a11y.newTab}`}><IconInstagram /></a>
              <a className="icon-btn" href={SOCIAL.facebook} target="_blank" rel="noopener" aria-label={`Facebook ${t.a11y.newTab}`}><IconFacebook /></a>
            </div>
          </div>
        </div>
      </div>
      <svg aria-hidden="true" focusable="false" viewBox="0 0 1000 205" className="pointer-events-none mt-16 block w-full select-none">
        <text x="500" y="182" textAnchor="middle" className="display fill-creme/[0.06]" style={{ fontSize: "238px" }}>BOINABRASA</text>
      </svg>
      <div className="gutter border-t border-creme/10 py-6 text-sm text-creme/70">
        <div className="wrap flex flex-col gap-2 md:flex-row md:justify-between">
          <p>{t.footer.copyright}</p>
          <p>{t.footer.proposal}</p>
        </div>
      </div>
    </footer>
  );
}
