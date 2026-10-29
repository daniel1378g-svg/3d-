// Section 13: the three reviews of the live home page as paper cards pinned to the wall (★★★★★, the quote, the
// name). The quotes stay in French, as the guests wrote them; outside French a tap flips a card to its
// translation, marked as such. Cards tilt slightly toward the pointer. Reduced motion: flat cards with the
// translation shown below. No other reviews, ratings, averages or counts.
import { useRef, useState } from "react";
import { UI, type Lang } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, REVIEWS, TEXT, type Review } from "@/content/site";
import { useReduced } from "@/lib/useMedia";
import { cn } from "@/lib/utils";
import { SplitReveal } from "../Reveal";
import { LottieIcon } from "../lottie/LottieIcon";
import { IconExternal } from "../icons";

const TONES = ["bg-branco", "bg-[#fff4e0]", "bg-[#fdeceb]"];
const ROT = [-2.5, 1.8, -1.2];

function Card({ r, i, lang }: { r: Review; i: number; lang: Lang }) {
  const reduce = useReduced();
  const el = useRef<HTMLDivElement>(null);
  const [flip, setFlip] = useState(false);
  const translated = lang !== "fr" ? r.translation[lang] : null;
  const tilt = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !el.current) return;
    const b = el.current.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width - 0.5;
    const y = (e.clientY - b.top) / b.height - 0.5;
    el.current.style.setProperty("--rx", `${-y * 10}deg`);
    el.current.style.setProperty("--ry", `${x * 12}deg`);
  };
  const reset = () => {
    el.current?.style.setProperty("--rx", "0deg");
    el.current?.style.setProperty("--ry", "0deg");
  };
  const face = (back: boolean) => (
    <div className={cn("absolute inset-0 flex flex-col justify-between rounded-[18px] p-7 text-tinta shadow-[0_30px_60px_-30px_rgba(49,11,10,0.55)] [backface-visibility:hidden]", TONES[i], back && "[transform:rotateY(180deg)]")}>
      <div>
        <p className="flex items-center justify-between">
          <span aria-label={UI.stars5[lang]} className="text-[22px] tracking-[0.1em] text-marca">
            ★★★★★
          </span>
          <span className="eyebrow text-linha">{back ? UI.translation[lang] : UI.original[lang]}</span>
        </p>
        <blockquote lang={back ? undefined : "fr"} className="mt-5 font-display text-[clamp(26px,2.2vw,34px)] font-bold uppercase leading-[1.02]">
          “{back ? translated : r.quote}”
        </blockquote>
      </div>
      <p className="font-hand text-[30px] leading-none text-acento-escuro">{r.name}</p>
    </div>
  );
  return (
    <li className="relative" style={{ transform: `rotate(${ROT[i]}deg)` }}>
      {/* the pin */}
      <span aria-hidden="true" className="absolute left-1/2 top-0 z-20 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-marca shadow-[0_4px_8px_rgba(0,0,0,0.35),inset_-3px_-3px_0_rgba(0,0,0,0.2)]" />
      {reduce ? (
        <figure className={cn("rounded-[18px] p-7 text-tinta shadow-[0_20px_40px_-26px_rgba(49,11,10,0.5)]", TONES[i])}>
          <p aria-label={UI.stars5[lang]} className="text-[22px] tracking-[0.1em] text-marca">
            ★★★★★
          </p>
          <blockquote lang="fr" className="mt-4 font-display text-[clamp(24px,2vw,32px)] font-bold uppercase leading-[1.04]">
            “{r.quote}”
          </blockquote>
          {translated && (
            <p className="mt-3 text-[16px]">
              <span className="eyebrow text-linha">{UI.translation[lang]} · </span>
              {translated}
            </p>
          )}
          <figcaption className="mt-5 font-hand text-[30px] leading-none text-acento-escuro">{r.name}</figcaption>
        </figure>
      ) : (
        <div ref={el} onPointerMove={tilt} onPointerLeave={reset} className="[perspective:1000px]" style={{ "--rx": "0deg", "--ry": "0deg" } as React.CSSProperties}>
          <button
            type="button"
            disabled={!translated}
            aria-pressed={translated ? flip : undefined}
            aria-label={translated ? `${flip ? UI.showOriginal[lang] : UI.showTranslation[lang]} · ${r.name}` : undefined}
            onClick={() => translated && setFlip((f) => !f)}
            className="relative block min-h-[320px] w-full text-left transition-transform duration-700 ease-[var(--ease-out)] [transform-style:preserve-3d] disabled:cursor-default"
            style={{ transform: `rotateX(var(--rx)) rotateY(calc(var(--ry) + ${flip ? 180 : 0}deg))` }}
          >
            {face(false)}
            {translated && face(true)}
          </button>
        </div>
      )}
    </li>
  );
}

export function Avis() {
  const { lang } = useSite();
  return (
    <section id="avis" className="tex-azulejo relative overflow-hidden bg-fundo py-24 text-tinta md:py-36" aria-labelledby="avis-title">
      <div className="container-x">
        <p className="eyebrow text-linha">13 / 15 · Google</p>
        <SplitReveal as="h2" id="avis-title" text={[UI.avis[lang]]} className="mt-4 fs-mega font-extrabold text-marca" />
        {lang !== "fr" && <p className="mt-4 text-[15px] text-linha">{UI.flipHint[lang]}</p>}
        <ul className="mt-14 grid list-none gap-10 md:grid-cols-3 md:gap-6">
          {REVIEWS.map((r, i) => (
            <Card key={r.name} r={r} i={i} lang={lang} />
          ))}
        </ul>
        <div className="mt-14 flex flex-wrap items-center gap-3">
          <a href={BUSINESS.googleReview} target="_blank" rel="noopener noreferrer" className="btn btn--marca group">
            <LottieIcon name="star" size={24} color="#FFFBE8" accent="#FFCB8E" />
            <span className="btn-roll">
              <span>{TEXT.reviewCta[lang]}</span>
              <span aria-hidden="true">{TEXT.reviewCta[lang]}</span>
            </span>
            <span className="sr-only">{UI.externalNew[lang]}</span>
          </a>
          {[
            { label: "Foursquare", url: BUSINESS.foursquare },
            { label: "Yelp", url: BUSINESS.yelp },
          ].map((k) => (
            <a key={k.label} href={k.url} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--sm text-marca">
              <span className="btn-roll">
                <span>{k.label}</span>
                <span aria-hidden="true">{k.label}</span>
              </span>
              <IconExternal size={15} />
              <span className="sr-only">{UI.externalNew[lang]}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
