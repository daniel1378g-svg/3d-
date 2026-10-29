// The welcome slide: on every language change an azulejo panel slides over the screen, the logo slides in
// with "welcome" in the new language, the language switches while the screen is covered, and the panel
// slides away. The first-visit intro starts the same way, then the logo flies into the header chip and the
// panel opens through the hero's arch, which grows from a point.
import { stagger, useAnimate, useReducedMotion, animate as animateValue } from "motion/react";
import { useEffect, useRef } from "react";
import { TEXT } from "@/content/site";
import { HTML_LANG, UI, WELCOME, type Lang } from "@/i18n";
import { asset } from "@/lib/utils";

const IN_OUT = [0.76, 0, 0.24, 1] as const;
const OUT = [0.16, 1, 0.3, 1] as const;

type Props = {
  lang: Lang;
  onCovered: () => void;
  onDone: () => void;
  intro?: boolean;
};

/** An arch-shaped hole (evenodd polygon) of the given rect, scaled by t about its centre. */
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
  for (let i = 1; i < 24; i++) {
    const a = Math.PI - (i / 24) * Math.PI;
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
  const title = intro ? "ENTRE AMIGOS" : word;

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
        await animate(el, { opacity: 0 }, { duration: 0.25, delay: intro ? 0.15 : 0.3 });
      } else if (intro) {
        cover();
        await Promise.all([
          animate(".ws-logo", { x: ["-40vw", "0vw"], rotate: [-8, 0], opacity: [0, 1] }, { type: "spring", bounce: 0.25, duration: 0.7 }),
          animate(".ws-letter", { y: ["110%", "0%"] }, { duration: 0.5, ease: OUT, delay: stagger(0.04, { startDelay: 0.25 }) }),
          animate(".ws-word", { opacity: [0, 0.9], y: [10, 0] }, { duration: 0.5, delay: 0.2 }),
          animate(".ws-line", { opacity: [0, 0.9], y: [10, 0] }, { duration: 0.7, ease: OUT, delay: 0.8 }),
        ]);
        await wait(0.3);
        if (!alive) return;
        const chip = document.querySelector<HTMLElement>("[data-logo-chip]");
        const arch = document.querySelector<HTMLElement>("[data-hero-arch]");
        const badge = el.querySelector<HTMLElement>(".ws-logo")!;
        const steps: (PromiseLike<unknown> | { then: unknown })[] = [animate(".ws-text", { opacity: 0, y: -16 }, { duration: 0.35, ease: OUT }), animate(".ws-skip", { opacity: 0 }, { duration: 0.2 })];
        if (chip) {
          const from = badge.getBoundingClientRect();
          const to = chip.getBoundingClientRect();
          const s = to.width / from.width;
          steps.push(
            animate(badge, { x: to.left + to.width / 2 - (from.left + from.width / 2), y: to.top + to.height / 2 - (from.top + from.height / 2), scale: s }, { duration: 0.85, ease: IN_OUT }),
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
          await Promise.all(steps as unknown as Promise<unknown>[]);
          await animate(el, { opacity: 0 }, { duration: 0.25 });
        } else {
          await Promise.all(steps as unknown as Promise<unknown>[]);
          await animate(el, { x: "-100%" }, { duration: 0.5, ease: IN_OUT });
        }
      } else {
        await animate(el, { x: ["100%", "0%"] }, { duration: 0.4, ease: IN_OUT });
        cover();
        await Promise.all([
          animate(".ws-logo", { x: ["-35vw", "0vw"], rotate: [-6, 0], opacity: [0, 1] }, { type: "spring", bounce: 0.25, duration: 0.6 }),
          animate(".ws-letter", { y: ["110%", "0%"] }, { duration: 0.35, delay: stagger(0.03, { startDelay: 0.12 }) }),
          animate(".ws-line", { opacity: [0, 0.9], y: [12, 0] }, { duration: 0.4, delay: 0.3 }),
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
      className="fixed inset-0 z-[900] grid cursor-pointer place-items-center bg-[var(--panel)] text-[var(--panel-ink)]"
      style={reduce ? { opacity: 0 } : intro ? undefined : { transform: "translateX(100%)" }}
    >
      <span className="sr-only" lang={HTML_LANG[lang]}>{intro ? `Entre Amigos · ${word} ${line}` : `${word} ${line}`}</span>
      <div aria-hidden="true" className="flex flex-col items-center gap-6 px-6 text-center">
        <div className="ws-logo relative grid h-[min(52vw,250px)] w-[min(52vw,250px)] place-items-center rounded-full bg-marca-escura shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]" style={{ opacity: 0 }}>
          <img className="ws-full w-[82%] h-auto" src={asset("brand/logo.webp")} alt="" width={900} height={366} />
          <img className="ws-mark absolute h-[66%] w-auto opacity-0" src={asset("brand/fork.webp")} alt="" width={240} height={236} />
        </div>
        <div className="ws-text flex flex-col items-center gap-3">
          {intro && (
            <p lang={HTML_LANG[lang]} className="ws-word font-hand text-3xl text-destaque opacity-0 md:text-4xl">
              {word}
            </p>
          )}
          <p lang={HTML_LANG[lang]} className="flex overflow-hidden font-display text-[clamp(52px,10vw,128px)] font-extrabold uppercase leading-[0.95]">
            {[...title].map((ch, i) => (
              <span key={i} className="ws-letter inline-block" style={{ transform: "translateY(110%)" }}>
                {ch === " " ? " " : ch}
              </span>
            ))}
          </p>
          <p lang={HTML_LANG[lang]} className={`ws-line max-w-[92vw] font-display font-semibold uppercase opacity-0 ${intro ? "text-[13px] tracking-[0.22em] md:text-lg" : "text-lg md:text-2xl"}`}>
            {intro ? TEXT.motto.map((m) => m[lang]).join(" · ") : line}
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
          className="ws-skip btn btn--cream btn--sm absolute bottom-6 right-6"
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
