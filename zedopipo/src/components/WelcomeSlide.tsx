import { stagger, useAnimate, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { HTML_LANG, UI, WELCOME, type Lang } from "@/i18n";
import { logo } from "@/contact";

const EASE = [0.76, 0, 0.24, 1] as const;

type Props = {
  lang: Lang; // the language being switched to
  onCovered: () => void; // switch language + route here, while the page is hidden
  onDone: () => void; // unmount the overlay
  /** First visit of the session: a faster run of the same slide, under 1.2 s in all. */
  intro?: boolean;
};

// The linen panel that covers the screen while the language changes underneath it: the logo rolls in
// and "welcome" rises letter by letter in the new language.
export function WelcomeSlide({ lang, onCovered, onDone, intro = false }: Props) {
  const [scope, animate] = useAnimate();
  const reduce = useReducedMotion();
  const covered = useRef(false);
  const finished = useRef(false);
  const { word, line } = WELCOME[lang];

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
      if (reduce) {
        // fades only; the first-visit panel is there from the first frame
        if (!intro) await animate(scope.current, { opacity: [0, 1] }, { duration: 0.2 });
        cover();
        await animate(scope.current, { opacity: 0 }, { duration: 0.25, delay: intro ? 0.35 : 0.3 });
      } else if (intro) {
        // First visit, ≈ 1.1 s: the panel is already up when the page first paints; the logo rolls in place,
        // "welcome" rises, then the panel slides away like a curtain.
        cover();
        await Promise.all([
          animate(".ws-logo", { transform: ["rotate(-160deg) scale(0.86)", "rotate(0deg) scale(1)"] }, { type: "spring", bounce: 0.2, duration: 0.5 }),
          animate(".ws-letter", { transform: ["translateY(110%)", "translateY(0%)"] }, { duration: 0.28, delay: stagger(0.022, { startDelay: 0.06 }) }),
          animate(".ws-line", { opacity: [0, 1], transform: ["translateY(10px)", "translateY(0px)"] }, { duration: 0.3, delay: 0.18 }),
        ]);
        await animate(scope.current, { transform: "translateX(-100%)" }, { duration: 0.36, ease: EASE, delay: 0.08 });
      } else {
        // Language switch ≈ 1.7 s.
        await animate(scope.current, { transform: ["translateX(100%)", "translateX(0%)"] }, { duration: 0.4, ease: EASE });
        cover();
        await Promise.all([
          animate(".ws-logo", { transform: ["translateX(-38vw) rotate(-200deg)", "translateX(0vw) rotate(0deg)"], opacity: [0, 1] }, { type: "spring", bounce: 0.22, duration: 0.65 }),
          animate(".ws-letter", { transform: ["translateY(110%)", "translateY(0%)"] }, { duration: 0.35, delay: stagger(0.03, { startDelay: 0.12 }) }),
          animate(".ws-line", { opacity: [0, 1], transform: ["translateY(12px)", "translateY(0px)"] }, { duration: 0.4, delay: 0.3 }),
        ]);
        await animate(scope.current, { transform: "translateX(-100%)" }, { duration: 0.42, ease: EASE, delay: 0.22 });
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
      title={UI.welcomeSkip[lang]}
      className="on-light fixed inset-0 z-[400] grid cursor-pointer place-items-center overflow-hidden bg-linen text-bordeaux"
      style={intro ? undefined : reduce ? { opacity: 0 } : { transform: "translateX(100%)" }}
    >
      <span className="sr-only" lang={HTML_LANG[lang]}>{`${word} ${line}`}</span>
      <div aria-hidden="true" className="tex-grill pointer-events-none absolute inset-0 text-bordeaux" />
      <div aria-hidden="true" className="relative flex flex-col items-center gap-5 px-6 text-center md:gap-7">
        <img className="ws-logo w-[min(44vw,240px)] rounded-full shadow-[0_24px_50px_-24px_rgba(107,30,46,0.55)]" src={logo()} alt="" style={{ opacity: reduce || intro ? 1 : 0 }} />
        <p lang={HTML_LANG[lang]} className="overflow-hidden pb-2 font-display text-6xl font-bold leading-none tracking-tight md:text-8xl">
          {[...word].map((ch, i) => (
              <span key={i} className="ws-letter inline-block" style={reduce ? undefined : { transform: "translateY(110%)" }}>
              {ch}
            </span>
          ))}
        </p>
        <p lang={HTML_LANG[lang]} className="ws-line font-display text-xl font-medium text-charcoal md:text-3xl" style={{ opacity: reduce ? 1 : 0 }}>
          {line}
        </p>
      </div>
    </div>
  );
}
