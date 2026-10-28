import { TEXT, UI } from "@/i18n";
import { CONTACT, mapsDirections } from "@/content";
import { HOURS_ROWS, hm } from "@/hours";
import { useSite } from "@/site";
import { LottieIcon } from "@/lottie/LottieIcon";
import { Magnetic } from "./Magnetic";
import { OpenBadge } from "./OpenBadge";
import { Reveal } from "./Reveal";
import { SiteLink } from "./SiteLink";
import { MapCard } from "./MapCard";
import { FacebookGlyph, InstagramGlyph, PhoneGlyph } from "./Glyphs";

/** «Contactez-nous !»: the live call to action, the live badge, hours, address, the map and the socials. */
export function ContactBlock({ lead }: { lead: "home" | "offer" }) {
  const { lang } = useSite();
  return (
    <section id="contact" aria-labelledby="contact-title" className="dust gutter bg-flour-deep py-24 md:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Reveal>
          <h2 id="contact-title" className="display text-[clamp(2.4rem,5vw,4.2rem)] leading-none text-cocoa">
            {TEXT.ctaTitle[lang]}
          </h2>
          <p className="display mt-4 text-2xl text-caramel">{lead === "home" ? TEXT.ctaHomeLead[lang] : TEXT.ctaOfferLead[lang]}</p>
          <p className="mt-5 text-lg">
            {TEXT.ctaText1[lang]}
            <br />
            {TEXT.ctaText2[lang]}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <SiteLink page="contact" className="btn btn-dark" data-cursor="view">
                {TEXT.contactUs[lang]}
              </SiteLink>
            </Magnetic>
            <Magnetic>
              <a href={CONTACT.phoneHref} className="btn btn-custard" data-cursor="call">
                <PhoneGlyph /> {TEXT.callUs[lang]}
              </a>
            </Magnetic>
            <Magnetic>
              <a href={mapsDirections} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                {UI.directions[lang]} <span className="sr-only">{UI.newTab[lang]}</span>
              </a>
            </Magnetic>
          </div>
          <OpenBadge terrace className="mt-8" />
          <dl className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="group flex gap-4">
              <LottieIcon name="clock" size={40} mode="hover" />
              <div>
                <dt className="kicker">{TEXT.hoursTitle[lang]}</dt>
                <dd className="mt-1">
                  {HOURS_ROWS.map((r) => (
                    <span key={r.key} className="block">
                      <span className="font-semibold">{TEXT[r.key][lang]}</span> <span className="price">{hm(r.open)} – {hm(r.close)}</span>
                    </span>
                  ))}
                </dd>
              </div>
            </div>
            <div className="group flex gap-4">
              <LottieIcon name="pin" size={40} mode="hover" />
              <div>
                <dt className="kicker">{UI.address[lang]}</dt>
                <dd className="mt-1">
                  {CONTACT.street}
                  <br />
                  {CONTACT.zip} {CONTACT.city}
                </dd>
              </div>
            </div>
            <div className="group flex gap-4">
              <LottieIcon name="phone" size={40} mode="hover" />
              <div>
                <dt className="kicker">{UI.phone[lang]}</dt>
                <dd className="mt-1">
                  <a href={CONTACT.phoneHref} className="font-semibold underline decoration-wheat decoration-2 underline-offset-4" data-cursor="call">{CONTACT.phone}</a>
                </dd>
              </div>
            </div>
            <div className="group flex gap-4">
              <LottieIcon name="mail" size={40} mode="hover" />
              <div className="min-w-0">
                <dt className="kicker">{UI.email[lang]}</dt>
                <dd className="mt-1 break-all">
                  <a href={`mailto:${CONTACT.email}`} className="font-semibold underline decoration-wheat decoration-2 underline-offset-4">{CONTACT.email}</a>
                </dd>
              </div>
            </div>
          </dl>
          <div className="mt-8 flex items-center gap-3">
            <span className="kicker">{UI.follow[lang]}</span>
            <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className="grid h-11 w-11 place-items-center rounded-full bg-espresso text-flour hover:bg-cocoa">
              <FacebookGlyph />
              <span className="sr-only">Facebook {UI.newTab[lang]}</span>
            </a>
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="grid h-11 w-11 place-items-center rounded-full bg-espresso text-flour hover:bg-cocoa">
              <InstagramGlyph />
              <span className="sr-only">Instagram {UI.newTab[lang]}</span>
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:pt-4">
          <MapCard className="h-full min-h-[420px]" />
        </Reveal>
      </div>
    </section>
  );
}
