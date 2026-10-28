import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { LOCALE, UI } from "@/i18n";
import { CONTACT, HOURS } from "@/content";
import { rows, zurichNow } from "@/hours";
import { useSite } from "@/site";
import { asset, cn } from "@/lib/utils";
import { LottieIcon } from "@/lottie/LottieIcon";
import pin from "@/data/map.json";
import { OpenBadge } from "../OpenBadge";
import { Reveal } from "../Reveal";

const dayName = (lang: keyof typeof LOCALE, d: number, style: "long" | "short" = "long") => new Intl.DateTimeFormat(LOCALE[lang], { weekday: style }).format(new Date(Date.UTC(2024, 0, 7 + d, 12)));

/** #kontakt: the live badge, the (provisional) hours, address, phone, email, the map on request. */
export function Contact() {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const [map, setMap] = useState(false);
  const today = zurichNow().day;
  const d = 0.004;
  const osm = `https://www.openstreetmap.org/export/embed.html?bbox=${CONTACT.lng - d * 1.6}%2C${CONTACT.lat - d}%2C${CONTACT.lng + d * 1.6}%2C${CONTACT.lat + d}&layer=mapnik&marker=${CONTACT.lat}%2C${CONTACT.lng}`;
  const address = `${CONTACT.street}, ${CONTACT.zip} ${CONTACT.city}`;

  return (
    <section id="kontakt" aria-labelledby="kontakt-title" className="linen gutter py-24 md:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.15fr]">
        <Reveal>
          <p className="kicker text-leaf">{UI.navContact[lang]}</p>
          <h2 id="kontakt-title" className="display mt-2 text-[clamp(2.4rem,5.6vw,4.8rem)] font-semibold leading-none text-charcoal">{UI.navContact[lang]}</h2>
          <OpenBadge className="mt-6" />

          <h3 className="mt-10 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-charcoal/70">
            <LottieIcon name="clock" size={26} mode="loop" />
            {UI.hours[lang]}
          </h3>
          <table className="mt-3 w-full max-w-md text-[16px]">
            <tbody>
              {rows().map((r) => {
                const isToday = r.days.includes(today);
                const label = r.days.length > 1 ? `${dayName(lang, r.days[0], "short")} – ${dayName(lang, r.days[r.days.length - 1], "short")}` : dayName(lang, r.days[0]);
                return (
                  <tr key={r.days.join()} className={cn("border-b border-charcoal/10", isToday && "font-semibold")}>
                    <th scope="row" className="py-2.5 pr-4 text-left font-medium capitalize">
                      {label}
                      {isToday && <span className="ml-2 rounded-full bg-olive/25 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-leaf">{UI.today[lang]}</span>}
                    </th>
                    <td className="py-2.5 text-right tabular-nums">{r.text || UI.dayOff[lang]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {!HOURS.confirmed && <p className="mt-3 text-sm text-charcoal/70">{UI.provisional[lang]}</p>}

          <dl className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="group">
              <dt className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-charcoal/70"><LottieIcon name="pin" size={26} mode="hover" />{UI.address[lang]}</dt>
              <dd className="mt-2 text-[17px]">
                {CONTACT.name}
                <br />
                {CONTACT.street}
                <br />
                {CONTACT.zip} {CONTACT.city}
              </dd>
            </div>
            <div className="group">
              <dt className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-charcoal/70"><LottieIcon name="phone" size={26} mode="hover" />{UI.phone[lang]}</dt>
              <dd className="mt-2 text-[17px]">
                <a href={CONTACT.phoneHref} className="font-semibold text-leaf underline-offset-4 hover:underline" data-cursor="call">{CONTACT.phone}</a>
              </dd>
              <dt className="mt-5 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-charcoal/70"><LottieIcon name="mail" size={26} mode="hover" />{UI.email[lang]}</dt>
              <dd className="mt-2 text-[17px]">
                <a href={`mailto:${CONTACT.email}`} className="break-all font-semibold text-leaf underline-offset-4 hover:underline">{CONTACT.email}</a>
              </dd>
            </div>
          </dl>
          <a href={CONTACT.facebook} target="_blank" rel="noopener" className="mt-8 inline-flex items-center gap-2 font-semibold text-charcoal hover:text-leaf">
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5H16.6V4.4A20 20 0 0 0 14.3 4.3c-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21z" /></svg>
            Facebook
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-[28px] bg-charcoal shadow-lift">
            {map ? (
              <iframe title={UI.mapTitle[lang]} src={osm} className="aspect-[18/13] w-full border-0" loading="lazy" />
            ) : (
              <div className="relative aspect-[18/13] w-full overflow-hidden">
                <img src={asset("images/map-toess.webp")} alt={UI.mapTitle[lang]} width={pin.w} height={pin.h} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                <motion.div
                  className="absolute"
                  style={{ left: `${pin.x * 100}%`, top: `${pin.y * 100}%` }}
                  initial={reduce ? false : { y: -120, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 13, mass: 1.1, delay: 0.3 }}
                >
                  <div className="-translate-x-1/2 -translate-y-full">
                    <div className="grid h-14 w-14 place-items-center rounded-full rounded-br-none bg-charcoal shadow-lift" style={{ transform: "rotate(45deg)" }}>
                      <img src={asset("brand/ring.webp")} alt="" width={34} height={34} className="h-[34px] w-[34px]" style={{ transform: "rotate(-45deg)" }} />
                    </div>
                  </div>
                  <motion.span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-3 w-8 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-charcoal/35 blur-[2px]"
                    initial={reduce ? false : { scale: 0.2, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5, delay: 0.45 }}
                  />
                </motion.div>
                <p className="absolute bottom-3 left-3 rounded-full bg-linen/90 px-3 py-1 text-[11px] text-charcoal/80">© OpenStreetMap contributors</p>
                <div className="absolute inset-x-3 top-3 flex flex-wrap justify-end gap-2">
                  {__ARTIFACT__ ? (
                    <a href={`https://www.openstreetmap.org/?mlat=${CONTACT.lat}&mlon=${CONTACT.lng}#map=18/${CONTACT.lat}/${CONTACT.lng}`} target="_blank" rel="noopener" className="btn min-h-10 bg-linen px-4 text-sm text-charcoal shadow-set hover:bg-white">
                      OpenStreetMap ↗
                    </a>
                  ) : (
                    <button type="button" onClick={() => setMap(true)} className="btn min-h-10 bg-linen px-4 text-sm text-charcoal shadow-set hover:bg-white">
                      {UI.loadMap[lang]}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
          <p className="mt-3 text-sm text-charcoal/70">{UI.mapNote[lang]}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a className="btn btn-dark" target="_blank" rel="noopener" href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}>
              {UI.route[lang]} · Google Maps ↗
            </a>
            <a className="btn btn-ghost" target="_blank" rel="noopener" href={`https://maps.apple.com/?daddr=${encodeURIComponent(address)}`}>
              Apple Maps ↗
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
