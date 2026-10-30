// "Was es bei Manna gibt": four category tabs, the products of the chosen category, and a stage that shows the
// chosen product – Manna's own photo (crossfading through the product's photos on demand) or, where the site has
// none, a typographic card that says so. Arrow keys move through tabs and products; everything is real HTML.
import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { fill } from "@/i18n";
import { useSite } from "@/site";
import { CATEGORIES, findProduct, productsIn, type Category, type ProductId } from "@/content/products";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Img } from "../Img";
import { IconArrow } from "../icons";

const STAGE: Record<Category, string> = { acai: "bg-plum", bowls: "bg-berry", drinks: "bg-lime", waffles: "bg-waffle" };

export function ProductCard({ id, compact }: { id: ProductId; compact?: boolean }) {
  const { t } = useSite();
  const p = findProduct(id)!;
  const tx = t.products.items[id];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {p.buildYourOwn && <span className="rounded-full bg-lime px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-ink">{t.explorer.buildYourOwn}</span>}
        {p.dependsOnOffer && <span className="rounded-full bg-lilac-2 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-ink">{t.explorer.dependsOnOffer}</span>}
      </div>
      <h3 className={cn("display", compact ? "text-[2rem]" : "text-[clamp(2.4rem,4.6vw,4rem)]")} lang="pt-BR">{p.name}</h3>
      <p className="font-semibold">{tx.label}</p>
      <p className="opacity-85">{tx.desc}</p>
      {p.variants && (
        <div>
          <p className="kicker mb-2 text-[0.7rem] opacity-80">{t.explorer.variants}</p>
          <ul className="flex flex-wrap gap-2">{p.variants.map((v) => <li key={v} className="rounded-full bg-current/10 px-3 py-1.5 text-sm"><span className="text-inherit">{t.products.variants[v]}</span></li>)}</ul>
        </div>
      )}
      {p.flavours && (
        <p className="text-sm opacity-85"><span className="font-semibold">{t.explorer.flavours}:</span> {p.flavours.join(", ")}</p>
      )}
      {p.publishedAs && <p className="text-xs opacity-75">{fill(t.explorer.publishedAs, { name: p.publishedAs })}</p>}
    </div>
  );
}

