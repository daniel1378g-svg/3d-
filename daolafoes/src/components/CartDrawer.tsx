// The cart drawer: the lines with − / + / remove, the sum of the priced dishes (per-kg and on-request dishes
// are listed without a figure), the test-mode line, "Zur Kasse" (the Warenkorb page) and "Weiter einkaufen".
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import * as Dialog from "@radix-ui/react-dialog";
import { useReturnFocus } from "@/lib/useReturnFocus";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { TX } from "@/content/site";
import { cart, useCart } from "@/lib/cart";
import { dishById, dishName, money, pdfRow, priceNumber, priceText } from "@/content/menu";
import { IconClose, IconMinus, IconPlus } from "./icons";

export function cartTotal(lines: { id: string; qty: number }[]) {
  let total = 0;
  let unpriced = 0;
  for (const l of lines) {
    const d = dishById(l.id);
    const p = d ? priceNumber(pdfRow(d)) : null;
    if (p === null) unpriced += l.qty;
    else total += p * l.qty;
  }
  return { total, unpriced };
}

export function CartLines({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { lang } = useSite();
  const lines = useCart();
  const reduce = useReducedMotion();
  if (!lines.length) return <p className={tone === "light" ? "text-linha" : "text-fundo/75"}>{TX.n_cartEmpty[lang]}</p>;
  return (
    <ul className="list-none divide-y divide-current/10">
      <AnimatePresence initial={false}>
        {lines.map((l) => {
          const d = dishById(l.id);
          if (!d) return null;
          const row = pdfRow(d);
          const price = priceNumber(row);
          return (
            <motion.li key={l.id} layout initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, x: 24 }} className="flex items-center gap-3 py-3">
              <div className="min-w-0 flex-1">
                <p className="dish-name font-display text-[18px] font-semibold leading-tight">{dishName(d, lang)}</p>
                <p className={`text-[13px] ${tone === "light" ? "text-linha" : "text-fundo/70"}`}>{row ? priceText(row) : TX.n_onRequest[lang]}{price === null && row ? ` · ${TX.n_onRequest[lang]}` : ""}</p>
              </div>
              <div className={`flex items-center rounded-full ${tone === "light" ? "bg-fundo" : "bg-branco/10"}`}>
                <button type="button" aria-label={UI.fewerItems[lang]} onClick={() => cart.set(l.id, l.qty - 1)} className="grid h-10 w-10 place-items-center rounded-full">
                  <IconMinus size={16} />
                </button>
                <span className="min-w-6 text-center font-display text-[18px] font-semibold" aria-live="polite">
                  {l.qty}
                </span>
                <button type="button" aria-label={UI.moreItems[lang]} onClick={() => cart.set(l.id, l.qty + 1)} className="grid h-10 w-10 place-items-center rounded-full">
                  <IconPlus size={16} />
                </button>
              </div>
              <p className="w-20 text-right font-display text-[17px] font-semibold tabular-nums">{price === null ? "–" : money(price * l.qty)}</p>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </ul>
  );
}

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang, go, href } = useSite();
  const reduce = useReducedMotion();
  const returnFocus = useReturnFocus(open);
  const lines = useCart();
  const { total, unpriced } = cartTotal(lines);
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay forceMount asChild>
              <motion.div className="fixed inset-0 z-[450] bg-marca-escura/55 backdrop-blur-[3px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />
            </Dialog.Overlay>
            <Dialog.Content forceMount onCloseAutoFocus={returnFocus} asChild aria-describedby="cart-desc">
              <motion.div
                style={{ top: "var(--label-h)" }}
                className="fixed bottom-0 right-0 z-[460] flex w-full max-w-[520px] flex-col overflow-hidden bg-fundo text-marca shadow-[-30px_0_60px_-30px_rgba(43,26,18,0.7)] sm:rounded-l-[28px]"
                initial={reduce ? { opacity: 0 } : { x: "100%" }}
                animate={reduce ? { opacity: 1 } : { x: "0%" }}
                exit={reduce ? { opacity: 0 } : { x: "100%" }}
                transition={{ duration: reduce ? 0.15 : 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex-1 overflow-y-auto px-6 pb-10 pt-8 sm:px-8">
                  <div className="flex items-start justify-between gap-4">
                    <Dialog.Title className="fs-l font-display font-semibold leading-none">{TX.n_cartTitle[lang]}</Dialog.Title>
                    <Dialog.Close asChild>
                      <button type="button" aria-label={UI.close[lang]} className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-branco text-marca shadow-[inset_0_0_0_1px_rgba(81,53,40,0.15)] transition active:scale-95">
                        <IconClose size={22} />
                      </button>
                    </Dialog.Close>
                  </div>
                  <p id="cart-desc" className="mt-3 rounded-[14px] bg-suave px-4 py-3 text-[14px] text-marca">
                    {TX.n_cartLine[lang]}
                  </p>
                  <div className="mt-5 rounded-[20px] bg-branco p-4">
                    <CartLines />
                  </div>
                  {lines.length > 0 && (
                    <div className="mt-5 flex items-baseline justify-between border-t border-marca/15 pt-4">
                      <p className="eyebrow text-linha">{TX.n_cartTotal[lang]}</p>
                      <p className="font-display text-[28px] font-semibold tabular-nums">{money(total)}</p>
                    </div>
                  )}
                  {unpriced > 0 && <p className="mt-2 text-[13px] text-linha">{TX.n_cartOnRequest[lang]}</p>}
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={href("warenkorb")}
                      onClick={(e) => {
                        e.preventDefault();
                        onClose();
                        setTimeout(() => go("warenkorb"), 120);
                      }}
                      className="btn"
                      aria-disabled={!lines.length}
                    >
                      <span className="btn-roll">
                        <span>{TX.n_cartToCheckout[lang]}</span>
                        <span aria-hidden="true">{TX.n_cartToCheckout[lang]}</span>
                      </span>
                    </a>
                    <a
                      href={href("takeaway")}
                      onClick={(e) => {
                        e.preventDefault();
                        onClose();
                        setTimeout(() => go("takeaway"), 120);
                      }}
                      className="btn btn--soft"
                    >
                      <span className="btn-roll">
                        <span>{TX.n_cartContinue[lang]}</span>
                        <span aria-hidden="true">{TX.n_cartContinue[lang]}</span>
                      </span>
                    </a>
                    {lines.length > 0 && (
                      <button type="button" onClick={() => cart.clear()} className="link ml-auto self-center text-[14px] text-linha">
                        {UI.emptyCart[lang]}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
