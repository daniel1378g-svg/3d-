import { UI } from "@/i18n";
import { useSite } from "@/site";

// Google reviews supplied by the owner's side, quoted exactly as written (in English, in every language).
const REVIEWS = [
  { name: "Nathan C.", text: "One of the best Portuguese food experience you can have in Geneva. Here I ate the francesinha, which is a Portuguese version of the croque-monsieur. Be ready for a lot of food! The service is very good and personnel is really nice." },
  { name: "Dunja M.", text: "Had the daily meal – fish duo and pork. Was great! Other than that, we had seats next to the kitchen door (restaurant was full and we didn't have a reservation) and saw that it was quite clean inside. Restrooms were also clean, staff were polite. Would recommend it to a friend 100%." },
  { name: "Deka D.", text: "Best Portuguese in Pâquis, really a good place to discover! And the service is super friendly." },
  { name: "Rüzgar K.", text: "The atmosphere was great, they put roses and candles to all tables and there was a soft music at the background. […] The waiters were really friendly and nice." },
];

function Stars({ label }: { label: string }) {
  return (
    <p className="flex gap-1" role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.5l2.9 6 6.6.8-4.9 4.6 1.3 6.5L12 17.2l-5.9 3.2 1.3-6.5L2.5 9.3l6.6-.8z" fill="#ffcc00" stroke="#b38f00" strokeWidth="0.8" strokeLinejoin="round" />
        </svg>
      ))}
    </p>
  );
}

/** "O que dizem os nossos clientes": four Google reviews, two columns on wide screens, one on phones. */
export function Reviews() {
  const { lang } = useSite();
  return (
    <section id="avaliacoes" className="gutter py-3 md:py-5">
      <div className="wrap panel px-6 py-16 md:px-14 md:py-20">
        <h2 data-reveal className="mb-10 font-display text-[clamp(2.2rem,4.6vw,3.8rem)] font-semibold leading-none tracking-[-0.015em] text-green">{UI.reviewsTitle[lang]}</h2>
        <ul className="grid gap-5 md:grid-cols-2">
          {REVIEWS.map((r) => (
            <li key={r.name} data-reveal className="flex flex-col gap-4 rounded-[22px] border border-ink/10 border-t-4 border-t-gold bg-white p-6 shadow-[0_18px_36px_-28px_rgba(14,35,80,0.55)] md:p-8">
              <Stars label={UI.fiveStars[lang]} />
              <blockquote lang="en" className="flex-1 text-[17px] leading-relaxed text-ink">“{r.text}”</blockquote>
              <p className="flex flex-wrap items-baseline justify-between gap-2 border-t border-ink/10 pt-4">
                <span className="font-bold text-ink">{r.name}</span>
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-green">{UI.googleReview[lang]}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
