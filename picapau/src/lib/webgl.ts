/**
 * True when WebGL 2 runs on a real GPU. Software renderers (SwiftShader, llvmpipe) draw these shaders on
 * the CPU and block the page, so they keep the CSS fallbacks instead; three.js is then never downloaded.
 */
let cached: boolean | null = null;
export function gpuWebGL() {
  if (cached !== null) return cached;
  // ?webgl=1 forces the scenes on (to check them in a headless browser), ?webgl=0 forces the stills
  const force = typeof location !== "undefined" ? new URLSearchParams(location.search).get("webgl") : null;
  if (force === "1" || force === "0") return (cached = force === "1");
  try {
    const gl = document.createElement("canvas").getContext("webgl2");
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
