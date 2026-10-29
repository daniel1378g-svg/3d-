// Contact pieces shared by the home bento and the contact page: the address with "Plan", Waze and Apple Plans,
// "Itinéraire" as tabs (each opens the route only on tap), and the map that loads only on tap.
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import * as Tabs from "@radix-ui/react-tabs";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS } from "@/content/site";
import { cn } from "@/lib/utils";
import { LottieIcon } from "./lottie/LottieIcon";
import { IconExternal, IconPin } from "./icons";

export function MapLinks({ className }: { className?: string }) {
  const { lang } = useSite();
  const links = [
    { label: UI.plan[lang], url: BUSINESS.planUrl },
    { label: "Waze", url: BUSINESS.wazeUrl },
    { label: UI.appleMaps[lang], url: BUSINESS.appleUrl },
  ];
  return (
    <ul className={cn("flex list-none flex-wrap gap-2", className)}>
      {links.map((k, i) => (
        <li key={k.url}>
          <a href={k.url} target="_blank" rel="noopener noreferrer" className={cn("btn btn--sm", i ? "btn--ghost" : "")}>
            {i === 0 && <IconPin size={16} />}
            <span className="btn-roll">
              <span>{k.label}</span>
              <span aria-hidden="true">{k.label}</span>
            </span>
            <span className="sr-only">{UI.externalNew[lang]}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Itinerary({ className, id = "it" }: { className?: string; id?: string }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const [tab, setTab] = useState("google");
  const tabs = [
    { id: "google", label: "Google Maps", url: BUSINESS.mapsRoute },
    { id: "waze", label: "Waze", url: BUSINESS.wazeUrl },
    { id: "apple", label: UI.appleMaps[lang], url: BUSINESS.appleUrl },
  ];
  return (
    <Tabs.Root value={tab} onValueChange={setTab} className={className}>
      <Tabs.List aria-label={UI.route[lang]} className="relative flex flex-wrap gap-1 border-b border-branco/20">
        {tabs.map((t) => (
          <Tabs.Trigger key={t.id} value={t.id} className="relative px-3 pb-3 pt-1 font-display text-[16px] font-semibold uppercase tracking-[0.1em] text-suave data-[state=active]:text-branco">
            {t.label}
            {tab === t.id && <motion.span layoutId={`${id}-line`} className="absolute inset-x-2 -bottom-px h-[3px] rounded-full bg-destaque" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 480, damping: 38 }} />}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {tabs.map((t) => (
        <Tabs.Content key={t.id} value={t.id} className="group pt-5 outline-none">
          <div className="flex items-start gap-4">
            <LottieIcon name="pin" size={48} color="#FFFBE8" accent="#FFCB8E" mode="loop" />
            <div className="min-w-0">
              <p className="font-bold">
                {BUSINESS.street}, {BUSINESS.city}
              </p>
              <a href={t.url} target="_blank" rel="noopener noreferrer" className="btn btn--sm mt-3">
                <span className="btn-roll">
                  <span>{UI.openRoute[lang]}</span>
                  <span aria-hidden="true">{UI.openRoute[lang]}</span>
                </span>
                <IconExternal size={15} />
                <span className="sr-only">
                  {" "}
                  · {t.label} {UI.externalNew[lang]}
                </span>
              </a>
              <p className="mt-3 text-[13px] text-suave">{UI.routeNote[lang]}</p>
            </div>
          </div>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}

/** Google Maps only after a tap (privacy). The claude.ai preview can't embed other sites: there it is a link. */
export function MapOnTap({ className }: { className?: string }) {
  const { lang } = useSite();
  const [show, setShow] = useState(false);
  return (
    <div className={cn("relative overflow-hidden rounded-[24px] bg-marca-escura", className)}>
      {show && !__ARTIFACT__ ? (
        <iframe title={`Google Maps · ${BUSINESS.addressLine}`} src={BUSINESS.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0" />
      ) : (
        <div className="absolute inset-0 grid place-items-center p-6 text-center text-branco">
          <div className="max-w-[420px]">
            <LottieIcon name="pin" size={64} color="#FFFBE8" accent="#FFCB8E" mode="loop" />
            <p className="mt-3 font-display text-[clamp(22px,2vw,30px)] font-bold uppercase leading-none">{BUSINESS.addressLine}</p>
            {show && __ARTIFACT__ ? (
              <>
                <p className="mt-3 text-[15px] text-suave">{UI.mapPreview[lang]}</p>
                <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn--sm mt-4">
                  <span className="btn-roll">
                    <span>Google Maps</span>
                    <span aria-hidden="true">Google Maps</span>
                  </span>
                  <IconExternal size={15} />
                </a>
              </>
            ) : (
              <>
                <button type="button" onClick={() => setShow(true)} className="btn btn--sm mt-4">
                  <span className="btn-roll">
                    <span>{UI.showMap[lang]}</span>
                    <span aria-hidden="true">{UI.showMap[lang]}</span>
                  </span>
                </button>
                <p className="mt-3 text-[13px] text-suave">{UI.mapNote[lang]}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
