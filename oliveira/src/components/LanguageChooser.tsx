import { HTML_LANG, LANGS, NATIVE, UI, WELCOME } from "@/i18n";
import { useSite } from "@/site";

/** Home page, right under the hero: five big buttons that flip to their welcome word on hover or focus. */
export function LanguageChooser() {
  const { lang, requestLanguage, switching } = useSite();
  return (
    <nav aria-label={UI.chooserLabel} className="linen gutter py-10 md:py-14">
      <ul className="wrap flex flex-wrap justify-center gap-3">
        {LANGS.map((code) => (
          <li key={code}>
            <button
              type="button"
              lang={HTML_LANG[code]}
              aria-current={code === lang ? "true" : undefined}
              disabled={switching}
              onClick={() => requestLanguage(code)}
              className="group relative h-14 min-w-40 overflow-hidden rounded-full border-[1.5px] border-charcoal/70 px-7 text-lg font-semibold text-charcoal transition-colors hover:border-leaf aria-[current=true]:border-leaf aria-[current=true]:bg-leaf aria-[current=true]:text-linen"
            >
              <span className="block transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-full group-focus-visible:-translate-y-full motion-reduce:transition-none">
                {NATIVE[code]}
              </span>
              <span
                aria-hidden="true"
                className="display absolute inset-0 grid translate-y-full place-items-center text-xl italic transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:transition-none"
              >
                {WELCOME[code].word}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
