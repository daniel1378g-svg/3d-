// The restaurant's own pictures (content/photos.list.json), each looked at and described in five languages
// (content/translations/photos.json). The green-screen dish pictures also exist as transparent cut-outs.
import sizes from "@/data/image-sizes.json";
import list from "@content/photos.list.json";
import alts from "@content/translations/photos.json";
import type { L } from "@/i18n";
import { asset } from "@/lib/utils";

export type PhotoKind = "photo" | "flyer" | "dish" | "service" | "badge";
export type Photo = { id: string; kind: PhotoKind; where: string; alt: L; w: number; h: number; src: string; sm: string; cut?: { src: string; w: number; h: number } };

const SZ = sizes as unknown as Record<string, [number, number]>;
const ALT = alts as unknown as Record<string, L>;
export const PHOTOS: Photo[] = (list as { id: string; kind: PhotoKind; where: string; green?: boolean }[]).map((p) => {
  const [w, h] = SZ[p.id];
  const c = SZ[`cutouts/${p.id}`];
  return { id: p.id, kind: p.kind, where: p.where, alt: ALT[p.id], w, h, src: asset(`images/${p.id}.webp`), sm: asset(`images/${p.id}-sm.webp`), cut: c ? { src: asset(`cutouts/${p.id}.webp`), w: c[0], h: c[1] } : undefined };
});
export const photo = (id: string) => {
  const p = PHOTOS.find((x) => x.id === id);
  if (!p) throw new Error(`unknown photo ${id}`);
  return p;
};
/** The gallery: the five gallery dishes, the slideshow photos and the take-away plates (no icons, no flyer). */
export const GALLERY = PHOTOS.filter((p) => (p.kind === "dish" || p.kind === "photo") && p.id !== "bacalhau-banner");
