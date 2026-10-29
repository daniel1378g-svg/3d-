// Protection des données: the live statement, verbatim in French; translated in the other languages with a line
// saying the French version is the reference. Plain and readable: no animation beyond the heading reveal.
import { HTML_LANG, UI } from "@/i18n";
import { useSite } from "@/site";
import { COOKIES, COOKIES_TITLE, COOKIE_HEAD, PRIVACY, PRIVACY_END, PRIVACY_TITLE } from "@/content/privacy";
import { SplitReveal } from "@/components/Reveal";

export default function PrivacyPage() {
  const { lang } = useSite();
  return (
    <>
      <section className="bg-marca pb-14 text-branco" style={{ paddingTop: "calc(var(--label-h) + 130px)" }}>
        <div className="container-x">
          <p className="eyebrow text-destaque">Luso Sabores</p>
          <SplitReveal as="h1" text={[PRIVACY_TITLE[lang]]} className="mt-4 max-w-[1100px] fs-xl font-extrabold" />
          {lang !== "fr" && <p className="mt-6 max-w-[760px] rounded-full bg-marca-escura/40 px-5 py-2.5 text-[15px]">{UI.privacyRef[lang]}</p>}
        </div>
      </section>
      <article lang={HTML_LANG[lang]} className="bg-fundo py-16 text-tinta md:py-24">
        <div className="container-x max-w-[880px] space-y-12">
          {PRIVACY.map((s) => (
            <section key={s.title.fr}>
              <h2 className="font-display text-[clamp(26px,2.4vw,36px)] font-extrabold normal-case text-marca">{s.title[lang]}</h2>
              <div className="mt-4 space-y-4">
                {(() => {
                  const out: React.ReactNode[] = [];
                  let list: React.ReactNode[] = [];
                  const flush = () => {
                    if (list.length) out.push(<ul key={`u${out.length}`} className="list-disc space-y-2 pl-6 marker:text-marca">{list}</ul>);
                    list = [];
                  };
                  s.blocks.forEach((b, i) => {
                    if (b.k === "li") return list.push(<li key={i}>{b.t[lang]}</li>);
                    flush();
                    if (b.k === "h3") out.push(<h3 key={i} className="pt-2 font-display text-[22px] font-bold uppercase text-acento-escuro">{b.t[lang]}</h3>);
                    else if (b.k === "addr") out.push(<address key={i} className="whitespace-pre-line rounded-[18px] bg-branco p-5 font-bold not-italic">{b.t[lang]}</address>);
                    else out.push(<p key={i}>{b.t[lang]}</p>);
                  });
                  flush();
                  return out;
                })()}
              </div>
            </section>
          ))}
          <section>
            <h2 className="font-display text-[clamp(26px,2.4vw,36px)] font-extrabold normal-case text-marca">{COOKIES_TITLE[lang]}</h2>
            <p className="mt-3 text-[15px] text-linha">{UI.privacyOld[lang]}</p>
            <div className="mt-6 space-y-8">
              {COOKIES.map((c) => (
                <div key={c.cat.fr}>
                  <h3 className="font-display text-[22px] font-bold uppercase text-acento-escuro">{c.cat[lang]}</h3>
                  {c.rows.length ? (
                    <div className="mt-3 overflow-x-auto rounded-[18px] bg-branco">
                      <table className="w-full min-w-[640px] text-left text-[15px]">
                        <thead className="font-display text-[13px] uppercase tracking-[0.12em] text-linha">
                          <tr>
                            {(["name", "domain", "expiry", "purpose"] as const).map((k) => (
                              <th key={k} scope="col" className="px-4 py-3 font-semibold">
                                {COOKIE_HEAD[k][lang]}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-tinta/10">
                          {c.rows.map((r) => (
                            <tr key={r.name} className="align-top">
                              <td className="px-4 py-3 font-bold [overflow-wrap:anywhere]">{r.name}</td>
                              <td className="px-4 py-3 [overflow-wrap:anywhere]">{r.domain}</td>
                              <td className="px-4 py-3">{r.expiry[lang]}</td>
                              <td className="px-4 py-3">{r.purpose[lang]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="mt-2">{c.none?.[lang]}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="font-display text-[clamp(26px,2.4vw,36px)] font-extrabold normal-case text-marca">{PRIVACY_END.title[lang]}</h2>
            <p className="mt-4">{PRIVACY_END.text[lang]}</p>
            <p className="mt-6 text-[14px] text-linha">{PRIVACY_END.copyright}</p>
          </section>
        </div>
      </article>
    </>
  );
}
