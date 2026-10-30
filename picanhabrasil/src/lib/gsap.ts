import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });
export { gsap, ScrollTrigger };

if (import.meta.env.DEV) (window as unknown as { gsap: typeof gsap }).gsap = gsap;
