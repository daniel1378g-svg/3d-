import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MaskImage, SplitReveal } from "./Reveal";
import type { Photo } from "@/content/photos";
import type { Lang } from "@/i18n";

/** A page hero: an eyebrow, a big serif title rising, and optionally a photo inside a rounded frame. */
export function PageHero({ eyebrow, title, photo, lang, tone = "bg-marca text-fundo", eyebrowTone = "text-ember", children, aspect = "aspect-[16/9] md:aspect-[21/8]" }: { eyebrow: string; title: string | string[]; photo?: Photo; lang: Lang; tone?: string; eyebrowTone?: string; children?: ReactNode; aspect?: string }) {
  return (
    <section className={cn("on-dark tex-azulejo relative overflow-hidden pb-14", tone)} style={{ paddingTop: "calc(var(--label-h) + 130px)" }}>
      <div className="container-x">
        <p className={cn("eyebrow", eyebrowTone)}>{eyebrow}</p>
        <SplitReveal as="h1" text={title} className="mt-4 fs-mega font-semibold" />
        {children}
        {photo && <MaskImage src={photo.src} srcSet={`${photo.sm} 800w, ${photo.src} 1600w`} sizes="(min-width: 1520px) 1400px, 92vw" alt={photo.alt[lang]} w={photo.w} h={photo.h} eager className={cn("mt-10 w-full rounded-[28px]", aspect)} radius="28px" />}
      </div>
    </section>
  );
}
