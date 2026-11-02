// "Words from our guests": Google reviews in their original wording (shown in every language, marked lang="en"),
// with a clearly labelled translation on request in German, French and Italian. Initials instead of profile photos,
// no dates, no overall rating or count. Swipe, previous / next or arrow keys; cards reveal one after another.
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { TX } from "@/content/copy";
import { BUSINESS } from "@/content/business";
import { REVIEWS, initials, type Review } from "@/content/reviews";
import { cn, fmt } from "@/lib/utils";
import { FadeIn, SplitReveal } from "@/components/Reveal";
import { PillLink } from "@/components/ui/Pill";
import { IconArrow, IconArrowLeft, Star } from "@/components/icons";

function ReviewCard({ r, i, n }: { r: Review; i: number; n: number }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const [showT, setShowT] = useState(false);
  const tone = i % 2 === 0 ? "bg-olive text-white" : "bg-cream text-ink";
  const tid = `review-${r.id}-translation`;
  return (
    <FadeIn
      as="li"
      delay={Math.min(i, 3) * 0.08}
      className={cn("flex w-[min(440px,84vw)] shrink-0 snap-start flex-col rounded-[28px] p-7 shadow-[0_30px_60px_-36px_rgba(0,0,0,0.7)] md:p-8", tone)}
    >
      <div role="group" aria-roledescription="slide" aria-label={fmt(UI.reviewOf[lang], { i: i + 1, n })} className="flex h-full flex-col">
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className={cn("grid h-14 w-14 shrink-0 place-items-center rounded-full font-display text-[20px] font-extrabold tracking-[0.04em]", i % 2 === 0 ? "bg-gold text-ink" : "bg-green text-gold")}>
            {r.name ? initials(r.name) : "★"}
          </span>
          <div className="min-w-0">
            {r.name ? <p className="font-display text-[22px] font-extrabold uppercase leading-none">{r.name}</p> : <p className="sr-only">{UI.nameHidden[lang]}</p>}
            <p className={cn("meta mt-1 text-[12px]", i % 2 === 0 ? "text-cream/85" : "text-muted")}>{UI.googleReview[lang]}</p>
          </div>
        </div>
        <p className={cn("mt-5 flex gap-1", i % 2 === 0 ? "text-gold" : "text-olive")}>
          {Array.from({ length: 5 }, (_, k) => (
            <Star key={k} size={20} filled={k < r.rating} />
          ))}
          <span className="sr-only">{fmt(UI.stars[lang], { n: r.rating })}</span>
        </p>
        <blockquote className="mt-4 flex-1">
          <p lang="en" className="text-[clamp(18px,1.35vw,21px)] leading-[1.5]">
            “{r.text}”
          </p>
        </blockquote>
        {lang !== "en" && (
          <div className="mt-5">
            <button type="button" aria-expanded={showT} aria-controls={tid} onClick={() => setShowT((v) => !v)} className={cn("link min-h-11 font-display text-[14px] font-semibold uppercase tracking-[0.12em]", i % 2 === 0 ? "text-gold" : "text-olive")}>
              {showT ? UI.hideTranslation[lang] : UI.showTranslation[lang]}
            </button>
            <AnimatePresence initial={false}>
              {showT && (
                <motion.div id={tid} initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                  <p className={cn("mt-2 text-[12px] font-semibold uppercase tracking-[0.12em]", i % 2 === 0 ? "text-cream/80" : "text-muted")}>{UI.translationLabel[lang]}</p>
                  <p className="mt-1 text-[16px] italic leading-relaxed opacity-90">{r.translation[lang]}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </FadeIn>
  );
}

export function Reviews() {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const step = () => {
    const el = track.current;
    const first = el?.children[0] as HTMLElement | undefined;
    if (!el || !first) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    return first.offsetWidth + gap;
  };
  const go = useCallback(
    (d: number) => {
      const el = track.current;
      const s = step();
      if (!el || !s) return;
      const target = Math.max(0, Math.min(REVIEWS.length - 1, Math.round(el.scrollLeft / s) + d));
      el.scrollTo({ left: target * s, behavior: reduce ? "auto" : "smooth" });
    },
    [reduce],
  );
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const on = () => {
      const s = step();
      if (s) setIndex(Math.max(0, Math.min(REVIEWS.length - 1, Math.round(el.scrollLeft / s))));
    };
    el.addEventListener("scroll", on, { passive: true });
    return () => el.removeEventListener("scroll", on);
  }, []);
  const atEnd = () => {
    const el = track.current;
    return !!el && el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
  };

  return (
    <section id="reviews" data-anchor className="tex-contour relative overflow-hidden bg-green py-24 text-white md:py-36" aria-labelledby="reviews-title">
      <div className="container-x">
        <p className="eyebrow text-gold">Recensioni · Google</p>
        <SplitReveal as="h2" id="reviews-title" text={TX.reviewsTitle[lang]} className="mt-4 fs-xxl font-extrabold" />
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <FadeIn as="p" className="lede max-w-[640px] text-cream/90">
            {TX.reviewsLead[lang]}
          </FadeIn>
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="font-display text-sm font-semibold tracking-[0.2em] text-cream">
              {String(index + 1).padStart(2, "0")} / {String(REVIEWS.length).padStart(2, "0")}
            </span>
            <button type="button" onClick={() => go(-1)} disabled={index === 0} aria-label={UI.prev[lang]} aria-controls="reviews-track" className="grid h-14 w-14 place-items-center rounded-full bg-white/10 transition hover:bg-white/20 disabled:opacity-35">
              <IconArrowLeft size={22} />
            </button>
            <button type="button" onClick={() => go(1)} disabled={index >= REVIEWS.length - 1 && atEnd()} aria-label={UI.next[lang]} aria-controls="reviews-track" className="grid h-14 w-14 place-items-center rounded-full bg-gold text-ink transition disabled:opacity-35">
              <IconArrow size={22} />
            </button>
          </div>
        </div>
      </div>
      <ul
        id="reviews-track"
        ref={track}
        aria-roledescription="carousel"
        aria-label={UI.reviewsCarousel[lang]}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") (go(1), e.preventDefault());
          if (e.key === "ArrowLeft") (go(-1), e.preventDefault());
        }}
        className="no-scrollbar mt-12 flex list-none snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-6 outline-offset-4"
        style={{ scrollPaddingInline: "var(--gutter)" }}
      >
        {REVIEWS.map((r, i) => (
          <ReviewCard key={r.id} r={r} i={i} n={REVIEWS.length} />
        ))}
        <li aria-hidden="true" className="w-[calc(var(--gutter)-20px)] shrink-0" />
      </ul>
      <div className="container-x mt-8 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <p className="max-w-[720px] text-[14px] leading-relaxed text-cream/85">{TX.reviewsNote[lang]}</p>
        <PillLink href={BUSINESS.googleListing} external variant="cream" size="sm">
          {UI.readMoreGoogle[lang]}
        </PillLink>
      </div>
    </section>
  );
}
