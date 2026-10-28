import { useState } from "react";
import { UI } from "@/i18n";
import { CONTACT } from "@/content";
import { ROWS, status } from "@/hours";
import { useSite } from "@/site";
import { cn, img } from "@/lib/utils";
import { LottieIcon } from "@/lottie/LottieIcon";
import { OpenBadge } from "./OpenBadge";

function CopyButton({ value }: { value: string }) {
  const { lang } = useSite();
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="rounded-full border border-tile/25 px-3 py-1 text-xs font-bold text-tile/80 hover:border-gold hover:text-gold"
      onClick={() => {
        navigator.clipboard?.writeText(value).then(
          () => {
            setDone(true);
            setTimeout(() => setDone(false), 1600);
          },
          () => undefined,
        );
      }}
    >
      {done ? UI.copied[lang] : UI.copy[lang]}
    </button>
  );
}

export function HoursContact() {
  const { lang } = useSite();
  const [map, setMap] = useState(false);
  const now = status();

  return (
    <section className="tile-texture tile-texture--night gutter bg-night py-20 text-tile md:py-28">
      <div className="wrap grid gap-14 lg:grid-cols-2">
        <div id="horaires" data-reveal className="min-w-0 scroll-mt-32">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-tile">
              <LottieIcon name="clock" size={40} color="#0f1b2d" accent="#b80601" />
            </span>
            <h2 className="font-display text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-none">{UI.hours[lang]}</h2>
          </div>
          <OpenBadge tone="dark" />
          <p className="mt-8 whitespace-nowrap font-display text-[clamp(2.8rem,8vw,5.4rem)] font-semibold leading-none text-gold tabular-nums">07:00–02:00</p>
          <table className="mt-8 w-full border-collapse text-left">
            <caption className="sr-only">{UI.hours[lang]} · {UI.genevaTime[lang]}</caption>
            <tbody>
              {ROWS.map((r) => {
                const today = (r.days as readonly number[]).includes(now.serviceDay);
                return (
                  <tr key={r.key} className={cn("border-b border-tile/15", today && "bg-tile/[0.07]")}>
                    <th scope="row" className="py-4 pl-3 pr-4 font-semibold">
                      {UI[r.key][lang]}
                      {today && <span className="ml-3 rounded-full bg-gold px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-night">{UI.today[lang]}</span>}
                    </th>
                    <td className="whitespace-nowrap py-4 pr-3 text-right font-display text-xl tabular-nums md:text-2xl">
                      {r.open} – {r.close}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="mt-4 text-sm text-tile/60">{UI.afterMidnight[lang]} · {UI.genevaTime[lang]}</p>
        </div>

        <div id="contact" data-reveal className="min-w-0 scroll-mt-32">
          <h2 className="mb-8 font-display text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-none">{UI.contact[lang]}</h2>
          <ul className="grid gap-6">
            <li className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-tile"><LottieIcon name="pin" size={36} color="#0f1b2d" accent="#b80601" /></span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-tile/60">{UI.address[lang]}</p>
                <p className="text-lg font-semibold">{CONTACT.street}<br />{CONTACT.city}</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-tile"><LottieIcon name="phone" size={36} color="#0f1b2d" accent="#b80601" /></span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-tile/60">{UI.phone[lang]}</p>
                <p className="flex flex-wrap items-center gap-3 text-lg font-semibold">
                  <a href={CONTACT.tel} className="tabular-nums underline-offset-4 hover:underline">{CONTACT.phone}</a>
                  <CopyButton value={CONTACT.phone} />
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-tile text-night">
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v12H3z M3 7l9 6 9-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-tile/60">{UI.email[lang]}</p>
                <p className="flex flex-wrap items-center gap-3 text-lg font-semibold">
                  <a href={`mailto:${CONTACT.email}`} className="break-all underline-offset-4 hover:underline">{CONTACT.email}</a>
                  <CopyButton value={CONTACT.email} />
                </p>
              </div>
            </li>
          </ul>

          <div className="mt-8 overflow-hidden rounded-[26px] ring-1 ring-tile/15">
            {map && !__ARTIFACT__ ? (
              <iframe title={`${CONTACT.street}, ${CONTACT.city}`} src={CONTACT.mapsEmbed} className="block aspect-[16/10] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            ) : (
              <div className="relative">
                <img src={img("salle-1")} alt={UI.roomPhoto[lang]} loading="lazy" className="aspect-[16/10] w-full object-cover opacity-60" />
                <div className="absolute inset-0 grid place-items-center bg-night/40 p-6 text-center">
                  <div className="grid justify-items-center gap-3">
                    {__ARTIFACT__ ? (
                      <a href={CONTACT.maps} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center rounded-full bg-tile px-6 text-[15px] font-bold text-night hover:bg-gold">{UI.openMaps[lang]}</a>
                    ) : (
                      <button type="button" onClick={() => setMap(true)} className="inline-flex min-h-12 items-center rounded-full bg-tile px-6 text-[15px] font-bold text-night hover:bg-gold">{UI.showMap[lang]}</button>
                    )}
                    <p className="max-w-xs text-sm text-tile/85">{UI.mapPrivacy[lang]}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 font-semibold">
            <a href={CONTACT.maps} target="_blank" rel="noopener" className="text-gold underline-offset-4 hover:underline">{UI.openMaps[lang]} ↗</a>
            <a href={CONTACT.facebook} target="_blank" rel="noopener" className="underline-offset-4 hover:underline">Facebook</a>
            <a href={CONTACT.instagram} target="_blank" rel="noopener" className="underline-offset-4 hover:underline">Instagram</a>
          </div>
        </div>
      </div>

      <div className="wrap mt-16 grid grid-cols-3 gap-3 md:gap-5" data-reveal>
        {["terrasse", "salle-2", "table-longue"].map((p) => (
          <img key={p} src={img(p)} alt={UI.roomPhoto[lang]} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />
        ))}
      </div>
    </section>
  );
}
