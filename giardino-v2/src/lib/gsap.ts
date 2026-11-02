import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setScrollRefresher } from "./scroll";

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });
// pinned scenes recalculate after the address bar of a phone shows or hides only when the width changes
ScrollTrigger.config({ ignoreMobileResize: true });
setScrollRefresher(() => ScrollTrigger.refresh());
export { gsap, ScrollTrigger };
