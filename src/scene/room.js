import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';

// Room in metres. Floor at y = 0, ceiling at 3.0 m, chandelier hangs on the origin axis.
export const ROOM = { ceiling: 3.0, back: -3.2, front: 4.5, left: -3.6, right: 3.6 };
const WINDOW = { x0: 0.75, x1: 3.15, y0: 0.32, y1: 2.78 };
const NICHE = { cx: -1.95, w: 0.92, y0: 0.62, h: 1.86 };

const base = import.meta.env.BASE_URL;

function loadTex(loader, file, { srgb = true, repeat = [1, 1], aniso = 8 } = {}) {
  const t = loader.load(`${base}textures/${file}`);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat[0], repeat[1]);
  t.anisotropy = aniso;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function buildRoom(scene, { quality }) {
  RectAreaLightUniformsLib.init();
  const loader = new THREE.TextureLoader();
  const group = new THREE.Group();
  group.name = 'room';
  scene.add(group);

  const plasterMap = loadTex(loader, 'plaster.jpg', { srgb: true, repeat: [2.2, 1.4] });
  const plasterBump = loadTex(loader, 'plaster.jpg', { srgb: false, repeat: [2.2, 1.4] });
  const wall = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#3a3532'), map: plasterMap, bumpMap: plasterBump, bumpScale: 0.6, roughness: 0.93,
  });
  const ceilingMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#4a4440'), map: plasterMap, bumpMap: plasterBump, bumpScale: 0.4, roughness: 0.95,
  });
  const stoneMap = loadTex(loader, 'travertine.jpg', { repeat: [1 / 1.6, 1 / 1.6] });
  const stone = new THREE.MeshStandardMaterial({ color: new THREE.Color('#c2b39c'), map: stoneMap, roughness: 0.62 });
  const floorMap = loadTex(loader, 'floor.jpg', { repeat: [7.2 / 1.2, 7.7 / 1.2] });
  const floor = new THREE.MeshStandardMaterial({ color: new THREE.Color('#a8998a'), map: floorMap, roughness: 0.42 });
  const bronze = new THREE.MeshStandardMaterial({ color: new THREE.Color('#2a2420'), metalness: 0.8, roughness: 0.38 });

  const W = ROOM.right - ROOM.left;
  const D = ROOM.front - ROOM.back;
  const H = ROOM.ceiling;

  const floorMesh = new THREE.Mesh(new THREE.PlaneGeometry(W, D), floor);
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.position.set(0, 0, (ROOM.front + ROOM.back) / 2);
  group.add(floorMesh);

  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(W, D), ceilingMat);
  ceil.rotation.x = Math.PI / 2;
  ceil.position.set(0, H, (ROOM.front + ROOM.back) / 2);
  ceil.receiveShadow = true;
  group.add(ceil);

  const left = new THREE.Mesh(new THREE.PlaneGeometry(D, H), wall);
  left.rotation.y = Math.PI / 2;
  left.position.set(ROOM.left, H / 2, (ROOM.front + ROOM.back) / 2);
  group.add(left);
  const right = new THREE.Mesh(new THREE.PlaneGeometry(D, H), wall);
  right.rotation.y = -Math.PI / 2;
  right.position.set(ROOM.right, H / 2, (ROOM.front + ROOM.back) / 2);
  group.add(right);
  const front = new THREE.Mesh(new THREE.PlaneGeometry(W, H), wall);
  front.rotation.y = Math.PI;
  front.position.set(0, H / 2, ROOM.front);
  group.add(front);

  // Back wall: charcoal plaster with a window opening on the right,
  // and a travertine-clad section with an arched niche on the left.
  const T = 0.28; // wall depth, gives the window real reveals
  const backShape = new THREE.Shape();
  backShape.moveTo(-0.62, 0); backShape.lineTo(ROOM.right, 0); backShape.lineTo(ROOM.right, H); backShape.lineTo(-0.62, H); backShape.closePath();
  const win = new THREE.Path();
  win.moveTo(WINDOW.x0, WINDOW.y0); win.lineTo(WINDOW.x0, WINDOW.y1); win.lineTo(WINDOW.x1, WINDOW.y1); win.lineTo(WINDOW.x1, WINDOW.y0); win.closePath();
  backShape.holes.push(win);
  const backGeo = new THREE.ExtrudeGeometry(backShape, { depth: T, bevelEnabled: false });
  scaleUVs(backGeo, 1 / 3.2);
  const back = new THREE.Mesh(backGeo, wall);
  back.position.z = ROOM.back - T;
  group.add(back);

  // Travertine section with a pointed (Ottoman) arch niche
  const stoneShape = new THREE.Shape();
  stoneShape.moveTo(ROOM.left, 0); stoneShape.lineTo(-0.62, 0); stoneShape.lineTo(-0.62, H); stoneShape.lineTo(ROOM.left, H); stoneShape.closePath();
  const niche = archPath(NICHE.cx, NICHE.y0, NICHE.w, NICHE.h);
  stoneShape.holes.push(niche);
  const stoneGeo = new THREE.ExtrudeGeometry(stoneShape, { depth: 0.34, bevelEnabled: false });
  const stoneWall = new THREE.Mesh(stoneGeo, stone);
  stoneWall.position.z = ROOM.back - 0.28;
  group.add(stoneWall);
  // vertical slab joints
  const jointMat = new THREE.MeshStandardMaterial({ color: new THREE.Color('#5d554b'), roughness: 0.9 });
  for (const x of [-3.0, -0.9]) {
    if (x > NICHE.cx - NICHE.w / 2 - 0.05 && x < NICHE.cx + NICHE.w / 2 + 0.05) continue;
    const j = new THREE.Mesh(new THREE.BoxGeometry(0.006, H, 0.004), jointMat);
    j.position.set(x, H / 2, ROOM.back + 0.062);
    group.add(j);
  }
  const nicheBack = new THREE.Mesh(new THREE.PlaneGeometry(NICHE.w + 0.1, NICHE.h + 0.1), stone);
  nicheBack.position.set(NICHE.cx, NICHE.y0 + NICHE.h / 2, ROOM.back - 0.27);
  group.add(nicheBack);
  // a hand-thrown vase on the niche floor
  const vase = new THREE.Mesh(new THREE.LatheGeometry(vaseProfile(), 48),
    new THREE.MeshPhysicalMaterial({ color: new THREE.Color('#1d3e5c'), roughness: 0.28, clearcoat: 0.8, clearcoatRoughness: 0.15 }));
  vase.position.set(NICHE.cx, NICHE.y0, ROOM.back - 0.1);
  group.add(vase);

  // window: slim bronze frame, one mullion, glass, and the view
  const frameDepth = 0.06;
  const fw = 0.045;
  const frameParts = [
    [WINDOW.x0 + fw / 2, (WINDOW.y0 + WINDOW.y1) / 2, fw, WINDOW.y1 - WINDOW.y0],
    [WINDOW.x1 - fw / 2, (WINDOW.y0 + WINDOW.y1) / 2, fw, WINDOW.y1 - WINDOW.y0],
    [(WINDOW.x0 + WINDOW.x1) / 2, WINDOW.y1 - fw / 2, WINDOW.x1 - WINDOW.x0, fw],
    [(WINDOW.x0 + WINDOW.x1) / 2, WINDOW.y0 + fw / 2, WINDOW.x1 - WINDOW.x0, fw],
    [(WINDOW.x0 + WINDOW.x1) / 2, (WINDOW.y0 + WINDOW.y1) / 2, 0.03, WINDOW.y1 - WINDOW.y0],
  ];
  for (const [x, y, w, h] of frameParts) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, frameDepth), bronze);
    m.position.set(x, y, ROOM.back - T * 0.55);
    group.add(m);
  }
  const sill = new THREE.Mesh(new THREE.BoxGeometry(WINDOW.x1 - WINDOW.x0 + 0.12, 0.04, T + 0.06), stone);
  sill.position.set((WINDOW.x0 + WINDOW.x1) / 2, WINDOW.y0 - 0.02, ROOM.back - T / 2 + 0.03);
  group.add(sill);
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(WINDOW.x1 - WINDOW.x0, WINDOW.y1 - WINDOW.y0),
    new THREE.MeshPhysicalMaterial({ color: new THREE.Color('#8890a8'), transparent: true, opacity: 0.1, roughness: 0.03, metalness: 0, envMapIntensity: 1.4, depthWrite: false }));
  glass.position.set((WINDOW.x0 + WINDOW.x1) / 2, (WINDOW.y0 + WINDOW.y1) / 2, ROOM.back - T * 0.5);
  group.add(glass);

  const viewTex = loadTex(loader, 'dusk-view.jpg', { aniso: 4 });
  viewTex.wrapS = viewTex.wrapT = THREE.ClampToEdgeWrapping;
  const view = new THREE.Mesh(new THREE.PlaneGeometry(44, 22),
    new THREE.MeshBasicMaterial({ map: viewTex, color: new THREE.Color(0.95, 0.92, 0.98), fog: false }));
  view.position.set(6, 2.3 + 22 * 0.2, -34);
  group.add(view);

  // ── lights that belong to the room
  const windowLight = new THREE.RectAreaLight(new THREE.Color('#b8a6cf'), 1.1, WINDOW.x1 - WINDOW.x0, WINDOW.y1 - WINDOW.y0);
  windowLight.position.set((WINDOW.x0 + WINDOW.x1) / 2, (WINDOW.y0 + WINDOW.y1) / 2, ROOM.back - 0.02);
  windowLight.lookAt(windowLight.position.x, windowLight.position.y, 0);
  group.add(windowLight);
  // warm low light from a lamp outside the frame, so the brass reads when the chandelier is off
  const lamp = new THREE.PointLight(new THREE.Color('#ffbf86'), 0.7, 0, 2);
  lamp.position.set(-2.6, 1.5, 2.6);
  group.add(lamp);
  // accent light grazing the niche and the vase, as a lighting designer would place it
  const nicheLight = new THREE.SpotLight(new THREE.Color('#ffcf9a'), 4.5, 0, 0.3, 0.75, 2);
  nicheLight.position.set(NICHE.cx, H - 0.02, ROOM.back + 0.55);
  nicheLight.target.position.set(NICHE.cx, NICHE.y0 + 0.2, ROOM.back - 0.2);
  group.add(nicheLight, nicheLight.target);
  const hemi = new THREE.HemisphereLight(new THREE.Color('#6a6070'), new THREE.Color('#1c1714'), 0.12);
  group.add(hemi);

  return { group, windowLight, lamp, hemi, quality };
}

