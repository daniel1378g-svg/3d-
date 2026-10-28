// Device tilt, shared by the hero camera and the living photos. iOS asks for permission after a tap.
export const tilt = { x: 0, y: 0, has: false };
let listening = false;

function listen() {
  if (listening) return;
  listening = true;
  window.addEventListener("deviceorientation", (e) => {
    if (e.gamma == null || e.beta == null) return;
    tilt.has = true;
    tilt.x = Math.max(-1, Math.min(1, e.gamma / 25));
    tilt.y = Math.max(-1, Math.min(1, (e.beta - 45) / 25));
  });
}

export const tiltNeedsPermission = () =>
  typeof DeviceOrientationEvent !== "undefined" && typeof (DeviceOrientationEvent as unknown as { requestPermission?: unknown }).requestPermission === "function";

export async function enableTilt() {
  const D = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
  if (typeof D.requestPermission === "function") {
    const answer = await D.requestPermission().catch(() => "denied");
    if (answer !== "granted") return false;
  }
  listen();
  return true;
}

/** Phones that don't ask (Android) get tilt without a tap; desktops never fire the event. */
export function autoTilt() {
  if (!tiltNeedsPermission()) listen();
}
