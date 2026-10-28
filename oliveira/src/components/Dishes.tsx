import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { UI } from "@/i18n";
import { CONTACT, dishName, photo as getPhoto, type Dish } from "@/content";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";
import { Photo } from "./Photo";

export function CuisineTag({ cuisine, className }: { cuisine: Dish["cuisine"]; className?: string }) {
  const { lang } = useSite();
  if (!cuisine) return null;
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider", cuisine === "pt" ? "bg-cobalt/10 text-cobalt" : "bg-gold/25 text-[#7a4f0f]", className)}>
      <span aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full", cuisine === "pt" ? "bg-cobalt" : "bg-gold")} />
      {cuisine === "pt" ? UI.portugal[lang] : UI.schweiz[lang]}
    </span>
  );
}

/**
 * A dish card that lands like a plate set down by a waiter: its shadow appears on the table first, then
 * the card slides in from the edge and settles with a small overshoot. It tilts towards the pointer with
 * a moving glare; a tap opens the detail, into which the photo morphs.
 */
export function DishCard({ dish, index, onOpen, from = index % 2 ? 1 : -1 }: { dish: Dish; index: number; onOpen: (d: Dish) => void; from?: number }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(30);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgb(255 255 255 / 0.32), rgb(255 255 255 / 0) 55%)`;
  const delay = Math.min(index * 0.06, 0.34);

  const move = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 12);
    rx.set(-(py - 0.5) * 10);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const leave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.li
      className="relative list-none"
      layout={!reduce}
      initial={reduce ? false : "away"}
      whileInView="served"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ layout: { type: "spring", stiffness: 260, damping: 28 } }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-3 -bottom-2 top-6 rounded-[24px] bg-[rgb(60_30_10/0.28)] blur-xl"
        variants={{ away: { opacity: 0, scale: 0.85 }, served: { opacity: 1, scale: 1, transition: { duration: 0.25, delay } } }}
      />
      <motion.button
        type="button"
        onClick={() => onOpen(dish)}
        onPointerMove={move}
        onPointerLeave={leave}
        data-cursor="view"
        className="group relative block w-full overflow-hidden rounded-[24px] bg-linen text-left shadow-set ring-1 ring-charcoal/5"
        style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
        variants={{
          away: { opacity: 0, x: from * 70, y: -18, rotate: from * 4, scale: 1.03 },
          served: { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, transition: { type: "spring", stiffness: 170, damping: 15, mass: 0.9, delay: delay + 0.08 } },
        }}
      >
        <motion.div layoutId={reduce ? undefined : `dish-photo-${dish.id}`} className="relative aspect-[4/3] overflow-hidden">
          <Photo id={dish.photos[0]} className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]" sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" />
        </motion.div>
        <div className="flex items-start justify-between gap-3 p-5">
          <div>
            <h3 className="display text-2xl font-semibold leading-tight text-charcoal" lang={typeof dish.name === "string" ? "pt-PT" : undefined}>
              {dishName(dish, lang)}
            </h3>
            <p className="mt-1.5 text-[15px] leading-snug text-charcoal/75">{dish.desc[lang]}</p>
          </div>
          <CuisineTag cuisine={dish.cuisine} className="mt-1 shrink-0" />
        </div>
        <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: glare }} />
      </motion.button>
    </motion.li>
  );
}

/** The dish, large: its main photo alive, the other photos below, and how to ask for the current menu. */
export function DishDetail({ dish, onClose }: { dish: Dish | null; onClose: () => void }) {
  const { lang, openBooking } = useSite();
  const reduce = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);

  useEffect(() => {
    if (!dish) return;
    opener.current = document.activeElement;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>("button")?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, [dish, onClose]);

  return (
    <AnimatePresence>
      {dish && (
        <div className="fixed inset-0 z-[370] grid place-items-center p-3 md:p-8" role="dialog" aria-modal="true" aria-labelledby="dish-title">
          <motion.div className="absolute inset-0 bg-charcoal/60 backdrop-blur-[3px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div
            ref={panel}
            className="linen relative max-h-[92svh] w-full max-w-[980px] overflow-y-auto rounded-[28px] shadow-lift"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            <div className="grid md:grid-cols-[1.25fr_1fr]">
              <motion.div layoutId={reduce ? undefined : `dish-photo-${dish.id}`} className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[520px]">
                <Photo id={dish.photos[0]} living className="absolute inset-0 h-full w-full" sizes="(min-width: 768px) 560px, 100vw" priority />
              </motion.div>
              <div className="flex flex-col p-6 md:p-8">
                <button type="button" onClick={onClose} className="ml-auto grid h-11 w-11 place-items-center rounded-full bg-charcoal text-linen" aria-label={UI.close[lang]}>
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                </button>
                <CuisineTag cuisine={dish.cuisine} className="mt-2 self-start" />
                <h2 id="dish-title" className="display mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold leading-none text-charcoal" lang={typeof dish.name === "string" ? "pt-PT" : undefined}>
                  {dishName(dish, lang)}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-charcoal/85">{dish.desc[lang]}</p>
                {dish.photos.length > 1 && (
                  <ul className="mt-6 grid grid-cols-3 gap-2">
                    {dish.photos.slice(1).map((id) => (
                      <li key={id} className="overflow-hidden rounded-xl">
                        <Photo id={id} className="aspect-square" sizes="160px" label={getPhoto(id).illustrative} />
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-auto pt-8">
                  <p className="text-[15px] text-charcoal/80">
                    {UI.menuLine[lang]}{" "}
                    <a className="font-semibold text-leaf underline underline-offset-4" href={CONTACT.phoneHref}>
                      {CONTACT.phone}
                    </a>
                  </p>
                  <button type="button" className="btn btn-olive mt-4" onClick={() => { onClose(); openBooking(); }}>
                    {UI.navReservation[lang]}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
