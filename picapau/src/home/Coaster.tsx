// The cork coaster with the logo: drag to spin it, a flick spins it fast, then it settles facing front;
// ← → (or Enter) turn it from the keyboard. No GPU, or reduced motion: a flat logo that turns on click.
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { copy } from "@/copy";
import { LOGO } from "@/content/photos";
import { useSite } from "@/site";
import { gpuWebGL } from "@/lib/webgl";
import type { Coaster as Scene } from "@/three/coaster";

export function Coaster() {
  const { lang } = useSite();
  const t = copy(lang);
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const scene = useRef<Scene | null>(null);
  const [mode, setMode] = useState<"flat" | "3d">("flat");
  const [turns, setTurns] = useState(0);

  useEffect(() => {
    if (reduce || !gpuWebGL()) return;
    let cancelled = false;
    let cleanup = () => {};
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        import("@/three/coaster").then(({ createCoaster }) => {
          const c = canvas.current, b = box.current;
          if (cancelled || !c || !b) return;
          try {
            scene.current = createCoaster(c, LOGO.src(480));
          } catch {
            return;
          }
          const size = () => scene.current?.resize(b.clientWidth);
          size();
          const ro = new ResizeObserver(size);
          ro.observe(b);
          setMode("3d");
          cleanup = () => {
            ro.disconnect();
            scene.current?.dispose();
            scene.current = null;
          };
        });
      },
      { rootMargin: "300px" },
    );
    if (box.current) io.observe(box.current);
    return () => {
      cancelled = true;
      io.disconnect();
      cleanup();
    };
  }, [reduce]);

  const turn = (dir: number) => {
    if (scene.current) scene.current.flick(dir * 0.32);
    else if (!reduce) setTurns((n) => n + dir);
  };

  return (
    <div className="grid justify-items-center gap-3">
      <div
        ref={box}
        role="button"
        tabIndex={0}
        aria-label={`${t.ui.spin} – Pica Pau`}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") (e.preventDefault(), turn(-1));
          if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") (e.preventDefault(), turn(1));
        }}
        onClick={() => mode === "flat" && turn(1)}
        className="relative aspect-square w-[min(68vw,340px)] cursor-grab touch-none rounded-full active:cursor-grabbing"
      >
        <canvas ref={canvas} className="absolute inset-0 h-full w-full" style={{ opacity: mode === "3d" ? 1 : 0 }} aria-hidden="true" />
        {mode === "flat" && (
          <div
            className="absolute inset-[6%] grid place-items-center rounded-full bg-[#c48f58] shadow-[inset_0_0_0_10px_rgba(74,42,18,0.25),0_30px_60px_-30px_rgba(11,13,16,0.6)]"
            style={{ transform: `rotateY(${turns * 360}deg)`, transition: reduce ? "none" : "transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <img src={LOGO.src(480)} alt="" width="200" height="199" className="w-[58%] opacity-90 [filter:brightness(0.4)_sepia(1)_saturate(2.2)_hue-rotate(-12deg)]" />
          </div>
        )}
      </div>
      <p className="meta text-[13px] text-branco/85" aria-hidden="true">
        {t.ui.spinHint}
      </p>
    </div>
  );
}
