import { useEffect, useRef, useState, type CSSProperties } from "react";
import { imageMeta, photo, photoAlt, srcSet } from "@/content";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";

export type Reveal = "left" | "right" | "up" | "none";

type Props = {
  id: string;
  /** `sizes` for the srcset, e.g. "(min-width: 1024px) 50vw, 100vw". */
  sizes?: string;
  /** Where the wipe starts from. */
  reveal?: Reveal;
  /** Stagger, in seconds. */
  delay?: number;
  eager?: boolean;
  /** Decorative copy of a photo described elsewhere. */
  decorative?: boolean;
  /** `object-position`, so the dish or room stays in frame when cropped. */
  position?: string;
  /** Fill the parent (absolute) instead of keeping the photo's own aspect ratio. */
  fill?: boolean;
  className?: string;
  imgClassName?: string;
  style?: CSSProperties;
};

/**
 * Every photo on the site: a blurred 24 px placeholder holds the space, the file comes from a srcset
 * (AVIF, then WebP; the preview build ships WebP only), and once it is decoded and on screen it slides in
 * with a clip-path wipe while easing from 1.08 to 1. Reduced motion gets a plain crossfade (CSS).
 */
export function SmartImage({ id, sizes = "100vw", reveal = "left", delay = 0, eager = false, decorative = false, position, fill = false, className, imgClassName, style }: Props) {
  const { lang } = useSite();
  const box = useRef<HTMLSpanElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const [state, setState] = useState<"wait" | "shown">("wait");
  // The browser's own lazy loading treats a photo hidden behind its clip-path as off screen, so loading
  // starts here instead: when the frame comes within 500 px of the screen.
  const [near, setNear] = useState(eager);
  const meta = imageMeta(id);

  useEffect(() => {
    setState("wait");
    const el = box.current;
    if (!el) return;
    let loaded = false;
    let visible = false;
    let done = false;
    const show = () => {
      if (done || !loaded || !visible) return;
      done = true;
      requestAnimationFrame(() => setState("shown"));
    };
    const onLoad = () => {
      const image = img.current;
      if (!image) return;
      image
        .decode()
        .catch(() => undefined)
        .then(() => {
          loaded = true;
          show();
        });
    };
    (el as HTMLElement & { __onLoad?: () => void }).__onLoad = onLoad;
    const image = img.current;
    if (image?.complete && image.naturalWidth) onLoad();
    const nearIo = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setNear(true);
        nearIo.disconnect();
      },
      { rootMargin: "500px 0px 500px 0px" },
    );
    const seenIo = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        visible = true;
        seenIo.disconnect();
        show();
      },
      { rootMargin: "0px 0px -6% 0px" },
    );
    nearIo.observe(el);
    seenIo.observe(el);
    return () => {
      nearIo.disconnect();
      seenIo.disconnect();
    };
  }, [id]);

  return (
    <span
      ref={box}
      data-reveal={reveal}
      data-state={state}
      className={cn("smart-image block overflow-hidden bg-snow-2", fill ? "absolute inset-0" : "relative", className)}
      style={{ ...(fill ? {} : { aspectRatio: `${meta.w} / ${meta.h}` }), ["--si-delay" as string]: `${delay}s`, ...style }}
    >
      {meta.ph && <span aria-hidden="true" className="si-ph absolute inset-0 scale-110 bg-cover bg-center blur-xl" style={{ backgroundImage: `url(${meta.ph})`, backgroundPosition: position }} />}
      <picture>
        {near && !__ARTIFACT__ && <source type="image/avif" srcSet={srcSet(id, "avif")} sizes={sizes} />}
        {near && <source type="image/webp" srcSet={srcSet(id, "webp")} sizes={sizes} />}
        <img
          ref={img}
          src={near ? photo(id) : undefined}
          width={meta.w}
          height={meta.h}
          alt={decorative ? "" : photoAlt(id, lang)}
          fetchPriority={eager ? "high" : undefined}
          decoding="async"
          onLoad={() => (box.current as (HTMLSpanElement & { __onLoad?: () => void }) | null)?.__onLoad?.()}
          onError={() => (box.current as (HTMLSpanElement & { __onLoad?: () => void }) | null)?.__onLoad?.()}
          draggable={false}
          className={cn("si-img absolute inset-0 h-full w-full object-cover", imgClassName)}
          style={{ objectPosition: position }}
        />
      </picture>
    </span>
  );
}
