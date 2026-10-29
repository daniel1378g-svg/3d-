import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TX } from "@/content/site";
import { photo } from "@/content/photos";
import { PageHero } from "@/components/PageHero";
import { MenuList, PdfLink, SearchBox, useFilterState } from "@/components/MenuList";
import { CartLines, cartTotal } from "@/components/CartDrawer";
import { useCart } from "@/lib/cart";
import { money } from "@/content/menu";
import { FadeIn } from "@/components/Reveal";
import { PillLink } from "@/components/ui/Pill";
import { IconPhone } from "@/components/icons";

export default function TakeAwayPage() {
  const { lang, href, go } = useSite();
  const { query, setQuery } = useFilterState();
  const lines = useCart();
  const { total } = cartTotal(lines);
  const flyer = photo("flyer");
  return (
    <>
      <PageHero eyebrow={TX.tagesgerichte[lang]} title={UI.takeaway[lang]} lang={lang} photo={photo("t-sandes-leitao")} aspect="aspect-[16/9] md:aspect-[21/8]">
        <p className="mt-6 max-w-[640px] text-[clamp(16px,1.2vw,19px)] leading-relaxed text-fundo/80">{TX.n_takeaway_desc[lang]}</p>
        <p className="mt-4 rounded-[14px] bg-branco/10 px-4 py-3 text-[14px] text-fundo/85">{TX.n_cartLine[lang]}</p>
      </PageHero>
      <section className="bg-fundo py-16 text-marca md:py-24">
        <div className="container-x grid gap-8 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)]">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <SearchBox value={query} onChange={setQuery} />
              <PdfLink />
            </div>
            <FadeIn className="mt-6 rounded-[28px] bg-branco p-5 shadow-[0_30px_60px_-40px_rgba(43,26,18,0.4)] md:p-8">
              <MenuList filter="all" query={query} />
            </FadeIn>
          </div>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="paper p-6">
              <h2 className="font-display text-[26px] font-semibold">{TX.n_cartTitle[lang]}</h2>
              <div className="mt-4">
                <CartLines />
              </div>
              {lines.length > 0 && (
                <div className="mt-4 flex items-baseline justify-between border-t border-marca/15 pt-3">
                  <span className="eyebrow text-linha">{TX.n_cartTotal[lang]}</span>
                  <span className="font-display text-[24px] font-semibold tabular-nums">{money(total)}</span>
                </div>
              )}
              <PillLink
                href={href("warenkorb")}
                className="mt-5 w-full"
                onClick={(e) => {
                  e.preventDefault();
                  go("warenkorb");
                }}
              >
                {TX.n_cartToCheckout[lang]}
              </PillLink>
              <a href={`tel:${BUSINESS.phones[0].tel}`} className="btn btn--soft mt-2 w-full">
                <IconPhone size={16} /> {BUSINESS.phones[0].show}
              </a>
            </div>
            <figure className="paper mt-6 overflow-hidden">
              <img src={flyer.sm} srcSet={`${flyer.sm} 640w`} alt={flyer.alt[lang]} width={flyer.w} height={flyer.h} loading="lazy" decoding="async" className="w-full" />
              <figcaption lang="pt-PT" className="p-4 text-[13px] leading-relaxed text-linha">
                <strong className="text-marca">{TX.flyerEntregas[lang]}</strong> {TX.flyerList[lang]}
              </figcaption>
            </figure>
          </aside>
        </div>
      </section>
    </>
  );
}
