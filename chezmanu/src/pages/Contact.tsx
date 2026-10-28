import { useEffect, useRef, useState } from "react";
import { HTML_LANG, TEXT, UI } from "@/i18n";
import { SHELL } from "@/lib/shell";
import { CONTACT } from "@/content";
import { HOURS_ROWS, hm } from "@/hours";
import { useSite } from "@/site";
import { SplitLetters } from "@/components/SplitLetters";
import { ContactForm } from "@/components/ContactForm";
import { MapCard } from "@/components/MapCard";
import { OpenBadge } from "@/components/OpenBadge";
import { Magnetic } from "@/components/Magnetic";
import { Reveal } from "@/components/Reveal";
import { LottieIcon } from "@/lottie/LottieIcon";
import { PhoneGlyph } from "@/components/Glyphs";

/** Contact: the live headings and text, the form, the address, phone, e-mail, hours and the map. */
export function Contact() {
  const { lang } = useSite();
  // Taking over the static first paint: the title already in place.
  const [still, setStill] = useState(SHELL.contact);
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) setStill(false);
    mounted.current = true;
  }, [lang]);
  return (
    <>
      <section className="gutter bg-custard pb-16 pt-[calc(var(--header-h)+var(--label-h)+56px)] md:pb-20">
        <div className="wrap">
          <h1 className="display max-w-[22ch] text-[clamp(2rem,5.6vw,4.8rem)] leading-[1.02] text-cocoa">
            <SplitLetters text={TEXT.contactTitle[lang]} lang={HTML_LANG[lang]} still={still} />
          </h1>
          <p className="mt-6 max-w-[64ch] text-[clamp(1.05rem,1.6vw,1.25rem)] font-medium">{TEXT.contactText[lang]}</p>
          <OpenBadge terrace className="mt-8" />
        </div>
      </section>
      <section className="gutter bg-flour py-16 md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <address className="not-italic">
              <ul className="space-y-6 text-lg">
                <li className="group flex gap-4">
                  <LottieIcon name="pin" size={40} mode="hover" />
                  <span>
                    <span className="kicker block">{UI.address[lang]}</span>
                    {CONTACT.street}
                    <br />
                    {CONTACT.zip} {CONTACT.city}
                  </span>
                </li>
                <li className="group flex gap-4">
                  <LottieIcon name="phone" size={40} mode="hover" />
                  <span>
                    <span className="kicker block">{UI.phone[lang]}</span>
                    <a href={CONTACT.phoneHref} className="font-semibold underline decoration-wheat decoration-2 underline-offset-4" data-cursor="call">{CONTACT.phone}</a>
                  </span>
                </li>
                <li className="group flex gap-4">
                  <LottieIcon name="mail" size={40} mode="hover" />
                  <span className="min-w-0 break-all">
                    <span className="kicker block">{UI.email[lang]}</span>
                    <a href={`mailto:${CONTACT.email}`} className="font-semibold underline decoration-wheat decoration-2 underline-offset-4">{CONTACT.email}</a>
                  </span>
                </li>
                <li className="group flex gap-4">
                  <LottieIcon name="clock" size={40} mode="hover" />
                  <span>
                    <span className="kicker block">{TEXT.hoursTitle[lang]}</span>
                    {HOURS_ROWS.map((r) => (
                      <span key={r.key} className="block">
                        <span className="font-semibold">{TEXT[r.key][lang]}</span> <span className="price">{hm(r.open)} – {hm(r.close)}</span>
                      </span>
                    ))}
                  </span>
                </li>
              </ul>
            </address>
            <Magnetic className="mt-8 inline-flex">
              <a href={CONTACT.phoneHref} className="btn btn-dark" data-cursor="call">
                <PhoneGlyph /> {TEXT.callUs[lang]}
              </a>
            </Magnetic>
            <MapCard className="mt-10 min-h-[380px]" />
          </Reveal>
          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
