// The 3D pizza: three.js loads only when the block comes near the screen, only with a real GPU and without reduced
// motion. Until then (and otherwise) a still of the same pizza, seen from above, turns in steps instead.
import { useEffect, useRef, useState } from "react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { asset, cn, gpuWebGL } from "@/lib/utils";
import { useReduced } from "@/lib/useMedia";
import { IconArrow, IconArrowLeft } from "./icons";
import type { PizzaEngine } from "@/three/pizza";

export function PizzaPlate({ className }: { className?: string }) {
  const { lang } = useSite();
  const reduce = useReduced();
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const engine = useRef<PizzaEngine | null>(null);
  const [live, setLive] = useState(false);
  const [turns, setTurns] = useState(0);

  useEffect(() => {
    if (reduce || !gpuWebGL()) return;
    let cancelled = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        import("@/three/pizza").then(({ createPizza }) => {
          if (cancelled || !canvas.current) return;
          engine.current = createPizza(canvas.current, { logo: asset("brand/logo.png"), autoSpin: true, onFirstFrame: () => setLive(true) });
        });
      },
      { rootMargin: "400px" },
    );
    if (box.current) io.observe(box.current);
    return () => {
      cancelled = true;
      io.disconnect();
      engine.current?.dispose();
      engine.current = null;
      setLive(false);
    };
  }, [reduce]);

  const spin = (d: number) => {
    if (engine.current) engine.current.nudge(d);
    else setTurns((t) => t + d);
  };

  return (
    <div className={cn("relative", className)}>
      <div
        ref={box}
        tabIndex={0}
        role="img"
        aria-label={`${UI.spinPizza[lang]} · ${UI.illustration[lang]}`}
        aria-describedby="pizza-hint"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") (spin(1), e.preventDefault());
          if (e.key === "ArrowLeft") (spin(-1), e.preventDefault());
        }}
        className="relative aspect-[5/4] w-full cursor-grab touch-pan-y select-none rounded-[28px] active:cursor-grabbing"
      >
        {/* the still: the same pizza from above, turned in 45° steps */}
        <div className={cn("absolute inset-[6%] transition-opacity duration-500", live && "opacity-0")}>
          <img
            src={asset("brand/pizza-top.webp")}
            alt=""
            width={900}
            height={900}
            loading="lazy"
            className="mx-auto h-full w-auto max-w-full rounded-full object-contain transition-transform duration-700 ease-[var(--ease-out)] motion-reduce:transition-none"
            style={{ transform: `rotate(${turns * 45}deg)` }}
          />
        </div>
        <canvas ref={canvas} aria-hidden="true" className={cn("absolute inset-0 h-full w-full transition-opacity duration-500", live ? "opacity-100" : "opacity-0")} />
        <span id="pizza-hint" className="sr-only">
          {UI.spinHint[lang]}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={() => spin(-1)} aria-label={UI.spinLeft[lang]} className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
          <IconArrowLeft size={20} />
        </button>
        <p aria-hidden="true" className="meta text-[12px] text-cream/80">
          {UI.spinHint[lang]}
        </p>
        <button type="button" onClick={() => spin(1)} aria-label={UI.spinRight[lang]} className="grid h-12 w-12 place-items-center rounded-full bg-gold text-ink">
          <IconArrow size={20} />
        </button>
      </div>
    </div>
  );
}
