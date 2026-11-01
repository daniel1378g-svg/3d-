// A horizontal gallery that is a real scroller: touch and trackpad swipe natively, mouse users can drag, keyboard
// users focus it and use the arrow keys, and the two round buttons move one card. Images drift slightly inside their
// frames as the track moves (parallax), driven by the scroll position, not by time.
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useSite } from "@/site";
import { ChevronLeft, Chevron } from "./icons";

export function Track({ label, children, controlsLabel }: { label: string; children: ReactNode; controlsLabel?: string }) {
  const { t, reduced } = useSite();
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = ref.current!;
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
        if (reduced) return;
        const mid = el.getBoundingClientRect().left + el.clientWidth / 2;
        el.querySelectorAll<HTMLElement>(".card").forEach((c) => {
          const r = c.getBoundingClientRect();
          const d = (r.left + r.width / 2 - mid) / el.clientWidth;
          c.style.setProperty("--px", `${(-d * 6).toFixed(2)}%`);
        });
      });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    // drag to scroll with a mouse
    let down = false;
    let sx = 0;
    let sl = 0;
    let moved = false;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      moved = false;
      sx = e.clientX;
      sl = el.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - sx;
      if (Math.abs(dx) > 4) {
        moved = true;
        el.classList.add("is-dragging");
      }
      el.scrollLeft = sl - dx;
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      el.classList.remove("is-dragging");
    };
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("click", onClick, true);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("click", onClick, true);
    };
  }, [reduced]);

  const step = (dir: number) => {
    const el = ref.current!;
    const card = el.querySelector<HTMLElement>(".card");
    const w = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * w, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div>
      <div className="journey__bar">
        <p className="muted" style={{ fontSize: 14 }}>{controlsLabel}</p>
        <div className="journey__controls">
          <button type="button" className="round-btn" onClick={() => step(-1)} disabled={edge.start}>
            <ChevronLeft />
            <span className="sr-only">{t.a11y.previous}</span>
          </button>
          <button type="button" className="round-btn" onClick={() => step(1)} disabled={edge.end}>
            <Chevron />
            <span className="sr-only">{t.a11y.next}</span>
          </button>
        </div>
      </div>
      <div className="track" ref={ref} tabIndex={0} role="region" aria-label={label}>
        {children}
      </div>
    </div>
  );
}
