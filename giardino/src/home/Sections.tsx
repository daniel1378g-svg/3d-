// Home page sections after the hero. Each has its own motion idea within one visual language:
//   story – a sticky arched window that wipes from photo to photo as the chapters pass (desktop)
//   cucina – the restaurant's three words land one by one; a horizontal journey through the kitchen's photographs
//   carta – a typographic index of the menus, a photo follows the pointer
//   padroni – the hosts' motto lights up word by word with the scroll
//   famiglia – a loose collage, the Family Destination mascot tilts in
//   galleria – a mosaic of the original photographs, opening into a lightbox
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useSite } from "@/site";
import { Img, useAlt } from "@/components/Img";
import { Link, ExtLink } from "@/components/Link";
import { Track } from "@/components/Track";
import { useLightbox } from "@/components/Lightbox";
import { HoursList, ClosureNotices, OpeningStatus } from "@/components/Hours";
import { Arrow, Search, Gift, Coins, Bed, Cube, Briefcase, Paper, Phone, Pin, Mail } from "@/components/icons";
import { ANCHORS } from "@/routes";
import { MENUS, type Item, type MenuId } from "@/content/menu";
import { RESTAURANT, VOUCHERS, mapsHref, LEUKERBAD_THERME, HOTELS } from "@/content/restaurant";
import { fmtChf, fmtList } from "@/lib/format";
import { useGsap } from "@/lib/gsap";
import { ReservationFlow } from "@/reservation/Flow";

const pre = __ARTIFACT__ ? "" : "/";

