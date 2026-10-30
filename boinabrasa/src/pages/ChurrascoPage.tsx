import { useSite } from "@/site";
import { useArticles } from "@/content/articles";
import { PageHero } from "@/components/PageHero";
import { ArticleBody } from "@/components/ArticleBody";
import { RodizioStory } from "@/components/home/RodizioStory";

export function ChurrascoPage() {
  const { t, lang, openBooking } = useSite();
  const a = useArticles(lang)?.churrasco;
  return (
    <>
      <PageHero kicker={t.nav.churrasco} title={a?.title ?? t.nav.churrasco} image="gaucho_am_feuer" />
      <section className="skin-creme py-20 md:py-28"><div className="gutter"><div className="mx-auto max-w-[760px]">
        {a && <ArticleBody blocks={a.blocks} />}
        <button type="button" className="pill mt-10" onClick={() => openBooking()}>{t.cta.reserveNow}</button>
      </div></div></section>
      <RodizioStory />
    </>
  );
}
