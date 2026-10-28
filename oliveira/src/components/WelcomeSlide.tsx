import { stagger, useAnimate, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { HTML_LANG, MOTTO, UI, WELCOME, type Lang } from "@/i18n";
import { asset } from "@/lib/utils";

const EASE = [0.76, 0, 0.24, 1] as const;
// The prerendered pages paint the intro before the app runs (scripts/postbuild-routes.mjs).
let shellIntro: HTMLElement | null = typeof document !== "undefined" ? document.getElementById("shell-intro") : null;
const LEAF = "M1 8C9 1 25 0 39 4 27 12 11 14 1 8Z"; // a narrow olive leaf, 40 × 14

type Props = {
  lang: Lang; // the language being switched to
  onCovered: () => void; // switch language + route here, while the page is hidden
  onDone: () => void; // unmount the overlay
  /** First visit: the panel is already up and the logo's tree grows from the trunk instead of sliding in. */
  intro?: boolean;
};

/** The linen panel that covers the screen while the language changes underneath it (≈ 1.9 s; intro ≤ 1.6 s). */
export function WelcomeSlide({ lang, onCovered, onDone, intro = false }: Props) {
  const [scope, animate] = useAnimate();
  const reduce = useReducedMotion();
  const covered = useRef(false);
  const finished = useRef(false);
  const { word, line } = WELCOME[lang];
  // When the intro is already on screen from the static HTML, take over in its final state: no regrowing.
  const [settled] = useState(() => intro && shellIntro !== null);

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
    if (shellIntro) {
      shellIntro.remove();
      shellIntro = null;
    }
    const run = async () => {
      if (settled) {
        // Already seen since the first paint: hold a moment, then slide away (fade with reduced motion).
        cover();
        await (reduce
          ? animate(scope.current, { opacity: 0 }, { duration: 0.25, delay: 0.5 })
          : animate(scope.current, { transform: "translateX(-100%)" }, { duration: 0.45, ease: EASE, delay: 0.6 }));
      } else if (reduce) {
        if (!intro) await animate(scope.current, { opacity: [0, 1] }, { duration: 0.2 });
        cover();
        await animate(scope.current, { opacity: 0 }, { duration: 0.25, delay: intro ? 0.15 : 0.3 });
      } else {
        const k = intro ? 0.8 : 1;
        if (!intro) await animate(scope.current, { transform: ["translateX(100%)", "translateX(0%)"] }, { duration: 0.4, ease: EASE });
        cover();
        // The leaves aren't awaited: they leave with the panel.
        animate(".ws-leaf", { x: ["-15vw", "115vw"], y: [0, -40], rotate: [-30, 260] }, { duration: 0.9 * k, ease: [0.3, 0.1, 0.3, 1], delay: stagger(0.04) });
        await Promise.all([
          intro
            ? animate(".ws-logo", { clipPath: ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"], y: [24, 0] }, { duration: 0.7, ease: [0.22, 1, 0.36, 1] })
            : animate(".ws-logo", { x: ["-35vw", "0vw"], rotate: [-6, 0], opacity: [0, 1] }, { type: "spring", bounce: 0.25, duration: 0.6 }),
          animate(".ws-letter", { y: ["110%", "0%"] }, { duration: 0.35 * k, delay: stagger(0.03 * k, { startDelay: 0.12 * k }) }),
          animate(".ws-line", { opacity: [0, 0.85], y: [12, 0] }, { duration: 0.4 * k, delay: 0.3 * k }),
          animate(".ws-motto", { opacity: [0, 1], y: [10, 0] }, { duration: 0.4 * k, delay: 0.45 * k }),
        ]);
        await animate(scope.current, { transform: "translateX(-100%)" }, { duration: 0.45 * k, ease: EASE, delay: intro ? 0.12 : 0.25 });
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

  const still = reduce || settled;
  const hidden = (cls: string) => (still ? cls : `${cls} opacity-0`); // these appear only through the animation

  return (
    <div
      ref={scope}
      role="status"
      aria-live="polite"
      onClick={finish}
      title={UI.welcomeSkip[lang]}
      className="linen fixed inset-0 z-[400] grid cursor-pointer place-items-center overflow-hidden text-leaf"
      style={reduce ? { opacity: intro ? 1 : 0 } : { transform: intro ? "none" : "translateX(100%)" }}
    >
      <span className="sr-only" lang={HTML_LANG[lang]}>{`${word} ${line}`}</span>
      {!still &&
        Array.from({ length: 7 }, (_, i) => (
          <svg
            key={i}
            aria-hidden="true"
            viewBox="0 0 40 14"
            className="ws-leaf absolute left-0 w-10 md:w-14"
            style={{ top: `${14 + i * 11}%`, opacity: 0.55 + (i % 3) * 0.15, transform: "translateX(-15vw)", fill: i % 2 ? "#A9B39B" : "#3E6B1F" }}
          >
            <path d={LEAF} />
          </svg>
        ))}
      <div aria-hidden="true" className="flex flex-col items-center gap-3 px-6 text-center md:gap-4">
        <img
          className="ws-logo w-[min(46vw,260px)]"
          src={asset("brand/logo.webp")}
          alt=""
          style={still ? undefined : intro ? { clipPath: "inset(100% 0% 0% 0%)" } : { opacity: 0 }}
        />
        <p lang={HTML_LANG[lang]} className="display overflow-hidden pb-1 text-6xl font-semibold leading-none text-charcoal md:text-8xl">
          {[...word].map((ch, i) => (
            <span key={i} className="ws-letter inline-block" style={still ? undefined : { transform: "translateY(110%)" }}>
              {ch}
            </span>
          ))}
        </p>
        <p lang={HTML_LANG[lang]} className={hidden("ws-line display text-xl italic text-leaf md:text-3xl")} style={still ? { opacity: 0.85 } : undefined}>
          {line}
        </p>
        <p className={hidden("ws-motto script text-3xl text-apetite-text md:text-4xl")}>
          <span lang="pt-PT">{MOTTO.pt}</span> – <span lang="gsw">{MOTTO.gsw}</span>
        </p>
      </div>
    </div>
  );
}