export function Explorer() {
  const { t, reduce, go, href } = useSite();
  const [cat, setCat] = useState<Category>("acai");
  const [pid, setPid] = useState<ProductId>("acai-im-becher");
  const [photo, setPhoto] = useState(0);
  const tabs = useRef<HTMLDivElement>(null);
  const list = productsIn(cat);
  const product = list.find((p) => p.id === pid) ?? list[0];
  const pickCat = (c: Category) => { setCat(c); setPid(productsIn(c)[0].id); setPhoto(0); };
  const roving = (e: KeyboardEvent, items: string[], current: string, pick: (v: string) => void, sel: string) => {
    const i = items.indexOf(current);
    const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!d) return;
    e.preventDefault();
    const next = items[(i + d + items.length) % items.length];
    const group = e.currentTarget.closest("[role=tablist], ul");
    pick(next);
    requestAnimationFrame(() => group?.querySelector<HTMLElement>(`[${sel}="${next}"]`)?.focus());
  };
  const img = product.images[photo % Math.max(1, product.images.length)];
  const dark = cat !== "drinks" && cat !== "waffles";

  return (
    <section id="entdecken" data-anchor="entdecken" className="skin-cream relative overflow-hidden py-24 md:py-32" aria-labelledby="explorer-title">
      <div className="gutter">
        <div className="wrap">
          <p className="kicker text-plum" data-lang-stagger>{t.explorer.kicker}</p>
          <h2 id="explorer-title" className="display mt-3 max-w-[14ch] text-[clamp(3.2rem,8.5vw,8.5rem)] text-plum">{t.explorer.title}</h2>
          <p className="lead mt-5 max-w-[40rem] text-ink/80">{t.explorer.lead}</p>

          <div ref={tabs} role="tablist" aria-label={t.explorer.categoryLabel} className="mt-10 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button key={c} type="button" role="tab" data-cat={c} id={`tab-${c}`} aria-selected={cat === c} aria-controls="explorer-panel" tabIndex={cat === c ? 0 : -1}
                onClick={() => pickCat(c)} onKeyDown={(e) => roving(e, [...CATEGORIES], cat, (v) => pickCat(v as Category), "data-cat")}
                className="chip text-ink">
                {t.explorer.categories[c]}
              </button>
            ))}
          </div>

          <div id="explorer-panel" role="tabpanel" aria-labelledby={`tab-${cat}`} className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <ul className="flex flex-col gap-2" aria-label={t.explorer.productLabel}>
              {list.map((p) => (
                <li key={p.id}>
                  <button type="button" data-pid={p.id} aria-pressed={p.id === product.id} onClick={() => { setPid(p.id); setPhoto(0); }}
                    onKeyDown={(e) => roving(e, list.map((x) => x.id), product.id, (v) => { setPid(v as ProductId); setPhoto(0); }, "data-pid")}
                    className={cn("flex w-full items-center justify-between gap-4 rounded-[22px] px-5 py-4 text-left transition-[background-color,color,transform] duration-200 active:scale-[0.98]",
                      p.id === product.id ? "bg-plum text-cream" : "bg-lilac-2 text-ink hover:bg-lilac-3")}>
                    <span>
                      <span className="block font-display text-[1.25rem] font-extrabold leading-tight" lang="pt-BR">{p.name}</span>
                      <span className={cn("block text-sm", p.id === product.id ? "text-cream/85" : "text-ink/75")}>{t.products.items[p.id].label}</span>
                    </span>
                    <IconArrow size={18} className={cn("shrink-0 transition-transform duration-200", p.id === product.id ? "translate-x-0" : "-translate-x-1 opacity-40")} />
                  </button>
                </li>
              ))}
            </ul>

            <div className={cn("relative overflow-hidden rounded-[var(--radius-xl2)] p-6 md:p-8", STAGE[cat], dark ? "text-cream" : "text-ink")} aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={product.id}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(16px)" }}
                  animate={{ opacity: 1, transform: "translateY(0px)" }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(-10px)" }}
                  transition={{ duration: 0.28, ease: EASE_OUT }}
                  className="grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center">
                  {img ? (
                    <figure className="relative">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.div key={img} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                          <Img id={img} sizes="(min-width: 1024px) 26vw, 80vw" className="aspect-[4/5] w-full rounded-[28px] ring-4 ring-cream/80" />
                        </motion.div>
                      </AnimatePresence>
                      <figcaption className="mt-2 flex items-center justify-between gap-2 text-xs opacity-85">
                        <span>{t.explorer.photo}</span>
                        {product.images.length > 1 && (
                          <span className="flex gap-1.5">
                            {product.images.map((x, i) => (
                              <button key={x} type="button" aria-label={`${i + 1} / ${product.images.length}`} aria-pressed={i === photo % product.images.length}
                                onClick={() => setPhoto(i)} className={cn("h-3 w-3 rounded-full ring-1 ring-current transition-colors", i === photo % product.images.length ? "bg-current" : "bg-transparent")} />
                            ))}
                          </span>
                        )}
                      </figcaption>
                    </figure>
                  ) : (
                    <div className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-[28px] bg-current/10 p-6 text-center">
                      <span aria-hidden="true" className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-current opacity-10" />
                      <span aria-hidden="true" className="absolute -bottom-12 -right-6 h-52 w-52 rounded-full bg-current opacity-10" />
                      <span className="display relative text-[clamp(2rem,4vw,3.2rem)]" lang="pt-BR">{product.name}</span>
                      <span className="relative mt-3 block text-xs opacity-85">{t.explorer.noPhoto}</span>
                    </div>
                  )}
                  <ProductCard id={product.id} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <a className="pill mt-10" href={href("angebot")} onClick={(e) => { e.preventDefault(); go("angebot"); }}>{t.explorer.toRange}<IconArrow size={17} className="arrow" /></a>
        </div>
      </div>
    </section>
  );
}
