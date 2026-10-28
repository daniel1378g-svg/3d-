import { HTML_LANG, LANGS, NATIVE, UI, WELCOME } from "@/i18n";
import { useSite } from "@/site";
import { Reveal } from "./Reveal";

/**
 * Right under the hero: five big buttons in their own language. Hovering or focusing one flips it to its
 * welcome word; clicking plays the welcome slide and switches the whole site.
 */
export function LanguageChooser() {
  const { lang, requestLanguage, switching } = useSite();
  return (
    <section id="langues" aria-labelledby="chooser-title" className="dust gutter bg-flour py-14 md:py-20">
      <Reveal className="wrap flex flex-col items-center gap-7 text-center">
        <h2 id="chooser-title" className="kicker">
          {UI.chooserTitle[lang]}
        </h2>
        <nav aria-label={UI.chooserLabel}>
          <ul className="flex flex-wrap justify-center gap-3">
            {LANGS.map((code) => (
              <li key={code}>
                <button
                  type="button"
                  lang={HTML_LANG[code]}
                  aria-current={code === lang ? "true" : undefined}
                  disabled={switching}
                  onClick={() => requestLanguage(code)}
                  data-cursor="view"
                  className="group relative h-14 min-w-40 overflow-hidden rounded-full border-[1.5px] border-espresso px-7 text-lg font-semibold text-espresso transition-colors hover:bg-custard aria-[current=true]:bg-espresso aria-[current=true]:text-flour md:h-16 md:min-w-44 md:text-xl"
                >
                  <span className="block transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-[150%] group-focus-visible:-translate-y-[150%] motion-reduce:transition-none">
                    {NATIVE[code]}
                  </span>
                  <span
                    aria-hidden="true"
                    className="display absolute inset-0 grid translate-y-full place-items-center text-[1.35em] transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:transition-none"
                  >
                    {WELCOME[code].word}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </Reveal>
    </section>
  );
}
