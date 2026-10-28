import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { HTML_LANG, LANGS, NATIVE, UI } from "@/i18n";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";

/** Native language names, no flags. Switching keeps the visitor on the same page. */
export function LanguageSwitcher({ inline = false, tone = "dark" }: { inline?: boolean; tone?: "dark" | "light" }) {
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
      <ul className="flex flex-wrap gap-2" aria-label={UI.language[lang]}>
        {LANGS.map((l) => (
          <li key={l}>
            <button
              type="button"
              lang={HTML_LANG[l]}
              aria-current={l === lang ? "true" : undefined}
              disabled={switching}
              onClick={() => requestLanguage(l)}
              className={cn(
                "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors",
                tone === "dark"
                  ? l === lang ? "border-gold bg-gold text-charcoal" : "border-linen/35 text-linen hover:border-linen"
                  : l === lang ? "border-bordeaux bg-bordeaux text-linen" : "border-charcoal/20 text-charcoal hover:border-bordeaux",
              )}
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
        className="inline-flex h-11 items-center gap-2 rounded-full border border-linen/40 px-3.5 text-sm font-bold text-linen transition-colors hover:border-linen hover:bg-linen/10"
      >
        <span className="sr-only">{UI.language[lang]}: </span>
        <span lang={HTML_LANG[lang]}>{NATIVE[lang]}</span>
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
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="on-light absolute right-0 top-13 z-50 w-48 origin-top-right overflow-hidden rounded-2xl border border-charcoal/10 bg-linen p-1.5 shadow-[0_18px_40px_-16px_rgba(27,20,20,0.5)]"
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
                  className={cn("flex min-h-11 w-full items-center justify-between rounded-xl px-3.5 text-left text-[15px] font-semibold text-charcoal hover:bg-linen-2", l === lang && "text-bordeaux")}
                >
                  {NATIVE[l]}
                  {l === lang && <span aria-hidden="true" className="h-2 w-2 rounded-full bg-ember" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
