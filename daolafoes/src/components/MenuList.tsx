// The dish list used by the Speisekarte teaser and page: the six live sections, each dish with its German and
// Portuguese live names, the PDF price marked "Preis laut Speisekarte (PDF)" or "auf Anfrage", a column filter
// (Take Away · Auf Anfrage · Restaurant) and an add-to-cart button for priced portion dishes.
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { TX } from "@/content/site";
import { COL_TITLE, DISHES, SECTIONS, SECTION_TITLE, dishName, dishSub, pdfRow, priceNumber, priceText, thumbId, type Col, type WebDish } from "@/content/menu";
import { photo } from "@/content/photos";
import { cart, useCart } from "@/lib/cart";
import { cn, fold } from "@/lib/utils";
import { IconCheck, IconDoc, IconMinus, IconPlus, IconSearch } from "./icons";
import { BUSINESS } from "@/content/site";

export type Filter = "all" | Col;

export function ColFilter({ value, onChange, id = "col-filter" }: { value: Filter; onChange: (v: Filter) => void; id?: string }) {
  const { lang } = useSite();
  const items: { v: Filter; label: string }[] = [{ v: "all", label: UI.all[lang] }, ...(["takeaway", "anfrage", "restaurant"] as Col[]).map((c) => ({ v: c, label: COL_TITLE[c][lang] }))];
  return (
    <div role="group" aria-label={TX.n_menuEyebrow[lang]} className="inline-flex flex-wrap rounded-full bg-marca/[0.07] p-1">
      {items.map((it) => (
        <button key={it.v} type="button" aria-pressed={value === it.v} onClick={() => onChange(it.v)} className={cn("relative rounded-full px-4 py-2 font-body text-[13px] font-semibold uppercase tracking-[0.1em]", value === it.v ? "text-fundo" : "text-marca")}>
          {value === it.v && <motion.span layoutId={id} className="absolute inset-0 rounded-full bg-marca" transition={{ type: "spring", stiffness: 480, damping: 38 }} />}
          <span className="relative">{it.label}</span>
        </button>
      ))}
    </div>
  );
}

