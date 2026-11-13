// Turns the loaded models into vehicles the app can drive: one shared paint material for the wrappable panels,
// tidy glass, working door pivots, light controls. Material names come from the source models.
import * as THREE from 'three';
import { createGlass } from './materials.js';

const CAR_PAINT = ['Material_692'];
/** Glass opacity for untinted glass and for three film shades. */
export const TINT = { clear: 0.13, light: 0.36, medium: 0.52, dark: 0.8 };
const BIKE_PAINT = ['vehicle_generic_smallspecmap_PRIMARY', 'carbonfiber_001'];

/**
 * Mirror-smooth metals and clear coats turn a direct light into a highlight brighter than a half-float colour
 * buffer can hold. On phone GPUs that pixel becomes infinite and the bloom then ruins the whole frame, so every
 * material keeps a little roughness. (The paint's own finish values in materials.js follow the same floor.)
 */
function tame(m) { if (typeof m.roughness === 'number' && m.roughness < 0.12) m.roughness = 0.12; if (typeof m.clearcoatRoughness === 'number' && m.clearcoat > 0 && m.clearcoatRoughness < 0.08) m.clearcoatRoughness = 0.08; return m; }

function eachMaterial(root, fn) {
  const seen = new Map();
  root.traverse((o) => {
    if (!o.isMesh) return;
    const list = Array.isArray(o.material) ? o.material : [o.material];
    list.forEach((m, i) => {
      if (!seen.has(m)) seen.set(m, tame(fn(m, o) || m));
      const next = seen.get(m);
      if (next !== m) { if (Array.isArray(o.material)) o.material[i] = next; else o.material = next; if (next.userData.isPaint) o.userData.paint = true; }
    });
  });
}

/** BMW M4 Competition. Left-hand drive: the driver's door is `door_L` (z < 0). */
export function setupCar(scene, meta, { paint, environment }) {
  const group = new THREE.Group();
  group.name = 'car';
  group.add(scene);
  const lights = [];
  const screens = [];
  let windowGlass = null;
  const replaced = new Set();
  eachMaterial(scene, (m) => {
    if (CAR_PAINT.includes(m.name)) { replaced.add(m); return paint; }
    switch (m.name) {
      case 'Material_699': windowGlass = createGlass(0x05070a, TINT.medium, 0.3, environment); return windowGlass;  // window glass
      case 'Material_775': return createGlass(0x12151a, 0.26, 0.26, environment); // lamp lenses
      case 'Material_849':                                   // light leather → black, as in the reference interior
        m.color.set(0x17171a); m.roughness = 0.62; m.metalness = 0; m.envMapIntensity = 0.6; break;
      case 'Material_850': m.roughness = 0.96; m.metalness = 0; m.color.set(0x0c0c0e); break;   // Alcantara (headliner, seat centres)
      case 'Material_706': m.roughness = 0.72; m.metalness = 0.05; m.envMapIntensity = 0.5; break;                       // interior plastics
      case 'Material_700': m.envMapIntensity = 0.3; m.roughness = 0.22; break;                  // gloss-black console trim
      case 'Material_695': m.envMapIntensity = 0.55; break;                                     // bright trim
      case 'Material_696': case 'Material_1015': m.color.set(0x121214); m.roughness = 0.95; m.metalness = 0; break;   // sun visors
      case 'Material_161': case 'Material_739': case 'Material_740':
        lights.push({ m, base: Math.max(1.6, m.emissiveIntensity || 1) }); break;
      case 'Material_776':                                   // daytime running light guides
        m.emissive.set(0xe6efff); lights.push({ m, base: 2.6 }); break;
      case 'Material_751': case 'Material_752':              // tyres: rubber, not metal
        m.color.set(0x0b0b0c); m.metalness = 0; m.roughness = 0.86; m.envMapIntensity = 0.45; break;
      case 'Material_753': m.color.set(0x1d1e23); m.metalness = 0.9; m.roughness = 0.27; m.envMapIntensity = 1.5; break;     // wheels
      case 'Material_773': m.color.set(0xa80f18); m.metalness = 0.25; m.roughness = 0.32; break;    // calipers
      case 'Material_694': m.roughness = 0.5; m.metalness = 0.2; m.envMapIntensity = 0.7; break;    // black exterior trim
      case 'Material_999': m.color.set(0x2a2e34); m.envMapIntensity = 0.3; break;                   // interior mirror glass
      case 'Material_932': m.color.set(0x7d848c); m.envMapIntensity = 0.7; break;                   // door mirror glass
      case 'Material_1522': case 'Material_1548':
        screens.push({ m, base: m.emissiveIntensity || 1 }); break;
      default: break;
    }
    return null;
  });
  for (const m of replaced) m.dispose();

  const pivot = (name, at) => {
    const door = scene.getObjectByName(name);
    const p = new THREE.Group();
    p.name = name + '_pivot';
    p.position.fromArray(at);
    group.add(p);
    if (door) p.attach(door);
    return p;
  };
  const doorLeft = pivot('door_L', meta.doorLeftPivot);
  const doorRight = pivot('door_R', meta.doorRightPivot);
  const headliner = scene.getObjectByName('headliner');
  const maxDoor = THREE.MathUtils.degToRad(62);

  return {
    group, meta, paint, doorLeft, doorRight, headliner,
    footprint: [meta.size[0], 1.9],
    /** 0 closed … 1 fully open. */
    setDoorOpen(t) { doorLeft.rotation.y = -maxDoor * THREE.MathUtils.clamp(t, 0, 1); },
    setLights(k) { for (const l of lights) l.m.emissiveIntensity = l.base * k; },
    setScreens(k) { for (const s of screens) s.m.emissiveIntensity = s.base * k; },
    /** Window film darkness as glass opacity: TINT.clear … TINT.dark. */
    setTint(opacity) { if (windowGlass) windowGlass.opacity = opacity; },
  };
}

/** BMW S 1000 RR. */
export function setupBike(scene, meta, { paint, environment }) {
  const group = new THREE.Group();
  group.name = 'bike';
  group.add(scene);
  const lights = [];
  const replaced = new Set();
  eachMaterial(scene, (m) => {
    if (BIKE_PAINT.includes(m.name)) { replaced.add(m); return paint; }
    if (m.name === 'glass_500px') { replaced.add(m); return createGlass(0x08090c, 0.62, 0.3, environment); }
    if (m.emissiveMap || (m.emissive && m.emissive.getHex() !== 0)) lights.push({ m, base: m.emissiveIntensity || 1 });
    return null;
  });
  for (const m of replaced) m.dispose();
  return {
    group, meta, paint,
    footprint: [meta.size[0], 0.62],
    setLights(k) { for (const l of lights) l.m.emissiveIntensity = l.base * k; },
  };
}
