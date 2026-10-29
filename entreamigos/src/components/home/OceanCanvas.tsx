// The Atlantic at dusk: the still frame first, then (with a GPU, without reduced motion) the shader, loaded
// after first paint. The pointer ripples the water over `host`.
import { useEffect, useRef, useState } from "react";
import { asset, cn, gpuWebGL, prefersReducedMotion } from "@/lib/utils";

export function OceanCanvas({ host, horizon, className, paused = false }: { host: React.RefObject<HTMLElement | null>; horizon: number; className?: string; paused?: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);
  const engine = useRef<{ setHorizon: (v: number) => void; setPaused: (v: boolean) => void; dispose: () => void } | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !gpuWebGL()) return;
    let cancelled = false;
    // after first paint and idle, so the shader never competes with the page's first frame
    const start = () =>
      import("../webgl/ocean").then(({ createOcean }) => {
        if (cancelled || !canvas.current || !host.current) return;
        engine.current = createOcean(canvas.current, host.current, { still: false, onFirstFrame: () => setLive(true) });
        engine.current.setHorizon(horizon);
      });
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: object) => number }).requestIdleCallback;
    const id = idle ? idle(start, { timeout: 1200 }) : window.setTimeout(start, 400);
    return () => {
      cancelled = true;
      if (!idle) clearTimeout(id);
      engine.current?.dispose();
      engine.current = null;
    };
  }, [host]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => engine.current?.setHorizon(horizon), [horizon]);
  useEffect(() => engine.current?.setPaused(paused), [paused, live]);

  return (
    <div className={cn("absolute inset-0", className)}>
      <picture>
        <source media="(max-width: 700px)" srcSet={asset("hero/ocean-800.webp")} />
        <img src={asset("hero/ocean-1600.webp")} alt="" width={1600} height={1000} className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
      </picture>
      <canvas ref={canvas} aria-hidden="true" className={cn("absolute inset-0 h-full w-full transition-opacity duration-700", live ? "opacity-100" : "opacity-0")} />
    </div>
  );
}
