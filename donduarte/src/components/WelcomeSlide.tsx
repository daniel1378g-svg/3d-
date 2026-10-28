import { stagger, useAnimate, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { HTML_LANG, UI, WELCOME, type Lang } from "@/i18n";
import { asset } from "@/lib/utils";

const EASE = [0.76, 0, 0.24, 1] as const;

type Props = {
  lang: Lang; // the language being switched to
  onCovered: () => void; // switch language + route here, while the page is hidden
  onDone: () => void; // unmount the overlay
  /** First visit of the session: the panel starts covered and the whole slide stays under 1.2 s. */
  intro?: boolean;
};

// The brand-blue panel that covers the screen while the language changes underneath it.
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
        if (!intro) await animate(scope.current, { opacity: [0, 1] }, { duration: 0.2 });
        cover();
        await animate(scope.current, { opacity: 0 }, { duration: 0.25, delay: intro ? 0.15 : 0.3 });
      } else {
        if (!intro) await animate(scope.current, { transform: ["translateX(100%)", "translateX(0%)"] }, { duration: 0.4, ease: EASE });
        cover();
        await Promise.all([
          animate(".ws-logo", { x: ["-35vw", "0vw"], rotate: [-6, 0], opacity: [0, 1] }, { type: "spring", bounce: 0.25, duration: 0.6 }),
          animate(".ws-letter", { y: ["110%", "0%"] }, { duration: 0.35, delay: stagger(0.03, { startDelay: 0.12 }) }),
          animate(".ws-line", { opacity: [0, 0.9], y: [12, 0] }, { duration: 0.4, delay: 0.3 }),
        ]);
        await animate(scope.current, { transform: "translateX(-100%)" }, { duration: 0.45, ease: EASE, delay: intro ? 0.1 : 0.25 });
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
      className="fixed inset-0 z-[400] grid cursor-pointer place-items-center overflow-hidden bg-azulejo text-tile"
      style={reduce ? { opacity: intro ? 1 : 0 } : { transform: intro ? "translateX(0%)" : "translateX(100%)" }}
    >
      <div aria-hidden="true" className="tile-texture tile-texture--night absolute inset-0" />
      <span className="sr-only" lang={HTML_LANG[lang]}>{`${word} ${line}`}</span>
      <div aria-hidden="true" className="relative flex flex-col items-center gap-6 px-6 text-center">
        <span className="ws-logo grid place-items-center rounded-[28px] bg-tile px-8 py-6 shadow-[0_24px_60px_-20px_rgba(4,12,28,0.6)] md:px-12 md:py-9" style={{ opacity: reduce ? 1 : 0 }}>
          <img className="w-[min(58vw,360px)]" src={asset("brand/logo.webp")} alt="" />
        </span>
        <p lang={HTML_LANG[lang]} className="overflow-hidden pb-2 font-display text-6xl font-semibold leading-none tracking-tight md:text-8xl">
          {[...word].map((ch, i) => (
            <span key={i} className="ws-letter inline-block" style={reduce ? undefined : { transform: "translateY(110%)" }}>
              {ch}
            </span>
          ))}
        </p>
        <p lang={HTML_LANG[lang]} className="ws-line font-display text-xl italic md:text-3xl" style={{ opacity: reduce ? 0.9 : 0 }}>
          {line}
        </p>
      </div>
    </div>
  );
}
