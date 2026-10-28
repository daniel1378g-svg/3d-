import { useState, type CSSProperties } from "react";
import { photo as getPhoto } from "@/content";
import { useSite } from "@/site";
import { asset, cn } from "@/lib/utils";

type Props = {
  id: string;
  sizes?: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  /** Decorative copies (the second run of a strip) hide their alt text. */
  decorative?: boolean;
  position?: string;
  draggable?: boolean;
};

/** A shop photo: AVIF/WebP at up to three widths, its blurred placeholder first. */
export function Photo({ id, sizes = "100vw", className, style, priority = false, decorative = false, position, draggable = false }: Props) {
  const { lang } = useSite();
  const p = getPhoto(id);
  const [loaded, setLoaded] = useState(priority);
  // The Artifact preview publishes WebP only, and no 1600 px files.
  const widths = __ARTIFACT__ ? p.widths.filter((w) => w < 1600) : p.widths;
  const set = (ext: string) => widths.map((w) => `${asset(`images/${p.name}-${w}.${ext}`)} ${w}w`).join(", ");
  const fallback = asset(`images/${p.name}-${widths[Math.min(1, widths.length - 1)]}.webp`);
  return (
    <div className={cn("photo", loaded && "is-loaded", className)} style={{ backgroundImage: `url(${p.lqip})`, ...style }} data-photo={p.id}>
      <picture>
        {!__ARTIFACT__ && <source type="image/avif" srcSet={set("avif")} sizes={sizes} />}
        <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
        <img
          src={fallback}
          alt={decorative ? "" : p.alt[lang]}
          width={p.w}
          height={p.h}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : undefined}
          draggable={draggable}
          onLoad={() => setLoaded(true)}
          ref={(el) => {
            if (el?.complete && el.naturalWidth) setLoaded(true);
          }}
          style={position ? { objectPosition: position } : undefined}
        />
      </picture>
    </div>
  );
}
