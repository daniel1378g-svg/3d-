// The built pages paint their first screen as static HTML before the app runs (scripts/postbuild-routes.mjs).
// This module is imported first by main.tsx, so it can keep hold of the shell's photo nodes before React
// replaces #root: the components adopt those same nodes, and the browser doesn't load or paint them twice.
const q = <T extends Element>(sel: string) => (typeof document !== "undefined" ? document.querySelector<T>(sel) : null);

export const SHELL = {
  hero: q("#shell-hero") !== null,
  heroVisual: q<HTMLElement>("#shell-hero [data-shell-visual]"),
  offer: q("#shell-offer") !== null,
  offerPhoto: q<HTMLElement>("#shell-offer [data-shell-photo]"),
  contact: q("#shell-contact") !== null,
};

/** A ref callback that moves a shell node into the element React rendered for it. */
export const adopt = (node: HTMLElement | null) => (el: HTMLElement | null) => {
  if (el && node && !el.contains(node)) el.appendChild(node);
};
