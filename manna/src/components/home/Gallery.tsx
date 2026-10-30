// The gallery: every public image from manna-acai.ch, sorted by kind – products, the shop and the Archhöfe,
// promotional artwork and brand graphics, pictures from the old homepage gallery (not confirmed as current) and
// supplier/stock images (labelled). Filter chips, a loose masonry with a slight tilt that straightens on hover,
// and a lightbox (arrow keys, Escape, focus kept inside and returned) with the site's own caption.
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import assets from "@content/assets.json";
import { fill } from "@/i18n";
import { useSite } from "@/site";
import { useFocusTrap } from "@/lib/focusTrap";
import { resumeScroll, stopScroll } from "@/lib/scroll";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Img, imageInfo } from "../Img";
import { IconChevronLeft, IconChevronRight, IconClose } from "../icons";

type Kind = "product" | "shop" | "promo" | "historical" | "supplier";
const KIND: Record<string, Kind> = { product: "product", "product-historical": "historical", shop: "shop", location: "shop", promo: "promo", brand: "promo", supplier: "supplier", stock: "supplier" };
type Asset = { id: string; caption: string | null; category: string; public: boolean };
const ITEMS = (assets as { assets: Asset[] }).assets
  .filter((a) => a.public && KIND[a.category] && imageInfo(a.id))
  .map((a, i) => ({ id: a.id, caption: a.caption?.replace(/\s+/g, " ").trim() || null, kind: KIND[a.category], tilt: [-2, 1.5, -1, 2.5, -1.5][i % 5] }));
const KINDS: ("all" | Kind)[] = ["all", "product", "shop", "promo", "historical", "supplier"];
const FIRST = 12;

export function Gallery() {
  const { t, reduce } = useSite();
  const g = t.gallery;
  const [kind, setKind] = useState<"all" | Kind>("all");
  const [open, setOpen] = useState<number | null>(null);
  const [all, setAll] = useState(false);
  const items = useMemo(() => ITEMS.filter((x) => kind === "all" || x.kind === kind), [kind]);
  // the full set is long on a phone: "all" starts with the first FIRST images, a filter shows its whole kind
  const shown = kind === "all" && !all ? items.slice(0, FIRST) : items;
  const list = useRef<HTMLUListElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  useFocusTrap(panel, open !== null);
  useEffect(() => {
    if (open === null) return;
    stopScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % items.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>("[data-close]")?.focus());
    return () => { window.removeEventListener("keydown", onKey); resumeScroll(); opener.current?.focus({ preventScroll: true }); };
  }, [open, items.length]);
  const name = (id: string, caption: string | null) => caption ?? (t.alts as Record<string, string>)[id] ?? "";
  const cur = open !== null ? items[open] : null;

  return (
    <section id="galerie" data-anchor="galerie" className="skin-cream overflow-hidden py-24 md:py-32" aria-labelledby="gallery-title">
      <div className="gutter">
        <div className="wrap">
          <p className="kicker text-plum" data-lang-stagger>{g.kicker}</p>
          <h2 id="gallery-title" className="display mt-3 text-[clamp(3.2rem,9vw,9rem)] text-plum">{g.title}</h2>
          <p className="lead mt-4 max-w-[44rem] text-ink/85">{g.lead}</p>
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label={g.categoryLabel}>
            {KINDS.map((k) => (
              <button key={k} type="button" className="chip text-ink" aria-pressed={kind === k} onClick={() => setKind(k)}>
                {g.categories[k]} <span className="tabular opacity-75">{k === "all" ? ITEMS.length : ITEMS.filter((x) => x.kind === k).length}</span>
              </button>
            ))}
          </div>
          <ul ref={list} className="mt-10 columns-2 gap-4 md:columns-3 lg:columns-4">
            {shown.map((x, i) => {
              const info = imageInfo(x.id)!;
              return (
                <li key={x.id} className="mb-4 break-inside-avoid">
                  <button
                    type="button"
                    onClick={(e) => { opener.current = e.currentTarget; setOpen(i); }}
                    className="group block w-full rounded-[22px] bg-lilac-2 p-2 text-left transition-transform duration-300 [transition-timing-function:var(--ease-out)] hover:rotate-0 hover:scale-[1.02]"
                    style={{ rotate: reduce ? "0deg" : `${x.tilt}deg` }}
                    aria-label={fill(g.open, { name: name(x.id, x.caption) })}
                  >
                    <Img id={x.id} alt="" fit={info.alpha ? "contain" : "cover"} sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 46vw" className="w-full rounded-[16px]" style={{ aspectRatio: `${info.w} / ${info.h}` }} />
                    {x.caption && <span className="block px-1.5 pb-0.5 pt-2 font-display text-sm font-bold text-plum" lang="de-CH">{x.caption}</span>}
                    {x.kind === "historical" && <span className="block px-1.5 pb-1 text-xs text-ink/75">{g.historicalNote}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
          {shown.length < items.length && (
            <div className="mt-6 flex justify-center">
              <button type="button" className="pill"
                onClick={() => {
                  setAll(true);
                  // focus moves to the first image that was just added, so keyboard users continue from there
                  requestAnimationFrame(() => list.current?.querySelectorAll<HTMLElement>("li button")[FIRST]?.focus());
                }}>
                {fill(g.more, { n: items.length })}
              </button>
            </div>
          )}
        </div>
      </div>
      <AnimatePresence>
        {cur && open !== null && (
          <motion.div ref={panel} role="dialog" aria-modal="true" aria-label={g.dialog}
            className="fixed inset-0 z-[880] flex flex-col bg-acai/95 p-4 text-cream" style={{ top: "var(--label-h)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} data-lenis-prevent>
            <div className="flex items-center justify-between">
              <p className="text-sm text-cream/85 tabular" aria-live="polite">{fill(g.count, { n: open + 1, total: items.length })}</p>
              <button type="button" data-close className="icon-btn" onClick={() => setOpen(null)} aria-label={t.a11y.close}><IconClose /></button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.figure key={cur.id} className="flex max-h-full flex-col items-center"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "scale(0.97)" }} animate={{ opacity: 1, transform: "scale(1)" }} exit={{ opacity: 0 }} transition={{ duration: 0.22, ease: EASE_OUT }}>
                  <Img id={cur.id} sizes="100vw" fit="contain" className="max-h-[74dvh] w-[min(1000px,92vw)]" imgClassName="max-h-[74dvh]" style={{ aspectRatio: `${imageInfo(cur.id)!.w} / ${imageInfo(cur.id)!.h}` }} />
                  <figcaption className="mt-3 max-w-[60ch] text-center text-sm text-cream/90">
                    {cur.caption && <strong className="mr-2 font-display" lang="de-CH">{cur.caption}</strong>}
                    {(t.alts as Record<string, string>)[cur.id]}
                    {cur.kind === "historical" && <span className="mt-1 block text-cream/75">{g.historicalNote}</span>}
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
            <div className={cn("flex justify-center gap-2 pb-[env(safe-area-inset-bottom)]")}>
              <button type="button" className="icon-btn" onClick={() => setOpen((open - 1 + items.length) % items.length)} aria-label={t.a11y.prev}><IconChevronLeft /></button>
              <button type="button" className="icon-btn" onClick={() => setOpen((open + 1) % items.length)} aria-label={t.a11y.next}><IconChevronRight /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
