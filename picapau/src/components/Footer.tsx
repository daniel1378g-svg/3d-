// Night footer: "PICA PAU" across the full width, rising on view; a bar with "Réserver" and the phone;
// address, hours, contact and socials; the five languages; the bottom line with the copyright and the
// privacy link — the live site's own words.
import { copy } from "@/copy";
import { CONTACT } from "@/contact";
import { LOGO } from "@/content/photos";
import { useSite } from "@/site";
import { LanguageLinks } from "./LanguageMenu";
import { PhoneGlyph, Roll, SplitText } from "./ui";
import { LottieIcon } from "@/lottie/LottieIcon";

export function Footer() {
  const { lang, href, go, book } = useSite();
  const t = copy(lang);
  return (
    <footer className="tone-noite tex-cork relative z-[3] overflow-hidden pb-[max(28px,env(safe-area-inset-bottom))] pt-[clamp(56px,8vw,120px)]">
      <div className="container grid gap-[clamp(40px,6vw,80px)]">
        <SplitText as="p" text="PICA PAU" by="words" stagger={0.08} className="display text-center text-nata" style={{ fontSize: "clamp(84px, 21vw, 400px)", lineHeight: 0.8, letterSpacing: "-0.015em" }} />
        <div className="flex flex-wrap items-center justify-between gap-5 rounded-[24px] bg-white/[0.06] p-5 sm:p-7">
          <p className="group flex items-center gap-4 font-display text-[clamp(24px,2.4vw,36px)] font-semibold uppercase leading-tight text-dourado">
            <LottieIcon name="woodpecker" mode="hover" size={48} color="#F2B84B" accent="#C23B26" />
            {t.kicker}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" className="btn" aria-haspopup="dialog" onClick={(e) => book(e.currentTarget)}>
              <Roll>{t.nav.book}</Roll>
            </button>
            <a href={CONTACT.phoneHref} className="btn btn--ghost text-branco">
              <PhoneGlyph />
              <Roll>{CONTACT.phoneDisplay}</Roll>
            </a>
          </div>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <section className="grid content-start gap-2">
            <h2 className="eyebrow text-dourado">{t.info.addressTitle}</h2>
            <address className="not-italic leading-relaxed">
              {CONTACT.street}
              <br />
              {t.city}
            </address>
            <a href={CONTACT.maps.google} target="_blank" rel="noopener" className="link-line justify-self-start">
              {t.info.mapCaption}
              <span className="sr-only"> {t.ui.newWindow}</span>
            </a>
          </section>
          <section className="grid content-start gap-2">
            <h2 className="eyebrow text-dourado">{t.info.hoursTitle}</h2>
            <p>
              {t.info.days}
              <br />
              <span className="whitespace-pre-line">{t.info.openHours}</span>
            </p>
            <p className="text-branco/75">
              {t.info.closedDays} · {t.info.closed}
            </p>
          </section>
          <section className="grid content-start gap-2">
            <h2 className="eyebrow text-dourado">{t.info.phoneTitle}</h2>
            <a href={CONTACT.phoneHref} className="justify-self-start font-bold text-branco">
              {CONTACT.phoneDisplay}
            </a>
            <p className="text-[15px] text-branco/75">{t.info.phoneText}</p>
          </section>
          <section className="grid content-start gap-2">
            <h2 className="eyebrow text-dourado">Facebook · Instagram</h2>
            <a href={CONTACT.facebook} target="_blank" rel="noopener" className="link-line justify-self-start">
              Facebook<span className="sr-only"> {t.ui.newWindow}</span>
            </a>
            <a href={CONTACT.instagram} target="_blank" rel="noopener" className="link-line justify-self-start">
              Instagram @picapauge<span className="sr-only"> {t.ui.newWindow}</span>
            </a>
          </section>
        </div>
        <LanguageLinks className="m-0 border-t border-branco/15 pt-6" />
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-branco/15 pt-6 text-[15px] text-branco/80">
          <img src={LOGO.src(160)} alt="" width="36" height="36" className="h-9 w-9" />
          <p>{t.legal.copyright}</p>
          <a
            href={href("privacy")}
            onClick={(e) => {
              e.preventDefault();
              go("privacy");
            }}
            className="underline underline-offset-4"
          >
            {t.legal.privacyTitle}
          </a>
        </div>
      </div>
    </footer>
  );
}
