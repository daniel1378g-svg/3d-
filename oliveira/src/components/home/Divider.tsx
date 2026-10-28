import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from "motion/react";
import { TEXT, UI, fill } from "@/i18n";
import { useSite } from "@/site";
import { asset, clamp } from "@/lib/utils";
import { Photo } from "../Photo";
import { SiteLink } from "../SiteLink";

const SNAPS = [0, 50, 100];

/**
 * "Von Bacalhau bis Käseschnitte": two living photos on top of each other, Portugal on the left and
 * Switzerland on the right, shared by a divider whose handle is the green "O" ring. It throws with
 * momentum and settles on 0, 50 or 100 % with a spring. Keyboard: a slider (arrows, Home, End).
 */
export function Divider() {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const v = useMotionValue(50); // share of the width that shows Portugal
  const [value, setValue] = useState(50);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ active: false, lastX: 0, lastT: 0, vel: 0 });
  useMotionValueEvent(v, "change", (n) => setValue(Math.round(n)));

  const clip = useTransform(v, (n) => `inset(0 0 0 ${n}%)`);
  const left = useTransform(v, (n) => `${n}%`);

  const settle = (velocity = 0) => {
    const projected = v.get() + velocity * 0.18;
    const target = SNAPS.reduce((a, b) => (Math.abs(b - projected) < Math.abs(a - projected) ? b : a));
    if (reduce) v.set(target);
    else
      animate(v, target, {
        type: "spring",
        stiffness: 260,
        damping: 24,
        velocity,
        onComplete: () => {
          if ("vibrate" in navigator && target !== 50) navigator.vibrate?.(10);
        },
      });
  };

  const pct = (clientX: number) => {
    const r = box.current!.getBoundingClientRect();
    return clamp(((clientX - r.left) / r.width) * 100, 0, 100);
  };
  const onDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { active: true, lastX: pct(e.clientX), lastT: performance.now(), vel: 0 };
    setDragging(true);
    v.stop();
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const p = pct(e.clientX);
    const now = performance.now();
    const dt = Math.max(1, now - drag.current.lastT) / 1000;
    drag.current.vel = drag.current.vel * 0.6 + ((p - drag.current.lastX) / dt) * 0.4;
    drag.current.lastX = p;
    drag.current.lastT = now;
    v.set(p);
  };
  const onUp = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
    settle(clamp(drag.current.vel, -400, 400));
  };
  const onKey = (e: React.KeyboardEvent) => {
    const now = v.get();
    let next: number | null = null;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = now - 10;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") next = now + 10;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = 100;
    if (next === null) return;
    e.preventDefault();
    next = clamp(Math.round(next / 10) * 10, 0, 100);
    if (reduce) v.set(next);
    else animate(v, next, { type: "spring", stiffness: 320, damping: 28 });
  };

  // A small nudge when the scene first comes into view shows that it moves.
  const nudged = useRef(false);
  useEffect(() => {
    if (reduce) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || nudged.current) return;
      nudged.current = true;
      animate(v, [50, 62, 41, 50], { duration: 1.6, ease: "easeInOut", delay: 0.4 });
    }, { threshold: 0.5 });
    io.observe(box.current!);
    return () => io.disconnect();
  }, [reduce, v]);

  const label = "kicker rounded-full bg-charcoal/70 px-3 py-1.5 text-linen backdrop-blur";
  return (
    <section aria-labelledby="divider-title" className="linen gutter py-20 md:py-28">
      <div className="wrap">
        <h2 id="divider-title" className="display max-w-[18ch] text-[clamp(2.2rem,5.4vw,4.6rem)] font-semibold leading-[0.98] text-charcoal">
          {TEXT.heroLine[lang]}
        </h2>
        <div
          ref={box}
          className="relative mx-auto mt-10 aspect-[4/5] max-w-[1080px] touch-pan-y select-none overflow-hidden rounded-[28px] shadow-lift sm:aspect-[4/3]"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          data-cursor="drag"
        >
          <Photo id="own-04" living className="absolute inset-0 h-full w-full" sizes="(min-width: 1120px) 1080px, 100vw" />
          <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
            <Photo id="own-05" living className="absolute inset-0 h-full w-full" sizes="(min-width: 1120px) 1080px, 100vw" />
          </motion.div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(30_79_163/0.22),transparent_30%,transparent_70%,rgb(232_176_74/0.22))]" />
          <span className={`${label} absolute left-4 top-4`}>{UI.portugal[lang]}</span>
          <span className={`${label} absolute right-4 top-4`}>{UI.schweiz[lang]}</span>
          <span className="pointer-events-none absolute bottom-4 left-4 text-sm font-semibold text-linen drop-shadow">Bacalhau</span>
          <span lang="de-CH" className="pointer-events-none absolute bottom-4 right-4 text-right text-sm font-semibold text-linen drop-shadow">Käseschnitte «Walliser Art»</span>

          <motion.div className="pointer-events-none absolute inset-y-0 w-0" style={{ left }}>
            <div className="absolute inset-y-0 -left-px w-0.5 bg-linen/90 shadow-[0_0_18px_rgb(0_0_0/0.35)]" />
            <div
              role="slider"
              tabIndex={0}
              aria-label={UI.divider[lang]}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={value}
              aria-valuetext={fill(UI.dividerValue[lang], { n: value })}
              onKeyDown={onKey}
              className="pointer-events-auto absolute left-0 top-1/2 grid h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 cursor-grab place-items-center rounded-full bg-linen shadow-lift ring-1 ring-charcoal/10 active:cursor-grabbing"
              style={{ transform: `translate(-50%, -50%) scale(${dragging ? 1.08 : 1})`, transition: "transform .25s var(--ease-out-expo)" }}
            >
              <img src={asset("brand/ring.webp")} alt="" width={52} height={52} className="h-[52px] w-[52px]" draggable={false} />
            </div>
          </motion.div>
          <p className="pointer-events-none absolute bottom-14 left-1/2 -translate-x-1/2 rounded-full bg-linen/85 px-3 py-1 text-xs font-semibold text-charcoal backdrop-blur" style={{ opacity: value === 50 && !dragging ? 1 : 0, transition: "opacity .3s" }}>
            ← {UI.dividerHint[lang]} →
          </p>
          {(value === 0 || value === 100) && (
            <SiteLink
              page="kueche"
              state={{ cuisine: value === 100 ? "pt" : "ch" }}
              className="btn btn-olive absolute bottom-12 left-1/2 -translate-x-1/2 shadow-lift"
              onPointerDown={(e) => e.stopPropagation()}
            >
              {value === 100 ? UI.allPortugal[lang] : UI.allSchweiz[lang]} →
            </SiteLink>
          )}
        </div>
        <div className="mx-auto mt-8 grid max-w-[1080px] gap-8 md:grid-cols-2">
          <div>
            <p className="kicker text-cobalt">{UI.portugal[lang]} · Bacalhau</p>
            <p className="mt-3 max-w-[56ch] text-[17px] leading-relaxed text-charcoal/90">{TEXT.bacalhau[lang]}</p>
          </div>
          <div className="md:text-right">
            <p className="kicker text-[#8a5a12]">{UI.schweiz[lang]}</p>
            <p lang="de-CH" className="display mt-3 text-2xl italic text-charcoal">Käseschnitte «Walliser Art»</p>
          </div>
        </div>
      </div>
    </section>
  );
}
