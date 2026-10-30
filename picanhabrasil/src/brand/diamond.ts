// The logo's shape: the Brazilian-flag rhombus (lozango) of the Picanha Brasil badge. Used as the mask of the intro
// and the language-switch curtain. Slightly wider than tall, like the flag's lozenge.
export const DIAMOND_VIEWBOX = "0 0 100 86";
export const DIAMOND_PATH = "M50 0 L100 43 L50 86 L0 43 Z";
/** height / width of the shape, to centre a mask on a point */
export const DIAMOND_RATIO = 0.86;
export const diamondMaskUrl = `url("data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='${DIAMOND_VIEWBOX}'><path d='${DIAMOND_PATH}'/></svg>`)}")`;
