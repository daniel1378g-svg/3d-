// Groups and celebrations: for groups the way in is a phone call (no group service is published beyond that).
import { useSite } from "@/site";
import { PHONE } from "@/content/facts";
import { Img } from "../Img";
import { IconPhone } from "../icons";

export function Groups() {
  const { t } = useSite();
  return (
    <section id="gruppen" data-anchor="gruppen" className="skin-vinho relative overflow-hidden py-24 md:py-32" aria-labelledby="groups-title">
      <div className="gutter">
        <div className="wrap grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="kicker text-ouro" data-lang-stagger>{t.groups.kicker}</p>
            <h2 id="groups-title" className="display mt-3 text-[clamp(3.2rem,8vw,8rem)]">{t.groups.title}</h2>
            <p className="lead mt-5 max-w-[38rem] text-creme/85">{t.groups.lead}</p>
            <a className="pill pill-cream mt-8" href={PHONE.href}><IconPhone size={18} />{PHONE.display}</a>
          </div>
          <div aria-hidden="true" className="mx-auto grid w-full max-w-[420px] grid-cols-2 gap-4">
            {[["cutout-coxinha", "-rotate-6"], ["cutout-bier", "rotate-3 translate-y-6"], ["cutout-picanha", "rotate-2 -translate-y-2"], ["cutout-pudim", "-rotate-3 translate-y-4"]].map(([id, cls]) => (
              <div key={id} className={`grid aspect-square place-items-center rounded-[28px] bg-creme/[0.07] p-6 ring-1 ring-creme/10 transition-transform duration-500 hover:rotate-0 ${cls}`}>
                <Img id={id} alt="" sizes="180px" fit="contain" className="w-full drop-shadow-[0_18px_22px_rgba(0,0,0,0.5)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
