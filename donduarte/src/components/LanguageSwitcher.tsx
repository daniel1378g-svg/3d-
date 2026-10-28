import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { HTML_LANG, LANGS, NATIVE, UI } from "@/i18n";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";

/** Native language names, no flags. Switching keeps the visitor on the same page. */
export function LanguageSwitcher({ tone = "light", align = "right", inline = false }: { tone?: "light" | "dark"; align?: "left" | "right"; inline?: boolean }) {
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
      <ul className="flex flex-wrap gap-x-4 gap-y-2" aria-label={UI.language[lang]}>
        {LANGS.map((l) => (
          <li key={l}>
            <button
              type="button"
              lang={HTML_LANG[l]}
              aria-current={l === lang ? "true" : undefined}
              disabled={switching}
              onClick={() => requestLanguage(l)}
              className={cn("text-sm font-semibold underline-offset-4 hover:underline", l === lang ? (tone === "dark" ? "text-gold" : "text-green") : "opacity-80")}
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
          "inline-flex h-10 items-center gap-2 rounded-full border px-3.5 text-sm font-bold transition-colors",
          tone === "light" ? "border-ink/15 text-ink hover:border-red hover:text-red" : "border-white/40 text-white hover:border-red hover:bg-red",
        )}
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
            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(-6px) scale(0.98)" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px) scale(1)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className={cn("on-light absolute top-12 z-50 w-48 origin-top overflow-hidden rounded-2xl border border-ink/10 bg-white p-1.5 shadow-[0_18px_40px_-16px_rgba(15,27,45,0.45)]", align === "right" ? "right-0" : "left-0")}
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
                  className={cn("flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-[15px] font-semibold text-ink hover:bg-green-soft", l === lang && "text-green")}
                >
                  {NATIVE[l]}
                  {l === lang && <span aria-hidden="true" className="h-2 w-2 rounded-full bg-red" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
