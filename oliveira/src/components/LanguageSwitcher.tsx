import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { HTML_LANG, LANGS, NATIVE, UI } from "@/i18n";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";

/** Native language names, no flags. Switching keeps the visitor on the same page and section. */
export function LanguageSwitcher({ tone = "light", inline = false, compact = false }: { tone?: "light" | "dark"; inline?: boolean; compact?: boolean }) {
  const { lang, requestLanguage, switching } = useSite();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !box.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (inline)
    return (
      <ul className="flex flex-wrap gap-x-5 gap-y-2" aria-label={UI.language[lang]}>
        {LANGS.map((l) => (
          <li key={l}>
            <button
              type="button"
              lang={HTML_LANG[l]}
              aria-current={l === lang ? "true" : undefined}
              disabled={switching}
              onClick={() => requestLanguage(l)}
              className={cn("text-[15px] font-semibold underline-offset-4 hover:underline", l === lang ? (tone === "dark" ? "text-leaf-light" : "text-leaf") : "opacity-80")}
            >
              {NATIVE[l]}
            </button>
          </li>
        ))}
      </ul>
    );

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={id}
        disabled={switching}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-10 items-center rounded-full text-sm font-semibold transition-colors",
          compact ? "gap-1.5 px-3 uppercase tracking-wide sm:h-11" : "gap-2 px-3.5",
          tone === "light" ? "text-charcoal ring-1 ring-charcoal/20 hover:ring-charcoal/50" : "text-linen ring-1 ring-linen/35 hover:ring-linen/70",
        )}
      >
        <span className="sr-only">{UI.language[lang]}: </span>
        {compact ? (
          <span aria-hidden="true">{lang}</span>
        ) : (
          <span lang={HTML_LANG[lang]}>{NATIVE[lang]}</span>
        )}
        {compact && <span className="sr-only" lang={HTML_LANG[lang]}>{NATIVE[lang]}</span>}
        <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true" className={cn("transition-transform", open && "rotate-180")}>
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            id={id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(-6px) scale(0.97)" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px) scale(1)" }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
            className="absolute right-0 top-12 z-50 w-48 origin-top-right overflow-hidden rounded-2xl bg-linen p-1.5 text-charcoal shadow-lift ring-1 ring-charcoal/10"
          >
            {LANGS.map((l) => (
              <li key={l}>
                <button
                  type="button"
                  lang={HTML_LANG[l]}
                  aria-current={l === lang ? "true" : undefined}
                  onClick={() => {
                    setOpen(false);
                    requestLanguage(l);
                  }}
                  className={cn("flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[15px] font-semibold hover:bg-linen-deep", l === lang && "text-leaf")}
                >
                  <span className="flex items-center gap-3">
                    <span aria-hidden="true" className="w-6 text-xs font-bold uppercase tracking-wide text-charcoal/50">{l}</span>
                    {NATIVE[l]}
                  </span>
                  {l === lang && <span aria-hidden="true" className="h-2 w-2 rounded-full bg-olive" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
