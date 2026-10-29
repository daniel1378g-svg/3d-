import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MaskImage, SplitReveal } from "./Reveal";
import type { Photo } from "@/content/photos";
import type { Lang } from "@/i18n";

/** A page hero: an eyebrow, a giant title rising, and a big photo rising inside an arch. */
export function PageHero({ eyebrow, title, photo, lang, tone = "bg-marca text-branco", eyebrowTone = "text-destaque", children }: { eyebrow: string; title: string[]; photo?: Photo; lang: Lang; tone?: string; eyebrowTone?: string; children?: ReactNode }) {
  return (
    <section className={cn("relative overflow-hidden pb-16", tone)} style={{ paddingTop: "calc(var(--label-h) + 130px)" }}>
      <div className="container-x">
        <p className={cn("eyebrow", eyebrowTone)}>{eyebrow}</p>
        <SplitReveal as="h1" text={title} className="mt-4 fs-mega font-extrabold" />
        {children}
        {photo && <MaskImage src={photo.src} srcSet={`${photo.sm} 800w, ${photo.src} 1200w`} sizes="(min-width: 1520px) 1400px, 92vw" alt={photo.alt[lang]} w={photo.w} h={photo.h} eager className="arch mt-10 aspect-[16/10] w-full md:aspect-[21/9]" />}
      </div>
    </section>
  );
}
