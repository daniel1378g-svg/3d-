import { useEffect, useRef, useState, type CSSProperties } from "react";
import { UI } from "@/i18n";
import { photo as getPhoto } from "@/content";
import { useSite } from "@/site";
import { asset, cn, lowPower, prefersReducedMotion, webglAvailable } from "@/lib/utils";

type Props = {
  id: string;
  sizes?: string;
  className?: string;
  style?: CSSProperties;
  /** Depth parallax, steam and glisten when the photo has masks and the device can afford it. */
  living?: boolean;
  priority?: boolean;
  /** Use the square crop where one exists. */
  square?: boolean;
  /** Decorative copies (the second run of a marquee) hide their alt text. */
  decorative?: boolean;
  /** The Symbolbild label for supplied photos; off where a caption already says it. */
  label?: boolean;
  position?: string;
};

const canLive = () => !prefersReducedMotion() && !lowPower() && webglAvailable();

/** A restaurant photo: AVIF/WebP at three widths, its blurred placeholder first, optionally alive. */
export function Photo({ id, sizes = "100vw", className, style, living = false, priority = false, square = false, decorative = false, label = true, position }: Props) {
  const { lang } = useSite();
  const p = getPhoto(id);
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  // Priority photos (heroes) show at once: they were preloaded, often painted by the static HTML already.
  const [loaded, setLoaded] = useState(priority);
  const [alive, setAlive] = useState(false);
  const useSquare = square && p.square;
  const live = living && Boolean(p.living) && !useSquare;

  useEffect(() => {
    if (!live || !host.current || !canvas.current || !canLive()) return;
    // three.js loads only when the first living photo needs it.
    let off: (() => void) | null | undefined;
    let cancelled = false;
    import("@/three/living").then(({ attachLiving }) => {
      if (cancelled || !host.current || !canvas.current) return;
      off = attachLiving(host.current, canvas.current, p.name, Boolean(p.living?.shimmer), () => setAlive(true));
    });
    return () => {
      cancelled = true;
      off?.();
    };
  }, [live, p.name, p.living]);

  // The Artifact preview publishes no 1600 px files.
  const widths = __ARTIFACT__ ? p.widths.filter((w) => w < 1600) : p.widths;
  const set = (ext: string) => (useSquare ? asset(`images/${p.name}-sq.${ext}`) : widths.map((w) => `${asset(`images/${p.name}-${w}.${ext}`)} ${w}w`).join(", "));
  const fallback = useSquare ? asset(`images/${p.name}-sq.webp`) : asset(`images/${p.name}-${p.widths[Math.min(1, p.widths.length - 1)]}.webp`);

  return (
    <div ref={host} className={cn("photo", loaded && "is-loaded", className)} style={{ backgroundImage: `url(${p.lqip})`, ...style }} data-photo={p.id}>
      <picture>
        {!__ARTIFACT__ && <source type="image/avif" srcSet={set("avif")} sizes={useSquare ? undefined : sizes} />}
        <source type="image/webp" srcSet={set("webp")} sizes={useSquare ? undefined : sizes} />
        <img
          src={fallback}
          alt={decorative ? "" : p.alt[lang]}
          width={useSquare ? 800 : p.w}
          height={useSquare ? 800 : p.h}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : undefined}
          onLoad={() => setLoaded(true)}
          ref={(el) => {
            if (el?.complete && el.naturalWidth) setLoaded(true);
          }}
          style={position ? { objectPosition: position } : undefined}
        />
      </picture>
      {live && <canvas ref={canvas} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-700" style={{ opacity: alive ? 1 : 0 }} />}
      {label && p.illustrative && <span className="symbolbild" lang={lang === "de" ? "de-CH" : undefined}>{UI.symbolbild[lang]}</span>}
    </div>
  );
}
