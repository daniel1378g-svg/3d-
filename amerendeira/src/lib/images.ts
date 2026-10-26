import data from "@/data/images.generated.json";

export type ImageId = keyof typeof data;

export type ImageInfo = {
  base: string;
  width: number;
  height: number;
  widths: number[];
  alt: string;
  lqip: string;
};

export const images = data as Record<ImageId, ImageInfo>;

export function srcSet(info: ImageInfo, format: "avif" | "webp") {
  return info.widths.map((w) => `${info.base}-${w}.${format} ${w}w`).join(", ");
}

export function largest(info: ImageInfo, format: "avif" | "webp" = "webp") {
  return `${info.base}-${info.widths[info.widths.length - 1]}.${format}`;
}
