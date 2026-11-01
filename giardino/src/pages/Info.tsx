// Smaller pages of the current site, carried over completely: partner hotels, jobs, press, virtual tour, imprint,
// privacy, and the not-found page.
import { useSite, PROPOSAL } from "@/site";
import { PageHead } from "@/components/PageHead";
import { ClickToLoad } from "@/components/ClickToLoad";
import { Link, ExtLink } from "@/components/Link";
import { Img } from "@/components/Img";
import { HOTELS, JOBS, PRESS, TOUR, CREDITS, RESTAURANT, OFFICIAL } from "@/content/restaurant";
import { Arrow, Phone, Mail, External } from "@/components/icons";
import { useReveals } from "@/lib/reveal";
import type { NavKey } from "@/routes";

export function Hotels() {
  const { t, lang } = useSite();
  useReveals(`hotels-${lang}`);
  const h = t.hotelsPage;
  return (
    <>
      <PageHead kicker={h.kicker} title={h.title} lead={<p>{h.lead}</p>} />
      <section className="wrap" style={{ paddingBottom: "clamp(80px, 10vw, 140px)" }}>
        <ul className="card-list" role="list" style={{ padding: 0, margin: 0 }}>
          {HOTELS.map((ho, i) => (
            <li key={ho.name} className="panel" style={{ listStyle: "none" }} data-reveal data-delay={String(i * 80)}>
              <h2>{ho.name}</h2>
              <address className="address" style={{ fontSize: 16 }}>{ho.street}<br />{ho.town}</address>
              <dl style={{ display: "grid", gap: 6, margin: "16px 0 0", fontSize: 15 }}>
                <div><dt className="sr-only">{h.phone}</dt><dd style={{ margin: 0 }}><a className="link num" href={ho.phoneHref}>{ho.phone}</a></dd></div>
                {ho.fax && <div><dt className="muted" style={{ display: "inline" }}>{h.fax} </dt><dd className="num" style={{ display: "inline", margin: 0 }}>{ho.fax}</dd></div>}
                <div><dt className="sr-only">{h.email}</dt><dd style={{ margin: 0 }}><a className="link" href={`mailto:${ho.email}`}>{ho.email}</a></dd></div>
                <div><dt className="sr-only">{h.web}</dt><dd style={{ margin: 0 }}><ExtLink href={ho.web} className="link">{ho.web.replace(/^https?:\/\//, "")}</ExtLink></dd></div>
              </dl>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export function Jobs() {
  const { t, lang } = useSite();
  const j = t.jobsPage;
  return (
    <>
      <PageHead kicker={j.kicker} title={j.title} photo="interior-room" lead={<p>{JOBS.roles[lang]}</p>}>
        <p style={{ marginTop: 24 }}>{j.apply}</p>
        <p style={{ marginTop: 8 }}>
          <a className="textlink" href={`mailto:${RESTAURANT.email}`}><Mail />{RESTAURANT.email}</a>
        </p>
        <p style={{ marginTop: 18 }}>
          <ExtLink href={JOBS.href} className="textlink">{j.listing}<External /></ExtLink>
        </p>
      </PageHead>
    </>
  );
}

export function Press() {
  const { t, lang } = useSite();
  const p = t.pressPage;
  useReveals(`press-${lang}`);
  const [rro, cunda] = PRESS;
  return (
    <>
      <PageHead kicker={p.kicker} title={p.title} />
      <section className="wrap" style={{ display: "grid", gap: 64, paddingBottom: "clamp(80px, 10vw, 140px)" }}>
        <article aria-labelledby="press-rro" style={{ display: "grid", gap: 18 }}>
          <h2 id="press-rro" className="display h-m">{rro.title[lang]}</h2>
          <p className="muted" style={{ fontSize: 14 }}>{rro.source}</p>
          <ClickToLoad src={`https://www.youtube-nocookie.com/embed/${rro.youtubeId}?rel=0`} title={rro.title[lang]} button={p.load} note={p.loadNote} poster="hosts">
            <ExtLink href={rro.href!} className="link">{p.watch}</ExtLink>
          </ClickToLoad>
        </article>
        <article aria-labelledby="press-cunda" style={{ display: "grid", gap: 14, maxWidth: 820 }} data-reveal>
          <h2 id="press-cunda" className="display h-m">{cunda.title[lang]}</h2>
          <p className="muted" style={{ fontSize: 14 }}>{cunda.source} · {p.unavailable}</p>
          <blockquote className="lead" style={{ margin: 0, fontFamily: "var(--serif)", fontSize: "clamp(22px, 2vw, 28px)", color: "var(--ink)", maxWidth: "52ch" }}>{cunda.body![lang]}</blockquote>
        </article>
      </section>
    </>
  );
}

export function Tour() {
  const { t, lang } = useSite();
  const p = t.tourPage;
  return (
    <>
      <PageHead kicker={p.kicker} title={p.title} lead={<p>{p.lead}</p>} />
      <section className="wrap" style={{ paddingBottom: "clamp(80px, 10vw, 140px)", display: "grid", gap: 16 }}>
        <ClickToLoad src={TOUR.href(lang)} title={p.title} button={p.load} note={p.loadNote} poster="interior-bar">
          <ExtLink href={TOUR.href(lang)} className="link">{p.open}</ExtLink>
        </ClickToLoad>
      </section>
    </>
  );
}

export function Imprint() {
  const { t, lang } = useSite();
  const i = t.imprint;
  const restaurant = (
    <address className="address">
      {RESTAURANT.name}
      <br />
      {RESTAURANT.hosts}
      <br />
      {RESTAURANT.street}
      <br />
      {RESTAURANT.postcode} {RESTAURANT.town}
      <br />
      <a href={RESTAURANT.phoneHref} className="num">Tel. {RESTAURANT.phoneDisplay}</a>
      <br />
      <a href={`mailto:${RESTAURANT.email}`}>{RESTAURANT.email}</a>
    </address>
  );
  const photography = (
    <>
      <h2>{i.photography}</h2>
      <p>
        <ExtLink href={CREDITS.photography.href}>{CREDITS.photography.name}</ExtLink>, {CREDITS.photography.town} <span className="muted">({i.photographyNote})</span>
      </p>
    </>
  );
  return (
    <>
      <PageHead kicker={t.nav.imprint} title={i.title} />
      <section className="wrap prose" style={{ paddingBottom: "clamp(80px, 10vw, 140px)" }}>
        {PROPOSAL ? (
          <>
            {/* BRIEF §12: an unofficial proposal names its own operator and shows the restaurant only as «Angaben des Restaurants» */}
            <h2>{i.proposalTitle}</h2>
            <p>{i.proposalBody}</p>
            <h2>{i.operator}</h2>
            <p>{i.operatorValue}</p>
            <ul>
              <li><ExtLink href={OFFICIAL.imprint(lang)}>{i.officialImprint}</ExtLink></li>
              <li><ExtLink href={OFFICIAL.privacy}>{i.officialPrivacy}</ExtLink></li>
              <li><ExtLink href={RESTAURANT.url}>{i.official}: pizzeriagiardino.ch</ExtLink></li>
            </ul>
            <h2>{i.restaurantTitle}</h2>
            {restaurant}
            {photography}
          </>
        ) : (
          <>
            <p className="notice">{i.draft}</p>
            <h2>{i.responsible}</h2>
            {restaurant}
            {photography}
          </>
        )}
      </section>
    </>
  );
}

export function Privacy() {
  const { t } = useSite();
  const p = t.privacy;
  const sections = PROPOSAL ? p.proposalSections : p.sections;
  return (
    <>
      <PageHead kicker={t.nav.privacy} title={p.title}>
        <p className="muted" style={{ marginTop: 18, fontSize: 14 }}>{p.updated}{PROPOSAL ? "" : ` · ${p.draft}`}</p>
      </PageHead>
      <section className="wrap prose" style={{ paddingBottom: "clamp(80px, 10vw, 140px)" }}>
        {sections.map((s) => (
          <div key={s.h}>
            <h2>{s.h}</h2>
            {s.p.map((x, k) => <p key={k}>{x}</p>)}
          </div>
        ))}
      </section>
    </>
  );
}

export function NotFound() {
  const { t, href } = useSite();
  const pages: NavKey[] = ["home", "menu", "reserve", "visit", "contact"];
  return (
    <header className="page-head grain" style={{ minHeight: "80vh" }}>
      <div className="engraving" aria-hidden="true" />
      <div className="wrap page-head__grid">
        <div>
          <p className="kicker">404</p>
          <h1 className="display h-xl" style={{ margin: "20px 0" }}>{t.notFound.title}</h1>
          <p className="lead">{t.notFound.body}</p>
          <ul style={{ listStyle: "none", padding: 0, margin: "26px 0 0", display: "grid", gap: 10 }}>
            {pages.map((p) => (
              <li key={p}><Link href={href(p)} className="textlink">{t.nav[p]}<Arrow /></Link></li>
            ))}
          </ul>
          <p style={{ marginTop: 26 }}><a className="textlink num" href={RESTAURANT.phoneHref}><Phone />{RESTAURANT.phoneDisplay}</a></p>
        </div>
        <div className="page-head__media arch" style={{ overflow: "hidden" }}>
          <Img id="door-hours" sizes="(min-width: 900px) 34vw, 92vw" style={{ height: "100%" }} />
        </div>
      </div>
    </header>
  );
}
