// The product range exactly as the range page (manna-acai.ch/?page_id=108) lists it, checked 30.10.2026: names as
// published, grouped into four visitor-facing categories. Descriptions are in the dictionaries (src/i18n), so every
// language has them. No prices, sizes or topping lists are published, so none exist here. Photos are the site's own;
// products without a photo of their own get a typographic card instead.
export const CATEGORIES = ["acai", "bowls", "drinks", "waffles"] as const;
export type Category = (typeof CATEGORIES)[number];

export type Product = {
  id: ProductId;
  category: Category;
  /** the name as published (stays the same in every language) */
  name: string;
  /** spelling on the live site where the name here corrects an obvious typo */
  publishedAs?: string;
  images: string[];
  /** published variants (only Caldo de Cana has any), keys of t.products.variants */
  variants?: readonly ("pur" | "zitrone" | "ingwer" | "ananasMinze")[];
  /** "Je nach Angebot" (depends on what is on offer that day) */
  dependsOnOffer?: boolean;
  /** visitors compose it themselves in the shop */
  buildYourOwn?: boolean;
  /** the flavours the page names as examples */
  flavours?: readonly string[];
};
export type ProductId =
  | "acai-im-becher" | "acai-cupuacu" | "acai-bowl" | "acai-saft-smoothie" | "bowls-smoothies"
  | "milchshakes" | "suco-de-pulpa" | "caldo-de-cana" | "mixsaft" | "bubble-waffel" | "frappes";

export const PRODUCTS: Product[] = [
  { id: "acai-im-becher", category: "acai", name: "Açaí im Becher", images: ["acai-becher-layers", "acai-becher-granola-fruit", "acai-becher-mango", "acai-becher-kiwi", "acai-becher-granola"], buildYourOwn: true },
  { id: "acai-cupuacu", category: "acai", name: "Açaí & Cupuaçu", images: [] },
  { id: "acai-bowl", category: "acai", name: "Açaí Bowl", images: ["acai-bowl-blueberries", "acai-bowl-banana", "acai-bowl-fruit"] },
  { id: "acai-saft-smoothie", category: "acai", name: "Açaí-Saft & Smoothie", images: ["acai-saft"] },
  { id: "bowls-smoothies", category: "bowls", name: "Bowls und Smoothies", images: ["mango-bowl", "guave-bowl", "bowl-orange"], dependsOnOffer: true, flavours: ["Graviola", "Cupuaçú", "Kakaofrüchte"] },
  { id: "milchshakes", category: "drinks", name: "Milchshakes", images: [] },
  { id: "suco-de-pulpa", category: "drinks", name: "Suco de pulpa de fruta", images: [] },
  { id: "caldo-de-cana", category: "drinks", name: "Caldo de Cana", publishedAs: "Caldo do Cana", images: ["caldo-de-cana"], variants: ["pur", "zitrone", "ingwer", "ananasMinze"] },
  { id: "mixsaft", category: "drinks", name: "Mixsaft", images: [] },
  { id: "bubble-waffel", category: "waffles", name: "Bubble Waffel", images: ["promo-bubble-waffle"], buildYourOwn: true },
  { id: "frappes", category: "waffles", name: "Frappés", images: [] },
];

export const productsIn = (c: Category) => PRODUCTS.filter((p) => p.category === c);
export const findProduct = (id: string) => PRODUCTS.find((p) => p.id === id);

/** Search over the published name, the localized texts and the named flavours; accents and case are ignored. */
export const norm = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
export function searchProducts(q: string, text: (p: Product) => string) {
  const n = norm(q.trim());
  if (!n) return PRODUCTS;
  return PRODUCTS.filter((p) => norm([p.name, p.publishedAs ?? "", ...(p.flavours ?? []), text(p)].join(" ")).includes(n));
}

/**
 * Photographs from the homepage gallery of things the range page does not list. They are shown as gallery
 * pictures with their captions, not as current products.
 */
export const GALLERY_ONLY = ["pao-de-queijo", "brigadeiro-de-acai", "coxinha", "cuscuz-de-tapioca", "schoggi-kuchen", "maiskuchen", "maniok-kuchen", "acai-mousse", "granola"] as const;
