// Responsive photo from src/data/images.json: WebP at the prepared widths, a 16 px blurred placeholder under it,
// explicit size against layout shift, lazy unless `priority`.
import { useState, type CSSProperties } from "react";
import manifest from "@/data/images.json";
import { useSite } from "@/site";
import { asset, cn } from "@/lib/utils";

type Entry = { w: number; h: number; widths: number[]; alpha: boolean; blur: string };
const IMAGES = manifest as Record<string, Entry>;
export const imageInfo = (id: string) => IMAGES[id];
export const imageSrc = (id: string, w = 960) => {
  const e = IMAGES[id];
  const width = e ? e.widths.reduce((best, x) => (Math.abs(x - w) < Math.abs(best - w) ? x : best), e.widths[0]) : w;
  return asset(`/images/${id}-${width}.webp`);
};

export function Img({
  id, sizes = "100vw", className, imgClassName, priority, alt, style, fit = "cover", position,
}: {
  id: string; sizes?: string; className?: string; imgClassName?: string; priority?: boolean; alt?: string; style?: CSSProperties;
  fit?: "cover" | "contain"; position?: string;
}) {
  const { t } = useSite();
  const e = IMAGES[id];
  const [loaded, setLoaded] = useState(false);
  if (!e) return null;
  const srcSet = e.widths.map((w) => `${asset(`/images/${id}-${w}.webp`)} ${w}w`).join(", ");
  const text = alt ?? (t.alts as Record<string, string>)[id] ?? "";
  return (
    <span className={cn("relative block overflow-hidden", className)} style={style}>
      {!e.alpha && (
        <span
          aria-hidden="true"
          className={cn("absolute inset-0 scale-110 bg-cover bg-center blur-xl transition-opacity duration-500", loaded && "opacity-0")}
          style={{ backgroundImage: `url(${e.blur})` }}
        />
      )}
      <img
        src={asset(`/images/${id}-${e.widths[Math.min(1, e.widths.length - 1)]}.webp`)}
        srcSet={srcSet}
        sizes={sizes}
        width={e.w}
        height={e.h}
        alt={text}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        onLoad={() => setLoaded(true)}
        className={cn("relative h-full w-full", fit === "cover" ? "object-cover" : "object-contain", imgClassName)}
        style={position ? { objectPosition: position } : undefined}
      />
    </span>
  );
}
