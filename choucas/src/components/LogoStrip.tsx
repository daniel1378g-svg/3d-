import { useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";
import { UI } from "@/i18n";
import { logo, mark } from "@/content";
import { useSite } from "@/site";
import { PauseIcon, PlayIcon } from "./icons";

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/**
 * The logo strip runs left on its own, speeds up with the scroll and turns round when the scroll does.
 * Decorative; the pause button stops it (and it starts stopped with reduced motion).
 */
export function LogoStrip() {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(!!reduce);
  const track = useRef<HTMLDivElement>(null);
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [-1500, 0, 1500], [-5, 0, 5], { clamp: false });
  const direction = useRef(-1);
  const slow = useRef(1);
  const hovered = useRef(false);
  const x = useTransform(baseX, (v) => `translate3d(${v}px, 0, 0)`);

  useAnimationFrame((_, delta) => {
    if (paused || reduce) return;
    const group = track.current?.firstElementChild as HTMLElement | null;
    const w = group?.offsetWidth ?? 1000;
    const f = factor.get();
    if (f < -0.05) direction.current = 1;
    else if (f > 0.05) direction.current = -1;
    // hovering a word eases the strip down to a crawl
    slow.current += ((hovered.current ? 0.15 : 1) - slow.current) * Math.min(1, delta / 200);
    const move = direction.current * 60 * (delta / 1000) * (1 + Math.abs(f)) * slow.current;
    baseX.set(wrap(-w, 0, baseX.get() + move));
  });

  // each word lights up in its venue's colour under the mouse
  const items: { k: "logo" | "mark" | "t" | "s"; t?: string; hover?: string }[] = [
    { k: "logo" },
    { k: "t", t: "Pizzeria Choucas", hover: "hover:text-[#ff8a7e]" },
    { k: "s", t: "Oasis Steakhouse", hover: "hover:text-sand" },
    { k: "mark" },
    { k: "t", t: "Choucalino®", hover: "hover:text-sky" },
    { k: "s", t: "Gaucho Steak", hover: "hover:text-[#e58b52]" },
    { k: "t", t: UI.stripLeukerbad[lang], hover: "hover:text-beak" },
  ];
  const group = (n: number) => (
    <div key={n} className="flex shrink-0 items-center gap-10 pr-10 md:gap-14 md:pr-14">
      {items.map((it, i) =>
        it.k === "logo" ? (
          <span key={i} className="shrink-0 rounded-xl bg-snow px-3 py-2">
            <img src={logo()} alt="" width={468} height={122} loading="lazy" className="h-8 w-auto md:h-10" />
          </span>
        ) : it.k === "mark" ? (
          <img key={i} src={mark()} alt="" width={64} height={64} loading="lazy" className="size-11 object-contain md:size-12" />
        ) : (
          <span
            key={i}
            onPointerEnter={() => (hovered.current = true)}
            onPointerLeave={() => (hovered.current = false)}
            className={
              "whitespace-nowrap font-display text-3xl tracking-tight transition-colors duration-300 md:text-5xl " +
              (it.k === "t" ? "font-semibold text-snow " : "font-light italic text-snow/55 ") +
              it.hover
            }
          >
            {it.t}
          </span>
        ),
      )}
    </div>
  );

  return (
    <section aria-label={UI.marquee[lang]} className="on-dark relative overflow-hidden bg-ink py-5 text-snow md:py-7">
      <div aria-hidden="true" className="overflow-hidden" lang="de-CH">
        <motion.div ref={track} className="flex w-max" style={{ transform: x }}>
          {[0, 1, 2, 3].map(group)}
        </motion.div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        className="absolute bottom-2 right-3 grid size-11 place-items-center rounded-full bg-ink-2 text-snow ring-1 ring-snow/20 hover:ring-snow"
        aria-label={`${paused ? UI.play[lang] : UI.pause[lang]} · ${UI.marquee[lang]}`}
      >
        {paused ? <PlayIcon size={14} /> : <PauseIcon size={14} />}
      </button>
    </section>
  );
}
