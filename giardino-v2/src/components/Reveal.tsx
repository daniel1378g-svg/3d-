import { createElement, type CSSProperties, type ReactNode } from "react";
import { useInView } from "@/lib/useInView";
import { cn } from "@/lib/utils";
import { Photo } from "./Photo";

type SplitProps = {
  /** Explicit lines (each rises from its own mask), or one string split into words. */
  text: string | string[];
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  stagger?: number;
  delay?: number;
  style?: CSSProperties;
  lang?: string;
  id?: string;
  /** Start once `ready` (e.g. after the intro) as well as in view. */
  ready?: boolean;
  ariaHidden?: boolean;
};

/** A heading that rises line by line (or word by word) from behind masks once 20 % of it is in view. */
export function SplitReveal({ text, as = "h2", className, stagger = 0.045, delay = 0, style, lang, id, ready, ariaHidden }: SplitProps) {
  const [ref, inView] = useInView<HTMLElement>(0.2);
  const shown = ready === undefined ? inView : ready && inView;
  let n = 0;
  const content = Array.isArray(text)
    ? text.map((line, i) => (
        <span key={i} className="split-line">
          <span className="split-inner" style={{ "--d": delay + n++ * stagger * 2 } as CSSProperties}>
            {line}
          </span>
        </span>
      ))
    : text.split(/(\s+)/).map((w, j) =>
        /^\s+$/.test(w) ? (
          " "
        ) : (
          <span key={j} className="split-line inline-block align-top">
            <span className="split-inner" style={{ "--d": delay + n++ * stagger } as CSSProperties}>
              {w}
            </span>
          </span>
        ),
      );
  return createElement(as, { ref, id, lang, style, "aria-hidden": ariaHidden || undefined, className: cn("rv", shown && "is-in", className) }, content);
}

/** Fades and lifts its children in once in view. */
export function FadeIn({ children, className, delay = 0, as = "div", style }: { children: ReactNode; className?: string; delay?: number; as?: "div" | "p" | "li" | "section" | "ul"; style?: CSSProperties }) {
  const [ref, inView] = useInView<HTMLElement>(0.15);
  return createElement(as, { ref, className: cn("rv-fade", inView && "is-in", className), style: { "--d": delay, ...style } as CSSProperties }, children);
}

/** A photograph that uncovers inside its rounded or arched mask (from the bottom, or from a side). */
export function MaskPhoto({ id, sizes, className, from = "bottom", delay = 0, radius, decorative, eager, focus }: { id: string; sizes: string; className?: string; from?: "bottom" | "left" | "right"; delay?: number; radius?: string; decorative?: boolean; eager?: boolean; focus?: string }) {
  // the observer watches the wrapper: a target clipped to nothing never counts as visible
  const [ref, inView] = useInView<HTMLDivElement>(0.12);
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <div className={cn("mask-rv absolute inset-0", from === "left" && "from-left", from === "right" && "from-right", (inView || eager) && "is-in")} style={{ "--d": delay, "--mask-r": radius } as CSSProperties}>
        <Photo id={id} sizes={sizes} decorative={decorative} eager={eager} focus={focus} className="block h-full w-full" />
      </div>
    </div>
  );
}
