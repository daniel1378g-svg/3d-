import { useEffect, useRef, useState } from "react";
import { cn, prefersReducedMotion } from "@/lib/utils";

/**
 * The still CSS tile pattern paints at once; the WebGL wall loads after first paint and fades in over it.
 * Reduced motion gets one still WebGL frame; no WebGL keeps the CSS pattern.
 */
export function TileWall({ host }: { host: React.RefObject<HTMLElement | null> }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let dispose: (() => void) | undefined;
    let cancelled = false;
    const start = async () => {
      if (!canvas.current || !host.current) return;
      const probe = document.createElement("canvas");
      if (!probe.getContext("webgl2")) return;
      const { createTileWall } = await import("./engine");
      if (cancelled || !canvas.current || !host.current) return;
      try {
        dispose = createTileWall(canvas.current, host.current, { still: prefersReducedMotion(), onFirstFrame: () => setReady(true) });
      } catch {
        /* keep the CSS pattern */
      }
    };
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: object) => number }).requestIdleCallback;
    const handle = idle ? idle(start, { timeout: 1200 }) : window.setTimeout(start, 300);
    return () => {
      cancelled = true;
      if (!idle) window.clearTimeout(handle);
      dispose?.();
    };
  }, [host]);

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="tile-still absolute inset-0" />
      <canvas ref={canvas} className={cn("absolute inset-0 h-full w-full transition-opacity duration-700", ready ? "opacity-100" : "opacity-0")} />
    </div>
  );
}
