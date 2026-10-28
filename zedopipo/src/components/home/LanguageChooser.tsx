import { HTML_LANG, LANGS, NATIVE, UI, WELCOME } from "@/i18n";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";

/** Five big buttons, one per language. Hover or focus flips a card to its "welcome". */
export function LanguageChooser() {
  const { lang, requestLanguage, switching } = useSite();
  return (
    <section aria-labelledby="chooser-title" className="on-light gutter border-b border-charcoal/10 bg-linen-2 py-10 md:py-14">
      <div className="wrap">
        <h2 id="chooser-title" className="text-center text-xs font-bold uppercase tracking-[0.22em] text-bordeaux">
          {UI.chooserLabel}
        </h2>
        <ul className="mx-auto mt-6 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {LANGS.map((l, i) => {
            const current = l === lang;
            return (
              <li key={l} className={cn(i === 4 && "max-sm:col-span-2")}>
                <button
                  type="button"
                  lang={HTML_LANG[l]}
                  disabled={switching}
                  aria-current={current ? "true" : undefined}
                  onClick={() => requestLanguage(l)}
                  className="group block h-24 w-full rounded-2xl [perspective:900px] md:h-28"
                >
                  <span className="sr-only">
                    {NATIVE[l]}
                    {current ? ` (${UI.current[lang]})` : ""}
                  </span>
                  <span
                    aria-hidden="true"
                    className="relative block h-full w-full transition-transform duration-500 ease-out-expo [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)] motion-reduce:group-hover:[transform:none] motion-reduce:group-focus-visible:[transform:none]"
                  >
                    <span
                      className={cn(
                        "absolute inset-0 flex flex-col items-center justify-center rounded-2xl border-2 [backface-visibility:hidden]",
                        current ? "border-bordeaux bg-bordeaux text-linen" : "border-charcoal/12 bg-linen text-charcoal",
                      )}
                    >
                      <span className="font-display text-2xl font-bold tracking-tight md:text-[1.7rem]">{NATIVE[l]}</span>
                      <span className={cn("mt-1 text-[11px] font-bold uppercase tracking-[0.2em]", current ? "text-gold" : "text-ink-soft")}>{l}</span>
                    </span>
                    <span className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-ember text-charcoal [backface-visibility:hidden] [transform:rotateY(180deg)] motion-reduce:hidden">
                      <span className="font-display text-2xl font-extrabold tracking-tight md:text-[1.7rem]">{WELCOME[l].word}</span>
                      <span className="mt-1 text-xs font-semibold">{WELCOME[l].line}</span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
