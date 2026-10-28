import { useState, type ReactNode } from "react";
import { HTML_LANG, TEXT, UI } from "@/i18n";
import { CONTACT } from "@/content";
import { legalBlocks, type Block } from "@/legal";
import { useSite } from "@/site";

/** Turns the flat block list into headings, paragraphs, (nested) lists, the address and the contact table. */
function render(blocks: Block[]) {
  const out: ReactNode[] = [];
  let i = 0;
  while (i < blocks.length) {
    const b = blocks[i];
    if (b.k === "li") {
      const items: ReactNode[] = [];
      while (i < blocks.length && (blocks[i].k === "li" || blocks[i].k === "li2")) {
        const li = blocks[i];
        const nested: string[] = [];
        let j = i + 1;
        while (j < blocks.length && blocks[j].k === "li2") nested.push(blocks[j++].t);
        items.push(
          <li key={i}>
            {li.t}
            {nested.length > 0 && (
              <ul className="mt-2 list-[circle] space-y-1 pl-6">
                {nested.map((n, k) => (
                  <li key={k}>{n}</li>
                ))}
              </ul>
            )}
          </li>,
        );
        i = j;
      }
      out.push(
        <ul key={`ul${i}`} className="list-disc space-y-2 pl-6">
          {items}
        </ul>,
      );
      continue;
    }
    if (b.k === "dt") {
      const rows: ReactNode[] = [];
      while (i < blocks.length && blocks[i].k === "dt") {
        rows.push(
          <div key={i} className="contents">
            <dt className="font-semibold">{blocks[i].t}</dt>
            <dd>{blocks[i + 1]?.t}</dd>
          </div>,
        );
        i += 2;
      }
      out.push(
        <dl key={`dl${i}`} className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-[auto_1fr]">
          {rows}
        </dl>,
      );
      continue;
    }
    if (b.k === "h2") out.push(<h2 key={i} className="display pt-6 text-3xl text-cocoa">{b.t}</h2>);
    else if (b.k === "h3") out.push(<h3 key={i} className="pt-2 text-xl font-bold">{b.t}</h3>);
    else if (b.k === "addr") out.push(<p key={i} className="whitespace-pre-line rounded-2xl bg-flour-deep p-5">{b.t}</p>);
    else if (b.k === "link")
      out.push(
        <p key={i}>
          <a href={CONTACT[b.href as "localCh" | "searchCh"]} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-wheat decoration-2 underline-offset-4">
            {b.t}
          </a>
        </p>,
      );
    else out.push(<p key={i}>{b.t}</p>);
    i++;
  }
  return out;
}

/** Politique de confidentialité and Mentions légales: the French as written; elsewhere a marked courtesy translation. */
export function Legal({ page }: { page: "privacy" | "legal" }) {
  const { lang } = useSite();
  const [french, setFrench] = useState(false);
  const showFr = lang === "fr" || french;
  const blocks = legalBlocks(page, showFr ? "fr" : lang);
  return (
    <article className="gutter bg-flour pb-24 pt-[calc(var(--header-h)+var(--label-h)+56px)]">
      <div className="wrap max-w-[860px]">
        <h1 className="display text-[clamp(2.4rem,6vw,4.4rem)] leading-none text-cocoa">{page === "privacy" ? TEXT.privacy[lang] : TEXT.legal[lang]}</h1>
        {lang !== "fr" && (
          <div className="mt-6 flex flex-wrap items-center gap-4 rounded-2xl bg-custard/35 p-4 ring-1 ring-custard-deep/40">
            <p className="flex-1 text-[15px] font-semibold">{UI.legalCheck[lang]}</p>
            <button type="button" aria-pressed={french} onClick={() => setFrench((f) => !f)} className="btn btn-dark min-h-11">
              {french ? UI.showTranslation[lang] : UI.showFrench[lang]}
            </button>
          </div>
        )}
        <div lang={showFr ? "fr" : HTML_LANG[lang]} className="mt-10 space-y-5 text-[16.5px] leading-relaxed">
          {render(blocks)}
        </div>
      </div>
    </article>
  );
}
