// Small shared pieces: the rolling pill label, rising headings, masked photos with parallax.
import { Fragment, useLayoutEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { animate, inView, motion, stagger as staggerFrom, useReducedMotion, useScroll, useTransform } from "motion/react";
import { photo, photoSrc, photoSrcSet } from "@/content/photos";
import { useSite } from "@/site";
import { cn, EASE_OUT } from "@/lib/utils";

/** A pill-button label that rolls up on hover: the copy below is hidden from screen readers. */
export function Roll({ children }: { children: ReactNode }) {
  return (
    <span className="btn-roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

type SplitProps = {
  text: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  id?: string;
  /** "lines" splits on "\n" (each line rises as a block); "words" lets the browser wrap. */
  by?: "words" | "lines";
  stagger?: number;
  delay?: number;
  /** Plays on mount instead of when scrolled into view (page heroes). */
  immediate?: boolean;
  lang?: string;
};

/** A heading whose words (or lines) rise from behind a mask, once, when 20 % of it is in view. */
export function SplitText({ text, as: Tag = "h2", className, style, id, by = "words", stagger = 0.045, delay = 0, immediate = false, lang }: SplitProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const played = useRef(false);
  // Played by hand rather than through Motion's initial/whileInView: a prerendered page keeps its markup
  // when React hydrates it, and the page's AnimatePresence turns nested initial states off on first load,
  // so the hidden start is written here, before the first paint.
  useLayoutEffect(() => {
    const el = ref.current;
    if (reduce || !el || played.current) return;
    const words = el.querySelectorAll<HTMLElement>(".split-inner");
    words.forEach((w) => (w.style.transform = "translateY(110%)"));
    const play = () => {
      played.current = true;
      animate(words, { transform: ["translateY(110%)", "translateY(0%)"] }, { duration: 0.9, ease: EASE_OUT, delay: staggerFrom(stagger, { startDelay: delay }) });
    };
    if (immediate) return play();
    const stop = inView(el, () => {
      stop();
      play();
    }, { amount: 0.2 });
    return stop;
  }, [reduce, text]); // eslint-disable-line react-hooks/exhaustive-deps
  if (reduce) {
    return (
      <Tag id={id} className={className} style={style} lang={lang}>
        {by === "lines" ? text.split("\n").map((l, i) => <span key={i} className="block">{l}</span>) : text}
      </Tag>
    );
  }
  const parts = by === "lines" ? text.split("\n") : text.split(" ");
  return (
    <Tag ref={ref} id={id} className={className} style={style} lang={lang}>
      {parts.map((part, i) => (
        <Fragment key={i}>
          <span className={by === "lines" ? "split-line" : "split-word"}>
            <span className="split-inner">{part}</span>
          </span>
          {by === "words" && i < parts.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}

type MaskProps = {
  name: string;
  className?: string;
  /** Where the photo uncovers from. */
  from?: "bottom" | "left" | "right";
  sizes?: string;
  eager?: boolean;
  parallax?: number;
  imgClassName?: string;
  /** Rises into place instead of uncovering: painted from the first frame (page heroes, for LCP). */
  rise?: boolean;
  children?: ReactNode;
};
const HIDDEN = { bottom: "inset(100% 0% 0% 0%)", left: "inset(0% 100% 0% 0%)", right: "inset(0% 0% 0% 100%)" };

/** One of the restaurant's photos, uncovering inside its rounded or arched mask, with a slow inner parallax. */
export function MaskPhoto({ name, className, from = "bottom", sizes = "(max-width: 767px) 92vw, 40vw", eager = false, parallax = 6, imgClassName, rise = false, children }: MaskProps) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const p = photo(name);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);
  // played by hand, like SplitText: the mask starts closed (or lowered) before the first paint
  useLayoutEffect(() => {
    const el = ref.current;
    if (reduce || !el) return;
    if (rise) {
      el.style.transform = "translateY(90px)";
      animate(el, { transform: ["translateY(90px)", "translateY(0px)"] }, { duration: 1.1, ease: EASE_OUT, delay: 0.15 });
      return;
    }
    el.style.clipPath = HIDDEN[from];
    // the closed mask has no visible area to measure, so it opens once its top is 15 % into the screen
    const stop = inView(el, () => {
      stop();
      animate(el, { clipPath: [HIDDEN[from], "inset(0% 0% 0% 0%)"] }, { duration: 1, ease: EASE_OUT });
    }, { margin: "0px 0px -15% 0px" });
    return stop;
  }, [reduce]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)} style={{ backgroundColor: p.tone }}>
      <motion.img
        src={photoSrc(name)}
        srcSet={photoSrcSet(p)}
        sizes={sizes}
        width={p.w}
        height={p.h}
        alt={p.alt[lang]}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        decoding="async"
        className={cn("absolute inset-0 h-full w-full object-cover", imgClassName)}
        style={reduce ? undefined : { y, scale: 1 + parallax / 50 }}
      />
      {children}
    </div>
  );
}

/** "01 / 06" */
export const Counter = ({ i, n, className }: { i: number; n: number; className?: string }) => (
  <span className={cn("eyebrow tnum", className)}>
    {String(i).padStart(2, "0")} / {String(n).padStart(2, "0")}
  </span>
);

/** The phone glyph and the arrow used in buttons and links. */
export const PhoneGlyph = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <path d="M6.6 3h3l1.6 4.4-2.2 1.4a11 11 0 0 0 6.2 6.2l1.4-2.2L21 14.4v3a2.6 2.6 0 0 1-2.8 2.6C10.4 19.4 4.6 13.6 4 5.8A2.6 2.6 0 0 1 6.6 3Z" />
  </svg>
);
export const Arrow = ({ external = false }: { external?: boolean }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    {external ? <path d="M7 17 17 7M9 7h8v8" /> : <path d="M4 12h15M13 6l6 6-6 6" />}
  </svg>
);
