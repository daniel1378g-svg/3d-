import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setScrollRefresher } from "./scroll";

gsap.registerPlugin(ScrollTrigger);
setScrollRefresher(() => ScrollTrigger.refresh());
export { gsap, ScrollTrigger };
