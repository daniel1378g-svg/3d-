// Section 12: "Pour vos livraisons", with a scooter riding across and the two live delivery links.
import { useRef } from "react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { TEXT } from "@/content/site";
import { useGsap } from "@/lib/useGsap";
import { useReduced } from "@/lib/useMedia";
import { SplitReveal } from "../Reveal";
import { DeliveryLinks } from "../Contact";
import { LottieIcon } from "../lottie/LottieIcon";

export function Livraison() {
  const { lang } = useSite();
  const root = useRef<HTMLElement>(null);
  const reduce = useReduced();
  useGsap(
    (gsap) => {
      gsap.fromTo(".lv-scooter", { xPercent: -120 }, { xPercent: 900, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
    },
    root,
    [reduce],
    !reduce,
  );
  return (
    <section id="livraison" ref={root} className="relative overflow-hidden bg-destaque py-24 text-marca-escura md:py-32" aria-labelledby="lv-title">
      <div className="container-x">
        <p className="eyebrow">12 / 16 · {UI.livraison[lang]}</p>
        <SplitReveal as="h2" id="lv-title" text={[TEXT.deliveryTitle[lang]]} className="mt-4 fs-xxl font-extrabold" />
        <div aria-hidden="true" className="relative mt-8 h-20 overflow-hidden">
          <span className="lv-scooter absolute left-0 top-0 grid h-20 w-20 place-items-center rounded-full bg-marca-escura">
            <LottieIcon name="bag" size={52} color="#FFFFFF" accent="#DD9933" mode="loop" />
          </span>
          <span className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-marca-escura/30" />
        </div>
        <DeliveryLinks size="lg" onGold className="mt-8" />
      </div>
    </section>
  );
}
