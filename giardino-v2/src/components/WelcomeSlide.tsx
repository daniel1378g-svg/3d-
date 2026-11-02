// The welcome wipe. On every language change an opaque olive panel slides in from the right (.4 s), the language
// changes only once the old page is fully covered, the Giardino medallion springs into the centre, WELCOME rises
// letter by letter in the new language with "to Pizzeria Giardino" under it, holds for a moment, and the whole panel
// slides off to the left (.45 s). Clicking it or pressing Escape completes the switch at once.
// The first-visit intro starts on the same olive ground: the medallion springs in, PIZZERIA GIARDINO rises with the
// localized greeting, then the medallion flies into the header's logo while the hero appears through an opening arch.
import { stagger, useAnimate, useReducedMotion, animate as animateValue } from "motion/react";
import { useEffect, useRef } from "react";
import { HTML_LANG, UI, WELCOME, type Lang } from "@/i18n";
import { TX } from "@/content/copy";
import { asset } from "@/lib/utils";

const IN_OUT = [0.76, 0, 0.24, 1] as const;
const OUT = [0.16, 1, 0.3, 1] as const;

type Props = { lang: Lang; onCovered: () => void; onDone: () => void; intro?: boolean };

/** An arch-shaped hole (even-odd polygon) the size of `r`, scaled by t about its centre. */
function archHole(r: DOMRect, t: number) {
  const W = window.innerWidth;
  const H = window.innerHeight;
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  const w = r.width * t;
  const h = r.height * t;
  const x = cx - w / 2;
  const y = cy - h / 2;
  const rx = w / 2;
  const ry = Math.min(h, rx);
  const pts: string[] = [`${x}px ${y + h}px`, `${x}px ${y + ry}px`];
  for (let i = 1; i < 28; i++) {
    const a = Math.PI - (i / 28) * Math.PI;
    pts.push(`${cx + Math.cos(a) * rx}px ${y + ry - Math.sin(a) * ry}px`);
  }
  pts.push(`${x + w}px ${y + ry}px`, `${x + w}px ${y + h}px`);
  return `polygon(evenodd, 0 0, ${W}px 0, ${W}px ${H}px, 0 ${H}px, 0 0, ${pts.join(", ")}, ${x}px ${y + h}px)`;
}

