import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { HTML_LANG, UI, fill, type Lang } from "@/i18n";
import { LABELS, REVIEWS, REVIEWS_URL, type Review } from "@/reviews";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";
import { Heading, Reveal } from "./Reveal";
import { ArrowLeft, ArrowRight, ExternalIcon } from "./icons";

const LOCALE: Record<Lang, string> = { de: "de-CH", fr: "fr-CH", it: "it-CH", en: "en-GB" };
const AS_OF = new Date(2026, 9, 1); // when the reviews were transcribed

function Stars({ n, size = 16, className }: { n: number; size?: number; className?: string }) {
  return (
    <span aria-hidden="true" className={cn("inline-flex gap-0.5", className)}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" className={i < n ? "text-beak" : "text-ink/15"}>
          <path fill="currentColor" d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z" />
        </svg>
      ))}
    </span>
  );
}

const TONES = ["bg-oven", "bg-ember", "bg-sky-ink", "bg-brand-ink", "bg-ink-2", "bg-[#5b6b3a]"];
const initials = (name: string) =>
  name
    .replace(/[„“"]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

/**
 * The six Google reviews of Pizzeria Choucas, word for word in the reviewer's language. On a wide screen a
 * summary sits beside two columns of cards; on a phone the cards swipe sideways. Long reviews fold open.
 */
export function Reviews({ id = "bewertungen", tone = "light" }: { id?: string; tone?: "light" | "cream" }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const track = useRef<HTMLUListElement>(null);
  const avg = REVIEWS.reduce((n, r) => n + r.rating, 0) / REVIEWS.length;
  const locale = LOCALE[lang];
  const step = (d: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: d * ((card?.clientWidth ?? 300) + 16), behavior: reduce ? "auto" : "smooth" });
  };
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("on-light overflow-x-clip py-20 md:py-28", tone === "cream" ? "bg-snow-2" : "bg-snow")}>
      <div className="gutter">
        <div className="wrap grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div className="lg:sticky lg:top-[calc(var(--label-h)+var(--header-compact)+32px)] lg:self-start">
            <Heading id={`${id}-title`} eyebrow={UI.reviewsEyebrow[lang]} title={UI.reviewsTitle[lang]} dot="bg-beak" />
            <Reveal delay={0.08} className="mt-8 flex items-center gap-4">
              <span className="font-display text-6xl font-semibold leading-none tracking-tight tabular-nums">{avg.toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</span>
              <span className="grid gap-1.5">
                <Stars n={Math.round(avg)} size={20} />
                <span className="sr-only">{fill(UI.stars[lang], { n: avg.toLocaleString(locale) })}</span>
                <span className="text-[15px] text-muted">{fill(UI.reviewsCount[lang], { n: REVIEWS.length })}</span>
              </span>
            </Reveal>
            <Reveal delay={0.12}>
              <a href={REVIEWS_URL} target="_blank" rel="noopener" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/20 px-5 font-semibold hover:border-ink">
                <GoogleG />
                {UI.onGoogle[lang]}
                <ExternalIcon />
                <span className="sr-only"> ({UI.newTab[lang]})</span>
              </a>
              <p className="mt-3 text-sm text-muted">{fill(UI.reviewsAsOf[lang], { d: AS_OF.toLocaleDateString(locale, { month: "long", year: "numeric" }) })}</p>
            </Reveal>
          </div>

          <div className="min-w-0">
            {/* phone: one swipeable row; from md: two columns */}
            <ul ref={track} className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:block md:columns-2 md:gap-5 md:overflow-visible md:px-0">
              {REVIEWS.map((r, i) => (
                <Reveal as="li" key={r.name} delay={Math.min(i * 0.06, 0.36)} className="relative w-[86%] shrink-0 snap-start md:mb-5 md:w-auto md:break-inside-avoid">
                  <ReviewCard review={r} index={i} />
                </Reveal>
              ))}
            </ul>
            <div className="mt-4 flex gap-2 md:hidden">
              <button type="button" onClick={() => step(-1)} aria-label={UI.prevReview[lang]} className="grid size-12 place-items-center rounded-full border border-ink/25 hover:border-ink">
                <ArrowLeft />
              </button>
              <button type="button" onClick={() => step(1)} aria-label={UI.nextReview[lang]} className="grid size-12 place-items-center rounded-full border border-ink/25 hover:border-ink">
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review: r, index }: { review: Review; index: number }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const locale = LOCALE[lang];
  const long = r.text.length > 1 && r.text.join(" ").length > 300;
  const [open, setOpen] = useState(false);
  const posted = new Intl.RelativeTimeFormat(locale, { numeric: "always" }).format(-r.posted.n, r.posted.unit);
  const meta = [posted, r.dineIn ? LABELS.dineIn[lang] : null, r.meal ? LABELS[r.meal][lang] : null, r.price].filter(Boolean).join(" · ");
  const shown = long && !open ? r.text.slice(0, 1) : r.text;
  let originalIn: string | null = null;
  if (r.lang !== lang) {
    try {
      originalIn = fill(UI.originalIn[lang], { l: new Intl.DisplayNames([locale], { type: "language" }).of(r.lang) ?? r.lang });
    } catch {
      originalIn = null;
    }
  }
  return (
    <article className="h-full rounded-[22px] bg-white p-6 ring-1 ring-line transition-shadow hover:shadow-[0_24px_50px_-34px_rgba(28,24,20,0.55)]">
      <header className="flex items-center gap-3">
        <span aria-hidden="true" className={cn("grid size-11 shrink-0 place-items-center rounded-full font-display text-[15px] font-semibold text-snow", TONES[index % TONES.length])}>
          {initials(r.name)}
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-semibold">{r.name}</h3>
          <p className="text-[13px] text-muted">{meta}</p>
        </div>
      </header>
      <p className="mt-4 flex items-center gap-2">
        <Stars n={r.rating} />
        <span className="sr-only">{fill(UI.stars[lang], { n: r.rating })}</span>
      </p>
      <div lang={HTML_LANG[r.lang]} className="mt-3 grid gap-3 text-[16px] leading-relaxed text-ink/85">
        <AnimatePresence initial={false}>
          {shown.map((p, i) => (
            <motion.p
              key={i}
              initial={reduce || i === 0 ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {p}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>
      {long && (
        <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="mt-2 inline-flex min-h-11 items-center font-semibold underline decoration-beak decoration-2 underline-offset-[6px] hover:decoration-ink">
          {open ? UI.readLess[lang] : UI.readMore[lang]}
        </button>
      )}
      {r.scores && (
        <dl className="mt-4 flex flex-wrap gap-2 text-[13px]">
          {(["food", "service", "atmosphere"] as const).map((k) => (
            <div key={k} className="inline-flex items-center gap-1.5 rounded-full bg-snow-2 px-3 py-1">
              <dt>{LABELS[k][lang]}</dt>
              <dd className="font-semibold tabular-nums">{r.scores![k]}/5</dd>
            </div>
          ))}
        </dl>
      )}
      {r.extras && (
        <dl className="mt-4 grid gap-2 border-t border-line pt-4 text-[14px]">
          {r.extras.map((x) => (
            <div key={x.label}>
              <dt className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">{LABELS[x.label][lang]}</dt>
              {"own" in x.value ? (
                <dd lang={HTML_LANG[r.lang]}>{x.value.own}</dd>
              ) : (
                <dd>{x.value[lang]}</dd>
              )}
            </div>
          ))}
        </dl>
      )}
      {originalIn && <p className="mt-4 text-[12px] text-muted">{originalIn}</p>}
    </article>
  );
}

function GoogleG() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}
