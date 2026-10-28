import { LOCALE, UI, fill } from "@/i18n";
import reviewsJson from "../../../content/reviews.json";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";
import { Reveal } from "../Reveal";

type Review = {
  author: string;
  rating: number;
  yearsAgo: number;
  localGuide: boolean;
  count: number;
  countIn?: string;
  translatedFrom?: string;
  reactions?: number;
  visit?: "dineInLunch";
  text: string;
  scores?: { food: number; service: number; atmosphere: number };
};
const REVIEWS = reviewsJson.reviews as Review[];
const GOOGLE = "https://www.google.com/maps/search/?api=1&query=Restaurante%20Oliveira%2C%20Stationsstrasse%203%2C%208406%20Winterthur";

function Stars({ n, label }: { n: number; label: string }) {
  return (
    <span role="img" aria-label={label} className="flex gap-0.5 text-gold">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className={i < n ? undefined : "opacity-25"}>
          <path fill="currentColor" d="M12 2.5l2.9 6.1 6.6.8-4.9 4.5 1.3 6.6L12 17.3l-5.9 3.2 1.3-6.6-4.9-4.5 6.6-.8z" />
        </svg>
      ))}
    </span>
  );
}

/** Five Google reviews, quoted as written; the labels around them follow the page's language. */
export function Reviews() {
  const { lang } = useSite();
  const ago = new Intl.RelativeTimeFormat(LOCALE[lang], { numeric: "always" });
  return (
    <section aria-labelledby="reviews-title" className="linen gutter py-24 md:py-32">
      <div className="wrap">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="kicker text-leaf">{UI.reviewsSource[lang]}</p>
            <h2 id="reviews-title" className="display mt-2 text-[clamp(2.4rem,5.6vw,4.8rem)] font-semibold leading-none text-charcoal">{UI.reviewsTitle[lang]}</h2>
            {lang !== "en" && <p className="mt-3 text-sm text-charcoal/65">{UI.reviewsNote[lang]}</p>}
          </div>
          <a href={GOOGLE} target="_blank" rel="noopener" className="btn btn-ghost text-charcoal">
            {UI.reviewsMore[lang]} ↗
          </a>
        </Reveal>
        <ul className="mt-12 columns-1 gap-5 md:columns-2 lg:columns-3">
          {REVIEWS.map((r, i) => (
            <li key={r.author} className="mb-5 break-inside-avoid">
              <Reveal delay={Math.min(i * 0.06, 0.3)}>
                <figure className="rounded-[22px] bg-white/70 p-6 shadow-set ring-1 ring-charcoal/5">
                  <div className="flex items-center justify-between gap-3">
                    <Stars n={r.rating} label={fill(UI.reviewStars[lang], { n: r.rating })} />
                    <span className="text-xs text-charcoal/60">{ago.format(-r.yearsAgo, "year")}</span>
                  </div>
                  {r.visit && <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-charcoal/55">{UI.reviewDineInLunch[lang]}</p>}
                  <blockquote lang="en" className={cn("mt-3 whitespace-pre-line text-charcoal", r.text.length < 40 ? "display text-3xl italic" : "text-[16.5px] leading-relaxed")}>
                    {r.text}
                  </blockquote>
                  {r.scores && (
                    <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-charcoal/75">
                      <span>{UI.reviewFood[lang]}: <b className="tabular-nums">{r.scores.food}</b></span>
                      <span>{UI.reviewService[lang]}: <b className="tabular-nums">{r.scores.service}</b></span>
                      <span>{UI.reviewAtmosphere[lang]}: <b className="tabular-nums">{r.scores.atmosphere}</b></span>
                    </p>
                  )}
                  {r.translatedFrom && <p className="mt-3 text-xs italic text-charcoal/55">{UI.reviewTranslatedRu[lang]}</p>}
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-charcoal/10 pt-4">
                    <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-leaf text-sm font-bold text-linen">
                      {r.author.replace(/[^A-Za-z]/g, "").charAt(0).toUpperCase()}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold text-charcoal">{r.author}</span>
                      <span className="block text-xs text-charcoal/60">
                        {r.localGuide && "Local Guide · "}
                        {r.countIn ? fill(UI.reviewsCountIn[lang], { n: r.count, place: r.countIn }) : fill(UI.reviewsCount[lang], { n: r.count })}
                        {r.reactions ? ` · ${r.reactions === 1 ? UI.reviewReaction[lang] : fill(UI.reviewReactions[lang], { n: r.reactions })}` : ""}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
