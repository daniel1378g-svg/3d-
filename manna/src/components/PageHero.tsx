// The opening of an inner page: a photo band behind huge words, the kicker and a lead.
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Img } from "./Img";

export function PageHero({ kicker, title, lead, image, children, skin = "skin-acai" }: { kicker: string; title: string; lead?: string; image?: string; children?: ReactNode; skin?: string }) {
  return (
    <header className={cn(skin, "relative overflow-hidden pb-16 pt-[calc(var(--header-h)+72px)] md:pb-24")}>
      {image && (
        <div className="absolute inset-0" aria-hidden="true">
          <Img id={image} alt="" priority sizes="100vw" className="h-full w-full opacity-40" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(36,16,40,0.55)_0%,rgba(36,16,40,0.85)_70%,#241028_100%)]" />
        </div>
      )}
      <div className="gutter relative">
        <div className="wrap">
          <p className="kicker text-lilac" data-lang-stagger>{kicker}</p>
          <h1 className="display mt-4 max-w-[18ch] text-[clamp(2.4rem,9vw,9.5rem)] text-cream [hyphens:auto] [overflow-wrap:anywhere]">{title}</h1>
          {lead && <p className="lead measure mt-6 text-cream/85">{lead}</p>}
          {children}
        </div>
      </div>
    </header>
  );
}
