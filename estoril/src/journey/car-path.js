// The hero car's driving line and arc-length lookups.
//
// The line is one open centripetal Catmull-Rom curve in the world XZ plane (y = 0, metres) that
// the scroll journey moves the car along by arc length:
//   1. along the main straight from x = 560 (race direction -x), dropping into the pit lane
//      (z ≈ 194) past the garages and back out onto the straight near x = -490;
//   2. part of a lap, following every third point of the track centre line (points 3..285);
//   3. a link through the paddock and back into the pit lane, ending at x = 4.
import { CatmullRomCurve3, Vector3 } from 'three';

/** Pit-in → pit lane → pit-out, along the main straight. [x, z] in metres. */
var STRAIGHT_AND_PIT_LANE = [
  [560, 206],
  [470, 206],
  [400, 206],
  [330, 206],
  [290, 205],
  [250, 201],
  [215, 196.5],
  [170, 194.4],
  [80, 194.2],
  [10, 194.2],
  [-28, 193.2],
  [-48, 190.4],
  [-60, 189.2],
  [-74, 189.4],
  [-98, 191.6],
  [-140, 194.2],
  [-220, 194.4],
  [-292, 194.6],
  [-340, 197.4],
  [-392, 201.2],
  [-440, 204.6],
  [-490, 205.8],
];

/** Track sampling for the on-track part: centre-line points FIRST_TRACK_POINT..LAST_TRACK_POINT. */
var FIRST_TRACK_POINT = 3,
  LAST_TRACK_POINT = 286,
  TRACK_POINT_STRIDE = 3;

/** From the infield through the paddock and back into the pit lane. [x, z] in metres. */
var PADDOCK_AND_RETURN = [
  [-64, 61],
  [-61, 78],
  [-56, 96],
  [-44, 112],
  [-26, 121],
  [-8, 124.5],
  [14, 126],
  [48, 132],
  [76, 146],
  [86, 166],
  [84, 182],
  [74, 189.8],
  [56, 192.4],
  [34, 192.6],
  [18, 192.6],
  [4, 192.6],
];

/**
 * @param {Array<[number, number]>} trackPoints track centre line as [x, z] pairs (track.json `pts`)
 * @returns {CatmullRomCurve3} open centripetal curve with a fine arc-length table
 */
function buildCarPath(trackPoints) {
  let controlPoints = [],
    addPoint = (x, z) => controlPoints.push(new Vector3(x, 0, z));
  for (let [x, z] of STRAIGHT_AND_PIT_LANE) addPoint(x, z);
  let trackPointCount = trackPoints.length;
  for (let k = FIRST_TRACK_POINT; k <= LAST_TRACK_POINT; k += TRACK_POINT_STRIDE) {
    let point = trackPoints[k % trackPointCount];
    addPoint(point[0], point[1]);
  }
  for (let [x, z] of PADDOCK_AND_RETURN) addPoint(x, z);
  // Tension (0.5) is ignored by the centripetal parameterisation.
  let curve = new CatmullRomCurve3(controlPoints, false, 'centripetal', 0.5);
  // getPointAt()/getLength() use this many samples: ~0.16 m over the ~2.6 km path.
  return ((curve.arcLengthDivisions = 16e3), curve);
}

/**
 * Arc length (metres from the start of `curve`) of the point closest to (x, z) in the XZ plane.
 * Brute force over 4001 evenly spaced arc-length samples, so the result is quantised to
 * curve.getLength() / 4000 (~0.65 m).
 */
function arcLengthNear(curve, x, z) {
  let length = curve.getLength(),
    bestU = 0,
    bestDistanceSq = 1e9,
    point = new Vector3();
  for (let step = 0; step <= 4e3; step++) {
    curve.getPointAt(step / 4e3, point);
    let distanceSq = (point.x - x) ** 2 + (point.z - z) ** 2;
    distanceSq < bestDistanceSq && ((bestDistanceSq = distanceSq), (bestU = step / 4e3));
  }
  return bestU * length;
}

export { arcLengthNear, buildCarPath };
