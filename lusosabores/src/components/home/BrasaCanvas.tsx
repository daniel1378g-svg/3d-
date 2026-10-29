// The embers: the still frame first, then (with a GPU, without reduced motion) the shader, loaded after first
// paint. The pointer fans the embers over `host`.
import { useEffect, useRef, useState } from "react";
import { asset, cn, gpuWebGL, prefersReducedMotion } from "@/lib/utils";

export function BrasaCanvas({ host, bed, className, paused = false }: { host: React.RefObject<HTMLElement | null>; bed: number; className?: string; paused?: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);
  const engine = useRef<{ setBed: (v: number) => void; setPaused: (v: boolean) => void; dispose: () => void } | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !gpuWebGL()) return;
    let cancelled = false;
    // after first paint and idle, so the shader never competes with the page's first frame
    const start = () =>
      import("../webgl/brasa").then(({ createBrasa }) => {
        if (cancelled || !canvas.current || !host.current) return;
        engine.current = createBrasa(canvas.current, host.current, { still: false, onFirstFrame: () => setLive(true) });
        engine.current.setBed(bed);
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

  useEffect(() => engine.current?.setBed(bed), [bed]);
  useEffect(() => engine.current?.setPaused(paused), [paused, live]);

  return (
    <div className={cn("absolute inset-0 bg-marca-escura", className)}>
      <picture>
        <source media="(max-width: 700px)" srcSet={asset("hero/brasa-800.webp")} />
        <img src={asset("hero/brasa-1600.webp")} alt="" width={1600} height={1000} className="absolute inset-0 h-full w-full object-cover object-bottom" fetchPriority="high" />
      </picture>
      <canvas ref={canvas} aria-hidden="true" className={cn("absolute inset-0 h-full w-full transition-opacity duration-700", live ? "opacity-100" : "opacity-0")} />
    </div>
  );
}
