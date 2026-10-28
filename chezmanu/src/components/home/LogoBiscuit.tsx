import { useEffect, useRef, useState } from "react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { asset, cn, lowPower, prefersReducedMotion, webglAvailable } from "@/lib/utils";
import type { BiscuitHandle } from "@/three/biscuit";

/**
 * The logo printed on a round butter biscuit (three.js, loaded when it comes near the screen). Drag or flick to
 * spin it, ← → on the keyboard, or the «Faire tourner» button. Without WebGL or with reduced motion: the flat
 * logo on a biscuit-coloured disc, which spins once on click (not at all with reduced motion).
 */
export function LogoBiscuit({ className }: { className?: string }) {
  const { lang } = useSite();
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const handle = useRef<BiscuitHandle | null>(null);
  const [live, setLive] = useState(false);
  const [flatSpin, setFlatSpin] = useState(0);
  const [can] = useState(() => !prefersReducedMotion() && !lowPower() && webglAvailable());

  useEffect(() => {
    if (!can || !host.current) return;
    let cancelled = false;
    const near = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        near.disconnect();
        import("@/three/biscuit").then(({ mountBiscuit }) => {
          if (cancelled || !host.current || !canvas.current) return;
          handle.current = mountBiscuit(host.current, canvas.current, asset("brand/logo.png"), () => setLive(true));
        });
      },
      { rootMargin: "300px" },
    );
    near.observe(host.current);
    return () => {
      cancelled = true;
      near.disconnect();
      handle.current?.stop();
      handle.current = null;
    };
  }, [can]);

  const spin = () => {
    if (handle.current) handle.current.spin();
    else if (!prefersReducedMotion()) setFlatSpin((n) => n + 1);
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      const d = e.key === "ArrowLeft" ? -0.6 : 0.6;
      if (handle.current) handle.current.nudge(d);
      else spin();
    }
  };

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div
        ref={host}
        role="img"
        tabIndex={0}
        aria-label={UI.biscuitLabel[lang]}
        onKeyDown={onKey}
        data-cursor="spin"
        className="relative aspect-square w-full cursor-grab touch-none select-none rounded-full active:cursor-grabbing"
      >
        <div
          key={flatSpin}
          aria-hidden="true"
          className={cn("absolute inset-[6%] grid place-items-center rounded-full transition-opacity duration-700", live && "opacity-0")}
          style={{
            background: "radial-gradient(circle at 50% 45%, #f2cf86 0%, #e9b864 62%, #c98a3a 86%, #9a5a24 100%)",
            boxShadow: "0 30px 50px -28px rgb(60 25 8 / 0.6), inset 0 -6px 14px rgb(120 60 20 / 0.35)",
            animation: flatSpin ? "flat-spin 0.9s cubic-bezier(0.2,0.8,0.2,1)" : undefined,
          }}
        >
          <img src={asset("brand/logo-300.webp")} alt="" width={284} height={145} className="w-[68%] mix-blend-multiply" />
        </div>
        {can && <canvas ref={canvas} aria-hidden="true" className="absolute inset-0 h-full w-full transition-opacity duration-700" style={{ opacity: live ? 1 : 0 }} />}
      </div>
      <button type="button" onClick={spin} className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-caramel ring-1 ring-caramel/40 hover:bg-caramel/10">
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v4h-4" />
        </svg>
        {UI.spin[lang]}
        <span className="sr-only"> – {UI.biscuitHint[lang]}</span>
      </button>
    </div>
  );
}
