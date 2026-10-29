// Scene C: the gallery as a room. The pictures hang as panels in depth (three.js), the camera drifts with the
// scroll and the pointer; a tap on a panel opens the lightbox. Loaded only with a GPU and motion allowed.
import { useEffect, useRef } from "react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { GALLERY } from "@/content/photos";

export default function GallerySpace({ onOpen }: { onOpen: (i: number) => void }) {
  const { lang } = useSite();
  const canvas = useRef<HTMLCanvasElement>(null);
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let dispose = () => {};
    let cancelled = false;
    import("../webgl/gallery").then(({ createGallery }) => {
      if (cancelled || !canvas.current || !host.current) return;
      dispose = createGallery(canvas.current, host.current, GALLERY.map((p) => ({ src: p.sm, w: p.w, h: p.h })), onOpen).dispose;
    });
    return () => {
      cancelled = true;
      dispose();
    };
  }, [onOpen]);
  return (
    <div ref={host} className="relative mt-10 h-[72svh] min-h-[420px] overflow-hidden rounded-[28px] bg-marca-escura">
      <canvas ref={canvas} className="absolute inset-0 h-full w-full cursor-pointer" aria-hidden="true" />
      {/* the same pictures for keyboards and screen readers */}
      <ul className="sr-only">
        {GALLERY.map((p, i) => (
          <li key={p.id}>
            <button type="button" onClick={() => onOpen(i)}>
              {UI.openPhoto[lang]}: {p.alt[lang]}
            </button>
          </li>
        ))}
      </ul>
      <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-fundo/90 px-4 py-2 text-[12px] uppercase tracking-[0.16em] text-marca">{UI.scroll[lang]} · {UI.dragHint[lang]}</p>
    </div>
  );
}
