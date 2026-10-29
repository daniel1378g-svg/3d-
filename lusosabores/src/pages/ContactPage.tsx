// Contact: "VENEZ NOUS RENDRE VISITE" set giant, then the contact bento at full size and a map that loads only
// on tap. No form and no e-mail: the live site has neither.
import { useSite } from "@/site";
import { BUSINESS, TEXT } from "@/content/site";
import { SplitReveal } from "@/components/Reveal";
import { ContactBento } from "@/components/home/ContactSection";
import { MapOnTap } from "@/components/Contact";
import { IconPhone } from "@/components/icons";

export default function ContactPage() {
  const { lang } = useSite();
  return (
    <>
      <section className="relative overflow-hidden bg-marca pb-10 text-branco" style={{ paddingTop: "calc(var(--label-h) + 130px)" }}>
        <div className="container-x">
          <p className="eyebrow text-destaque">{BUSINESS.upper}</p>
          <SplitReveal as="h1" text={TEXT.visit[lang].split(/ (?=nous |us |visitar|a trovarci|Sie )/)} className="mt-4 fs-mega font-extrabold" />
        </div>
      </section>
      <section className="bg-marca pb-24 text-branco">
        <div className="container-x space-y-4">
          <ContactBento withTitle />
          <MapOnTap className="h-[min(60svh,520px)]" />
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-[24px] bg-marca-escura p-6 md:p-8">
            <p className="max-w-[760px] text-[clamp(18px,1.5vw,22px)]">{TEXT.toBook[lang]}</p>
            <a href={`tel:${BUSINESS.booking.tel}`} className="btn">
              <IconPhone size={18} />
              <span className="btn-roll">
                <span>{BUSINESS.booking.label}</span>
                <span aria-hidden="true">{BUSINESS.booking.label}</span>
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
