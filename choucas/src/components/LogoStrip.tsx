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
  const x = useTransform(baseX, (v) => `translate3d(${v}px, 0, 0)`);

  useAnimationFrame((_, delta) => {
    if (paused || reduce) return;
    const group = track.current?.firstElementChild as HTMLElement | null;
    const w = group?.offsetWidth ?? 1000;
    const f = factor.get();
    if (f < -0.05) direction.current = 1;
    else if (f > 0.05) direction.current = -1;
    const move = direction.current * 60 * (delta / 1000) * (1 + Math.abs(f));
    baseX.set(wrap(-w, 0, baseX.get() + move));
  });

  const items = [
    { k: "logo" },
    { k: "t", t: "Pizzeria Choucas" },
    { k: "s", t: "Oasis Steakhouse" },
    { k: "mark" },
    { k: "t", t: "Choucalino®" },
    { k: "s", t: "Gaucho Steak" },
    { k: "t", t: UI.stripLeukerbad[lang] },
  ];
  const group = (n: number) => (
    <div key={n} className="flex shrink-0 items-center gap-10 pr-10 md:gap-14 md:pr-14">
      {items.map((it, i) =>
        it.k === "logo" ? (
          <span key={i} className="shrink-0 rounded-2xl bg-snow px-4 py-2.5">
            <img src={logo()} alt="" width={468} height={122} loading="lazy" className="h-10 w-auto md:h-12" />
          </span>
        ) : it.k === "mark" ? (
          <img key={i} src={mark()} alt="" width={64} height={64} loading="lazy" className="size-14 object-contain md:size-16" />
        ) : (
          <span key={i} className={it.k === "t" ? "whitespace-nowrap font-display text-4xl font-extrabold tracking-tight text-snow md:text-6xl" : "whitespace-nowrap font-display text-4xl font-light italic tracking-tight text-beak md:text-6xl"}>
            {it.t}
          </span>
        ),
      )}
    </div>
  );

  return (
    <section aria-label={UI.marquee[lang]} className="on-dark tex-hex relative overflow-hidden bg-ink py-6 text-snow md:py-8">
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
