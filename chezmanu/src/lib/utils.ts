import { clsx, type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => clsx(inputs);
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export function storage(kind: "local" | "session") {
  return {
    get(key: string) {
      try {
        return (kind === "local" ? localStorage : sessionStorage).getItem(key);
      } catch {
        return null;
      }
    },
    set(key: string, value: string) {
      try {
        (kind === "local" ? localStorage : sessionStorage).setItem(key, value);
      } catch {
        /* private mode or blocked storage: the choice just isn't remembered */
      }
    },
  };
}

export const prefersReducedMotion = () => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
export const finePointer = () => typeof matchMedia !== "undefined" && matchMedia("(hover: hover) and (pointer: fine)").matches;

/** Save-Data, a weak CPU or very little memory: the WebGL scenes stay still. */
export function lowPower() {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  return Boolean(nav.connection?.saveData) || (nav.hardwareConcurrency ?? 8) <= 2 || (nav.deviceMemory ?? 8) < 2;
}

let gl: boolean | null = null;
/**
 * WebGL with a real GPU. Software renderers (SwiftShader, llvmpipe: no GPU, or a blocked one) draw on the
 * CPU and would freeze the page, so they count as "no WebGL" and keep the still frames. `?forcegl` overrides.
 */
export function webglAvailable() {
  if (gl !== null) return gl;
  try {
    const c = document.createElement("canvas");
    const ctx = (c.getContext("webgl2") || c.getContext("webgl")) as WebGLRenderingContext | null;
    if (!ctx) return (gl = false);
    const info = ctx.getExtension("WEBGL_debug_renderer_info");
    const renderer = info ? String(ctx.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    ctx.getExtension("WEBGL_lose_context")?.loseContext();
    gl = !/swiftshader|llvmpipe|software|basic render/i.test(renderer) || new URLSearchParams(location.search).has("forcegl");
    return gl;
  } catch {
    return (gl = false);
  }
}

export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
