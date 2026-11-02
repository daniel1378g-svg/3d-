// A photograph of the restaurant: AVIF and WebP srcsets in a <picture> (WebP only in the preview build), with its
// width and height so the page never jumps, its focus point, and alt text in the page language.
import type { CSSProperties } from "react";
import { useSite } from "@/site";
import { altOf, photo, srcFor, srcSet, widthsOf } from "@/content/photos";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  /** decorative copies (the same photo described elsewhere) get alt="" */
  decorative?: boolean;
  eager?: boolean;
  focus?: string;
  style?: CSSProperties;
  draggable?: boolean;
};

export function Photo({ id, sizes, className, imgClassName, decorative, eager, focus, style, draggable }: Props) {
  const { lang } = useSite();
  const p = photo(id);
  const widths = widthsOf(p);
  const fallback = srcFor(p, widths.find((w) => w >= 960) ?? widths[widths.length - 1]);
  return (
    <picture className={className}>
      {!__ARTIFACT__ && <source type="image/avif" srcSet={srcSet(p, "avif")} sizes={sizes} />}
      <source type="image/webp" srcSet={srcSet(p, "webp")} sizes={sizes} />
      <img
        src={fallback}
        alt={decorative ? "" : altOf(p, lang)}
        width={p.w}
        height={p.h}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        decoding="async"
        draggable={draggable}
        className={cn("h-full w-full object-cover", imgClassName)}
        style={{ objectPosition: focus ?? p.focus, ...style }}
      />
    </picture>
  );
}
