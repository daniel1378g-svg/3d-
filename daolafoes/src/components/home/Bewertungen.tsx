// Section 9: the five Google reviews as paper cards that tilt with the pointer and flip to the translation.
// Verbatim, in order, the original language marked; no average, no count.
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { HTML_LANG, UI } from "@/i18n";
import { useSite } from "@/site";
import { TX } from "@/content/site";
import { REVIEWS, translated, type Review } from "@/content/reviews";
import { cn } from "@/lib/utils";
import { FadeIn, SplitReveal } from "../Reveal";
import { IconStar } from "../icons";

function Stars({ n }: { n: number }) {
  const { lang } = useSite();
  return (
    <span className="flex gap-0.5 text-destaque" role="img" aria-label={`${n} ${UI.stars[lang]}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <IconStar key={i} size={16} fill={i < n ? "currentColor" : "rgba(81,53,40,0.18)"} />
      ))}
    </span>
  );
}

function Card({ r, index }: { r: Review; index: number }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const el = useRef<HTMLDivElement>(null);
  const tr = translated(r, lang);
  const canFlip = !!tr && !!r.text;
  const showTr = flipped && tr;
  const text = showTr ? tr.text : r.text;
  const when = showTr ? tr.when : r.when;
  const meta = showTr ? tr.meta : r.meta;
  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType === "touch" || !el.current) return;
    const b = el.current.getBoundingClientRect();
    setTilt({ x: ((e.clientY - b.top) / b.height - 0.5) * -8, y: ((e.clientX - b.left) / b.width - 0.5) * 8 });
  };
  return (
    <FadeIn as="li" delay={index * 0.06} className="[perspective:1200px]">
      <motion.div
        ref={el}
        onPointerMove={onMove}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        animate={{ rotateX: tilt.x, rotateY: tilt.y + (showTr ? 180 : 0) }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="relative h-full [transform-style:preserve-3d]"
      >
        <article lang={showTr ? HTML_LANG[lang] : "en"} className={cn("paper relative flex h-full flex-col p-6 [backface-visibility:hidden]", showTr && "[transform:rotateY(180deg)]")}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-[20px] font-semibold leading-tight">{r.author}</p>
              <p className="text-[13px] text-linha">{when}</p>
            </div>
            <Stars n={r.stars} />
          </div>
          {text ? <p className="mt-4 flex-1 text-[15.5px] leading-relaxed">{text}</p> : <p className="mt-4 flex-1 text-[14px] italic text-linha">—</p>}
          {meta && (
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 text-[13px]">
              {Object.entries(meta).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-2 border-b border-marca/10 pb-1">
                  <dt className="text-linha">{k}</dt>
                  <dd className="text-right">{v}</dd>
                </div>
              ))}
            </dl>
          )}
          <div className="mt-5 flex items-center justify-between gap-3 text-[12px] uppercase tracking-[0.14em] text-linha">
            <span>
              {TX.n_reviewsSource[lang]} · {showTr ? `${UI.translation[lang]}` : `${UI.original[lang]} (EN)`}
            </span>
            {canFlip && (
              <button type="button" onClick={() => setFlipped((f) => !f)} aria-pressed={flipped} className="link font-semibold text-acento">
                {showTr ? TX.n_reviewsFlipBack[lang] : TX.n_reviewsFlip[lang]}
              </button>
            )}
          </div>
        </article>
      </motion.div>
    </FadeIn>
  );
}

export function Bewertungen({ full = false }: { full?: boolean }) {
  const { lang } = useSite();
  return (
    <section id="bewertungen" className="tex-paper relative overflow-hidden bg-suave py-20 text-marca md:py-28" aria-labelledby="rev-title">
      <div className="container-x">
        <p className="eyebrow text-acento">{TX.n_reviewsEyebrow[lang]}</p>
        <SplitReveal as={full ? "h1" : "h2"} id="rev-title" text={TX.n_reviewsTitle[lang]} className="mt-4 fs-xl font-semibold" />
        <FadeIn as="p" className="mt-5 max-w-[640px] text-[15px] leading-relaxed text-linha">
          {TX.n_reviewsLine[lang]}
        </FadeIn>
        <ul className="mt-10 grid list-none gap-5 md:grid-cols-2 xl:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Card key={r.id} r={r} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
