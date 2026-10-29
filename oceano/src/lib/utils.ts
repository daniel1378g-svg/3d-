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

/**
 * True when WebGL runs on a real GPU. Software renderers (SwiftShader, llvmpipe) draw the shaders on the CPU
 * and block the page, so they keep the still images instead and three.js is never downloaded.
 * `?gl=1` forces WebGL on (for testing in headless browsers).
 */
let cached: boolean | null = null;
export function gpuWebGL() {
  if (cached !== null) return cached;
  try {
    if (/[?&]gl=1/.test(location.search) || /gl=1/.test(location.hash)) return (cached = true);
    const gl = document.createElement("canvas").getContext("webgl2") ?? document.createElement("canvas").getContext("webgl");
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

/** Lower-case, accents removed: "Açordas" → "acordas", for searches. */
export const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export const pad2 = (n: number) => String(n).padStart(2, "0");
