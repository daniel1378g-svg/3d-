// Responsive photograph: AVIF and WebP srcsets (scripts/prepare_images.py → src/data/images.json) in a <picture>, a
// 16 px blurred placeholder and the dominant colour while it loads, explicit dimensions (no layout shift), a focal point
// for crops, lazy unless it is above the fold.
import { useEffect, useRef, useState, type CSSProperties } from "react";
import IMAGES from "@/data/images.json";
import ASSETS from "@/data/photos.json";
import { useSite } from "@/site";

type Meta = { w: number; h: number; color: string; lqip: string; widths: number[]; focus: string; category: string; year: number };
export const IMAGE_META = IMAGES as Record<string, Meta>;
type Asset = { id: string; alt: Record<string, string>; category: string; year: number; people: string | null };
export const ASSET_LIST = (ASSETS as { assets: Asset[] }).assets;
const ALT = new Map(ASSET_LIST.map((a) => [a.id, a.alt]));

const prefix = __ARTIFACT__ ? "" : "/";
export type ImgFormat = "avif" | "webp";
/** the claude.ai preview ships WebP up to 1440 w only (file count and size limits of the viewer) */
const widthsOf = (id: string, max = Infinity) => IMAGE_META[id].widths.filter((w) => w <= (__ARTIFACT__ ? Math.min(max, 1440) : max));
export const imgSrc = (id: string, w: number, ext: ImgFormat = "webp") => `${prefix}images/${id}-${w}.${ext}`;
export const srcSet = (id: string, ext: ImgFormat = "webp", max = Infinity) => widthsOf(id, max).map((w) => `${imgSrc(id, w, ext)} ${w}w`).join(", ");
/** <link rel=preload> for an above-the-fold photograph (AVIF; browsers without AVIF skip it and use the <img>). */
export const preloadTag = (id: string, sizes: string, max = Infinity) =>
  `<link rel="preload" as="image" type="image/avif" imagesrcset="${srcSet(id, "avif", max)}" imagesizes="${sizes}" fetchpriority="high" />`;
export const largest = (id: string) => imgSrc(id, IMAGE_META[id].widths.at(-1)!);
export function useAlt() {
  const { lang } = useSite();
  return (id: string) => ALT.get(id)?.[lang] ?? "";
}

type Props = {
  id: string;
  sizes: string;
  className?: string;
  /** above the fold: eager + high fetch priority */
  priority?: boolean;
  /** decorative copies (e.g. a duplicate in a slider) get an empty alt */
  decorative?: boolean;
  focus?: string;
  style?: CSSProperties;
  imgStyle?: CSSProperties;
  contain?: boolean;
  /** largest width offered at first (the hero keeps 2400 w for later, see Hero.tsx) */
  maxWidth?: number;
};

export function Img({ id, sizes, className = "", priority = false, decorative = false, focus, style, imgStyle, contain = false, maxWidth = Infinity }: Props) {
  const meta = IMAGE_META[id];
  const alt = useAlt();
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) setLoaded(true);
  }, []);
  if (!meta) return null;
  const widths = widthsOf(id, maxWidth);
  const fallbackW = widths.find((w) => w >= 960) ?? widths.at(-1)!;
  return (
    <div className={`img ${contain ? "img--contain" : ""} ${loaded ? "is-loaded" : ""} ${className}`} style={{ backgroundColor: meta.color, ...style }}>
      {!priority && <div className="img__ph" style={{ backgroundImage: `url(${meta.lqip})` }} aria-hidden="true" />}
      <picture>
      {!__ARTIFACT__ && <source type="image/avif" srcSet={srcSet(id, "avif", maxWidth)} sizes={sizes} />}
      <img
        ref={ref}
        src={imgSrc(id, fallbackW)}
        srcSet={srcSet(id, "webp", maxWidth)}
        sizes={sizes}
        width={meta.w}
        height={meta.h}
        alt={decorative ? "" : alt(id)}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : undefined}
        onLoad={() => setLoaded(true)}
        style={{ objectPosition: focus ?? meta.focus, ...imgStyle }}
      />
      </picture>
    </div>
  );
}
