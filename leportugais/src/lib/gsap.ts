import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setScrollRefresher } from "./scroll";

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });
setScrollRefresher(() => ScrollTrigger.refresh());
export { gsap, ScrollTrigger };
export const EASE_OUT = "expo.out";