// Pointed (two-centred) arch, the profile of Ottoman niches and doorways.
function archPath(cx, y0, w, h) {
  const p = new THREE.Path();
  const r = w * 0.62;
  const theta = Math.acos((r - w / 2) / r);
  const spring = y0 + h - r * Math.sin(theta);
  p.moveTo(cx - w / 2, y0);
  p.lineTo(cx + w / 2, y0);
  p.lineTo(cx + w / 2, spring);
  p.absarc(cx + w / 2 - r, spring, r, 0, theta, false);
  p.absarc(cx - w / 2 + r, spring, r, Math.PI - theta, Math.PI, false);
  p.lineTo(cx - w / 2, y0);
  return p;
}

function vaseProfile() {
  const pts = [];
  const prof = [[0, 0], [0.07, 0.0], [0.11, 0.06], [0.135, 0.17], [0.125, 0.29], [0.08, 0.38], [0.055, 0.44], [0.065, 0.5], [0.06, 0.505]];
  for (const [x, y] of prof) pts.push(new THREE.Vector2(x, y));
  return pts;
}

function scaleUVs(geo, s) {
  const uv = geo.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * s, uv.getY(i) * s);
  uv.needsUpdate = true;
}

// Static environment for reflections: a dark room with the dusk window and a warm lamp.
export function buildEnvironment(renderer) {
  const env = new THREE.Scene();
  const box = new THREE.Mesh(new THREE.BoxGeometry(8, 4, 8), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.05, 0.036, 0.026), side: THREE.BackSide }));
  box.position.y = 1.5;
  env.add(box);
  const winPanel = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 2.4), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.9, 0.75, 1.1) }));
  winPanel.position.set(1.9, 1.55, -3.9);
  env.add(winPanel);
  const horizon = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.5), new THREE.MeshBasicMaterial({ color: new THREE.Color(2.2, 1.3, 0.8) }));
  horizon.position.set(1.9, 1.0, -3.88);
  env.add(horizon);
  const lampPanel = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 8), new THREE.MeshBasicMaterial({ color: new THREE.Color(3.0, 1.9, 1.0) }));
  lampPanel.position.set(-2.6, 1.5, 2.6);
  env.add(lampPanel);
  const ceilingGlow = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.6, 0.38, 0.18) }));
  ceilingGlow.rotation.x = Math.PI / 2;
  ceilingGlow.position.set(0, 3.45, 0);
  env.add(ceilingGlow);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const rt = pmrem.fromScene(env, 0.03);
  pmrem.dispose();
  return rt.texture;
}
