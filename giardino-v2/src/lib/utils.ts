import { clsx, type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => clsx(inputs);
/** A file in public/, relative in the preview build (served next to the page). */
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

/**
 * True when WebGL runs on a real GPU. Software renderers (SwiftShader, llvmpipe) draw on the CPU and would block the
 * page, so they keep the still image and three.js is never downloaded. `gl=1` in the address forces WebGL (tests).
 */
let cached: boolean | null = null;
export function gpuWebGL() {
  if (cached !== null) return cached;
  try {
    if (/[?&#]gl=1/.test(location.search + location.hash)) return (cached = true);
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) return (cached = false);
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const name = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    cached = !/swiftshader|llvmpipe|software|basic render/i.test(name);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    cached = false;
  }
  return cached;
}

export const pad2 = (n: number) => String(n).padStart(2, "0");
/** Fills {name} placeholders. */
export const fmt = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
