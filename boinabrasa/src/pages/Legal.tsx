// Impressum, Datenschutzerklärung, AGB: the live site's texts unchanged — German, and the site's own English versions.
// The other languages show the German text with a note (legal texts are not machine-translated here).
import { useState } from "react";
import legal from "@content/legal.json";
import { useSite } from "@/site";
import { PageHero } from "@/components/PageHero";
import { ArticleBody } from "@/components/ArticleBody";
import type { Block } from "@/content/articles";

type Doc = { title: string; blocks: Block[] };
const LEGAL = legal as Record<"impressum" | "agb" | "datenschutz", { de: Doc; en: Doc }>;

function LegalPage({ k }: { k: "impressum" | "agb" | "datenschutz" }) {
  const { t, lang } = useSite();
  const [en, setEn] = useState(lang === "en");
  const doc = LEGAL[k][en ? "en" : "de"];
  const title = { impressum: t.nav.impressum, agb: t.nav.agb, datenschutz: t.nav.datenschutz }[k];
  return (
    <>
      <PageHero kicker={t.footer.groups.company} title={title} />
      <section className="skin-creme py-16 md:py-24"><div className="gutter"><div className="mx-auto max-w-[820px]">
        <div className="mb-10 rounded-[20px] bg-creme-2 p-5 text-sm text-tinta/80">
          {lang !== "de" && lang !== "en" && <p>{t.legal.germanOnly} {t.legal.reference}</p>}
          <p className="mt-1">{t.legal.proposalNote}</p>
          {(k !== "impressum") && (
            <button type="button" className="chip mt-3 text-tinta" onClick={() => setEn(!en)}>{en ? t.legal.showGerman : t.legal.showEnglish}</button>
          )}
        </div>
        <div lang={en ? "en" : "de-CH"}>
          <h2 className="display mb-6 text-[clamp(2.4rem,5vw,4rem)] text-vinho">{doc.title}</h2>
          <ArticleBody blocks={doc.blocks} />
        </div>
      </div></div></section>
    </>
  );
}
export const Impressum = () => <LegalPage k="impressum" />;
export const Datenschutz = () => <LegalPage k="datenschutz" />;
export const Agb = () => <LegalPage k="agb" />;
