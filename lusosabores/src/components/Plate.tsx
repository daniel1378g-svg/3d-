// The plate with the logo: WebGL with a GPU (lazy-loaded, paused off screen), else a flat plate with the logo
// that spins on click. ← → spin it from the keyboard. Reduced motion: the flat logo, still.
import { useEffect, useRef, useState } from "react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { asset, cn, gpuWebGL, prefersReducedMotion } from "@/lib/utils";

export function Plate({ className }: { className?: string }) {
  const { lang } = useSite();
  const canvas = useRef<HTMLCanvasElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const engine = useRef<{ nudge: (d: number) => void; dispose: () => void } | null>(null);
  const [live, setLive] = useState(false);
  const [turns, setTurns] = useState(0);
  const reduce = prefersReducedMotion();

  useEffect(() => {
    if (reduce || !gpuWebGL()) return;
    let cancelled = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        import("./webgl/plate").then(({ createPlate }) => {
          if (cancelled || !canvas.current) return;
          engine.current = createPlate(canvas.current, { still: false, logo: asset("brand/logo.png"), onFirstFrame: () => setLive(true) });
        });
      },
      { rootMargin: "300px" },
    );
    if (box.current) io.observe(box.current);
    return () => {
      cancelled = true;
      io.disconnect();
      engine.current?.dispose();
      engine.current = null;
    };
  }, [reduce]);

  const spin = (d: number) => {
    if (engine.current) engine.current.nudge(d);
    else if (!reduce) setTurns((t) => t + d);
  };

  return (
    <div
      ref={box}
      tabIndex={0}
      role="img"
      aria-label={`${UI.spinPlate[lang]} · Logo Luso Sabores`}
      aria-describedby="plate-hint"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") (spin(1), e.preventDefault());
        if (e.key === "ArrowLeft") (spin(-1), e.preventDefault());
      }}
      onClick={() => !engine.current && spin(1)}
      className={cn("relative aspect-square cursor-grab touch-pan-y select-none rounded-full active:cursor-grabbing", className)}
    >
      {/* the flat version: also the still before WebGL takes over */}
      <div
        className={cn("absolute inset-[8%] grid place-items-center rounded-full bg-branco shadow-[inset_0_0_0_10px_#fffdf6,inset_0_0_0_13px_#931A25,0_30px_50px_-20px_rgba(0,0,0,0.6)] transition-[transform,opacity] duration-[900ms] ease-[var(--ease-out)]", live && "opacity-0")}
        style={{ transform: `rotate(${turns * 360}deg)` }}
      >
        <img src={asset("brand/logo.webp")} alt="" width={600} height={420} className="w-[62%]" loading="lazy" />
      </div>
      <canvas ref={canvas} aria-hidden="true" className={cn("absolute inset-0 h-full w-full transition-opacity duration-500", live ? "opacity-100" : "opacity-0")} />
      <span id="plate-hint" className="sr-only">
        {UI.spinHint[lang]}
      </span>
    </div>
  );
}
