// Turns journey progress into the camera pose: evaluates the shot keys (camera-shots.js) with
// per-channel monotone Hermite curves, resolves car-relative keys against the car's current
// ground frame, blends in the intro pose, adds a slow vertical bob, widens the FOV on narrow
// (portrait) viewports and applies the page's framing offset (the subject sits beside the text).
import { Vector3 } from 'three';
import { INTRO_CAMERA_FOV, INTRO_CAMERA_POSITION } from './camera-shots.js';
import { clamp, hermite, lerp, monotoneSlope } from './util/math.js';

/** Viewports narrower than this aspect get a wider vertical FOV (tan scaled by √(1.6/aspect)). */
const REFERENCE_ASPECT = 1.6;
const MAX_FOV_WIDENING = 2.2;

/** Vertical FOV (degrees) widened for narrow aspects so portrait screens keep more of the shot. */
function widenFovForAspect(fov, aspect) {
  const widening = Math.max(1, Math.sqrt(REFERENCE_ASPECT / aspect));
  return widening > 1
    ? (2 * Math.atan(Math.tan((fov * Math.PI) / 360) * Math.min(MAX_FOV_WIDENING, widening)) * 180) / Math.PI
    : fov;
}

/**
 * `carFrame` is the car's ground frame ({ p: position, f: flat forward, r: right }), updated by
 * car-motion.js before the camera runs. `position`/`target` hold the last applied camera pose
 * (the shadow follow reads them).
 */
function createCameraDirector(camera, shots, carFrame) {
  const times = shots.map((shot) => shot.u);
  // per shot index: x, y, z of pos, x, y, z of tgt, fov. Only the keys around the active segment
  // are refreshed each frame (car-relative keys move with the car).
  const channels = [[], [], [], [], [], [], []];
  const scratch = new Vector3();
  const position = new Vector3();
  const target = new Vector3();

  /** World position of a shot's `pos` or `tgt` (a new Vector3). */
  function resolve(shot, key) {
    const spec = shot[key];
    if (spec.abs) return scratch.set(...spec.abs).clone();
    const [along, up, side] = spec.rel;
    return carFrame.p
      .clone()
      .addScaledVector(carFrame.f, along)
      .addScaledVector(carFrame.r, side)
      .setY(up + carFrame.p.y);
  }

  /** Writes the interpolated camera position/target for `progress`; returns the FOV (degrees). */
  function evaluateShots(progress, outPosition, outTarget) {
    const u = clamp(progress, 0, 1);
    let seg = 0;
    while (seg < shots.length - 2 && u > times[seg + 1]) seg++;
    // the Hermite slopes at seg and seg+1 read keys seg-1 .. seg+2
    for (let k = Math.max(0, seg - 1); k <= Math.min(shots.length - 1, seg + 2); k++) {
      const pos = resolve(shots[k], 'pos');
      const tgt = resolve(shots[k], 'tgt');
      channels[0][k] = pos.x;
      channels[1][k] = pos.y;
      channels[2][k] = pos.z;
      channels[3][k] = tgt.x;
      channels[4][k] = tgt.y;
      channels[5][k] = tgt.z;
      channels[6][k] = shots[k].fov;
    }
    const channel = (c) =>
      hermite(
        times[seg],
        times[seg + 1],
        channels[c][seg],
        channels[c][seg + 1],
        monotoneSlope(times, channels[c], seg),
        monotoneSlope(times, channels[c], seg + 1),
        u,
      );
    outPosition.set(channel(0), channel(1), channel(2));
    outTarget.set(channel(3), channel(4), channel(5));
    return channel(6);
  }

  /**
   * Poses `camera` for this frame.
   *   introEase  eased intro amount 0..1 (1 = no intro blend)
   *   clock      seconds since start (drives the bob)
   *   debugCam   optional { pos, tgt, fov } override (api.debugCam)
   *   width, height        drawing buffer size in device pixels
   *   framingX, framingY   view offset as fractions of the width/height (setFraming)
   */
  function update({ progress, introEase, clock, debugCam, width, height, framingX, framingY }) {
    const pos = new Vector3();
    const tgt = new Vector3();
    let fov = evaluateShots(progress, pos, tgt);
    if (debugCam) {
      pos.set(...debugCam.pos);
      tgt.set(...debugCam.tgt);
      fov = debugCam.fov || fov;
    }
    if (introEase < 1) {
      const start = new Vector3(...INTRO_CAMERA_POSITION);
      pos.lerpVectors(start, pos, introEase);
      fov = lerp(INTRO_CAMERA_FOV, fov, introEase);
    }
    const bob = Math.sin(clock * 0.23) * 0.12; // slow handheld-like drift, ±0.036 m vertically
    pos.y += bob * 0.3;
    position.copy(pos);
    target.copy(tgt);
    fov = widenFovForAspect(fov, camera.aspect);
    camera.position.copy(position);
    camera.lookAt(target);
    camera.fov = fov;
    // shifts the image inside the full frame: negative x moves it right, positive y moves it up
    if (framingX || framingY)
      camera.setViewOffset(width, height, -framingX * width, framingY * height, width, height);
    else camera.clearViewOffset();
    camera.updateProjectionMatrix();
  }

  return { position, target, evaluateShots, update };
}

export { createCameraDirector, widenFovForAspect };
