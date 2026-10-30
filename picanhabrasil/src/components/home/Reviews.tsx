// Google reviews: the three reviews the client supplied, word for word (content/reviews.json), as a stack of cards
// you can swipe, drag or step through with buttons and arrow keys. No automatic rotation. The texts stay in their
// original language (marked with lang); only the interface around them is translated. Above them, Google's
// aggregate rating as read on the check date, with links to read and write reviews on Google.
import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import reviewsData from "@content/reviews.json";
import { fill, LOCALE } from "@/i18n";
import { useSite } from "@/site";
import { GOOGLE_RATING, GOOGLE_REVIEWS_URL } from "@/content/facts";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { IconChevronLeft, IconChevronRight, IconExternal, IconGoogle, IconStar } from "../icons";

type Review = { author: string; rating: number; posted: string; meta: string[]; lang: string; text: string; scores: { food: number; service: number; atmosphere: number } | null };
const DATA = reviewsData as { supplied: string; reviews: Review[] };
const REVIEWS = DATA.reviews;
const TILT = [-2.5, 1.8, -1.2];

function Stars({ n, label, size = 18 }: { n: number; label: string; size?: number }) {
  return (
    <span className="flex gap-0.5 text-[#e8a33d]" role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, k) => <IconStar key={k} size={size} filled={k < n} />)}
    </span>
  );
}

