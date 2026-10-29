// Impressum: the live "Kontaktangaben" and "Rechtliche Hinweise" (the cookie notice) verbatim, plain and
// readable. The German text is the reference; the translated pages say so.
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TX } from "@/content/site";
import { SplitReveal } from "@/components/Reveal";

export default function ImpressumPage() {
  const { lang } = useSite();
  return (
    <section className="bg-fundo pb-24 text-tinta" style={{ paddingTop: "calc(var(--label-h) + 130px)" }}>
      <div className="container-x max-w-[860px]">
        <p className="eyebrow text-linha">{TX.impressum[lang]}</p>
        <SplitReveal as="h1" text={[TX.impressumH1[lang]]} className="mt-4 fs-xl font-extrabold" />
        <dl className="mt-10 space-y-3 text-[18px]">
          <div>
            <dt className="sr-only">Firma</dt>
            <dd className="font-bold">{TX.impressumFirma[lang]}</dd>
          </div>
          <div className="flex flex-wrap gap-x-2">
            <dt>{TX.adresse[lang]}:</dt>
            <dd>
              {BUSINESS.restaurant.street} {BUSINESS.restaurant.city}
            </dd>
          </div>
          <div className="flex flex-wrap gap-x-2">
            <dt>{TX.formTelefon[lang]}:</dt>
            <dd>
              <a className="link" href={`tel:${BUSINESS.restaurant.tel}`}>
                {BUSINESS.restaurant.phone}
              </a>
            </dd>
          </div>
          <div className="flex flex-wrap gap-x-2">
            <dt>{TX.formEmail[lang]}:</dt>
            <dd>
              <a className="link" href={`mailto:${BUSINESS.email}`}>
                {BUSINESS.email}
              </a>
            </dd>
          </div>
          <div className="flex flex-wrap gap-x-2 pt-3">
            <dt>{BUSINESS.shop}:</dt>
            <dd>
              {BUSINESS.laden.street} {BUSINESS.laden.city} ·{" "}
              <a className="link" href={`tel:${BUSINESS.laden.tel}`}>
                {BUSINESS.laden.phone}
              </a>
            </dd>
          </div>
        </dl>
        <h2 className="mt-14 fs-l font-extrabold">{TX.impressumH2[lang]}</h2>
        <p className="mt-5 text-[18px] leading-relaxed">{TX.cookie[lang]}</p>
        <p className="mt-6">
          <a className="link" href={BUSINESS.privacy} target="_blank" rel="noopener noreferrer">
            {UI.privacy[lang]} <span className="sr-only">{UI.externalNew[lang]}</span>
          </a>
        </p>
        <p className="mt-8 text-[15px] text-linha">
          {TX.eintraege[lang]}{" "}
          <a className="link" href={BUSINESS.localCh} target="_blank" rel="noopener noreferrer">
            local.ch
          </a>{" "}
          ·{" "}
          <a className="link" href={BUSINESS.searchCh} target="_blank" rel="noopener noreferrer">
            search.ch
          </a>
        </p>
        {lang !== "de" && <p className="mt-6 text-[14px] text-linha">{UI.reference[lang]}</p>}
      </div>
    </section>
  );
}
