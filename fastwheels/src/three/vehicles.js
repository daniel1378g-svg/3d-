// Turns the loaded models into vehicles the app can drive: one shared paint material for the wrappable panels,
// tidy glass, working door pivots, light controls. Material names come from the source models.
import * as THREE from 'three';

const CAR_PAINT = ['Material_692'];
const BIKE_PAINT = ['vehicle_generic_smallspecmap_PRIMARY', 'carbonfiber_001'];

/** Glass that mirrors the workshop but ignores the small cabin lights (no stray highlights on the windows). */
function glass(hex, opacity, reflectivity, environment) {
  const m = new THREE.MeshBasicMaterial({ color: hex, envMap: environment, reflectivity, combine: THREE.MixOperation, transparent: true, opacity, depthWrite: false, side: THREE.DoubleSide });
  m.name = 'glass';
  return m;
}

function eachMaterial(root, fn) {
  const seen = new Map();
  root.traverse((o) => {
    if (!o.isMesh) return;
    const list = Array.isArray(o.material) ? o.material : [o.material];
    list.forEach((m, i) => {
      if (!seen.has(m)) seen.set(m, fn(m, o) || m);
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
  const replaced = new Set();
  eachMaterial(scene, (m) => {
    if (CAR_PAINT.includes(m.name)) { replaced.add(m); return paint; }
    switch (m.name) {
      case 'Material_699': return glass(0x06080b, 0.5, 0.42, environment);      // window glass
      case 'Material_775': return glass(0x14171c, 0.3, 0.3, environment);       // lamp lenses
      case 'Material_849':                                   // light leather → black, as in the reference interior
        m.color.set(0x17171a); m.roughness = 0.62; m.metalness = 0; m.envMapIntensity = 0.6; break;
      case 'Material_850': m.roughness = 0.96; m.metalness = 0; m.color.set(0x0c0c0e); break;   // Alcantara (headliner, seat centres)
      case 'Material_706': m.roughness = 0.72; m.metalness = 0.05; m.envMapIntensity = 0.5; break;                       // interior plastics
      case 'Material_700': m.envMapIntensity = 0.3; m.roughness = 0.22; break;                  // gloss-black console trim
      case 'Material_695': m.envMapIntensity = 0.55; break;                                     // bright trim
      case 'Material_696': case 'Material_1015': m.color.set(0x121214); m.roughness = 0.95; m.metalness = 0; break;   // sun visors
      case 'Material_161': case 'Material_739': case 'Material_740':
        lights.push({ m, base: m.emissiveIntensity || 1 }); break;
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
    if (m.name === 'glass_500px') { replaced.add(m); return glass(0x0a0c10, 0.6, 0.35, environment); }
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
