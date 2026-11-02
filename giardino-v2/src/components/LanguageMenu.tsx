// The language menu in the header: a cream glass panel (opacity, scale .96 → 1, y −6 → 0 in .22 s). The current
// language is a dark pill; hovering or focusing a language rolls its name up and reveals its welcome word.
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { HTML_LANG, LANGS, NATIVE, UI, WELCOME, type Lang } from "@/i18n";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";
import { IconChevron } from "./icons";

export function LanguageMenu({ compact = false }: { compact?: boolean }) {
  const { lang: current, requestLanguage, switching } = useSite();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const listId = compact ? "language-list-compact" : "language-list";

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        const items = [...(list.current?.querySelectorAll<HTMLButtonElement>("button") ?? [])];
        const i = items.indexOf(document.activeElement as HTMLButtonElement);
        items[(i + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length]?.focus();
        e.preventDefault();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    requestAnimationFrame(() => list.current?.querySelector<HTMLButtonElement>('[aria-current="true"]')?.focus());
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={root} className="relative">
      <button
        ref={toggle}
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${current.toUpperCase()} · ${UI.language[current]}: ${NATIVE[current]}`}
        disabled={switching}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-11 items-center justify-center gap-1 rounded-full font-display text-[15px] font-semibold tracking-[0.14em] text-ink transition-colors hover:bg-ink/5",
          compact ? "w-11 bg-white shadow-[inset_0_0_0_1px_rgba(27,27,27,0.16)]" : "min-w-11 px-3 shadow-[inset_0_0_0_1px_rgba(27,27,27,0.16)]",
        )}
      >
        {current.toUpperCase()}
        {!compact && <IconChevron size={14} className={cn("transition-transform duration-200 ease-[var(--ease-out)]", open && "rotate-180")} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            ref={list}
            id={listId}
            aria-label={UI.languages[current]}
            initial={{ opacity: 0, scale: 0.96, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -6 }}
            transition={reduce ? { duration: 0 } : { duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="glass absolute right-0 top-full z-50 mt-3 w-64 origin-top-right list-none rounded-[28px] p-2 text-ink"
          >
            {LANGS.map((code: Lang) => (
              <li key={code}>
                <button
                  type="button"
                  lang={HTML_LANG[code]}
                  aria-current={code === current ? "true" : undefined}
                  onClick={() => {
                    setOpen(false);
                    toggle.current?.focus();
                    requestLanguage(code);
                  }}
                  className={cn("group flex min-h-12 w-full items-center gap-4 rounded-full px-4 py-3 text-left outline-offset-0", code === current ? "bg-ink text-white" : "hover:bg-ink/5 focus-visible:bg-ink/5")}
                >
                  <span className="w-7 font-display text-sm font-semibold tracking-[0.14em] opacity-70">{code.toUpperCase()}</span>
                  <span className="relative flex-1 overflow-hidden">
                    <span className="block transition-transform duration-300 ease-[var(--ease-out)] group-hover:-translate-y-full group-focus-visible:-translate-y-full motion-reduce:transition-none">{NATIVE[code]}</span>
                    <span aria-hidden="true" className="absolute inset-0 translate-y-full font-display font-semibold uppercase tracking-[0.06em] transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:transition-none">
                      {WELCOME[code].word}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/** The four languages as pills with a sliding gold pill (mobile menu, footer). */
export function LanguagePills({ layoutId = "lang-pill", className, tone = "dark" }: { layoutId?: string; className?: string; tone?: "dark" | "light" }) {
  const { lang, requestLanguage } = useSite();
  return (
    <div role="group" aria-label={UI.languages[lang]} className={cn("inline-flex flex-wrap gap-1 rounded-full p-1", tone === "dark" ? "bg-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25)]" : "bg-ink/5", className)}>
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          lang={HTML_LANG[code]}
          aria-pressed={code === lang}
          onClick={() => requestLanguage(code)}
          className={cn("relative min-h-11 rounded-full px-4 py-2.5 font-display text-[15px] font-semibold uppercase tracking-[0.1em]", code === lang ? "text-ink" : tone === "dark" ? "text-white" : "text-ink")}
        >
          {code === lang && <motion.span layoutId={layoutId} className="absolute inset-0 rounded-full bg-gold" transition={{ type: "spring", stiffness: 480, damping: 38 }} />}
          <span className="relative">{NATIVE[code]}</span>
        </button>
      ))}
    </div>
  );
}
