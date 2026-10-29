// The language transition: a cream panel wipes in from the right; the logo slides across the screen on an
// orange trailing line and the new language's name rises behind it ("Português"); the page switches while the
// screen is covered (no mixed-language flash); the panel wipes away. 700–1000 ms in all. The first-visit intro
// starts the same way, shows "A casa do verdadeiro Leitão à Bairrada", then the logo flies into the header chip
// and the panel lifts. Both skip on click, Esc or the button; reduced motion gets a plain cross-fade.
import { stagger, useAnimate, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { TX } from "@/content/site";
import { HTML_LANG, NATIVE, UI, WELCOME, type Lang } from "@/i18n";
import { asset } from "@/lib/utils";

const IN_OUT = [0.76, 0, 0.24, 1] as const;
const OUT = [0.16, 1, 0.3, 1] as const;

type Props = { lang: Lang; from?: Lang; onCovered: () => void; onDone: () => void; intro?: boolean };

export function WelcomeSlide({ lang, from, onCovered, onDone, intro = false }: Props) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
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
    const wait = (s: number) => new Promise((r) => setTimeout(r, s * 1000));
    const run = async () => {
      const el = scope.current;
      if (reduce) {
        await animate(el, { opacity: [0, 1] }, { duration: 0.2 });
        cover();
        await animate(el, { opacity: 0 }, { duration: 0.25, delay: intro ? 0.2 : 0.3 });
      } else if (intro) {
        cover();
        await Promise.all([
          animate(".ws-logo", { x: ["-30vw", "0vw"], opacity: [0, 1] }, { duration: 0.7, ease: OUT }),
          animate(".ws-trail", { scaleX: [0, 1], opacity: [0, 1, 0.35] }, { duration: 0.8, ease: OUT }),
          animate(".ws-letter", { y: ["110%", "0%"] }, { duration: 0.5, ease: OUT, delay: stagger(0.03, { startDelay: 0.3 }) }),
          animate(".ws-line", { opacity: [0, 1], y: [10, 0] }, { duration: 0.6, ease: OUT, delay: 0.8 }),
        ]);
        await wait(0.6);
        if (!alive) return;
        const chip = document.querySelector<HTMLElement>("[data-logo-chip]");
        const badge = el.querySelector<HTMLElement>(".ws-logo")!;
        const steps: Promise<unknown>[] = [animate(".ws-text", { opacity: 0, y: -16 }, { duration: 0.35, ease: OUT }) as unknown as Promise<unknown>, animate(".ws-skip", { opacity: 0 }, { duration: 0.2 }) as unknown as Promise<unknown>, animate(".ws-trail", { opacity: 0 }, { duration: 0.3 }) as unknown as Promise<unknown>];
        if (chip) {
          const f = badge.getBoundingClientRect();
          const to = chip.getBoundingClientRect();
          steps.push(animate(badge, { x: to.left + to.width / 2 - (f.left + f.width / 2), y: to.top + to.height / 2 - (f.top + f.height / 2), scale: to.width / f.width }, { duration: 0.8, ease: IN_OUT }) as unknown as Promise<unknown>);
        } else steps.push(animate(badge, { opacity: 0, scale: 0.6 }, { duration: 0.5 }) as unknown as Promise<unknown>);
        steps.push(animate(".ws-panel", { y: ["0%", "-100%"] }, { duration: 0.8, ease: IN_OUT, delay: 0.25 }) as unknown as Promise<unknown>);
        await Promise.all(steps);
        await animate(el, { opacity: 0 }, { duration: 0.15 });
      } else {
        // 1) the panel wipes in (260 ms)  2) logo slides across with the trail while the name rises (420 ms),
        // the page switches under cover  3) the panel wipes away (280 ms): ≈ 960 ms
        await animate(".ws-panel", { x: ["100%", "0%"] }, { duration: 0.26, ease: IN_OUT });
        cover();
        await Promise.all([
          animate(".ws-logo", { x: ["-36vw", "0vw"], opacity: [0, 1] }, { duration: 0.42, ease: OUT }),
          animate(".ws-trail", { scaleX: [0, 1], opacity: [0, 1, 0.4] }, { duration: 0.46, ease: OUT }),
          animate(".ws-letter", { y: ["110%", "0%"] }, { duration: 0.32, ease: OUT, delay: stagger(0.025, { startDelay: 0.1 }) }),
          animate(".ws-line", { opacity: [0, 1], y: [10, 0] }, { duration: 0.3, delay: 0.26 }),
        ]);
        await animate(".ws-panel", { x: "-100%" }, { duration: 0.28, ease: IN_OUT, delay: 0.1 });
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

  const title = intro ? "Casa Dão Lafões" : NATIVE[lang];
  return (
    <div ref={scope} role="status" aria-live="polite" onClick={finish} className="fixed inset-0 z-[900] cursor-pointer" style={reduce ? { opacity: 0 } : undefined}>
      <span className="sr-only" lang={HTML_LANG[lang]}>
        {intro ? `Casa Dão Lafões · ${word} ${line}` : `${NATIVE[lang]} · ${word} ${line}`}
      </span>
      <div className="ws-panel tex-azulejo absolute inset-0 grid place-items-center bg-fundo text-marca" style={reduce || intro ? undefined : { transform: "translateX(100%)" }}>
        <div aria-hidden="true" className="relative flex w-full flex-col items-center gap-6 px-6 text-center">
          <div className="ws-trail absolute left-0 right-1/2 top-[min(26vw,125px)] h-[3px] origin-left bg-destaque opacity-0" />
          <div className="ws-logo relative grid h-[min(52vw,250px)] w-[min(52vw,250px)] place-items-center rounded-full bg-branco shadow-[0_30px_60px_-30px_rgba(43,26,18,0.5)]" style={{ opacity: 0 }}>
            <img className="h-auto w-[76%]" src={asset("brand/logo.png")} alt="" width={352} height={181} />
          </div>
          <div className="ws-text flex flex-col items-center gap-3">
            <p lang={HTML_LANG[lang]} className="flex overflow-hidden font-display text-[clamp(44px,9vw,120px)] font-semibold leading-[1.02] tracking-[-0.02em]">
              {[...title].map((ch, i) => (
                <span key={i} className="ws-letter inline-block" style={{ transform: "translateY(110%)" }}>
                  {ch === " " ? " " : ch}
                </span>
              ))}
            </p>
            <p lang={intro ? "pt-PT" : HTML_LANG[lang]} className={`ws-line max-w-[92vw] opacity-0 ${intro ? "serif-i text-[clamp(20px,2.4vw,32px)] text-acento" : "eyebrow text-linha"}`}>
              {intro ? TX.n_introLine[lang] : `${word} ${line}`}
            </p>
            {from && !intro && <span className="sr-only">{NATIVE[from]} → {NATIVE[lang]}</span>}
          </div>
        </div>
        {intro && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              finish();
            }}
            className="ws-skip btn btn--dark btn--sm absolute right-6"
            style={{ bottom: "max(24px, env(safe-area-inset-bottom))" }}
          >
            <span className="btn-roll">
              <span>{UI.skipIntro[lang]}</span>
              <span aria-hidden="true">{UI.skipIntro[lang]}</span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
