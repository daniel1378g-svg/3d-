// The 3D olive branch (BRIEF §7): the poster, rendered from the same camera into the same box, paints at once and is
// all that mobile devices, the claude.ai preview and reduced motion get. The live scene (three.js) loads after `load`
// + idle, only with WebGL 2, no data saver, ≥ 4 cores and ≥ 4 GB device memory; it renders at 1× (less if frames get
// slow), answers the pointer on fine-pointer devices only, follows the hero's scroll progress, and stops off screen
// or in hidden tabs. It is labelled «Illustration», so it is never taken for a photograph.
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useSite } from "@/site";
import type { Olive } from "@/three/olive";

export type BranchHandle = { setScroll: (p: number, v?: number) => void };
const pre = __ARTIFACT__ ? "" : "/";

export const OliveBranch = forwardRef<BranchHandle, { className?: string }>(function OliveBranch({ className = "" }, ref) {
  const { reduced, t } = useSite();
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const scene = useRef<Olive | null>(null);
  const pending = useRef({ p: 0, v: 0 });
  const [live, setLive] = useState(false);

  useImperativeHandle(ref, () => ({
    setScroll(p, v = 0) {
      pending.current = { p, v };
      scene.current?.setScroll(p, v);
    },
  }));

  useEffect(() => {
    // the claude.ai preview keeps the poster (and leaves three.js out of its bundle)
    if (__ARTIFACT__) return;
    if (reduced) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
    if (nav.connection?.saveData) return;
    if ((nav.hardwareConcurrency ?? 8) < 4 || (nav.deviceMemory ?? 8) < 4) return;
    // mobile and touch devices keep the poster
    if (window.matchMedia("(max-width: 1080px), (pointer: coarse)").matches) return;
    let disposed = false;
    let cleanup = () => {};
    const idle = (cb: () => void) => ("requestIdleCallback" in window ? (window as unknown as { requestIdleCallback: (f: () => void, o?: object) => number }).requestIdleCallback(cb, { timeout: 2500 }) : (window as Window).setTimeout(cb, 900));
    const afterLoad = (cb: () => void) => (document.readyState === "complete" ? idle(cb) : window.addEventListener("load", () => idle(cb), { once: true }));
    afterLoad(async () => {
      const mod = await import("@/three/olive");
      if (disposed || !canvas.current || !box.current || !mod.webglAvailable()) return;
      const o = mod.createOlive(canvas.current, { dpr: 1, quality: "high" });
      scene.current = o;
      const size = () => {
        const r = box.current!.getBoundingClientRect();
        o.resize(Math.max(1, Math.round(r.width)), Math.max(1, Math.round(r.height)));
      };
      size();
      o.setScroll(pending.current.p, pending.current.v);
      o.onFirstFrame(() => !disposed && setLive(true));
      const ro = new ResizeObserver(size);
      ro.observe(box.current);
      // run only while visible and the tab is shown
      let visible = true;
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible && !document.hidden) o.start();
        else o.stop();
      });
      io.observe(box.current);
      const onVis = () => (document.hidden || !visible ? o.stop() : o.start());
      document.addEventListener("visibilitychange", onVis);
      const fine = window.matchMedia("(pointer: fine)").matches;
      const onMove = (e: PointerEvent) => o.setPointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
      if (fine) window.addEventListener("pointermove", onMove, { passive: true });
      o.start();
      cleanup = () => {
        ro.disconnect();
        io.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        window.removeEventListener("pointermove", onMove);
        o.dispose();
        scene.current = null;
      };
    });
    return () => {
      disposed = true;
      cleanup();
    };
  }, [reduced]);

  return (
    <div className={`hero__branch ${live ? "is-live" : ""} ${className}`} ref={box} role="img" aria-label={t.home.hero.branchLabel}>
      <picture>
        {!__ARTIFACT__ && <source type="image/avif" srcSet={`${pre}brand/olive-branch-sm.avif 700w, ${pre}brand/olive-branch.avif 1400w`} sizes="(min-width: 1081px) 44vw, 78vw" />}
        <img
          src={`${pre}brand/olive-branch.webp`}
          srcSet={`${pre}brand/olive-branch-sm.webp 700w, ${pre}brand/olive-branch.webp 1400w`}
          sizes="(min-width: 1081px) 44vw, 78vw"
          width={1400}
          height={1120}
          alt=""
          decoding="async"
          fetchPriority="low"
        />
      </picture>
      <canvas ref={canvas} aria-hidden="true" />
      <span className="hero__branch-label" aria-hidden="true">{t.home.hero.branchLabel}</span>
    </div>
  );
});
