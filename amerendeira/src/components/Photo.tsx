"use client";

import { useContent } from "@/content/i18n";
import { IS_ARTIFACT } from "@/lib/artifact";
import { images, largest, srcSet, type ImageId } from "@/lib/images";

type Props = {
  id: ImageId;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  alt?: string;
  position?: string;
  style?: React.CSSProperties;
};

// Original photograph with AVIF/WebP sources, reserved dimensions and a tiny blurred placeholder.
export function Photo({ id, sizes, className, imgClassName, priority, alt, position, style }: Props) {
  const info = images[id];
  const { imageAlt } = useContent();
  return (
    <picture className={["photo", className].filter(Boolean).join(" ")} style={style}>
      {!IS_ARTIFACT && <source type="image/avif" srcSet={srcSet(info, "avif")} sizes={sizes} />}
      <source type="image/webp" srcSet={srcSet(info, "webp")} sizes={sizes} />
      <img
        className={["photo__img", imgClassName].filter(Boolean).join(" ")}
        src={largest(info)}
        width={info.width}
        height={info.height}
        alt={alt ?? imageAlt[id]}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        style={{ backgroundImage: `url(${info.lqip})`, objectPosition: position }}
      />
    </picture>
  );
}
