// The welcome slide: every language change slides an azulejo panel over the whole screen, the logo slides
// in with "welcome" in the new language, the language switches while the screen is covered, and the panel
// slides away to the left. Click, tap or Esc skips straight to the reveal. Reduced motion: a short fade.
//
// The first-visit intro starts the same way (bird hops in, PICA PAU rises letter by letter, the tagline
// fades in), then ends HOY!'s way: the logo shrinks and flies into the header chip while the panel lifts and
// the hero's arch opens from a point. Once per session, with a "Passer l'intro" pill.
import { stagger, useAnimate, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { HTML_LANG, WELCOME, type Lang } from "@/i18n";
import { copy } from "@/copy";
import { LOGO } from "@/content/photos";

const EASE = [0.76, 0, 0.24, 1] as const;

type Props = {
  lang: Lang;
  onCovered: () => void;
  onDone: () => void;
  /** First-visit intro instead of a language change. */
  intro?: boolean;
};

export function WelcomeSlide({ lang, onCovered, onDone, intro = false }: Props) {
  const [scope, animate] = useAnimate();
  const reduce = useReducedMotion();
  const covered = useRef(false);
  const finished = useRef(false);
  const t = copy(lang);
  const { word, line } = WELCOME[lang];
  const big = intro ? "PICA PAU" : word;
  const small = intro ? t.tagline : line;

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
    const run = async () => {
      const panel = scope.current as HTMLElement;
      if (reduce) {
        await animate(panel, { opacity: [0, 1] }, { duration: 0.2 });
        cover();
        await animate(panel, { opacity: 0 }, { duration: 0.25, delay: 0.3 });
      } else if (intro) {
        // the panel is already on screen at first paint
        await Promise.all([
          animate(".ws-logo", { y: [-60, 0, -18, 0], opacity: [0, 1, 1, 1] }, { duration: 0.9, ease: "easeOut" }),
          animate(".ws-letter", { y: ["110%", "0%"] }, { duration: 0.5, delay: stagger(0.05, { startDelay: 0.45 }), ease: [0.16, 1, 0.3, 1] }),
          animate(".ws-line", { opacity: [0, 0.9], letterSpacing: ["0.5em", "0.32em"] }, { duration: 0.8, delay: 1.0 }),
        ]);
        if (!alive) return;
        await new Promise((r) => setTimeout(r, 450));
        if (!alive) return;
        cover();
        // fly the logo into the header chip, then lift the panel off the hero
        const target = document.querySelector<HTMLElement>("[data-header-logo] img");
        const logo = panel.querySelector<HTMLElement>(".ws-logo");
        const fly: Promise<unknown>[] = [];
        if (target && logo) {
          const a = logo.getBoundingClientRect();
          const b = target.getBoundingClientRect();
          fly.push(
            Promise.resolve(animate(
              logo,
              { x: b.left + b.width / 2 - (a.left + a.width / 2), y: b.top + b.height / 2 - (a.top + a.height / 2), scale: b.width / a.width },
              { duration: 0.75, ease: EASE },
            )),
          );
        }
        fly.push(Promise.resolve(animate(".ws-text", { opacity: 0, y: -20 }, { duration: 0.35 })));
        fly.push(Promise.resolve(animate(".ws-skip", { opacity: 0 }, { duration: 0.2 })));
        fly.push(Promise.resolve(animate(panel, { backgroundColor: ["rgba(31,78,153,1)", "rgba(31,78,153,0)"] }, { duration: 0.5, delay: 0.3 })));
        await Promise.all(fly);
      } else {
        await animate(panel, { x: ["100%", "0%"] }, { duration: 0.4, ease: EASE });
        cover();
        await Promise.all([
          animate(".ws-logo", { x: ["-35vw", "0vw"], rotate: [-6, 0], opacity: [0, 1] }, { type: "spring", bounce: 0.25, duration: 0.6 }),
          animate(".ws-letter", { y: ["110%", "0%"] }, { duration: 0.35, delay: stagger(0.03, { startDelay: 0.12 }) }),
          animate(".ws-line", { opacity: [0, 0.85], y: [12, 0] }, { duration: 0.4, delay: 0.3 }),
        ]);
        await animate(panel, { x: "-100%" }, { duration: 0.45, ease: EASE, delay: 0.25 });
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
      className="fixed inset-0 z-[650] grid cursor-pointer place-items-center bg-[var(--panel)] text-[var(--panel-ink)]"
      style={reduce ? { opacity: 0 } : intro ? undefined : { transform: "translateX(100%)" }}
    >
      <span className="sr-only" lang={HTML_LANG[lang]}>{intro ? `Pica Pau – ${t.tagline}` : `${word} ${line}`}</span>
      <div aria-hidden="true" className="flex flex-col items-center gap-5 px-6 text-center">
        <img className="ws-logo w-[min(46vw,300px)] will-change-transform" src={LOGO.src(480)} alt="" width="300" height="298" style={intro ? { opacity: 0 } : undefined} />
        <div className="ws-text flex flex-col items-center gap-4">
          <p lang={HTML_LANG[lang]} className="overflow-hidden pt-[0.1em] font-display text-[clamp(56px,11vw,150px)] font-bold uppercase leading-[0.9]">
            {[...big].map((ch, i) => (
              <span key={i} className="ws-letter inline-block" style={{ transform: "translateY(110%)" }}>
                {ch === " " ? " " : ch}
              </span>
            ))}
          </p>
          <p lang={HTML_LANG[lang]} className={intro ? "ws-line font-display text-[clamp(14px,1.4vw,19px)] font-medium uppercase tracking-[0.32em] text-azulejo-claro opacity-0" : "ws-line text-lg opacity-0 md:text-2xl"}>
            {small}
          </p>
        </div>
      </div>
      {intro && (
        <button
          type="button"
          className="ws-skip absolute bottom-6 right-[var(--gutter)] min-h-11 cursor-pointer rounded-full border-0 bg-branco/15 px-5 font-display text-sm font-semibold uppercase tracking-[0.16em] text-branco shadow-[inset_0_0_0_1.5px_rgba(255,250,242,0.6)]"
          onClick={(e) => {
            e.stopPropagation();
            finish();
          }}
        >
          {t.ui.skipIntro}
        </button>
      )}
    </div>
  );
}
