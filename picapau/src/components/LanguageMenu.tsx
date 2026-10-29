// The language menu at the top of every page (inside the header's glass pill), plus the two other ways to
// switch language: the pills in the mobile menu and the plain links in the footer. All three go through
// the welcome slide (requestLanguage).
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { HTML_LANG, LANGS, NATIVE, WELCOME, pathFor } from "@/i18n";
import { copy } from "@/copy";
import { useSite } from "@/site";
import { cn, EASE_OUT } from "@/lib/utils";

export function LanguageMenu({ round = false }: { round?: boolean }) {
  const { lang: current, requestLanguage, switching } = useSite();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const listId = round ? "language-list-m" : "language-list";

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
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
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
        aria-label={`Langue · Language · Idioma · Lingua · Sprache: ${current.toUpperCase()} – ${NATIVE[current]}`}
        disabled={switching}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-11 min-w-11 cursor-pointer items-center justify-center gap-1.5 rounded-full font-display text-sm font-semibold tracking-[0.14em] text-tinta shadow-[inset_0_0_0_1.5px_rgba(28,23,18,0.2)]",
          round ? "h-[46px] w-[46px] px-0" : "px-3.5",
        )}
      >
        <span className="pl-[0.14em]">{current.toUpperCase()}</span>
        <svg aria-hidden="true" viewBox="0 0 12 12" width="10" height="10" className={cn("transition-transform duration-200", open && "rotate-180")}>
          <path d="M2 4.5 6 8.5 10 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            initial={{ opacity: 0, scale: 0.96, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -6 }}
            transition={reduce ? { duration: 0 } : { duration: 0.22, ease: EASE_OUT }}
            className="absolute right-0 top-full z-50 mt-3 w-[min(16rem,calc(100vw-32px))] origin-top-right list-none rounded-3xl bg-[color-mix(in_srgb,var(--nata)_92%,transparent)] p-2 text-tinta shadow-[0_24px_48px_-24px_rgba(11,13,16,0.6),inset_0_0_0_1px_rgba(28,23,18,0.08)] backdrop-blur-md"
          >
            {LANGS.map((code) => (
              <li key={code}>
                <button
                  type="button"
                  lang={HTML_LANG[code]}
                  aria-current={code === current ? "true" : undefined}
                  onClick={() => {
                    setOpen(false);
                    requestLanguage(code);
                  }}
                  className={cn(
                    "group flex min-h-12 w-full cursor-pointer items-center gap-4 rounded-full px-4 py-3 text-left outline-offset-0",
                    code === current ? "bg-tinta text-branco" : "hover:bg-black/5 focus-visible:bg-black/5",
                  )}
                >
                  <span className="w-7 font-display text-sm font-semibold tracking-[0.14em] opacity-70">{code.toUpperCase()}</span>
                  <span className="relative block h-[1.4em] flex-1 overflow-hidden leading-[1.4em]">
                    <span className="block transition-transform duration-300 ease-[var(--ease-out)] group-hover:-translate-y-full group-focus-visible:-translate-y-full motion-reduce:transition-none">
                      {NATIVE[code]}
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 translate-y-full font-display font-semibold uppercase tracking-[0.06em] transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:transition-none"
                    >
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
export function LanguagePills({ onPicked }: { onPicked?: () => void }) {
  const { lang: current, requestLanguage } = useSite();
  const reduce = useReducedMotion();
  return (
    <div role="group" aria-label={copy(current).ui.language} className="flex flex-wrap gap-1 rounded-full p-1 shadow-[inset_0_0_0_1px_rgba(255,250,242,0.3)]">
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          lang={HTML_LANG[code]}
          aria-current={code === current ? "true" : undefined}
          onClick={() => {
            if (code === current) return;
            onPicked?.();
            requestLanguage(code);
          }}
          className={cn("relative isolate min-h-11 cursor-pointer rounded-full px-3.5 font-display text-[15px] font-semibold uppercase tracking-[0.1em]", code === current ? "text-tinta" : "text-branco")}
        >
          {code === current && (
            <motion.span layoutId="lang-pill-panel" className="absolute inset-0 -z-10 rounded-full bg-dourado" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 480, damping: 38 }} />
          )}
          <span aria-hidden="true">{code.toUpperCase()}</span>
          <span className="sr-only">{NATIVE[code]}</span>
        </button>
      ))}
    </div>
  );
}

/** The five languages as plain links (footer); each still plays the welcome slide. */
export function LanguageLinks({ className }: { className?: string }) {
  const { lang: current, page, requestLanguage } = useSite();
  return (
    <ul className={cn("flex list-none flex-wrap gap-x-5 gap-y-1 p-0", className)} aria-label={copy(current).ui.language}>
      {LANGS.map((code) => (
        <li key={code}>
          <a
            href={__ARTIFACT__ ? `#${code}` : pathFor(code, page)}
            hrefLang={HTML_LANG[code]}
            lang={HTML_LANG[code]}
            aria-current={code === current ? "true" : undefined}
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
              e.preventDefault();
              requestLanguage(code);
            }}
            className={cn("link-line", code === current ? "text-dourado" : "")}
          >
            {NATIVE[code]}
          </a>
        </li>
      ))}
    </ul>
  );
}
