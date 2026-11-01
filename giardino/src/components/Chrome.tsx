// The parts around every page: proposal band, footer, floating reservation button, page-transition curtain.
import { useSite, PROPOSAL, PROPOSAL_TEXT } from "@/site";
import { Link, ExtLink } from "./Link";
import { HoursList, ClosureNotices } from "./Hours";
import { LogoImg } from "./Header";
import { RESTAURANT, LABELS, mapsHref, VOUCHERS } from "@/content/restaurant";
import LABEL_SIZES from "@/data/labels.json";
import { ArrowUp, External } from "./icons";
import type { NavKey } from "@/routes";

export function ProposalBand() {
  const { t, lang } = useSite();
  if (!PROPOSAL) return null;
  return (
    <div className="band" role="note">
      <b lang="pt">{PROPOSAL_TEXT}</b>
      <span className="band__local" lang={lang}>· {t.meta.proposal}</span>
    </div>
  );
}

export function Footer() {
  const { t, lang, href } = useSite();
  const year = 2026;
  const pages: NavKey[] = ["menu", "reserve", "hosts", "kids", "gallery", "tour"];
  const info: NavKey[] = ["visit", "contact", "hotels", "jobs", "press"];
  return (
    <footer className="footer on-dark cv" aria-labelledby="footer-title">
      <div className="engraving" aria-hidden="true" />
      <div className="wrap">
        <h2 id="footer-title" className="sr-only">{t.a11y.footerNav}</h2>
        <div className="footer__plaque">
          <LogoImg sizes="300px" lazy />
        </div>
        <p className="footer__claim">{t.footer.claim}</p>
        <div className="footer__grid">
          <div>
            <h2>{t.footer.visit}</h2>
            <address className="address" style={{ fontSize: 15.5 }}>
              {RESTAURANT.name}
              <br />
              {RESTAURANT.hosts}
              <br />
              {RESTAURANT.street}
              <br />
              {RESTAURANT.postcode} {RESTAURANT.town}
            </address>
            <ul style={{ marginTop: 12 }}>
              <li><ExtLink href={mapsHref} className="link">{t.cta.directions}</ExtLink></li>
            </ul>
          </div>
          <div>
            <h2>{t.footer.contact}</h2>
            <ul>
              <li><a href={RESTAURANT.phoneHref} className="link num">{RESTAURANT.phoneDisplay}</a></li>
              <li><a href={`mailto:${RESTAURANT.email}`} className="link">{RESTAURANT.email}</a></li>
              <li><ExtLink href={VOUCHERS.href(lang)} className="link">{t.nav.vouchers}</ExtLink></li>
            </ul>
            <h2 style={{ marginTop: 28 }}>{t.nav.sectionsTitle}</h2>
            <ul>
              {pages.map((p) => <li key={p}><Link href={href(p)} className="link">{t.nav[p]}</Link></li>)}
            </ul>
          </div>
          <div>
            <h2>{t.footer.hours}</h2>
            <HoursList compact />
            <ClosureNotices className="footer__closures" />
          </div>
          <div>
            <h2>{t.nav.infoTitle}</h2>
            <ul>
              {info.map((p) => <li key={p}><Link href={href(p)} className="link">{t.nav[p]}</Link></li>)}
            </ul>
          </div>
        </div>
        <Labels />
        <div className="footer__small">
          <span>{PROPOSAL ? t.footer.proposal : t.footer.copyright(year)}</span>
          <span style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            <Link href={href("imprint")} className="link">{t.nav.imprint}</Link>
            <Link href={href("privacy")} className="link">{t.nav.privacy}</Link>
            <a href="#top" className="link" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); document.getElementById("main")?.focus({ preventScroll: true }); }}>
              {t.footer.top} <ArrowUp style={{ width: 14, height: 14, display: "inline", verticalAlign: -2 }} />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

/** «Labels & Partner»: the badges of the current site as image + link, nothing else (BRIEF §4). */
function Labels() {
  const { t, lang } = useSite();
  const sizes = LABEL_SIZES as Record<string, { w: number; h: number; display: number }>;
  const prefix = __ARTIFACT__ ? "" : "/";
  return (
    <section className="labels" aria-labelledby="labels-title">
      <h2 id="labels-title">{t.footer.distinctions}</h2>
      <ul>
        {LABELS.map((l) => {
          const s = sizes[l.id];
          const h = s.display;
          const w = Math.round((s.w / s.h) * h);
          return (
            <li key={l.id}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="labels__link">
                <img src={`${prefix}brand/labels/${l.id}.webp`} width={w} height={h} alt={l.alt[lang]} loading="lazy" decoding="async" />
                <External className="labels__ext" aria-hidden="true" />
                <span className="sr-only"> ({t.a11y.newTab})</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