function Carousel() {
  const { t, lang, reduce } = useSite();
  const r = t.reviews;
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const start = useRef<{ x: number; t: number } | null>(null);
  const go = (d: number) => { setDir(d); setI((x) => (x + d + REVIEWS.length) % REVIEWS.length); };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
  };
  const rev = REVIEWS[i];
  const asOf = new Intl.DateTimeFormat(LOCALE[lang], { day: "numeric", month: "long", year: "numeric" }).format(new Date(DATA.supplied));
  return (
    <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end" role="region" aria-roledescription="carousel" aria-label={r.carousel} onKeyDown={onKey}>
      <div
        className="relative min-h-[360px] touch-pan-y select-none"
        onPointerDown={(e) => { start.current = { x: e.clientX, t: performance.now() }; }}
        onPointerUp={(e) => {
          if (!start.current) return;
          const dx = e.clientX - start.current.x;
          const v = Math.abs(dx) / (performance.now() - start.current.t);
          if (Math.abs(dx) > 60 || v > 0.11) go(dx < 0 ? 1 : -1);
          start.current = null;
        }}
      >
        {/* the next cards peek out behind */}
        {!reduce && [2, 1].map((k) => (
          <div key={k} aria-hidden="true" className="absolute inset-0 rounded-[var(--radius-card)] bg-creme/90" style={{ transform: `translate(${k * 10}px, ${k * 12}px) rotate(${TILT[(i + k) % 3]}deg)`, opacity: 0.25 + 0.2 * (2 - k) }} />
        ))}
        <AnimatePresence mode="popLayout" initial={false} custom={dir}>
          <motion.figure
            key={i}
            className="relative rounded-[var(--radius-card)] bg-creme p-7 text-tinta shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] md:p-10"
            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: `translateX(${dir * 80}px) rotate(${dir * 4}deg)` }}
            animate={{ opacity: 1, transform: `translateX(0px) rotate(${reduce ? 0 : TILT[i % 3] / 2}deg)` }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, transform: `translateX(${-dir * 80}px) rotate(${-dir * 4}deg)` }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            aria-roledescription="slide"
            aria-label={fill(t.gallery.count, { n: i + 1, total: REVIEWS.length })}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Stars n={rev.rating} label={fill(r.stars, { n: rev.rating })} size={22} />
              <span className="kicker flex items-center gap-2 text-[0.66rem] text-tinta/70"><IconGoogle size={16} />Google</span>
            </div>
            <blockquote lang={rev.lang} className="mt-5 max-w-[60ch] text-[1.08rem] leading-relaxed md:text-[1.18rem]">
              {rev.text.split("\n\n").map((p) => <p key={p} className="mt-3 first:mt-0">{p}</p>)}
            </blockquote>
            <figcaption className="mt-6 border-t border-tinta/10 pt-4 text-sm">
              <p><strong className="text-[1rem]">{rev.author}</strong> <span className="text-tinta/65" lang="en">· {rev.posted}</span></p>
              {rev.meta.length > 0 && <p className="mt-1 text-tinta/65" lang="en">{rev.meta.join(" · ")}</p>}
              {rev.scores && (
                <ul className="mt-2 flex flex-wrap gap-2">
                  {(["food", "service", "atmosphere"] as const).map((k) => (
                    <li key={k} className="rounded-full bg-tinta/[0.06] px-3 py-1">{r.scores[k]}: <span className="tabular">{rev.scores![k]}/5</span></li>
                  ))}
                </ul>
              )}
              <p className="mt-3 text-[0.75rem] text-tinta/75">{fill(r.asShown, { date: asOf })}{rev.lang !== lang ? ` · ${r.original}` : ""}</p>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-2 lg:flex-col">
        <button type="button" className="icon-btn" onClick={() => go(-1)} aria-label={t.a11y.prev}><IconChevronLeft /></button>
        <button type="button" className="icon-btn" onClick={() => go(1)} aria-label={t.a11y.next}><IconChevronRight /></button>
        <span className="ml-2 text-sm text-creme/70 tabular lg:ml-0" aria-live="polite">{i + 1} / {REVIEWS.length}</span>
      </div>
      <ol className="flex gap-2 lg:col-span-2" aria-label={r.carousel}>
        {REVIEWS.map((x, k) => (
          <li key={x.author}>
            <button type="button" onClick={() => { setDir(k > i ? 1 : -1); setI(k); }} aria-current={k === i ? "true" : undefined} className={cn("rounded-full px-3 py-1.5 text-sm transition-colors", k === i ? "bg-creme text-tinta" : "bg-creme/10 text-creme/80 hover:bg-creme/20")}>
              {x.author}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Reviews() {
  const { t, lang } = useSite();
  const r = t.reviews;
  const rating = GOOGLE_RATING.value.toLocaleString(LOCALE[lang]);
  const checked = new Intl.DateTimeFormat(LOCALE[lang], { day: "numeric", month: "long", year: "numeric" }).format(new Date(GOOGLE_RATING.checked));
  return (
    <section id="bewertungen" data-anchor="bewertungen" className="skin-vinho relative overflow-hidden py-24 md:py-32" aria-labelledby="reviews-title">
      <div className="gutter">
        <div className="wrap">
          <p className="kicker flex items-center gap-2 text-ouro" data-lang-stagger><IconGoogle size={16} />{r.kicker}</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-8">
            <h2 id="reviews-title" className="display text-[clamp(3rem,8vw,8rem)]">{r.title}</h2>
            <div className="flex items-center gap-5">
              <p className="display text-[clamp(4.5rem,10vw,8rem)] leading-none text-ouro tabular" aria-hidden="true">{rating}</p>
              <div>
                <span className="flex gap-1 text-[#f2b33d]" role="img" aria-label={fill(r.ratingLabel, { rating })}>
                  {Array.from({ length: 5 }, (_, k) => <IconStar key={k} size={26} filled={k < Math.floor(GOOGLE_RATING.value)} half={k === Math.floor(GOOGLE_RATING.value) && GOOGLE_RATING.value % 1 >= 0.5} />)}
                </span>
                <p className="mt-2 text-sm text-creme/80">{r.via} · {fill(r.checked, { date: checked })}</p>
              </div>
            </div>
          </div>
          <Carousel />
          <div className="mt-10 flex flex-wrap gap-3">
            <a className="pill pill-cream" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener"><IconGoogle size={18} />{r.read}<IconExternal size={16} /><span className="sr-only">{t.a11y.newTab}</span></a>
            <a className="pill pill-ghost text-creme" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener">{r.write}<span className="sr-only">{t.a11y.newTab}</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
