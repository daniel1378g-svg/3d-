import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { UI } from "@/i18n";
import { DESSERTS, chf, itemsOf, nameIn } from "@/content";
import { useSite } from "@/site";
import { img, prefersReducedMotion } from "@/lib/utils";
import { LottieIcon } from "@/lottie/LottieIcon";
import { SiteLink } from "../SiteLink";
import { PdfButton } from "../PdfButton";

const withPhotos = itemsOf(DESSERTS).filter((d) => d.photo);

/** The dessert photos from the 2024 dessert PDF, crossfading one into the next. */
export function DessertsSlider() {
  const { lang } = useSite();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(prefersReducedMotion);
  const n = withPhotos.length;
  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => setI((v) => (v + 1) % n), 4500);
    return () => window.clearTimeout(id);
  }, [i, paused, n]);
  const d = withPhotos[i];

  return (
    <section id="desserts" className="gutter py-3 md:py-5">
      <div className="wrap panel grid items-center gap-12 px-6 py-16 md:grid-cols-[1fr_1fr] md:px-14 md:py-20">
        <div data-reveal className="min-w-0">
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-green">
              <LottieIcon name="icecream" size={42} color="#ffcc00" accent="#ffffff" />
            </span>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red">{UI.navDesserts[lang]}</p>
          </div>
          <h2 className="font-display text-[clamp(2.4rem,5vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.02em] text-green">{UI.dessertsTitle[lang]}</h2>
          <ul className="mt-7 flex flex-wrap gap-2">
            {withPhotos.map((x, k) => (
              <li key={x.id}>
                <button
                  type="button"
                  onClick={() => setI(k)}
                  aria-pressed={k === i}
                  className="rounded-full border border-ink/15 px-3 py-1.5 text-sm font-semibold text-ink transition-colors hover:border-red hover:text-red aria-pressed:border-green aria-pressed:bg-green aria-pressed:text-white"
                >
                  {nameIn(x, lang)}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <SiteLink page="desserts" className="inline-flex min-h-12 items-center rounded-full bg-red px-6 text-[15px] font-bold text-white hover:bg-red-deep">{UI.seeDesserts[lang]}</SiteLink>
            <PdfButton lang={lang} href={DESSERTS.pdfHome!} label={UI.dlDesserts[lang]} />
          </div>
        </div>
        <figure data-reveal className="relative mx-auto w-full max-w-[520px]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] bg-mist shadow-[0_40px_70px_-40px_rgba(15,27,45,0.6)] ring-8 ring-white">
            <AnimatePresence initial={false}>
              <motion.img
                key={d.id}
                src={img(`dessert-${d.photo}`)}
                alt={nameIn(d, lang)}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
              />
            </AnimatePresence>
          </div>
          <figcaption className="mt-4 flex items-center justify-between gap-4">
            <span className="min-w-0">
              <span className="block font-display text-2xl font-semibold text-ink">{nameIn(d, lang)}</span>
              <span className="text-sm text-ink-soft">{UI.dessertsSource[lang]}</span>
            </span>
            <span className="font-display text-2xl font-semibold text-ink tabular-nums">{d.prices.map(chf).join(" · ")}</span>
          </figcaption>
          <div className="mt-4 flex items-center gap-2">
            <button type="button" onClick={() => setI((i - 1 + n) % n)} className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 hover:border-red hover:text-red">
              <span className="sr-only">{UI.prevPhoto[lang]}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
            </button>
            <button type="button" onClick={() => setI((i + 1) % n)} className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 hover:border-red hover:text-red">
              <span className="sr-only">{UI.nextPhoto[lang]}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
            </button>
            <button type="button" onClick={() => setPaused((p) => !p)} aria-pressed={paused} className="inline-flex h-11 items-center gap-2 rounded-full border border-ink/15 px-4 text-sm font-bold hover:border-red hover:text-red">
              {paused ? UI.play[lang] : UI.pause[lang]}
            </button>
            <span className="ml-auto text-sm font-semibold tabular-nums text-ink-soft">{i + 1} / {n}</span>
          </div>
        </figure>
      </div>
    </section>
  );
}
