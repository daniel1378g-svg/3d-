"use client";

import { useEffect, useRef, useState } from "react";
import { useContent, useLang } from "@/content/i18n";
import { Chevron } from "./Icons";

// Five Google reviews supplied by A Merendeira, as text in cards of this identity (not a copy of
// Google's interface). Each shows its own five-star rating; no overall score, count or date is
// implied. Portuguese: our translation, labelled as such, with the original one click away.
// Desktop: all five in an asymmetric grid. Phones: a manual carousel (swipe, arrows, position),
// never rotating by itself; every card can be reached with the keyboard.
export function Reviews() {
  const { reviews, ui } = useContent();
  const { lang } = useLang();
  const scroller = useRef<HTMLOListElement>(null);
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => setOpen(null), [lang]);

  // Position indicator of the phone carousel: the card closest to the centre of the strip.
  useEffect(() => {
    const el = scroller.current!;
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let d = Infinity;
      [...el.children].forEach((c, i) => {
        const card = c as HTMLElement;
        const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - mid);
        if (dist < d) {
          d = dist;
          best = i;
        }
      });
      setCurrent(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const goTo = (i: number) => {
    const el = scroller.current!;
    const card = el.children[Math.max(0, Math.min(reviews.length - 1, i))] as HTMLElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section id="avaliacoes" className="reviews" aria-labelledby="reviews-title">
      <div className="wrap">
        <header className="reviews__head">
          <p className="kicker">{ui.reviewsEyebrow}</p>
          <h2 id="reviews-title" className="h-xl" data-lines>
            {ui.reviewsTitle.map((l) => (
              <span key={l} className="line">
                <span>{l}</span>
              </span>
            ))}
          </h2>
        </header>

        <ol className="reviews__list" ref={scroller} aria-label={ui.reviewsLabel}>
          {reviews.map((r, i) => (
            <li
              key={r.author}
              className={`review review--${i + 1}`}
              tabIndex={0}
              aria-label={`${ui.reviewPosition} ${i + 1} ${ui.of} ${reviews.length}: ${r.author}`}
              data-reveal
              style={{ ["--d" as string]: `${(i % 3) * 90}ms` }}
            >
              <figure>
                <p className="review__stars">
                  <Stars />
                  <span className="sr-only">{ui.reviewStars}</span>
                </p>
                <blockquote className="review__quote" lang={r.original ? "pt-PT" : "en"}>
                  <p>“{r.quote}”</p>
                </blockquote>
                {r.original && (
                  <>
                    <p className="review__translated">{ui.reviewTranslated}</p>
                    <button
                      type="button"
                      className="review__toggle"
                      aria-expanded={open === i}
                      aria-controls={`review-original-${i}`}
                      onClick={() => setOpen(open === i ? null : i)}
                    >
                      {open === i ? ui.reviewHideOriginal : ui.reviewShowOriginal}
                    </button>
                    <blockquote id={`review-original-${i}`} className="review__original" lang="en" hidden={open !== i}>
                      <p>“{r.original}”</p>
                    </blockquote>
                  </>
                )}
                <figcaption className="review__meta">
                  <span className="review__author">{r.author}</span>
                  <span className="review__source">{ui.reviewSource}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ol>

        <div className="reviews__nav">
          <p className="reviews__count" aria-live="polite">
            <span className="sr-only">{ui.reviewPosition} </span>
            {current + 1} <span aria-hidden="true">/</span>
            <span className="sr-only"> {ui.of} </span> {reviews.length}
          </p>
          <button type="button" className="round-btn" onClick={() => goTo(current - 1)} disabled={current === 0} aria-label={ui.reviewsPrev}>
            <Chevron dir="left" />
          </button>
          <button type="button" className="round-btn" onClick={() => goTo(current + 1)} disabled={current === reviews.length - 1} aria-label={ui.reviewsNext}>
            <Chevron />
          </button>
        </div>
      </div>
    </section>
  );
}

function Stars() {
  return (
    <svg className="stars" viewBox="0 0 92 16" aria-hidden="true" focusable="false">
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          transform={`translate(${i * 19} 0)`}
          d="M8 .9l2.1 4.6 5 .5-3.8 3.4 1.1 4.9L8 11.8l-4.4 2.5 1.1-4.9L.9 6l5-.5z"
          fill="currentColor"
        />
      ))}
    </svg>
  );
}
