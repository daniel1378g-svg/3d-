import { useSite } from "@/site";
import { useArticles } from "@/content/articles";
import { PageHero } from "@/components/PageHero";
import { ArticleBody } from "@/components/ArticleBody";
import { AboutStatement } from "@/components/home/AboutStatement";
import { Gallery } from "@/components/home/Gallery";

export function Ueber() {
  const { t, lang } = useSite();
  const a = useArticles(lang)?.about;
  return (
    <>
      <PageHero kicker={t.about.kicker} title={a?.title ?? t.about.title} lead={t.about.lead} image="restaurant" />
      <section className="skin-creme py-20 md:py-28"><div className="gutter"><div className="mx-auto max-w-[760px]">{a && <ArticleBody blocks={a.blocks.filter((b) => b.t !== "p" || b.text !== t.about.lead)} />}</div></div></section>
      <AboutStatement />
      <Gallery />
    </>
  );
}
