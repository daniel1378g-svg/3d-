// Section 6: "Über uns?" verbatim, as a timeline 2003 (Hägglingen) → 2014 (Schlieren) with the famous guests.
import { useSite } from "@/site";
import { TX } from "@/content/site";
import { photo } from "@/content/photos";
import { FadeIn, MaskImage, SplitReveal } from "../Reveal";
import { Kid, Pig } from "../Illustrations";

export function UeberUns({ full = false }: { full?: boolean }) {
  const { lang } = useSite();
  const pic = photo("bacalhau-banner");
  const fire = photo("leitao-feuer");
  const guests = [
    { name: TX.n_guest1, role: TX.n_guest1Role },
    { name: TX.n_guest2, role: TX.n_guest2Role },
    { name: TX.n_guest3, role: TX.n_guest3Role },
  ];
  const p3 = [TX.ueberP3a[lang], TX.ueberP3b[lang], TX.ueberP3c[lang]].filter(Boolean).join(" ");
  const p4 = [TX.ueberP4a[lang], TX.ueberP4b[lang], TX.ueberP4c[lang], TX.ueberP4d[lang]].filter(Boolean).join(" ");
  return (
    <section id="ueber-uns" className="tex-paper relative overflow-hidden bg-fundo py-20 text-marca md:py-28" aria-labelledby="ueber-title">
      <div className="container-x">
        <p className="eyebrow text-acento">{TX.n_ueberEyebrow[lang]}</p>
        <SplitReveal as={full ? "h1" : "h2"} id="ueber-title" text={TX.ueberH[lang]} className="mt-4 fs-xl font-semibold" />
        <MaskImage src={pic.src} srcSet={`${pic.sm} 800w, ${pic.src} 1600w`} sizes="(min-width: 1520px) 1400px, 92vw" alt={pic.alt[lang]} w={pic.w} h={pic.h} className="mt-10 aspect-[21/7] w-full rounded-[28px]" radius="28px" />
        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          {/* the timeline */}
          <ol className="relative list-none border-l-2 border-destaque pl-8 lg:sticky lg:top-32 lg:self-start">
            {[
              { year: "2003", text: TX.n_timeline2003[lang], art: <Kid className="w-24" /> },
              { year: "2014", text: TX.n_timeline2014[lang], art: <Pig className="w-28" /> },
            ].map((t, i) => (
              <FadeIn as="li" key={t.year} delay={i * 0.1} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[41px] top-1 grid h-5 w-5 place-items-center rounded-full bg-destaque ring-4 ring-fundo" />
                <p className="font-display text-[clamp(44px,5vw,80px)] font-semibold leading-none">{t.year}</p>
                <p className="mt-2 max-w-[320px] text-[16px] leading-relaxed text-linha">{t.text}</p>
                <div className="mt-3">{t.art}</div>
              </FadeIn>
            ))}
            <li className="mt-6 text-[12px] text-linha/80">{TX.n_historicNote[lang]}</li>
          </ol>
          <div className="space-y-6 text-[clamp(17px,1.2vw,20px)] leading-relaxed">
            <FadeIn as="p">{TX.ueberP1[lang]}</FadeIn>
            <FadeIn as="p" delay={0.05}>
              {TX.ueberP2[lang]}
            </FadeIn>
            <FadeIn as="p" delay={0.1}>
              {p3}
            </FadeIn>
            <FadeIn className="grid gap-3 sm:grid-cols-3" delay={0.12}>
              {guests.map((g) => (
                <div key={g.name[lang]} className="paper relative p-5">
                  <p className="eyebrow text-linha">{TX.n_guestsEyebrow[lang]}</p>
                  <p className="mt-2 font-display text-[24px] font-semibold leading-tight">{g.name[lang]}</p>
                  <p className="text-[14px] text-linha">{g.role[lang]}</p>
                </div>
              ))}
            </FadeIn>
            <FadeIn as="p" delay={0.14} className="font-display text-[clamp(22px,2vw,30px)] font-semibold leading-snug">
              {p4}
            </FadeIn>
            <MaskImage src={fire.src} srcSet={`${fire.sm} 800w, ${fire.src} 1280w`} sizes="(min-width: 1024px) 60vw, 92vw" alt={fire.alt[lang]} w={fire.w} h={fire.h} className="aspect-[16/9] w-full rounded-[24px]" radius="24px" from="left" />
          </div>
        </div>
      </div>
    </section>
  );
}
