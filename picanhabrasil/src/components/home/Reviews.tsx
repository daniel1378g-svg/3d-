// Google reviews. Google's public place card shows the rating (read on 30.10.2026) but no review texts could be read
// from here, and none is invented: the section shows the rating and links to the reviews on Google (read and write).
// The carousel takes real reviews from content/reviews.json (author, stars, date, text, language) as soon as the
// owners provide a selection or the Places API is connected; it stays hidden while the file is empty.
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import reviewsData from "@content/reviews.json";
import { fill, LOCALE } from "@/i18n";
import { useSite } from "@/site";
import { GOOGLE_RATING, GOOGLE_REVIEWS_URL } from "@/content/facts";
import { EASE_OUT } from "@/lib/motion";
import { IconChevronLeft, IconChevronRight, IconExternal, IconGoogle, IconStar } from "../icons";

type Review = { author: string; rating: number; date: string; text: string; lang: string };
const REVIEWS = (reviewsData as { reviews: Review[] }).reviews;

function Carousel() {
  const { t, lang, reduce } = useSite();
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const start = useRef<{ x: number; t: number } | null>(null);
  const go = (d: number) => { setDir(d); setI((x) => (x + d + REVIEWS.length) % REVIEWS.length); };
  const r = REVIEWS[i];
  return (
    <div className="mt-14" role="region" aria-roledescription="carousel" aria-label={t.reviews.carousel}>
      <div
        className="relative min-h-[260px] touch-pan-y select-none"
        onPointerDown={(e) => { start.current = { x: e.clientX, t: performance.now() }; }}
        onPointerUp={(e) => {
          if (!start.current) return;
          const dx = e.clientX - start.current.x;
          const v = Math.abs(dx) / (performance.now() - start.current.t);
          if (Math.abs(dx) > 60 || v > 0.11) go(dx < 0 ? 1 : -1);
          start.current = null;
        }}
      >
        <AnimatePresence mode="popLayout" initial={false} custom={dir}>
          <motion.figure
            key={i}
            custom={dir}
            className="rounded-[var(--radius-card)] bg-creme p-8 text-tinta"
            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: `translateX(${dir * 60}px) rotate(${dir * 2}deg)` }}
            animate={{ opacity: 1, transform: "translateX(0px) rotate(0deg)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, transform: `translateX(${-dir * 60}px) rotate(${-dir * 2}deg)` }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            aria-live="polite"
          >
            <span className="flex gap-0.5 text-[#e8a33d]" role="img" aria-label={fill(t.reviews.stars, { n: r.rating })}>
              {Array.from({ length: 5 }, (_, k) => <IconStar key={k} filled={k < r.rating} />)}
            </span>
            <blockquote className="mt-4 text-[1.15rem] leading-relaxed" lang={r.lang}>{r.text}</blockquote>
            <figcaption className="mt-5 flex items-center gap-3 text-sm">
              <IconGoogle size={18} />
              <strong>{r.author}</strong>
              <span className="opacity-60">{new Intl.DateTimeFormat(LOCALE[lang], { month: "long", year: "numeric" }).format(new Date(r.date))}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className="mt-5 flex items-center gap-2">
        <button type="button" className="icon-btn" onClick={() => go(-1)} aria-label={t.a11y.prev}><IconChevronLeft /></button>
        <button type="button" className="icon-btn" onClick={() => go(1)} aria-label={t.a11y.next}><IconChevronRight /></button>
        <span className="ml-2 text-sm text-creme/70 tabular">{i + 1} / {REVIEWS.length}</span>
      </div>
    </div>
  );
}

export function Reviews() {
  const { t, lang } = useSite();
  return (
    <section id="bewertungen" data-anchor="bewertungen" className="skin-vinho relative overflow-hidden py-24 md:py-32" aria-labelledby="reviews-title">
      <div className="gutter">
        <div className="wrap">
          <p className="kicker flex items-center gap-2 text-ouro" data-lang-stagger><IconGoogle size={16} />{t.reviews.kicker}</p>
          <h2 id="reviews-title" className="display mt-3 text-[clamp(3rem,8vw,8rem)]">{t.reviews.title}</h2>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <p className="display text-[clamp(5rem,14vw,11rem)] leading-none text-ouro tabular" aria-hidden="true">{GOOGLE_RATING.value.toLocaleString(LOCALE[lang])}</p>
            <div>
              <span className="flex gap-1 text-[#f2b33d]" role="img" aria-label={fill(t.reviews.ratingLabel, { rating: GOOGLE_RATING.value.toLocaleString(LOCALE[lang]) })}>
                {Array.from({ length: 5 }, (_, k) => <IconStar key={k} size={30} filled={k < Math.round(GOOGLE_RATING.value - 0.01)} half={k === 4 && GOOGLE_RATING.value % 1 >= 0.5} />)}
              </span>
              <p className="mt-2 flex items-center gap-2 text-sm text-creme/80"><IconGoogle size={16} />{t.reviews.via} · {fill(t.reviews.checked, { date: new Intl.DateTimeFormat(LOCALE[lang], { day: "numeric", month: "long", year: "numeric" }).format(new Date(GOOGLE_RATING.checked)) })}</p>
            </div>
          </div>
          <p className="lead mt-6 max-w-[42rem] text-creme/85">{fill(t.reviews.lead, { rating: GOOGLE_RATING.value.toLocaleString(LOCALE[lang]) })}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a className="pill pill-cream" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener"><IconGoogle size={18} />{t.reviews.read}<IconExternal size={16} /><span className="sr-only">{t.a11y.newTab}</span></a>
            <a className="pill pill-ghost text-creme" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener">{t.reviews.write}<span className="sr-only">{t.a11y.newTab}</span></a>
          </div>
          {REVIEWS.length > 0 ? <Carousel /> : <p className="mt-10 max-w-[46rem] rounded-[20px] bg-carvao/30 p-5 text-sm text-creme/70 ring-1 ring-creme/10">{t.reviews.none}</p>}
        </div>
      </div>
    </section>
  );
}