export function AddButton({ dish, size = "sm" }: { dish: WebDish; size?: "sm" | "md" }) {
  const { lang } = useSite();
  const lines = useCart();
  const reduce = useReducedMotion();
  const row = pdfRow(dish);
  const price = priceNumber(row);
  const qty = lines.find((l) => l.id === dish.id)?.qty ?? 0;
  if (price === null) return <span className="rounded-full bg-suave px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-marca">{TX.n_onRequest[lang]}</span>;
  if (qty > 0)
    return (
      <div className="flex items-center rounded-full bg-marca text-fundo">
        <button type="button" aria-label={UI.fewerItems[lang]} onClick={() => cart.set(dish.id, qty - 1)} className="grid h-10 w-10 place-items-center rounded-full">
          <IconMinus size={16} />
        </button>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={qty} initial={reduce ? false : { y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={reduce ? undefined : { y: -10, opacity: 0 }} transition={{ duration: 0.18 }} className="min-w-6 text-center font-display text-[17px] font-semibold">
            {qty}
          </motion.span>
        </AnimatePresence>
        <button type="button" aria-label={UI.moreItems[lang]} onClick={() => cart.set(dish.id, qty + 1)} className="grid h-10 w-10 place-items-center rounded-full">
          <IconPlus size={16} />
        </button>
      </div>
    );
  return (
    <button type="button" onClick={() => cart.add(dish.id)} className={cn("btn btn--orange", size === "sm" ? "btn--sm" : "")}>
      <IconPlus size={16} />
      <span className="btn-roll">
        <span>{UI.addToCart[lang]}</span>
        <span aria-hidden="true">
          <IconCheck size={14} className="inline" /> {UI.added[lang]}
        </span>
      </span>
    </button>
  );
}

export function PriceTag({ dish, className }: { dish: WebDish; className?: string }) {
  const { lang } = useSite();
  const row = pdfRow(dish);
  if (!row) return <span className={cn("text-[14px] text-linha", className)}>{TX.n_onRequest[lang]}</span>;
  return (
    <span className={cn("flex flex-col items-end", className)}>
      <span className="font-display text-[19px] font-semibold tabular-nums">{priceText(row)}</span>
      <span className="text-[11px] uppercase tracking-[0.12em] text-linha">{COL_TITLE[row.col][lang]} · PDF</span>
    </span>
  );
}

export function DishRow({ dish, withAdd = true }: { dish: WebDish; withAdd?: boolean }) {
  const { lang } = useSite();
  const row = pdfRow(dish);
  const sub = dishSub(dish, lang);
  const t = thumbId(dish);
  const pic = t ? photo(t) : null;
  return (
    <li id={dish.id} className="flex items-center gap-4 py-4">
      {pic && <img src={pic.cut?.src ?? pic.sm} alt={pic.alt[lang]} loading="lazy" decoding="async" width={pic.cut?.w ?? pic.w} height={pic.cut?.h ?? pic.h} className="h-16 w-16 shrink-0 object-contain drop-shadow-[0_10px_14px_rgba(43,26,18,0.3)]" />}
      <div className="min-w-0 flex-1">
        <p className="dish-name flex flex-wrap items-baseline gap-x-3">
          {dish.nr && <span className="font-display text-[14px] italic text-acento">{dish.nr}</span>}
          <span className="font-display text-[clamp(19px,1.4vw,23px)] font-semibold leading-tight">{dishName(dish, lang)}</span>
        </p>
        {sub && <p className="text-[14px] text-linha">{sub}</p>}
        {row && lang !== "pt" && lang !== "de" && row.deAlt !== row.de && <p className="text-[12px] text-linha/80">{row.pt}</p>}
      </div>
      <span className="leader hidden sm:block" />
      <PriceTag dish={dish} />
      {withAdd && <AddButton dish={dish} />}
    </li>
  );
}

export function MenuList({ filter, query = "", withAdd = true, limit }: { filter: Filter; query?: string; withAdd?: boolean; limit?: number }) {
  const { lang } = useSite();
  const q = fold(query.trim());
  const visible = useMemo(
    () =>
      SECTIONS.map((s) => ({
        ...s,
        items: s.items.filter((d) => {
          const row = pdfRow(d);
          if (filter !== "all" && row?.col !== filter) return false;
          if (q && !fold(`${d.de} ${d.pt}`).includes(q)) return false;
          return true;
        }),
      })).filter((s) => s.items.length),
    [filter, q],
  );
  let shown = 0;
  if (!visible.length) return <p className="py-10 text-center text-linha">{UI.noResults[lang]}</p>;
  return (
    <div className="space-y-10">
      {visible.map((s) => {
        if (limit && shown >= limit) return null;
        const items = limit ? s.items.slice(0, limit - shown) : s.items;
        shown += items.length;
        return (
          <section key={s.key} aria-labelledby={`sec-${s.key}`}>
            <h3 id={`sec-${s.key}`} className="flex items-baseline gap-3 border-b-2 border-marca pb-2 font-display text-[clamp(24px,2vw,32px)] font-semibold">
              {SECTION_TITLE[s.key][lang]}
              <span className="font-body text-[13px] font-normal text-linha">{s.items.length}</span>
            </h3>
            <ul className="list-none divide-y divide-marca/10">
              {items.map((d) => (
                <DishRow key={d.id} dish={d} withAdd={withAdd} />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

export function PdfLink({ className }: { className?: string }) {
  const { lang } = useSite();
  return (
    <a href={BUSINESS.pdf} target="_blank" rel="noopener noreferrer" className={cn("btn btn--ghost btn--sm", className)}>
      <IconDoc size={16} />
      <span className="btn-roll">
        <span>{TX.n_pdfLink[lang]}</span>
        <span aria-hidden="true">{TX.n_pdfLink[lang]}</span>
      </span>
      <span className="sr-only">{UI.externalNew[lang]}</span>
    </a>
  );
}

export function SearchBox({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const { lang } = useSite();
  return (
    <label className="flex h-11 items-center gap-2 rounded-full bg-branco px-4 shadow-[inset_0_0_0_1px_rgba(81,53,40,0.15)]">
      <IconSearch size={18} className="text-linha" />
      <input type="search" value={value} onChange={(e) => onChange(e.target.value)} placeholder={UI.searchDish[lang]} aria-label={UI.searchDish[lang]} className="w-40 bg-transparent text-[15px] outline-none placeholder:text-linha sm:w-56" />
    </label>
  );
}
export { DISHES };
export function useFilterState() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  return { filter, setFilter, query, setQuery };
}
