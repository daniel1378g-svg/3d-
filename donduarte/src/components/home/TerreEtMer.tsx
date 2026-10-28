import { UI } from "@/i18n";
import { TERRE_ET_MER, chf, descIn } from "@/content";
import { useSite } from "@/site";
import { img } from "@/lib/utils";
import { LottieIcon } from "@/lottie/LottieIcon";
import { SiteLink } from "../SiteLink";

/** The house platter, with the live button text "Nos spécialités portugaises: Terre et mer". */
export function TerreEtMer() {
  const { lang } = useSite();
  const item = TERRE_ET_MER;
  return (
    <section id="terre-et-mer" className="gutter py-3 md:py-5">
      <div className="wrap panel grid items-center gap-12 overflow-hidden px-6 py-16 md:grid-cols-[0.9fr_1.1fr] md:px-14 md:py-20">
        <figure data-reveal className="relative mx-auto w-full max-w-[440px]">
          <div className="rotate-[-2deg] rounded-[36px] bg-white p-3 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)] ring-1 ring-ink/10">
            <img src={img("plat-terra-e-mar")} alt={`${item.name.fr} · ${item.name.pt}`} loading="lazy" className="aspect-[3/4] w-full rounded-[28px] object-cover" />
          </div>
          <span className="absolute -right-3 -top-4 grid h-24 w-24 rotate-6 place-items-center rounded-full bg-red text-center font-display text-lg font-semibold leading-tight text-white shadow-lg md:-right-6">
            {chf(item.prices[0])}
          </span>
        </figure>
        <div data-reveal className="min-w-0">
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-green">
              <LottieIcon name="flame" size={42} color="#ffcc00" accent="#ffffff" />
            </span>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red">{UI.specialities[lang]}</p>
          </div>
          <h2 className="font-display text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-green">
            {item.name.fr}
            <span className="block text-[0.55em] font-medium italic text-ink-soft">{item.name.pt} · {item.name.en}</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-ink">{UI.terreEtMerLead[lang]}</p>
          <p className="mt-3 max-w-xl text-ink-soft">{descIn(item, lang)}</p>
          <p className="mt-5 flex flex-wrap items-baseline gap-x-3 font-semibold">
            <span className="font-display text-4xl text-red tabular-nums">{chf(item.prices[0])}</span>
            <span className="text-ink-soft">{item.notes?.[0][lang]}</span>
          </p>
          <SiteLink page="plats" section="terra-e-mar" className="mt-9 inline-flex min-h-12 items-center gap-3 rounded-full bg-red px-7 text-[15px] font-bold text-white transition-colors hover:bg-red-deep">
            {UI.terreEtMerButton[lang]}
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
