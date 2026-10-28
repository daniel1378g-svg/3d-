import { UI } from "@/i18n";
import { IMPRESSUM } from "@/copy";
import { CONTACT } from "@/content";
import { useSite } from "@/site";
import { Reveal } from "@/components/Reveal";

export function Impressum() {
  const { lang } = useSite();
  return (
    <section aria-labelledby="impressum-title" className="on-light gutter bg-snow py-20 md:py-28">
      <div className="wrap max-w-3xl">
        <h1 id="impressum-title" className="font-display text-[clamp(2.6rem,7vw,5rem)] font-extrabold leading-none tracking-tight">
          {UI.nav.impressum[lang]}
        </h1>
        <Reveal className="mt-10 grid gap-8 text-lg leading-relaxed">
          <div>
            <p className="font-semibold">{IMPRESSUM.responsible[lang]}</p>
            <address className="mt-2 not-italic">
              {CONTACT.name}
              <br />
              {CONTACT.street}
              <br />
              {CONTACT.city}
              <br />
              {UI.country[lang]}
            </address>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold">{IMPRESSUM.warrantyTitle[lang]}</h2>
            <p className="mt-2">{IMPRESSUM.warranty[lang]}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
