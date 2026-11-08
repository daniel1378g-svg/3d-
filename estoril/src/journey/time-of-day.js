// Time of day: journey progress → local solar time → the sun's real position over the circuit and
// the lighting palette (sun, sky, fog, ambient, exposure) for that moment.
//
// Sun position. Circuito Estoril lies at 38.75° N. The day is a late-spring one (solar declination
// +18.8°, mid May or late July, matching the late-spring ground palette of docs/references.md 4.3),
// so the sun rises in the ENE and sets in the WNW. Elevation and azimuth come from the standard
// solar-geometry formulas for the local solar hour; the azimuth (degrees clockwise from north) is
// turned into scene coordinates with the real-world frame measured in references.md §2:
//   North = (+0.911, −0.417), East = (+0.416, +0.909) in the (x, z) ground plane.
// That gives the brief's light (references.md 4.9): in the morning the sun stands behind the
// grandstands (+z) and front-lights the pit facade; in the golden hour it is 4–9° high behind the
// pit building (−z), so the pit lane falls into shadow and the grandstand glows.
//
// Journey progress → solar hour is a monotone cubic through one key per stage boundary: the sun
// moves slowly while a stage panel is shown and faster in the transitions between stages:
//   arrival 06:45–06:54 (20–22°), pit lane 07:24–07:48 (26–31°), aerial 07:48 → 09:36,
//   on track 09:36–10:24 (52–60°), paddock 14:36–15:24 (51–41°), golden hour 18:15–18:37 (9–5°).
//
// Palette. Keys by solar hour, authored as DISPLAY colours (sRGB hex as seen on screen; the sky and
// fog values are the photo samples of references.md 4.9 where the brief gives them). The sky dome
// and the fog are drawn in display space (sky.js, lighting.js), the lights are scene-linear. Keys are
// blended with a smoothstep in linear light.
//
// sampleTimeOfDay(hour, out) fills `out` (createTimeOfDaySample()) and allocates nothing.
import { Color, LinearSRGBColorSpace, Vector3 } from 'three';
import { clamp, monotoneCurve, smoothstep } from './util/math.js';

/** Latitude of the circuit and the solar declination of the chosen day, degrees. */
const LATITUDE = 38.75;
const DECLINATION = 18.8;

/** Real-world North and East as unit vectors in the scene's (x, z) plane (references.md §2). */
const NORTH_X = 0.911;
const NORTH_Z = -0.417;
const EAST_X = 0.416;
const EAST_Z = 0.909;

/** Journey progress → local solar time (hours): [progress, hour] keys at the stage boundaries. */
const SOLAR_HOUR_KEYS = [
  [0, 6.75],
  [0.085, 6.9],
  [0.2, 7.4],
  [0.315, 7.8],
  [0.425, 9.6],
  [0.56, 10.4],
  [0.665, 14.6],
  [0.79, 15.4],
  [0.885, 18.25],
  [1, 18.62],
];
const solarHourCurve = monotoneCurve(SOLAR_HOUR_KEYS);

/** Local solar time (hours) at journey progress 0..1 (clamped). */
function solarHourAt(progress) {
  return solarHourCurve(clamp(progress, 0, 1));
}

const DEG = Math.PI / 180;
const SIN_LAT = Math.sin(LATITUDE * DEG);
const COS_LAT = Math.cos(LATITUDE * DEG);
const SIN_DEC = Math.sin(DECLINATION * DEG);
const COS_DEC = Math.cos(DECLINATION * DEG);

/**
 * Sun elevation and azimuth (degrees; azimuth clockwise from north) at local solar time `hour`,
 * written into `out.sunEl` / `out.sunAz`.
 */
function solarPosition(hour, out) {
  const hourAngle = (hour - 12) * 15 * DEG;
  const sinEl = SIN_LAT * SIN_DEC + COS_LAT * COS_DEC * Math.cos(hourAngle);
  const el = Math.asin(clamp(sinEl, -1, 1));
  const cosAz = clamp((SIN_DEC - sinEl * SIN_LAT) / (Math.cos(el) * COS_LAT), -1, 1);
  const az = Math.acos(cosAz) / DEG;
  out.sunEl = el / DEG;
  out.sunAz = hourAngle > 0 ? 360 - az : az;
  return out;
}

/** Unit vector towards the sun in scene coordinates for elevation/azimuth in degrees, into `target`. */
function sunVector(sunEl, sunAz, target) {
  const el = sunEl * DEG;
  const az = sunAz * DEG;
  const horizontal = Math.cos(el);
  const north = Math.cos(az) * horizontal;
  const east = Math.sin(az) * horizontal;
  return target
    .set(north * NORTH_X + east * EAST_X, Math.sin(el), north * NORTH_Z + east * EAST_Z)
    .normalize();
}

/**
 * Palette keys by local solar hour. Fields:
 *   hour    local solar time of the key
 *   sun     sun light colour (display sRGB hex; used as a light colour, i.e. decoded to linear)
 *   sunI    sun illuminance (three.js directional-light intensity)
 *   sky     hemisphere light sky colour (hex), gnd its ground colour, hemiI its intensity
 *   zen     sky-dome zenith colour (display hex), hor horizon colour (display hex)
 *   fog     fog colour (display hex): distant objects fade towards it (≈ the horizon haze)
 *   env     scene.environmentIntensity (image-based light from the sky probe)
 *   exp     exposure trim on top of the automatic exposure (lighting.js exposureFor)
 */
