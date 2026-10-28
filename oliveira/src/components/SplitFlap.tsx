import { useEffect, useRef } from "react";
import { clack } from "@/lib/sound";
import { prefersReducedMotion } from "@/lib/utils";

const CHARS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const STEP = 60; // ms per flap while cycling, as on a station board

/**
 * One cell of a Swiss-railway split-flap board. To reach its new letter it runs forward through the
 * alphabet; each flap's top half falls like a hinged leaf (accelerating), the bottom half lands with a
 * small bounce, and the lower half darkens while it's covered.
 */
function Cell({ target, delay }: { target: string; delay: number }) {
  const root = useRef<HTMLSpanElement>(null);
  const current = useRef(" ");
  const run = useRef(0);

  useEffect(() => {
    const el = root.current!;
    const [staticTop, staticBottom, leafTop, leafBottom] = [...el.querySelectorAll<HTMLSpanElement>(".flap-half > span")];
    const [leafTopBox, leafBottomBox] = [el.querySelector<HTMLElement>(".flap-leaf")!, el.querySelector<HTMLElement>(".flap-leaf-back")!];
    const shade = el.querySelector<HTMLElement>(".flap-shade")!;
    const set = (cur: string, next: string) => {
      staticTop.textContent = next;
      staticBottom.textContent = cur;
      leafTop.textContent = cur;
      leafBottom.textContent = next;
    };
    const id = ++run.current;
    const goal = CHARS.includes(target) ? target : " ";
    if (prefersReducedMotion()) {
      current.current = goal;
      set(goal, goal);
      return;
    }
    let cancelled = false;
    const go = async () => {
      await new Promise((r) => setTimeout(r, delay));
      // A real board runs through every letter; nine flips before the target keep the rhythm without the wait.
      const from = CHARS.indexOf(current.current);
      const to = CHARS.indexOf(goal);
      const dist = (to - from + CHARS.length) % CHARS.length;
      if (dist > 9) current.current = CHARS[(to - 9 + CHARS.length) % CHARS.length];
      while (!cancelled && current.current !== goal) {
        const i = CHARS.indexOf(current.current);
        const next = CHARS[(i + 1) % CHARS.length];
        const last = next === goal;
        const d = last ? STEP * 2.2 : STEP;
        set(current.current, next);
        const fall = leafTopBox.animate([{ transform: "rotateX(0deg)" }, { transform: "rotateX(-90deg)" }], { duration: d * 0.5, easing: "cubic-bezier(.55,0,1,.45)", fill: "forwards" });
        shade.animate([{ background: "rgba(0,0,0,0)" }, { background: "rgba(0,0,0,0.35)" }], { duration: d * 0.5, fill: "forwards" });
        await fall.finished.catch(() => undefined);
        const land = leafBottomBox.animate(
          last
            ? [{ transform: "rotateX(90deg)" }, { transform: "rotateX(-10deg)", offset: 0.62 }, { transform: "rotateX(4deg)", offset: 0.82 }, { transform: "rotateX(0deg)" }]
            : [{ transform: "rotateX(90deg)" }, { transform: "rotateX(0deg)" }],
          { duration: last ? d * 1.1 : d * 0.5, easing: "cubic-bezier(.2,.7,.3,1)", fill: "forwards" },
        );
        shade.animate([{ background: "rgba(0,0,0,0.35)" }, { background: "rgba(0,0,0,0)" }], { duration: d * 0.5, fill: "forwards" });
        await land.finished.catch(() => undefined);
        clack();
        current.current = next;
        staticBottom.textContent = next;
        leafTopBox.getAnimations().forEach((a) => a.cancel());
        leafTop.textContent = next;
        if (id !== run.current) return;
      }
    };
    void go();
    return () => {
      cancelled = true;
    };
  }, [target, delay]);

  return (
    <span ref={root} className="flap" aria-hidden="true">
      <span className="flap-half flap-top"><span> </span></span>
      <span className="flap-half flap-bottom"><span> </span></span>
      <span className="flap-shade" />
      <span className="flap-half flap-top flap-leaf"><span> </span></span>
      <span className="flap-half flap-bottom flap-leaf-back"><span> </span></span>
    </span>
  );
}

/** A board of `width` cells showing `word`, centred. The word itself is announced, not the flapping. */
export function SplitFlap({ word, width = 12, label }: { word: string; width?: number; label?: string }) {
  const pad = Math.max(0, Math.floor((width - word.length) / 2));
  const text = (" ".repeat(pad) + word).padEnd(width, " ").slice(0, width);
  return (
    <span className="flap-board" role="img" aria-label={label ?? word}>
      {[...text].map((ch, i) => (
        <Cell key={i} target={ch} delay={i * 45} />
      ))}
    </span>
  );
}
