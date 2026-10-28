import { useState } from "react";
import { UI } from "@/i18n";
import { CONTACT, mapsDirections, osmEmbed, osmLink } from "@/content";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";
import { Photo } from "./Photo";
import { ArrowGlyph, PinGlyph } from "./Glyphs";

/**
 * The map loads only after a click (nothing is requested from OpenStreetMap before). The claude.ai preview
 * cannot embed other sites, so there the button opens OpenStreetMap in a new tab instead.
 */
export function MapCard({ className }: { className?: string }) {
  const { lang } = useSite();
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative overflow-hidden rounded-[28px] bg-espresso shadow-lift", className)}>
      {open && !__ARTIFACT__ ? (
        <iframe title={UI.mapTitle[lang]} src={osmEmbed} className="h-full min-h-[360px] w-full border-0" loading="lazy" referrerPolicy="no-referrer" />
      ) : (
        <div className="relative h-full min-h-[360px]">
          <Photo id="shop" sizes="(min-width: 1024px) 560px, 92vw" className="absolute inset-0 h-full w-full opacity-45" />
          <div className="relative flex h-full min-h-[360px] flex-col items-start justify-end gap-4 bg-gradient-to-t from-espresso via-espresso/70 to-espresso/10 p-7 text-flour on-dark">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-custard text-espresso shadow-set">
              <PinGlyph size={22} />
            </span>
            <p className="display text-2xl leading-tight">
              {CONTACT.street}
              <br />
              {CONTACT.zip} {CONTACT.city}
            </p>
            <div className="flex flex-wrap gap-3">
              {__ARTIFACT__ ? (
                <a href={osmLink} target="_blank" rel="noopener noreferrer" className="btn btn-custard">
                  {UI.mapOpen[lang]} <span className="sr-only">{UI.newTab[lang]}</span>
                </a>
              ) : (
                <button type="button" onClick={() => setOpen(true)} className="btn btn-custard">
                  {UI.showMap[lang]}
                </button>
              )}
              <a href={mapsDirections} target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-flour">
                {UI.directions[lang]} <ArrowGlyph /> <span className="sr-only">{UI.newTab[lang]}</span>
              </a>
            </div>
            <p className="text-xs text-flour/75">{UI.mapNote[lang]}</p>
          </div>
        </div>
      )}
    </div>
  );
}
