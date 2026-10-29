import { createElement, type CSSProperties, type ReactNode } from "react";
import { useInView } from "@/lib/useInView";
import { cn } from "@/lib/utils";

type SplitProps = {
  /** Explicit lines (each rises from its own mask), or one string split into words. */
  text: string | string[];
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  lineClassName?: (i: number) => string | undefined;
  by?: "line" | "word";
  stagger?: number;
  delay?: number;
  style?: CSSProperties;
  lang?: string;
  id?: string;
  /** Start in view once `ready` (e.g. after the intro); defaults to on scroll. */
  ready?: boolean;
};

/** A heading that rises line by line (or word by word) from behind masks, once 20 % in view. */
export function SplitReveal({ text, as = "h2", className, lineClassName, by = "word", stagger = 0.045, delay = 0, style, lang, id, ready }: SplitProps) {
  const [ref, inView] = useInView<HTMLElement>(0.2);
  const lines = Array.isArray(text) ? text : [text];
  let n = 0;
  const shown = ready === undefined ? inView : ready && inView;
  const content = lines.map((line, i) => {
    if (by === "line" || Array.isArray(text)) {
      const d = delay + n++ * stagger * 2;
      return (
        <span key={i} className={cn("split-line", lineClassName?.(i))}>
          <span className="split-inner" style={{ "--d": d } as CSSProperties}>
            {line}
          </span>
        </span>
      );
    }
    return line.split(/(\s+)/).map((w, j) =>
      /^\s+$/.test(w) ? (
        " "
      ) : (
        <span key={`${i}-${j}`} className="split-line inline-block align-top">
          <span className="split-inner" style={{ "--d": delay + n++ * stagger } as CSSProperties}>
            {w}
          </span>
        </span>
      ),
    );
  });
  return createElement(as, { ref, id, lang, style, className: cn("rv", shown && "is-in", className) }, content);
}

/** Fades and lifts children in once in view. */
export function FadeIn({ children, className, delay = 0, as = "div", style }: { children: ReactNode; className?: string; delay?: number; as?: "div" | "p" | "li" | "section"; style?: CSSProperties }) {
  const [ref, inView] = useInView<HTMLElement>(0.15);
  return createElement(as, { ref, className: cn("rv-fade", inView && "is-in", className), style: { "--d": delay, ...style } as CSSProperties }, children);
}

type MaskProps = {
  src: string;
  alt: string;
  w: number;
  h: number;
  className?: string;
  imgClassName?: string;
  from?: "bottom" | "left" | "right";
  delay?: number;
  radius?: string;
  sizes?: string;
  srcSet?: string;
  eager?: boolean;
};
/** A photo that uncovers from the bottom (or a side) inside its rounded or arched mask. */
export function MaskImage({ src, alt, w, h, className, imgClassName, from = "bottom", delay = 0, radius, srcSet, sizes, eager }: MaskProps) {
  // the observer watches the wrapper: a target clipped to nothing never counts as visible
  const [ref, inView] = useInView<HTMLDivElement>(0.15);
  const natural = /\bh-auto\b/.test(imgClassName ?? "");
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <div className={cn("mask-rv", natural ? "relative" : "absolute inset-0", from === "left" && "from-left", from === "right" && "from-right", (inView || eager) && "is-in", eager && "[transition:none]")} style={{ "--d": delay, "--mask-r": radius } as CSSProperties}>
        <img src={src} srcSet={srcSet} sizes={sizes} alt={alt} width={w} height={h} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : undefined} decoding="async" className={cn("h-full w-full object-cover", imgClassName)} />
      </div>
    </div>
  );
}
