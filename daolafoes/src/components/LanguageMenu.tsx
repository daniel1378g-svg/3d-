// The language menu at the top of every page: inside the header's glass pill (a round button on phones).
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { HTML_LANG, LANGS, NATIVE, UI, WELCOME, type Lang } from "@/i18n";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";

export function LanguageMenu({ compact = false }: { compact?: boolean }) {
  const { lang: current, requestLanguage, switching } = useSite();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);

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
      // arrow keys move between the languages
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        const items = [...(list.current?.querySelectorAll<HTMLButtonElement>("button") ?? [])];
        const i = items.indexOf(document.activeElement as HTMLButtonElement);
        const next = items[(i + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length];
        next?.focus();
        e.preventDefault();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    // focus the current language when the list opens
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
        aria-controls="language-list"
        aria-label={`${current.toUpperCase()} · Langue · Language · Idioma · Lingua · Sprache`}
        disabled={switching}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center justify-center gap-1.5 rounded-full font-body text-sm font-semibold tracking-[0.14em] text-marca transition-colors hover:bg-marca/5",
          compact ? "h-11 w-11 bg-branco shadow-[inset_0_0_0_1px_rgba(81,53,40,0.2)]" : "h-11 min-w-11 px-3 shadow-[inset_0_0_0_1px_rgba(81,53,40,0.18)]",
        )}
      >
        {current.toUpperCase()}
        {!compact && (
          <span aria-hidden="true" className={cn("text-[10px] transition-transform duration-200", open && "rotate-180")}>
            ▾
          </span>
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            ref={list}
            id="language-list"
            aria-label={UI.languages[current]}
            initial={{ opacity: 0, scale: 0.96, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -6 }}
            transition={reduce ? { duration: 0 } : { duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="glass absolute right-0 top-full z-50 mt-3 w-64 origin-top-right list-none rounded-3xl p-2 text-marca"
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
                  className={cn(
                    "group flex w-full items-center gap-4 rounded-full px-4 py-3 text-left outline-offset-0",
                    code === current ? "bg-marca text-fundo" : "hover:bg-marca/5 focus-visible:bg-marca/5",
                  )}
                >
                  <span className="w-7 font-body text-sm font-semibold tracking-[0.14em] opacity-70">{code.toUpperCase()}</span>
                  <span className="relative flex-1 overflow-hidden">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full group-focus-visible:-translate-y-full motion-reduce:transition-none">{NATIVE[code]}</span>
                    <span aria-hidden="true" className="absolute inset-0 translate-y-full font-display font-semibold italic transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:transition-none">
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

/** The five languages as pills with a sliding gold pill (mobile menu). */
export function LanguagePills({ layoutId = "lang-pill", className, tone = "dark" }: { layoutId?: string; className?: string; tone?: "dark" | "light" }) {
  const { lang, requestLanguage } = useSite();
  return (
    <div role="group" aria-label={UI.languages[lang]} className={cn("inline-flex flex-wrap gap-1 rounded-full p-1", tone === "dark" ? "bg-branco/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25)]" : "bg-marca/5", className)}>
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          lang={HTML_LANG[code]}
          aria-pressed={code === lang}
          onClick={() => requestLanguage(code)}
          className={cn("relative rounded-full px-4 py-2.5 font-body text-[14px] font-semibold uppercase tracking-[0.1em]", code === lang ? "text-branco" : tone === "dark" ? "text-fundo" : "text-marca")}
        >
          {code === lang && <motion.span layoutId={layoutId} className="absolute inset-0 rounded-full bg-destaque" transition={{ type: "spring", stiffness: 480, damping: 38 }} />}
          <span className="relative">{NATIVE[code]}</span>
        </button>
      ))}
    </div>
  );
}
