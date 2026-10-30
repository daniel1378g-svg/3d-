// Groups and celebrations: the restaurant asks groups to call, so this is a phone call, with the one photo of a
// real birthday table at the restaurant.
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
          <figure className="relative mx-auto w-full max-w-[380px] rotate-[3deg] rounded-[28px] bg-creme p-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:rotate-0">
            <Img id="grupo" sizes="380px" className="aspect-[4/5] w-full rounded-[20px]" position="50% 70%" />
            <figcaption className="px-2 pb-1 pt-3 text-sm text-tinta/75">{t.groups.photo}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
