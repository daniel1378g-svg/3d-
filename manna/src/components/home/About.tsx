// About Manna, from its own pages: the açaíteria in the Archhöfe, the bowl and the cup, Brazilian flavours, the
// sugarcane press – and the açaí berry, shown with the stock photo the site itself uses (labelled as such). Beside
// it, Manna's clip of sugarcane being pressed in the shop.
import { useSite } from "@/site";
import { Img } from "../Img";
import { ShopClip } from "./CupStory";

export function About() {
  const { t } = useSite();
  const a = t.about;
  return (
    <section id="ueber" data-anchor="ueber" className="skin-plum relative overflow-hidden py-24 md:py-32" aria-labelledby="about-title">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-berry opacity-40 blur-[90px]" />
      <div className="gutter relative">
        <div className="wrap grid gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="kicker text-lilac-3" data-lang-stagger>{a.kicker}</p>
            <h2 id="about-title" className="display mt-3 text-[clamp(3rem,7.4vw,7.4rem)]">{a.title}</h2>
            <p className="lead mt-6 max-w-[44rem] text-cream/90">{a.body}</p>
            <div className="mt-12 grid gap-6 rounded-[var(--radius-xl2)] bg-plum-2 p-6 md:grid-cols-[0.9fr_1.1fr] md:items-center md:p-8">
              <figure>
                <Img id="acai-berries-stock" sizes="(min-width: 768px) 30vw, 90vw" className="aspect-[3/2] w-full rounded-[24px]" />
                <figcaption className="mt-2 text-xs text-cream/80">{a.stockNote}</figcaption>
              </figure>
              <div>
                <h3 className="font-display text-[1.6rem] font-extrabold text-lime">{a.berryTitle}</h3>
                <p className="mt-3 text-cream/90">{a.berry}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <ShopClip id="clip-caldo-de-cana" title={t.products.items["caldo-de-cana"].label} caption="Caldo de Cana · manna-acai.ch" className="mx-auto w-full max-w-[340px]" />
            <figure className="mx-auto w-full max-w-[340px]">
              <Img id="supplier-cups" sizes="340px" className="aspect-[3/2] w-full rounded-[24px]" />
              <figcaption className="mt-2 text-xs text-cream/80">{a.supplierNote}</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
