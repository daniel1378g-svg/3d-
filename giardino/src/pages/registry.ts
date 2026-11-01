// Pages load as separate chunks. The client loads the current page before hydrating and the next page before a
// transition; the server renderer and the preview register them all up front.
import type { ComponentType } from "react";
import type { PageKey } from "@/routes";

export type PageId = PageKey | "notFound";
type Loader = () => Promise<ComponentType>;
const info = () => import("./Info");
const loaders: Record<PageId, Loader> = {
  home: () => import("./Home").then((m) => m.default),
  menu: () => import("./Menu").then((m) => m.default),
  reserve: () => import("./Reserve").then((m) => m.default),
  status: () => import("./Reserve").then((m) => m.StatusPage),
  kids: () => import("./Kids").then((m) => m.default),
  hosts: () => import("./Hosts").then((m) => m.default),
  gallery: () => import("./Gallery").then((m) => m.default),
  visit: () => import("./Visit").then((m) => m.default),
  contact: () => import("./Visit").then((m) => m.ContactPage),
  hotels: () => info().then((m) => m.Hotels),
  jobs: () => info().then((m) => m.Jobs),
  press: () => info().then((m) => m.Press),
  tour: () => info().then((m) => m.Tour),
  imprint: () => info().then((m) => m.Imprint),
  privacy: () => info().then((m) => m.Privacy),
  notFound: () => info().then((m) => m.NotFound),
};
const cache = new Map<PageId, ComponentType>();
export const cachedPage = (p: PageId) => cache.get(p);
export async function loadPage(p: PageId) {
  if (!cache.has(p)) cache.set(p, await loaders[p]());
  return cache.get(p)!;
}
export const registerPages = (all: Partial<Record<PageId, ComponentType>>) => {
  for (const [k, v] of Object.entries(all)) if (v) cache.set(k as PageId, v);
};
