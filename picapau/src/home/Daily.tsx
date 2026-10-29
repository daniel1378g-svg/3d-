// Section 10 (#facebook-latest): the daily dishes the restaurant posts on its Facebook page. The feed loads
// only when the visitor asks for it, so the page keeps the live site's promise of no tracking.
import { useState } from "react";
import { copy } from "@/copy";
import { CONTACT } from "@/contact";
import { useSite } from "@/site";
import { Arrow, Roll, SplitText } from "@/components/ui";
import { LottieIcon } from "@/lottie/LottieIcon";
import { Pot } from "@/components/illustrations";

export function Daily() {
  const { lang } = useSite();
  const t = copy(lang);
  const [load, setLoad] = useState(false);
  return (
    <section id="facebook-latest" className="tone-nata tex-azulejo relative z-[2] py-[clamp(90px,11vw,160px)]" aria-labelledby="daily-title">
      <div className="container grid items-center gap-[clamp(40px,6vw,96px)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="relative grid gap-6">
          <p className="eyebrow text-francesinha">{t.hoursLine[0]} · {t.hoursLine[1]}</p>
          <SplitText as="h2" id="daily-title" by="words" text={t.info.facebookTitle} className="display text-azulejo" style={{ fontSize: "var(--fs-mega)", lineHeight: 0.84 }} />
        </div>
        <div className="relative grid gap-5 rounded-[28px] bg-branco p-[clamp(20px,3vw,36px)] shadow-[0_40px_80px_-50px_rgba(28,23,18,0.5)]">
          <Pot className="absolute -right-4 -top-16 w-[clamp(84px,8vw,128px)] rotate-6" />
          {load && !__ARTIFACT__ ? (
            <div className="overflow-hidden rounded-2xl bg-nata">
              <iframe
                title={t.info.facebookTitle}
                src={CONTACT.facebookPlugin}
                width="500"
                height="500"
                className="block h-[520px] w-full border-0"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="group grid gap-4">
              <div className="flex items-center gap-4">
                <LottieIcon name="pot" mode="hover" size={56} color="#1F4E99" accent="#C23B26" />
                <p className="font-display text-2xl font-bold uppercase leading-tight">{t.info.facebookTitle}</p>
              </div>
              <p className="text-[15px] text-tinta/75">{t.ui.facebookPrivacy}</p>
              {__ARTIFACT__ ? (
                <a href={CONTACT.facebook} target="_blank" rel="noopener" className="btn btn--azulejo justify-self-start">
                  <Roll>{t.ui.loadFacebook}</Roll>
                  <Arrow external />
                  <span className="sr-only">{t.ui.newWindow}</span>
                </a>
              ) : (
                <button type="button" className="btn btn--azulejo justify-self-start" onClick={() => setLoad(true)}>
                  <Roll>{t.ui.loadFacebook}</Roll>
                </button>
              )}
            </div>
          )}
          {load && <p className="text-sm text-tinta/70">{t.facebookFallback}</p>}
          <a href={CONTACT.facebook} target="_blank" rel="noopener" className="link-line justify-self-start text-azulejo">
            {t.ui.openFacebook} <Arrow external />
            <span className="sr-only">{t.ui.newWindow}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
