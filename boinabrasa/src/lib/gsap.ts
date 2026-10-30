import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);
gsap.config({ nullTargetWarn: false });
export { gsap, ScrollTrigger, SplitText };

if (import.meta.env.DEV) (window as unknown as { gsap: typeof gsap }).gsap = gsap;
