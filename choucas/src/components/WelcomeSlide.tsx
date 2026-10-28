import { stagger, useAnimate, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { HTML_LANG, UI, WELCOME, type Lang } from "@/i18n";

const EASE = [0.76, 0, 0.24, 1] as const;

type Props = {
  lang: Lang;
  logoSrc: string;
  onCovered: () => void; // switch language + route here, while the page is hidden
  onDone: () => void; // unmount the overlay
  /** First visit of the session: the panel is up from the first frame, a shorter hold, under 1.2 s. */
  short?: boolean;
};

// The snow panel that covers the screen while the language changes underneath it: the logo slides in from
// the left and "welcome" rises letter by letter in the new language. ≈ 1.7 s; click, tap or Esc skips.
export function WelcomeSlide({ lang, logoSrc, onCovered, onDone, short = false }: Props) {
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
        if (!short) await animate(scope.current, { opacity: [0, 1] }, { duration: 0.2 });
        cover();
        await animate(scope.current, { opacity: 0 }, { duration: 0.25, delay: short ? 0.15 : 0.3 });
      } else if (short) {
        // first visit ≈ 1.1 s
        cover();
        await Promise.all([
          animate(".ws-logo", { x: ["-35vw", "0vw"], rotate: [-6, 0], opacity: [0, 1] }, { type: "spring", bounce: 0.25, duration: 0.5 }),
          animate(".ws-letter", { y: ["110%", "0%"] }, { duration: 0.28, delay: stagger(0.022, { startDelay: 0.06 }) }),
          animate(".ws-line", { opacity: [0, 0.85], y: [10, 0] }, { duration: 0.3, delay: 0.18 }),
        ]);
        await animate(scope.current, { x: "-100%" }, { duration: 0.4, ease: EASE, delay: 0.1 });
      } else {
        await animate(scope.current, { x: ["100%", "0%"] }, { duration: 0.4, ease: EASE });
        cover();
        await Promise.all([
          animate(".ws-logo", { x: ["-35vw", "0vw"], rotate: [-6, 0], opacity: [0, 1] }, { type: "spring", bounce: 0.25, duration: 0.6 }),
          animate(".ws-letter", { y: ["110%", "0%"] }, { duration: 0.35, delay: stagger(0.03, { startDelay: 0.12 }) }),
          animate(".ws-line", { opacity: [0, 0.85], y: [12, 0] }, { duration: 0.4, delay: 0.3 }),
        ]);
        await animate(scope.current, { x: "-100%" }, { duration: 0.45, ease: EASE, delay: 0.25 });
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
      className="on-light fixed inset-0 z-[700] grid cursor-pointer place-items-center overflow-hidden bg-snow text-ink"
      style={short ? undefined : reduce ? { opacity: 0 } : { transform: "translateX(100%)" }}
    >
      <span className="sr-only" lang={HTML_LANG[lang]}>{`${word} ${line}`}</span>
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-beak/25 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-24 size-[28rem] rounded-full bg-brand/15 blur-3xl" />
      <div aria-hidden="true" className="relative flex flex-col items-center gap-5 px-6 text-center md:gap-7">
        <img className="ws-logo w-[min(70vw,420px)]" src={logoSrc} alt="" style={{ opacity: reduce ? 1 : 0 }} />
        <p lang={HTML_LANG[lang]} className="overflow-hidden pb-2 font-display text-5xl font-bold leading-none tracking-tight md:text-7xl">
          {[...word].map((ch, i) => (
            <span key={i} className="ws-letter inline-block" style={reduce ? undefined : { transform: "translateY(110%)" }}>
              {ch}
            </span>
          ))}
        </p>
        <p lang={HTML_LANG[lang]} className="ws-line text-lg md:text-2xl" style={{ opacity: reduce ? 0.85 : 0 }}>
          {line}
        </p>
      </div>
    </div>
  );
}
