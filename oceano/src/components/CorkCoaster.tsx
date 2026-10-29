// The cork coaster: WebGL with a GPU (lazy-loaded, paused off screen), else a flat cork disc with the logo
// that spins on click. ← → spin it from the keyboard.
import { useEffect, useRef, useState } from "react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { asset, cn, gpuWebGL, prefersReducedMotion } from "@/lib/utils";

export function CorkCoaster({ className }: { className?: string }) {
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
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      import("./webgl/cork").then(({ createCork }) => {
        if (cancelled || !canvas.current) return;
        engine.current = createCork(canvas.current, { still: false, logo: asset("brand/logo-ink.png"), onFirstFrame: () => setLive(true) });
      });
    }, { rootMargin: "300px" });
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
      aria-label={`${UI.spinCork[lang]} · Entre Amigos`}
      aria-describedby="cork-hint"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") (spin(1), e.preventDefault());
        if (e.key === "ArrowLeft") (spin(-1), e.preventDefault());
      }}
      onClick={() => !engine.current && spin(1)}
      className={cn("relative aspect-square cursor-grab touch-pan-y select-none rounded-full active:cursor-grabbing", className)}
    >
      {/* the flat version: also the still before WebGL takes over */}
      <div
        className={cn("absolute inset-[9%] grid place-items-center rounded-full bg-[#b8895a] shadow-[inset_0_0_0_6px_rgba(90,22,38,0.25),0_30px_50px_-20px_rgba(0,0,0,0.6)] transition-[transform,opacity] duration-[900ms] ease-[var(--ease-out)]", live && "opacity-0")}
        style={{ transform: `rotate(${turns * 360}deg)`, backgroundImage: "radial-gradient(rgba(94,59,31,.45) 1px, transparent 1.6px), radial-gradient(rgba(214,170,120,.4) 1px, transparent 1.8px)", backgroundSize: "7px 7px, 11px 11px", backgroundPosition: "0 0, 3px 5px" }}
      >
        <img src={asset("brand/logo-ink.png")} alt="" width={900} height={366} className="w-[64%] mix-blend-multiply" loading="lazy" />
      </div>
      <canvas ref={canvas} aria-hidden="true" className={cn("absolute inset-0 h-full w-full transition-opacity duration-500", live ? "opacity-100" : "opacity-0")} />
      <span id="cork-hint" className="sr-only">
        {UI.spinHint[lang]}
      </span>
    </div>
  );
}
