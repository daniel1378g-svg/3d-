// Footer: the logo, where to find Manna, the site map, languages, the unofficial-proposal notice and a giant wordmark.
import { LANGS, NATIVE, type Anchor, type PageKey } from "@/i18n";
import { useSite } from "@/site";
import { EMAIL, PHONE, SHOP, SOCIAL, URLS } from "@/content/facts";
import { asset } from "@/lib/utils";
import { IconFacebook, IconInstagram } from "./icons";

export function Footer() {
  const { t, lang, href, go, requestLanguage } = useSite();
  const link = (page: PageKey, label: string, anchor?: Anchor) => (
    <li>
      <a href={href(page, { anchor })} onClick={(e) => { e.preventDefault(); go(page, { anchor }); }} className="link-u decoration-transparent hover:decoration-current">
        {label}
      </a>
    </li>
  );
  return (
    <footer className="skin-acai relative overflow-hidden border-t border-cream/10 pt-20" aria-label={t.a11y.footerNav}>
      <div className="gutter">
        <div className="wrap grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-6">
            <span className="inline-block self-start rounded-[28px] bg-cream p-3"><img src={asset("/brand/logo-320.webp")} alt="" width={320} height={277} className="w-28" /></span>
            <p className="display text-[2.4rem] text-cream">{t.footer.claim}</p>
          </div>
          <div>
            <h2 className="kicker mb-4 text-lilac">{t.footer.groups.visit}</h2>
            <address className="not-italic leading-relaxed text-cream/90">
              {SHOP.name}<br />{SHOP.mall}, {t.visit.floor}<br />{SHOP.street}, {SHOP.zip} {SHOP.city}<br />
              <a className="link-u" href={PHONE.href}>{PHONE.display}</a><br />
              <a className="link-u" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </address>
            <div className="mt-4 flex gap-2">
              <a className="icon-btn" href={SOCIAL.instagram.url} target="_blank" rel="noopener" aria-label={`Instagram ${SOCIAL.instagram.handle} ${t.a11y.newTab}`}><IconInstagram /></a>
              <a className="icon-btn" href={SOCIAL.facebook.url} target="_blank" rel="noopener" aria-label={`Facebook ${SOCIAL.facebook.handle} ${t.a11y.newTab}`}><IconFacebook /></a>
            </div>
          </div>
          <div>
            <h2 className="kicker mb-4 text-lilac">{t.footer.groups.discover}</h2>
            <ul className="flex flex-col gap-2 text-cream/90">
              {link("home", t.nav.discover, "entdecken")}
              {link("angebot", t.nav.range)}
              {link("home", t.nav.yourAcai, "becher")}
              {link("home", t.nav.waffles, "waffeln")}
              {link("home", t.nav.about, "ueber")}
              {link("home", t.nav.gallery, "galerie")}
              {link("home", t.nav.visit, "besuch")}
              {link("home", t.nav.faq, "faq")}
            </ul>
          </div>
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="kicker mb-4 text-lilac">{t.footer.groups.legal}</h2>
              <ul className="flex flex-col gap-2 text-cream/90">
                {link("impressum", t.nav.imprint)}
                <li><a className="link-u decoration-transparent hover:decoration-current" href={URLS.liveSite} target="_blank" rel="noopener">{t.footer.official}<span className="sr-only"> {t.a11y.newTab}</span></a></li>
              </ul>
            </div>
            <div>
              <h2 className="kicker mb-3 text-lilac">{t.a11y.language}</h2>
              <ul className="flex flex-wrap gap-x-4 gap-y-2 text-cream/90">
                {LANGS.map((l) => (
                  <li key={l}>
                    <button type="button" lang={l} aria-current={l === lang ? "true" : undefined} className={l === lang ? "text-lime" : "link-u decoration-transparent hover:decoration-current"} onClick={() => requestLanguage(l)}>
                      {NATIVE[l]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <svg aria-hidden="true" focusable="false" viewBox="0 0 1000 170" className="pointer-events-none mt-16 block w-full select-none">
        <text x="500" y="150" textAnchor="middle" className="display fill-lilac/[0.12]" style={{ fontSize: "190px" }}>MANNA AÇAÍ</text>
      </svg>
      <div className="gutter border-t border-cream/10 py-6 text-sm text-cream/80">
        <div className="wrap flex flex-col gap-2 md:flex-row md:justify-between">
          <p>{t.footer.copyright}</p>
          <p><strong className="text-lime">{t.proposal}</strong></p>
        </div>
      </div>
    </footer>
  );
}