const PALETTE = [
  // morning (references.md 4.9: clean Atlantic air, sampled zenith #518AD5 → horizon #94C9F1)
  {
    hour: 6.75,
    sun: 0xfff0dc,
    sunI: 3.3,
    sky: 0xb9d3ee,
    gnd: 0x5d6a4c,
    hemiI: 0.4,
    zen: 0x518ad5,
    hor: 0x94c9f1,
    fog: 0xb2d2ec,
    env: 0.6,
    exp: 1.35,
  },
  {
    hour: 8,
    sun: 0xfff5e8,
    sunI: 3.5,
    sky: 0xbcd5ee,
    gnd: 0x5f6b4e,
    hemiI: 0.4,
    zen: 0x4d86d3,
    hor: 0x9dcdf1,
    fog: 0xb8d5ec,
    env: 0.6,
    exp: 1.12,
  },
  // late morning, the lap
  {
    hour: 10.5,
    sun: 0xfffaf2,
    sunI: 3.7,
    sky: 0xc2d8ee,
    gnd: 0x616c50,
    hemiI: 0.4,
    zen: 0x4a82d0,
    hor: 0xa9d2f0,
    fog: 0xbfd9ed,
    env: 0.6,
    exp: 1,
  },
  // afternoon, the paddock
  {
    hour: 15,
    sun: 0xfff3e2,
    sunI: 3.6,
    sky: 0xc4d6e8,
    gnd: 0x606a4f,
    hemiI: 0.4,
    zen: 0x5085cd,
    hor: 0xaccfea,
    fog: 0xc2d6e6,
    env: 0.6,
    exp: 1,
  },
  // the run into the golden hour
  {
    hour: 17.6,
    sun: 0xffd29a,
    sunI: 3.4,
    sky: 0xd2cdc6,
    gnd: 0x5e5f49,
    hemiI: 0.4,
    zen: 0x6185c2,
    hor: 0xdfc7a2,
    fog: 0xdcc9ad,
    env: 0.6,
    exp: 1.1,
  },
  // golden hour (references.md 4.9: key light ≈ #FFA040, zenith #6E8FC0 → horizon #F2B572)
  {
    hour: 18.62,
    sun: 0xffa654,
    sunI: 3.2,
    sky: 0xe6c3a0,
    gnd: 0x5c5444,
    hemiI: 0.4,
    zen: 0x6e8fc0,
    hor: 0xf2b572,
    fog: 0xe8c39a,
    env: 0.6,
    exp: 1.25,
  },
];
const COLOR_FIELDS = ['sun', 'sky', 'gnd', 'zen', 'hor', 'fog'];
const NUMBER_FIELDS = ['sunI', 'hemiI', 'env', 'exp'];
/** Display colours: kept as display values (not decoded to linear) for the sky dome and fog. */
const DISPLAY_FIELDS = new Set(['zen', 'hor', 'fog']);

// the keys' colours as THREE.Color: lights decoded to linear, display colours kept as display values
const paletteColors = PALETTE.map((key) => {
  const colors = {};
  for (const field of COLOR_FIELDS)
    colors[field] = DISPLAY_FIELDS.has(field)
      ? new Color().setHex(key[field], LinearSRGBColorSpace)
      : new Color().setHex(key[field]);
  return colors;
});

/** A reusable sample object for sampleTimeOfDay(). */
function createTimeOfDaySample() {
  const sample = { hour: 0, sunEl: 0, sunAz: 0, sunDir: new Vector3() };
  for (const field of COLOR_FIELDS) sample[field] = new Color();
  for (const field of NUMBER_FIELDS) sample[field] = 0;
  return sample;
}

/**
 * Lighting at local solar time `hour` into `out` (a createTimeOfDaySample() object): the sun's
 * elevation, azimuth and direction (sunDir, unit vector towards the sun), and the palette blended
 * between the surrounding keys with a smoothstep. Allocates nothing.
 */
function sampleTimeOfDay(hour, out) {
  out.hour = hour;
  solarPosition(hour, out);
  sunVector(out.sunEl, out.sunAz, out.sunDir);
  let k = 0;
  while (k < PALETTE.length - 2 && hour > PALETTE[k + 1].hour) k++;
  const from = PALETTE[k];
  const to = PALETTE[k + 1];
  const blend = smoothstep(clamp((hour - from.hour) / (to.hour - from.hour), 0, 1));
  for (const field of NUMBER_FIELDS) out[field] = from[field] + (to[field] - from[field]) * blend;
  for (const field of COLOR_FIELDS)
    out[field].copy(paletteColors[k][field]).lerp(paletteColors[k + 1][field], blend);
  return out;
}

export {
  LATITUDE,
  DECLINATION,
  PALETTE,
  createTimeOfDaySample,
  sampleTimeOfDay,
  solarHourAt,
  solarPosition,
  sunVector,
};
