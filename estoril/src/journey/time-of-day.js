// Morning to golden-hour lighting keys, sampled by journey progress.
import { Color } from 'three';
import { clamp, lerp, smoothstep } from './util/math.js';

/**
 * Lighting keyframes. Fields:
 *   t       journey progress (0 = arrival, 1 = golden hour) at which this key applies
 *   sunEl   sun elevation above the horizon, degrees
 *   sunAz   sun azimuth, degrees clockwise from -z ("north") towards +x ("east");
 *           journey.js turns (sunEl, sunAz) into the direction (sin az cos el, sin el, -cos az cos el)
 *   sun     sun (directional light) colour, sRGB hex; also the sky shader's sun colour
 *   sunI    sun intensity
 *   sky     hemisphere light sky colour, sRGB hex
 *   gnd     hemisphere light ground colour, sRGB hex
 *   hemiI   hemisphere light intensity
 *   zen     sky dome zenith colour, sRGB hex
 *   hor     sky dome horizon colour, sRGB hex
 *   fog     fog colour, sRGB hex
 *   exp     renderer tone-mapping exposure
 */
var TIME_OF_DAY = [
    {
      t: 0,
      sunEl: 15,
      sunAz: 110,
      sun: 0xffe0c0,
      sunI: 3.6,
      sky: 0xcfdce6,
      gnd: 0x58644e,
      hemiI: 0.92,
      zen: 0x7fb0d8,
      hor: 0xe7eef1,
      fog: 0xdfe8ec,
      exp: 1.04,
    },
    {
      t: 0.45,
      sunEl: 52,
      sunAz: 175,
      sun: 0xfff5e8,
      sunI: 3.9,
      sky: 0xd6e2ea,
      gnd: 0x5e6a52,
      hemiI: 0.98,
      zen: 0x5d9ed6,
      hor: 0xd9e4e9,
      fog: 0xd9e4e9,
      exp: 1,
    },
    {
      t: 0.75,
      sunEl: 26,
      sunAz: 238,
      sun: 0xffe2bc,
      sunI: 3.7,
      sky: 0xdbe0e2,
      gnd: 0x5c6550,
      hemiI: 0.9,
      zen: 0x6d9fce,
      hor: 0xe6e3da,
      fog: 0xe2e2dc,
      exp: 1,
    },
    {
      t: 1,
      sunEl: 7,
      sunAz: 262,
      sun: 0xffa95c,
      sunI: 3.7,
      sky: 0xf0c9a2,
      gnd: 0x5a5244,
      hemiI: 0.72,
      zen: 0x6b80ab,
      hor: 0xf3bf8b,
      fog: 0xeac39c,
      exp: 1.08,
    },
  ],
  /** Keys holding colours (blended as colours, not as numbers). */
  COLOR_KEYS = ['sun', 'sky', 'gnd', 'zen', 'hor', 'fog'],
  scratchColorFrom = new Color(),
  scratchColorTo = new Color();

/**
 * Lighting at journey progress `progress` (0..1, clamped by the key range): the two surrounding
 * keys blended with a smoothstep. Colours go through THREE.Color, i.e. they are blended in the
 * linear working colour space and returned as sRGB hex numbers. Returns a new object with every
 * field of TIME_OF_DAY (including a blended `t`, which callers ignore).
 */
function sampleTimeOfDay(progress) {
  let keyIndex = 0;
  for (; keyIndex < TIME_OF_DAY.length - 2 && progress > TIME_OF_DAY[keyIndex + 1].t;) keyIndex++;
  let from = TIME_OF_DAY[keyIndex],
    to = TIME_OF_DAY[keyIndex + 1],
    blend = smoothstep(clamp((progress - from.t) / (to.t - from.t), 0, 1)),
    blendColor = (key) => scratchColorFrom.set(from[key]).lerp(scratchColorTo.set(to[key]), blend).getHex(),
    sample = {};
  for (let key of Object.keys(from))
    sample[key] =
      typeof from[key] == 'number' && !COLOR_KEYS.includes(key)
        ? lerp(from[key], to[key], blend)
        : blendColor(key);
  return sample;
}

export { sampleTimeOfDay };
