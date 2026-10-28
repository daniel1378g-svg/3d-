import { useEffect, useState } from "react";
import { UI, fill } from "@/i18n";
import { CONTACT } from "@/content";
import { useSite } from "@/site";
import { asset } from "@/lib/utils";
import { soundEnabled, setSound } from "@/lib/sound";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SiteLink } from "./SiteLink";

export function Footer() {
  const { lang } = useSite();
  const [sound, setSoundState] = useState(soundEnabled);
  useEffect(() => setSound(sound), [sound]);
  const year = new Date().getFullYear();
  return (
    <footer className="charcoal on-dark gutter pb-10 pt-16">
      <div className="wrap grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <img src={asset("brand/logo-dark.webp")} alt="Restaurante Oliveira – Portugiesische & Schweizer Küche" width={220} height={233} className="w-[200px]" loading="lazy" />
          <address className="mt-6 not-italic leading-relaxed text-linen/85">
            {CONTACT.street}
            <br />
            CH-{CONTACT.zip} {CONTACT.city}
            <br />
            {UI.country[lang]}
          </address>
          <a href={CONTACT.facebook} target="_blank" rel="noopener" className="mt-5 inline-flex items-center gap-2 font-semibold text-linen hover:text-leaf-light">
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5H16.6V4.4A20 20 0 0 0 14.3 4.3c-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21z" /></svg>
            Facebook
          </a>
        </div>
        <div>
          <p className="kicker text-silver">{UI.quickLinks[lang]}</p>
          <ul className="mt-4 space-y-2.5 font-semibold">
            <li><SiteLink page="home" section="ueber-uns" className="hover:text-leaf-light">{UI.navAbout[lang]}</SiteLink></li>
            <li><SiteLink page="kueche" className="hover:text-leaf-light">{UI.navKitchen[lang]}</SiteLink></li>
            <li><SiteLink page="home" section="kontakt" className="hover:text-leaf-light">{UI.navContact[lang]}</SiteLink></li>
            <li><SiteLink page="impressum" className="hover:text-leaf-light">{UI.impressum[lang]}</SiteLink></li>
            <li><SiteLink page="datenschutz" className="hover:text-leaf-light">{UI.datenschutz[lang]}</SiteLink></li>
          </ul>
        </div>
        <div>
          <p className="kicker text-silver">{UI.reservations[lang]}</p>
          <p className="mt-4">
            {UI.phone[lang]} <a href={CONTACT.phoneHref} className="font-semibold underline-offset-4 hover:underline">{CONTACT.phone}</a>
          </p>
          <p className="mt-1">
            <a href={`mailto:${CONTACT.email}`} className="underline-offset-4 hover:underline">{CONTACT.email}</a>
          </p>
          <p className="kicker mt-8 text-silver">{UI.language[lang]}</p>
          <div className="mt-3">
            <LanguageSwitcher tone="dark" inline />
          </div>
          <button type="button" aria-pressed={sound} onClick={() => setSoundState((v) => !v)} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-linen/80 hover:text-linen">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 9v6h4l5 4V5L8 9z" />{sound ? <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" /> : <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />}</svg>
            {sound ? UI.soundOff[lang] : UI.soundOn[lang]}
          </button>
        </div>
      </div>
      <div className="wrap mt-14 border-t border-linen/15 pt-6 text-sm text-linen/70">
        <p>{fill(UI.copyright[lang], { year })}</p>
      </div>
    </footer>
  );
}
