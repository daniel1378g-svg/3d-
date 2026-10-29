// Scene A: the azulejo field behind the hero. A still frame paints first (and stays for reduced motion, no
// WebGL, or software GL); with a GPU the three.js scene loads after first paint and fades in. It always moves,
// loops, and ripples where the pointer touches it; it pauses off screen.
import { useEffect, useRef, useState } from "react";
import { asset, cn, gpuWebGL, prefersReducedMotion } from "@/lib/utils";

export function AzulejoCanvas({ host, className, paused = false }: { host: React.RefObject<HTMLElement | null>; className?: string; paused?: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);
  const engine = useRef<{ setPaused: (v: boolean) => void; dispose: () => void } | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !gpuWebGL()) return;
    let cancelled = false;
    const start = () =>
      import("../webgl/azulejo").then(({ createAzulejo }) => {
        if (cancelled || !canvas.current || !host.current) return;
        engine.current = createAzulejo(canvas.current, host.current, { onFirstFrame: () => setLive(true) });
      });
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: object) => number }).requestIdleCallback;
    const id = idle ? idle(start, { timeout: 1200 }) : window.setTimeout(start, 400);
    return () => {
      cancelled = true;
      if (!idle) clearTimeout(id);
      engine.current?.dispose();
      engine.current = null;
    };
  }, [host]);
  useEffect(() => engine.current?.setPaused(paused), [paused, live]);

  return (
    <div className={cn("absolute inset-0", className)} aria-hidden="true">
      <picture>
        <source media="(max-width: 700px)" srcSet={asset("hero/azulejo-800.webp")} />
        <img src={asset("hero/azulejo-1600.webp")} alt="" width={1600} height={1000} className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
      </picture>
      <canvas ref={canvas} className={cn("absolute inset-0 h-full w-full transition-opacity duration-700", live ? "opacity-100" : "opacity-0")} />
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(43,26,18,0.55),rgba(43,26,18,0.2)_55%,rgba(43,26,18,0.45))]" />
    </div>
  );
}
