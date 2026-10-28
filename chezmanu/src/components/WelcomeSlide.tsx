import { animate as animateEl, stagger, useAnimate, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { HTML_LANG, UI, WELCOME, type Lang } from "@/i18n";
import { asset } from "@/lib/utils";

const EASE = [0.76, 0, 0.24, 1] as const;
// The built pages paint the first-visit intro as static HTML before the app runs (scripts/postbuild-routes.mjs).
let shellIntro: HTMLElement | null = typeof document !== "undefined" ? document.getElementById("shell-intro") : null;

type Props = {
  lang: Lang; // the language being switched to
  onCovered: () => void; // switch language + route here, while the page is hidden
  onDone: () => void; // unmount the overlay
  /** First visit: the panel is already up, the hold is shorter (≤ 1.2 s in all). */
  intro?: boolean;
};

/**
 * The flour panel that covers the screen while the language changes underneath it (≈ 1.7 s): in from the
 * right, the logo slides in from the left on a soft spring, the word rises letter by letter, then panel and
 * logo leave to the left. Click, tap or Esc skips to the reveal; reduced motion fades instead.
 */
export function WelcomeSlide({ lang, onCovered, onDone, intro = false }: Props) {
  const [scope, animate] = useAnimate();
  const reduce = useReducedMotion();
  const covered = useRef(false);
  const finished = useRef(false);
  const { word, line } = WELCOME[lang];
  // When the intro is already on screen from the static HTML, this component draws nothing: it lets the
  // shell finish its own entrance (CSS), then slides that same element away.
  const [settled] = useState(() => intro && shellIntro !== null);
  const still = reduce;

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
    const shell = settled ? shellIntro : null;
    shellIntro = null;
    const skip = () => {
      shell?.remove();
      finish();
    };
    shell?.addEventListener("click", skip);
    const run = async () => {
      if (shell) {
        cover();
        // The shell's own entrance ends ~0.8 s after navigation; leave after a short hold.
        const delay = Math.max(0.15, 1.0 - performance.now() / 1000);
        await (reduce
          ? animateEl(shell, { opacity: 0 }, { duration: 0.25, delay })
          : animateEl(shell, { transform: "translateX(-100%)" }, { duration: 0.45, ease: EASE, delay }));
        shell.remove();
      } else if (reduce) {
        if (!intro) await animate(scope.current, { opacity: [0, 1] }, { duration: 0.2 });
        cover();
        await animate(scope.current, { opacity: 0 }, { duration: 0.25, delay: intro ? 0.15 : 0.3 });
      } else {
        if (!intro) await animate(scope.current, { transform: ["translateX(100%)", "translateX(0%)"] }, { duration: 0.4, ease: EASE });
        cover();
        const k = intro ? 0.85 : 1;
        await Promise.all([
          animate(".ws-logo", { x: ["-35vw", "0vw"], rotate: [-6, 0], opacity: [0, 1] }, { type: "spring", bounce: 0.25, duration: 0.6 * k }),
          animate(".ws-letter", { y: ["110%", "0%"] }, { duration: 0.35 * k, delay: stagger(0.03 * k, { startDelay: 0.12 * k }) }),
          animate(".ws-line", { opacity: [0, 0.85], y: [12, 0] }, { duration: 0.4 * k, delay: 0.3 * k }),
        ]);
        await Promise.all([
          animate(scope.current, { transform: "translateX(-100%)" }, { duration: 0.45, ease: EASE, delay: intro ? 0.08 : 0.25 }),
          animate(".ws-logo", { x: "-12vw" }, { duration: 0.45, ease: EASE, delay: intro ? 0.08 : 0.25 }),
        ]);
      }
      if (alive) finish();
    };
    run();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") (shell ? skip() : finish());
    };
    window.addEventListener("keydown", onKey);
    return () => {
      alive = false;
      window.removeEventListener("keydown", onKey);
      shell?.removeEventListener("click", skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (settled) return null;
  return (
    <div
      ref={scope}
      role="status"
      aria-live="polite"
      onClick={finish}
      title={UI.welcomeSkip[lang]}
      className="dust fixed inset-0 z-[500] grid cursor-pointer place-items-center overflow-hidden bg-flour text-espresso"
      style={reduce ? { opacity: intro ? 1 : 0 } : { transform: intro ? "none" : "translateX(100%)" }}
    >
      <span className="sr-only" lang={HTML_LANG[lang]}>{`${word} ${line}`}</span>
      <div aria-hidden="true" className="flex flex-col items-center gap-4 px-6 text-center md:gap-6">
        <img className="ws-logo w-[min(70vw,420px)]" src={asset("brand/logo.webp")} alt="" width={569} height={290} style={still ? undefined : { opacity: 0 }} />
        <p lang={HTML_LANG[lang]} className="display overflow-hidden pb-1 text-[clamp(3.2rem,12vw,6.5rem)] leading-none text-cocoa">
          {[...word].map((ch, i) => (
            <span key={i} className="ws-letter inline-block" style={still ? undefined : { transform: "translateY(110%)" }}>
              {ch}
            </span>
          ))}
        </p>
        <p lang={HTML_LANG[lang]} className="ws-line display text-[clamp(1.3rem,3.6vw,2.2rem)] italic text-caramel" style={{ opacity: still ? 0.85 : 0 }}>
          {line}
        </p>
      </div>
    </div>
  );
}
