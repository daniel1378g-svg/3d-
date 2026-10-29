// Confidentialité & cookies: the live text, in readable numbered parts with fine cork rules between them.
import { copy } from "@/copy";
import { useSite } from "@/site";
import { Arrow, SplitText } from "@/components/ui";
import { AzulejoTile } from "@/components/illustrations";

const sentences = (s: string) => s.match(/[^.!?]+[.!?]+/g)?.map((x) => x.trim()) ?? [s];

export function PrivacyPage() {
  const { lang, go, href } = useSite();
  const t = copy(lang);
  const parts = sentences(t.legal.privacyText);
  return (
    <section className="tone-nata tex-azulejo min-h-[80svh] pb-[clamp(80px,10vw,150px)] pt-[calc(var(--header-h)+var(--label-h)+clamp(56px,7vw,110px))]" aria-labelledby="privacy-title">
      <div className="container grid max-w-[1100px] gap-10">
        <div className="flex items-end justify-between gap-6">
          <div className="grid gap-5">
            <p className="eyebrow text-francesinha">{t.ui.privacyLead}</p>
            <SplitText as="h1" id="privacy-title" text={t.legal.privacyTitle} immediate className="display fs-xxl text-azulejo" />
          </div>
          <AzulejoTile className="hidden w-[120px] flex-none rotate-6 sm:block" />
        </div>
        <ol className="m-0 grid list-none p-0">
          {parts.map((p, i) => (
            <li key={i} className="grid gap-3 border-t border-cortica/40 py-8 sm:grid-cols-[80px_1fr]">
              <span className="eyebrow tnum text-cortica">{String(i + 1).padStart(2, "0")}</span>
              <p className="lede max-w-[46ch]">{p}</p>
            </li>
          ))}
        </ol>
        <a
          href={href("home")}
          onClick={(e) => {
            e.preventDefault();
            go("home", "accueil");
          }}
          className="link-line justify-self-start text-azulejo"
        >
          {t.ui.backHome} <Arrow />
        </a>
      </div>
    </section>
  );
}