export function WelcomeSlide({ lang, onCovered, onDone, intro = false }: Props) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const reduce = useReducedMotion();
  const covered = useRef(false);
  const finished = useRef(false);
  const { word, line } = WELCOME[lang];
  const title = intro ? "PIZZERIA GIARDINO" : word.toUpperCase();

  const cover = () => {
    if (!covered.current) {
      covered.current = true;
      onCovered();
    }
  };
  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    cover();
    onDone();
  };

  useEffect(() => {
    let alive = true;
    const wait = (s: number) => new Promise((r) => setTimeout(r, s * 1000));
    const run = async () => {
      const el = scope.current;
      if (!el) return;
      if (reduce) {
        // reduced motion: a short fade, no travel, no stagger
        await animate(el, { opacity: [0, 1] }, { duration: 0.18 });
        cover();
        await animate(el, { opacity: 0 }, { duration: 0.22, delay: 0.35 });
      } else if (intro) {
        cover();
        await Promise.all([
          animate(".ws-logo", { x: ["-40vw", "0vw"], rotate: [-8, 0], opacity: [0, 1] }, { type: "spring", bounce: 0.25, duration: 0.7 }),
          animate(".ws-letter", { y: ["110%", "0%"] }, { duration: 0.5, ease: OUT, delay: stagger(0.035, { startDelay: 0.25 }) }),
          animate(".ws-word", { opacity: [0, 1], y: [10, 0] }, { duration: 0.5, delay: 0.2 }),
          animate(".ws-line", { opacity: [0, 0.92], y: [10, 0] }, { duration: 0.7, ease: OUT, delay: 0.8 }),
        ]);
        await wait(0.35);
        if (!alive) return;
        const chip = document.querySelector<HTMLElement>("[data-logo-chip]");
        const arch = document.querySelector<HTMLElement>("[data-hero-arch]");
        const badge = el.querySelector<HTMLElement>(".ws-logo")!;
        const steps: unknown[] = [animate(".ws-text", { opacity: 0, y: -16 }, { duration: 0.35, ease: OUT }), animate(".ws-skip", { opacity: 0 }, { duration: 0.2 })];
        const chipRect = chip?.getBoundingClientRect();
        if (chip && chipRect && chipRect.width > 0) {
          const from = badge.getBoundingClientRect();
          const s = chipRect.width / from.width;
          steps.push(
            animate(badge, { x: chipRect.left + chipRect.width / 2 - (from.left + from.width / 2), y: chipRect.top + chipRect.height / 2 - (from.top + from.height / 2), scale: s }, { duration: 0.85, ease: IN_OUT }),
            animate(".ws-full", { opacity: 0 }, { duration: 0.35, delay: 0.2 }),
            animate(".ws-mark", { opacity: 1 }, { duration: 0.35, delay: 0.2 }),
          );
        } else steps.push(animate(badge, { opacity: 0, scale: 0.6 }, { duration: 0.5 }));
        const rect = arch?.getBoundingClientRect();
        if (rect && rect.width > 40 && rect.top < window.innerHeight) {
          steps.push(
            animateValue(0, 1, {
              duration: 0.95,
              ease: IN_OUT,
              delay: 0.15,
              onUpdate: (t) => {
                el.style.clipPath = archHole(rect, Math.max(0.002, t));
              },
            }),
          );
          await Promise.all(steps as Promise<unknown>[]);
          await animate(el, { opacity: 0 }, { duration: 0.25 });
        } else {
          await Promise.all(steps as Promise<unknown>[]);
          await animate(el, { x: "-100%" }, { duration: 0.5, ease: IN_OUT });
        }
      } else {
        await animate(el, { x: ["100%", "0%"] }, { duration: 0.4, ease: IN_OUT });
        cover();
        await Promise.all([
          animate(".ws-logo", { x: ["-35vw", "0vw"], rotate: [-6, 0], opacity: [0, 1] }, { type: "spring", bounce: 0.25, duration: 0.6 }),
          animate(".ws-letter", { y: ["110%", "0%"] }, { duration: 0.35, ease: OUT, delay: stagger(0.03, { startDelay: 0.12 }) }),
          animate(".ws-line", { opacity: [0, 0.92], y: [12, 0] }, { duration: 0.4, ease: OUT, delay: 0.3 }),
        ]);
        await animate(el, { x: "-100%" }, { duration: 0.45, ease: IN_OUT, delay: 0.25 });
      }
      if (alive) finish();
    };
    run();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      alive = false;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={scope}
      role="status"
      aria-live="polite"
      onClick={finish}
      data-welcome={intro ? "intro" : "switch"}
      className="tex-leaf fixed inset-0 z-[900] grid cursor-pointer place-items-center bg-olive text-white"
      style={reduce ? { opacity: 0 } : intro ? undefined : { transform: "translateX(100%)" }}
    >
      <span className="sr-only" lang={HTML_LANG[lang]}>
        {intro ? `Pizzeria Giardino · ${word}` : `${word} ${line}`}
      </span>
      <div aria-hidden="true" className="flex flex-col items-center gap-6 px-6 text-center">
        <div className="ws-logo relative grid h-[min(56vw,260px)] w-[min(56vw,260px)] place-items-center rounded-full bg-green shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]" style={{ opacity: 0 }}>
          <img className="ws-full h-auto w-[76%]" src={asset("brand/logo-light.webp")} alt="" width={600} height={306} />
          <img className="ws-mark absolute h-[74%] w-[74%] object-contain opacity-0" src={asset("brand/tree-light.webp")} alt="" width={220} height={220} />
        </div>
        <div className="ws-text flex flex-col items-center gap-3">
          {intro && (
            <p lang={HTML_LANG[lang]} className="ws-word font-hand text-[34px] font-bold leading-none text-gold opacity-0 md:text-[44px]">
              {word}
            </p>
          )}
          <p lang={HTML_LANG[lang]} className="flex max-w-[94vw] flex-wrap justify-center overflow-hidden font-display text-[clamp(48px,10vw,132px)] font-extrabold uppercase leading-[0.95]">
            {[...title].map((ch, i) => (
              <span key={i} className="ws-letter inline-block" style={{ transform: "translateY(110%)" }}>
                {ch === " " ? "\u00a0" : ch}
              </span>
            ))}
          </p>
          <p lang={HTML_LANG[lang]} className={`ws-line max-w-[92vw] font-display font-semibold uppercase opacity-0 ${intro ? "text-[14px] tracking-[0.22em] md:text-lg" : "text-lg tracking-[0.06em] md:text-2xl"}`}>
            {intro ? TX.introTag[lang] : line}
          </p>
        </div>
      </div>
      {intro && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            finish();
          }}
          className="ws-skip btn btn--cream btn--sm absolute right-6"
          style={{ bottom: "max(24px, env(safe-area-inset-bottom))" }}
        >
          <span className="btn-roll">
            <span>{UI.skipIntro[lang]}</span>
            <span aria-hidden="true">{UI.skipIntro[lang]}</span>
          </span>
        </button>
      )}
    </div>
  );
}