// ---------------------------------------------------------------------------------------------------------------
export function Story() {
  const { t, reduced } = useSite();
  const root = useRef<HTMLElement>(null);
  const { gsap } = useGsap();
  const photos = ["detail-bottle-light", "terrace-view", "ship-cliffs"];
  const labels = [t.home.story.chapters[0].kicker, t.home.story.chapters[1].kicker, t.home.story.chapters[2].kicker];
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduced || !root.current || !gsap) return;
    const mq = window.matchMedia("(min-width: 901px)");
    if (!mq.matches) return;
    const ctx = gsap.context(() => {
      const frames = gsap.utils.toArray<HTMLElement>(".story__frame .img");
      gsap.utils.toArray<HTMLElement>(".story__text").forEach((text, i) => {
        if (i > 0) {
          gsap.fromTo(frames[i], { clipPath: "inset(100% 0% 0% 0% round 9999px 9999px 0px 0px)" }, { clipPath: "inset(0% 0% 0% 0% round 9999px 9999px 0px 0px)", ease: "none", scrollTrigger: { trigger: text, start: "top 85%", end: "top 35%", scrub: 0.6 } });
        }
        gsap.fromTo(frames[i].querySelector("img"), { scale: 1.18 }, { scale: 1, ease: "none", scrollTrigger: { trigger: text, start: "top bottom", end: "bottom top", scrub: true } });
        gsap.to({}, { scrollTrigger: { trigger: text, start: "top 55%", end: "bottom 55%", onToggle: (self) => self.isActive && setActive(i) } });
      });
    }, root);
    return () => ctx.revert();
  }, [reduced, gsap]);

  return (
    <section className="section grain" id={ANCHORS.story} ref={root} aria-labelledby="story-title">
      <div className="engraving" aria-hidden="true" style={{ left: -140, top: 40, width: 620, height: 480 }} />
      <div className="wrap">
        <div className="story__intro">
          <div>
            <p className="kicker">{t.home.story.kicker}</p>
            <h2 id="story-title" className="display h-xl" style={{ marginTop: 22 }} data-reveal>{t.home.story.title}</h2>
          </div>
          <p className="lead" data-reveal data-delay="120">{t.home.story.lead}</p>
        </div>
        <div className="story__chapters">
          <div className="story__texts">
            {t.home.story.chapters.map((c, i) => (
              <article className="story__text" key={c.kicker}>
                <div className="story__mobile-img arch" style={{ overflow: "hidden" }}>
                  <Img id={photos[i]} sizes="92vw" style={{ height: "100%" }} />
                </div>
                <span className="story__count" aria-hidden="true">{`0${i + 1}`}</span>
                <p className="kicker">{c.kicker}</p>
                <h3 className="display h-m" data-reveal>{c.title}</h3>
                <p className="body" data-reveal data-delay="100">{c.body}</p>
              </article>
            ))}
          </div>
          <div className="story__visual" aria-hidden="true">
            <div className="story__frame">
              {photos.map((p, i) => (
                <Img key={p} id={p} className={i === 0 ? "is-first" : ""} sizes="(min-width: 901px) 52vw, 1px" decorative />
              ))}
            </div>
            <p className="story__label">{labels[active]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------------------------------------------
const JOURNEY: { id: string; menu: MenuId; anchor?: string }[] = [
  { id: "pizza-rocket", menu: "food", anchor: "pizzen" },
  { id: "starter-salmon", menu: "food", anchor: "vorspeisen" },
  { id: "dish-prawns", menu: "food", anchor: "pasta" },
  { id: "dish-schnitzel", menu: "food", anchor: "fleisch" },
  { id: "pizza-ham-rocket", menu: "food", anchor: "pizzen" },
  { id: "dish-pesto", menu: "food", anchor: "pasta" },
  { id: "dish-chicken-risotto", menu: "food", anchor: "fleisch" },
  { id: "dish-penne-chili", menu: "food", anchor: "pasta" },
  { id: "pizza-egg", menu: "food", anchor: "pizzen" },
  { id: "dish-lasagne", menu: "food", anchor: "pasta" },
  { id: "dish-spaghetti-bacon", menu: "food", anchor: "pasta" },
  { id: "detail-spaghetti", menu: "food", anchor: "pasta" },
  { id: "dish-penne", menu: "food", anchor: "pasta" },
  { id: "dessert-panna-cotta", menu: "desserts", anchor: "coupes" },
  { id: "dessert-coupe", menu: "desserts", anchor: "coupes" },
];
const PORTRAIT = new Set(["dish-schnitzel", "dish-penne-chili", "detail-spaghetti"]);

export function Kitchen() {
  const { t, lang, href, reduced } = useSite();
  const alt = useAlt();
  const statement = useRef<HTMLHeadingElement>(null);
  const { gsap } = useGsap();
  const words = t.home.kitchen.title.split(" ");
  const sectionTitle = (m: MenuId, anchor?: string) => {
    const menu = MENUS.find((x) => x.id === m)!;
    return (anchor && menu.sections.find((s) => s.id === anchor)?.title[lang]) ?? menu.title[lang];
  };
  useEffect(() => {
    if (reduced || !statement.current || !gsap) return;
    const ctx = gsap.context(() => {
      // words rise one after another: 600 ms each, 50 ms apart (transform and opacity only)
      gsap.from(".w", { yPercent: 110, opacity: 0, stagger: 0.05, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: statement.current, start: "top 80%" } });
    }, statement);
    return () => ctx.revert();
  }, [reduced, gsap]);
  return (
    <section className="section section--dark grain" id={ANCHORS.kitchen} aria-labelledby="kitchen-title">
      <div className="engraving" aria-hidden="true" style={{ right: -160, top: 60, width: 700, height: 540 }} />
      <div className="wrap">
        <p className="kicker">{t.home.kitchen.kicker}</p>
        <h2 id="kitchen-title" className="kitchen__statement" ref={statement} style={{ marginTop: 26 }}>
          {words.map((w, i) => (
            <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.08em" }}>
              <span className="w" style={i === 2 ? { fontStyle: "italic", color: "var(--brass-light)" } : undefined}>{w}</span>
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </h2>
        <div className="kitchen__grid">
          <div>
            <p className="kitchen__body" data-reveal>{t.home.kitchen.body}</p>
            <p className="kitchen__body" data-reveal style={{ marginTop: 18, fontSize: 16 }}>{t.home.kitchen.wir}</p>
            <div style={{ marginTop: 34, display: "flex", gap: 12, flexWrap: "wrap" }} data-reveal>
              <Link href={href("menu")} className="btn btn--light">{t.cta.fullMenu}<Arrow /></Link>
            </div>
          </div>
          <ul className="facts" role="list" style={{ padding: 0, margin: 0 }}>
            {t.home.kitchen.facts.map((f, i) => (
              <li className="fact" key={f.n} data-reveal data-delay={String(i * 90)} style={{ listStyle: "none" }}>
                <span className="fact__n">{f.n}</span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="journey">
          <h3 className="display h-m" style={{ marginBottom: 6 }} data-reveal>{t.home.kitchen.journeyTitle}</h3>
          <Track label={t.home.kitchen.journeyTitle} controlsLabel={t.home.kitchen.journeyHint}>
            {JOURNEY.map((j) => (
              <figure className={`card ${PORTRAIT.has(j.id) ? "card--tall" : "card--wide"}`} key={j.id} style={{ margin: 0 }}>
                <Img id={j.id} className="card__media" sizes="(min-width: 760px) 32vw, 80vw" />
                <figcaption className="card__cap">
                  <span>{alt(j.id)}</span>
                  <Link href={href("menu", { search: j.menu === "food" ? "" : `?m=${j.menu}`, anchor: j.anchor })} className="textlink" style={{ color: "var(--brass-light)" }}>
                    {t.home.kitchen.toMenu(sectionTitle(j.menu, j.anchor))}
                  </Link>
                </figcaption>
              </figure>
            ))}
          </Track>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------------------------------------------
type Row = { key: string; label: string; menu: MenuId; anchor?: string; items: Item[]; photo: string; from: boolean };
const items = (menu: MenuId, ids: string[]) => MENUS.find((m) => m.id === menu)!.sections.filter((s) => ids.includes(s.id)).flatMap((s) => s.groups.flatMap((g) => g.items));

export function Carta() {
  const { t, lang, href, go } = useSite();
  const peek = useRef<HTMLDivElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const food = MENUS[0];
  const title = (id: string) => food.sections.find((s) => s.id === id)!.title[lang];
  const rows: Row[] = useMemo(
    () => [
      { key: "vorspeisen", label: `${title("vorspeisen")} · ${title("region")}`, menu: "food", anchor: "vorspeisen", items: items("food", ["vorspeisen", "region"]), photo: "starter-salmon", from: true },
      { key: "pizzen", label: title("pizzen"), menu: "food", anchor: "pizzen", items: items("food", ["pizzen"]), photo: "pizza-rocket", from: true },
      { key: "pasta", label: `${title("risotto")} · ${title("pasta")}`, menu: "food", anchor: "risotto", items: items("food", ["risotto", "pasta"]), photo: "dish-prawns", from: true },
      { key: "fleisch", label: title("fleisch"), menu: "food", anchor: "fleisch", items: items("food", ["fleisch"]), photo: "dish-chicken-risotto", from: true },
      { key: "desserts", label: MENUS[2].title[lang], menu: "desserts", items: MENUS[2].sections.flatMap((s) => s.groups.flatMap((g) => g.items)), photo: "dessert-coupe", from: false },
      { key: "drinks", label: MENUS[1].title[lang], menu: "drinks", items: MENUS[1].sections.flatMap((s) => s.groups.flatMap((g) => g.items)), photo: "detail-bottle-light", from: false },
      { key: "kids", label: MENUS[3].title[lang], menu: "kids", items: MENUS[3].sections.filter((s) => !s.flavours).flatMap((s) => s.groups.flatMap((g) => g.items)), photo: "playroom-climber", from: false },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang],
  );
  const target = (r: Row) => href("menu", { search: r.menu === "food" ? "" : `?m=${r.menu}`, anchor: r.anchor });
  const onMove = (e: React.PointerEvent) => {
    if (peek.current) peek.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    go(href("menu", { search: q.trim() ? `?q=${encodeURIComponent(q.trim())}` : "" }));
  };
  return (
    <section className="section" id={ANCHORS.menu} aria-labelledby="carta-title" onPointerMove={onMove}>
      <div className="wrap">
        <div className="section__head section__head--split">
          <div>
            <p className="kicker">{t.home.carta.kicker}</p>
            <h2 id="carta-title" className="display h-xl" style={{ marginTop: 22 }} data-reveal>{t.home.carta.title}</h2>
          </div>
          <p className="lead" data-reveal data-delay="100">{t.home.carta.body}</p>
        </div>
        <nav className="carta" aria-labelledby="carta-title" onPointerLeave={() => setPhoto(null)}>
          {rows.map((r, i) => {
            const min = Math.min(...r.items.flatMap((x) => x.prices.map((p) => p.chf)).filter((n) => n > 0));
            return (
              <Link key={r.key} href={target(r)} className="carta__row" data-reveal data-delay={String(i * 50)} onPointerEnter={() => setPhoto(r.photo)} onFocus={() => setPhoto(null)}>
                <span className="carta__idx" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <span className="carta__name">{r.label}</span>
                <span className="carta__meta carta__meta--count">{t.home.carta.count(r.items.length)}{r.from && Number.isFinite(min) ? ` · ${t.home.carta.from(fmtChf(min, lang))}` : ""}</span>
                <Arrow className="carta__arrow" />
              </Link>
            );
          })}
        </nav>
        <div className={`carta__peek ${photo ? "is-on" : ""}`} ref={peek} aria-hidden="true">
          {rows.map((r) => (
            <div key={r.key} style={{ position: "absolute", inset: 0, opacity: photo === r.photo ? 1 : 0, transition: "opacity .35s" }}>
              <Img id={r.photo} sizes="300px" decorative style={{ height: "100%" }} />
            </div>
          ))}
        </div>
        <form className="carta__search" role="search" onSubmit={submit} action={href("menu")} method="get">
          <label className="sr-only" htmlFor="carta-q">{t.home.carta.searchLabel}</label>
          <div className="menu-search field">
            <Search />
            <input id="carta-q" name="q" className="input" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.home.carta.searchPlaceholder} autoComplete="off" />
          </div>
          <button className="btn" type="submit">{t.home.carta.searchGo}</button>
        </form>
        <p className="carta__pdfs">
          <span>{t.menu.pdfTitle}:</span>
          {MENUS.map((m) => (
            <a key={m.id} href={m.pdf.href.replace(/^\//, pre)} className="link" target="_blank" rel="noopener">
              {m.title[lang]} (PDF)
            </a>
          ))}
        </p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------------------------------------------
export function Hosts() {
  const { t, href, reduced } = useSite();
  const quote = useRef<HTMLQuoteElement>(null);
  const { gsap } = useGsap();
  const words = t.home.hosts.quote.split(" ");
  useEffect(() => {
    if (reduced || !quote.current || !gsap) return;
    const q = quote.current;
    const ws = q.querySelectorAll<HTMLElement>(".w");
    const light = (progress: number) => {
      const n = Math.round(progress * ws.length);
      ws.forEach((w, i) => w.classList.toggle("is-lit", i < n));
    };
    const ctx = gsap.context(() => {
      const tween = gsap.to({}, {
        scrollTrigger: {
          trigger: q,
          start: "top 80%",
          end: "bottom 45%",
          scrub: true,
          onUpdate: (self) => light(self.progress),
        },
      });
      // the words dim only once the scrub is attached, already at the current scroll position (the quote is fully
      // readable at rest, without JavaScript, on touch devices and with reduced motion)
      light(tween.scrollTrigger?.progress ?? 1);
      q.classList.add("is-scrub");
      gsap.fromTo(".hosts__portrait img", { yPercent: -6, scale: 1.12 }, { yPercent: 6, scale: 1.12, ease: "none", scrollTrigger: { trigger: ".hosts__portrait", start: "top bottom", end: "bottom top", scrub: true } });
    }, q.closest("section")!);
    return () => {
      ctx.revert();
      q.classList.remove("is-scrub");
    };
  }, [reduced, gsap]);
  return (
    <section className="section section--paper grain" id={ANCHORS.hosts} aria-labelledby="hosts-title">
      <div className="wrap hosts">
        <Img id="hosts" className="hosts__portrait arch" sizes="(min-width: 900px) 44vw, 92vw" />
        <div>
          <p className="kicker">{t.home.hosts.kicker}</p>
          <h2 id="hosts-title" className="display h-m" style={{ margin: "22px 0 30px", maxWidth: "18ch" }} data-reveal>{t.home.hosts.title}</h2>
          <blockquote className="hosts__quote" ref={quote} style={{ margin: 0 }}>
            <span aria-hidden="true">«</span>
            {words.map((w, i) => (
              <span key={i}>
                <span className="w">{w}</span>{" "}
              </span>
            ))}
            <span aria-hidden="true">»</span>
          </blockquote>
          <p className="lead" style={{ marginTop: 28 }} data-reveal>{t.home.hosts.body}</p>
          <p className="hosts__sig">{t.home.hosts.signature}</p>
          <Link href={href("hosts")} className="textlink" style={{ marginTop: 22 }}>{t.cta.hosts}<Arrow /></Link>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------------------------------------------
export function Family() {
  const { t, href } = useSite();
  const alt = useAlt();
  return (
    <section className="section" id={ANCHORS.family} aria-labelledby="family-title">
      <div className="wrap family">
        <div className="family__a" style={{ position: "relative" }} data-reveal="mask">
          <Img id="ship-cliffs" className="arch" sizes="(min-width: 900px) 40vw, 92vw" style={{ height: "100%" }} />
        </div>
        <div className="family__text">
          <p className="kicker">{t.home.family.kicker}</p>
          <h2 id="family-title" className="display h-l" style={{ margin: "22px 0 24px", maxWidth: "16ch" }} data-reveal>{t.home.family.title}</h2>
          <p className="lead" style={{ maxWidth: "44ch" }} data-reveal>{t.home.family.body}</p>
          <div className="family__chips">
            <Link href={href("kids")} className="btn">{t.cta.kids}<Arrow /></Link>
            <Link href={href("menu", { search: "?m=kids" })} className="btn btn--ghost">{t.home.family.kidsMenu}</Link>
          </div>
        </div>
        <div className="family__b" style={{ position: "relative" }} data-reveal="mask" data-delay="100">
          <Img id="playroom-climber" sizes="(min-width: 900px) 46vw, 92vw" style={{ height: "100%" }} />
          <img className="family__badge" src={`${pre}images/family-destination-480.webp`} width={480} height={482} alt={alt("family-destination")} loading="lazy" />
        </div>
        <div className="family__c" data-reveal="mask" data-delay="160">
          <Img id="playroom-ride-on" sizes="30vw" style={{ height: "100%" }} />
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------------------------------------------
const MOSAIC = ["garden-view", "door-hours", "interior-bar", "pizza-ham-rocket", "terrace-flowers", "aerial-front", "detail-mini-bottles"];
const MOSAIC_CLASS = ["m-1", "m-2", "m-3", "m-4", "m-5", "m-3", "m-4"];
export function GalleryTeaser() {
  const { t, href } = useSite();
  const alt = useAlt();
  const lb = useLightbox(MOSAIC);
  return (
    <section className="section section--paper cv" id={ANCHORS.gallery} aria-labelledby="gallery-title">
      <div className="wrap">
        <div className="section__head section__head--split">
          <div>
            <p className="kicker">{t.home.gallery.kicker}</p>
            <h2 id="gallery-title" className="display h-xl" style={{ marginTop: 22 }} data-reveal>{t.home.gallery.title}</h2>
          </div>
          <div>
            <p className="lead" data-reveal>{t.home.gallery.body}</p>
            <Link href={href("gallery")} className="textlink" style={{ marginTop: 18 }}>{t.cta.allPhotos}<Arrow /></Link>
          </div>
        </div>
        <ul className="mosaic" role="list" style={{ padding: 0, margin: 0 }}>
          {MOSAIC.map((id, i) => (
            <li key={id} className={MOSAIC_CLASS[i]} style={{ listStyle: "none" }} data-reveal="mask" data-delay={String((i % 3) * 80)}>
              <button type="button" onClick={() => lb.open(i)} aria-label={t.galleryPage.open(alt(id))}>
                <Img id={id} sizes="(min-width: 760px) 40vw, 92vw" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      {lb.node}
    </section>
  );
}

// ---------------------------------------------------------------------------------------------------------------
export function ReserveSection() {
  const { t } = useSite();
  return (
    <section className="section grain cv" id={ANCHORS.reserve} aria-labelledby="reserve-title">
      <div className="wrap">
        <div className="section__head section__head--split">
          <div>
            <p className="kicker">{t.home.reserve.kicker}</p>
            <h2 id="reserve-title" className="display h-xl" style={{ marginTop: 22 }} data-reveal>{t.home.reserve.title}</h2>
          </div>
          <div>
            <p className="lead" data-reveal>{t.home.reserve.body}</p>
            <p style={{ marginTop: 16 }}>
              <a className="textlink num" href={RESTAURANT.phoneHref}><Phone />{RESTAURANT.phoneDisplay}</a>
            </p>
          </div>
        </div>
        <ReservationFlow compactHead />
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------------------------------------------
export function VisitSection() {
  const { t, href } = useSite();
  return (
    <section className="section section--dark grain cv" id={ANCHORS.visit} aria-labelledby="visit-title">
      <div className="wrap visit">
        <div>
          <p className="kicker">{t.home.visit.kicker}</p>
          <h2 id="visit-title" className="display h-xl" style={{ margin: "22px 0 26px" }} data-reveal>{t.home.visit.title}</h2>
          <address className="address" data-reveal>
            {RESTAURANT.name}
            <br />
            {RESTAURANT.street}, {RESTAURANT.postcode} {RESTAURANT.town}
          </address>
          <div className="contact-lines" data-reveal>
            <a href={RESTAURANT.phoneHref} className="textlink num" style={{ color: "var(--ivory)" }}><Phone />{RESTAURANT.phoneDisplay}</a>
            <a href={`mailto:${RESTAURANT.email}`} className="textlink" style={{ color: "var(--ivory)" }}><Mail />{RESTAURANT.email}</a>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 30 }} data-reveal>
            <ExtLink href={mapsHref} className="btn btn--light"><Pin />{t.cta.directions}</ExtLink>
            <Link href={href("visit")} className="btn btn--ghost">{t.nav.visit}</Link>
          </div>
          <div style={{ marginTop: 40 }} data-reveal>
            <Img id="aerial-terrace" className="visit__photo" sizes="(min-width: 900px) 46vw, 92vw" />
          </div>
        </div>
        <div style={{ display: "grid", gap: 26, alignContent: "start" }}>
          <OpeningStatus />
          <h3 className="display h-s">{t.hours.title}</h3>
          <HoursList />
          <ClosureNotices />
          <p style={{ fontSize: 14.5, color: "rgb(245 240 230 / .7)" }}>
            {t.home.visit.spa} <ExtLink href={LEUKERBAD_THERME.href} className="link">{t.nav.spa}</ExtLink>
          </p>
          <p style={{ fontSize: 13, color: "rgb(245 240 230 / .55)" }}>{t.hours.source}</p>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------------------------------------------
export function Services() {
  const { t, lang, href } = useSite();
  const amounts = VOUCHERS.options.map((n) => `CHF ${n}`);
  return (
    <section className="section section--ink grain cv" id={ANCHORS.services} aria-labelledby="services-title">
      <div className="wrap">
        <div className="section__head">
          <p className="kicker">{t.home.services.kicker}</p>
          <h2 id="services-title" className="display h-l" data-reveal>{t.home.services.title}</h2>
        </div>
        <div className="services">
          <article className="service" data-reveal>
            <Gift className="service__icon" />
            <h3>{t.home.services.vouchers.title}</h3>
            <p>{t.home.services.vouchers.body(fmtList(amounts, lang), VOUCHERS.validityYears)}</p>
            <div className="voucher-amounts" aria-hidden="true">
              {VOUCHERS.options.map((n) => <span key={n}>{n}.–</span>)}
              <span>…</span>
            </div>
            <ExtLink href={VOUCHERS.href(lang)} className="textlink">{t.cta.vouchers}<Arrow /></ExtLink>
          </article>
          <article className="service" data-reveal data-delay="80">
            <Coins className="service__icon" />
            <h3>{t.home.services.wir.title}</h3>
            <p>{t.home.services.wir.body}</p>
            <ExtLink href="https://www.wir.ch/" className="textlink">wir.ch<Arrow /></ExtLink>
          </article>
          <article className="service" data-reveal data-delay="160">
            <Bed className="service__icon" />
            <h3>{t.home.services.hotels.title}</h3>
            <p>{t.home.services.hotels.body}</p>
            <Link href={href("hotels")} className="textlink">{t.cta.hotels}<Arrow /></Link>
            <span className="sr-only">{HOTELS.map((h) => h.name).join(", ")}</span>
          </article>
          <article className="service" data-reveal>
            <Cube className="service__icon" />
            <h3>{t.home.services.tour.title}</h3>
            <p>{t.home.services.tour.body}</p>
            <Link href={href("tour")} className="textlink">{t.cta.tour}<Arrow /></Link>
          </article>
          <article className="service" data-reveal data-delay="80">
            <Briefcase className="service__icon" />
            <h3>{t.home.services.jobs.title}</h3>
            <p>{t.home.services.jobs.body}</p>
            <Link href={href("jobs")} className="textlink">{t.nav.jobs}<Arrow /></Link>
          </article>
          <article className="service" data-reveal data-delay="160">
            <Paper className="service__icon" />
            <h3>{t.home.services.press.title}</h3>
            <p>{t.home.services.press.body}</p>
            <Link href={href("press")} className="textlink">{t.nav.press}<Arrow /></Link>
          </article>
        </div>
      </div>
    </section>
  );
}
