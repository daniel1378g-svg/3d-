import { HTML_LANG } from "@/i18n";
import { DATENSCHUTZ, IMPRESSUM } from "@/legal";
import { useSite } from "@/site";

/** Impressum (German verbatim, courtesy translations) and the draft privacy notice: quiet and readable. */
export function Legal({ page }: { page: "impressum" | "datenschutz" }) {
  const { lang } = useSite();
  const doc = (page === "impressum" ? IMPRESSUM : DATENSCHUTZ)[lang];
  return (
    <article className="linen gutter pb-24 pt-[calc(var(--header-h)+var(--label-h)+56px)]">
      <div className="wrap max-w-[760px]">
        <h1 className="display text-[clamp(2.2rem,6vw,4.4rem)] font-semibold leading-none text-charcoal [hyphens:auto]">{doc.title}</h1>
        {doc.note && <p className="mt-5 inline-block rounded-full bg-gold/25 px-4 py-1.5 text-sm font-semibold text-charcoal">{doc.note}</p>}
        <div className="mt-12 space-y-10">
          {doc.blocks.map((b) => (
            <section key={b.h}>
              <h2 className="display text-2xl font-semibold text-leaf">{b.h}</h2>
              <div className="mt-3 space-y-1 text-[17px] leading-relaxed text-charcoal/90 [overflow-wrap:anywhere] [hyphens:auto]">
                {b.p.map((line, i) => (
                  <p key={i} lang={page === "impressum" && lang !== "de" && b.p.length > 1 ? HTML_LANG.de : undefined}>
                    {line.includes("@") ? <a className="underline underline-offset-4" href={`mailto:${line}`}>{line}</a> : line}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
