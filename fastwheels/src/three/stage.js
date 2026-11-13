// The garage: a dark workshop with LED strips, a polished floor and an image-based light rig.
// Vehicles are added to `stage.scene`. One stage is shared by the configurator and the interior sequence,
// so exposure and reflections stay the same everywhere.

/** Emissive panels that only exist in the reflection environment (long soft-boxes give clean highlights on paint). */
function buildEnvScene(THREE) {
  const env = new THREE.Scene();
  const room = new THREE.Mesh(new THREE.BoxGeometry(30, 12, 24), new THREE.MeshBasicMaterial({ color: 0x020203, side: THREE.BackSide }));
  room.position.y = 5;
  env.add(room);
  const panel = (w, h, color, strength, pos, rot) => {
    const mat = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
    mat.color.set(color).multiplyScalar(strength);
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    m.position.set(...pos);
    m.rotation.set(...rot);
    env.add(m);
  };
  // Two long ceiling soft-boxes running front to back, and a shorter cross panel ahead of the nose.
  panel(9, 0.9, 0xffffff, 7, [0, 5.2, -1.7], [Math.PI / 2, 0, 0]);
  panel(9, 0.9, 0xffffff, 7, [0, 5.2, 1.7], [Math.PI / 2, 0, 0]);
  panel(1.2, 4.4, 0xdfe6ff, 3.2, [5.5, 4.6, 0], [Math.PI / 2, 0, 0]);
  panel(1.2, 4.4, 0xdfe6ff, 2.2, [-6, 4.6, 0], [Math.PI / 2, 0, 0]);
  // LED strips along the side walls: blue on the left of the car, violet on the right.
  panel(22, 0.16, 0x2f6bff, 12, [0, 2.3, -9], [0, 0, 0]);
  panel(22, 0.1, 0x2f6bff, 8, [0, 0.9, -9], [0, 0, 0]);
  panel(22, 0.16, 0x8a5cff, 12, [0, 2.3, 9], [0, Math.PI, 0]);
  panel(22, 0.1, 0x8a5cff, 8, [0, 0.9, 9], [0, Math.PI, 0]);
  // End walls: a dim cool strip so the nose and tail are not black.
  panel(12, 0.14, 0x6f8cff, 6, [12, 2.3, 0], [0, -Math.PI / 2, 0]);
  panel(12, 0.14, 0x7a6cff, 6, [-12, 2.3, 0], [0, Math.PI / 2, 0]);
  return env;
}

function glowTexture(THREE, stops) {
  const c = document.createElement('canvas');
  c.width = 8; c.height = 128;
  const g = c.getContext('2d');
  const grad = g.createLinearGradient(0, 0, 0, 128);
  for (const [at, col] of stops) grad.addColorStop(at, col);
  g.fillStyle = grad;
  g.fillRect(0, 0, 8, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function shadowTexture(THREE) {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(128, 128, 20, 128, 128, 128);
  grad.addColorStop(0, 'rgba(0,0,0,0.95)');
  grad.addColorStop(0.55, 'rgba(0,0,0,0.6)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}

/**
 * @param {object} THREE
 * @param {THREE.WebGLRenderer} renderer
 * @param {{ tier?: 'low'|'mid'|'high' }} options
 */
export function createStage(THREE, renderer, { tier = 'high' } = {}) {
  const scene = new THREE.Scene();
  const bg = new THREE.Color(0x06070a);
  scene.background = bg;
  scene.fog = new THREE.FogExp2(bg.getHex(), 0.03);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envScene = buildEnvScene(THREE);
  const envTarget = pmrem.fromScene(envScene, 0.015);
  scene.environment = envTarget.texture;
  scene.environmentIntensity = 0.9;
  envScene.traverse((o) => { if (o.isMesh) { o.geometry.dispose(); o.material.dispose(); } });
  pmrem.dispose();

  const room = new THREE.Group();
  room.name = 'garage';
  scene.add(room);

  // Polished concrete floor: picks up the light rig as soft streaks.
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.MeshStandardMaterial({ color: 0x0c0d11, roughness: 0.78, metalness: 0, envMapIntensity: 0.22 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  room.add(floor);

  // Walls and ceiling.
  const wallMat = new THREE.MeshStandardMaterial({ color: 0x0d0e12, roughness: 0.85, metalness: 0.1 });
  const W = 11, D = 8.5, H = 4.4;                      // half length (x), half depth (z), height
  const wall = (w, h, pos, ry) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), wallMat);
    m.position.set(...pos);
    m.rotation.y = ry;
    room.add(m);
    return m;
  };
  wall(W * 2, H, [0, H / 2, -D], 0);
  wall(W * 2, H, [0, H / 2, D], Math.PI);
  wall(D * 2, H, [W, H / 2, 0], -Math.PI / 2);
  wall(D * 2, H, [-W, H / 2, 0], Math.PI / 2);
  const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(W * 2, D * 2), new THREE.MeshStandardMaterial({ color: 0x08090b, roughness: 1 }));
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = H;
  room.add(ceiling);

  // Wall panels (vertical ribs) so the walls are not flat planes.
  const ribMat = new THREE.MeshStandardMaterial({ color: 0x101116, roughness: 0.7, metalness: 0.3 });
  const ribGeo = new THREE.BoxGeometry(0.12, H, 0.1);
  const ribs = new THREE.InstancedMesh(ribGeo, ribMat, 44);
  const mtx = new THREE.Matrix4();
  let n = 0;
  for (let i = 0; i < 11; i++) {
    const x = -W + 1 + i * ((W * 2 - 2) / 10);
    ribs.setMatrixAt(n++, mtx.makeTranslation(x, H / 2, -D + 0.05));
    ribs.setMatrixAt(n++, mtx.makeTranslation(x, H / 2, D - 0.05));
  }
  for (let i = 0; i < 11; i++) {
    const z = -D + 0.8 + i * ((D * 2 - 1.6) / 10);
    ribs.setMatrixAt(n++, mtx.makeTranslation(W - 0.05, H / 2, z));
    ribs.setMatrixAt(n++, mtx.makeTranslation(-W + 0.05, H / 2, z));
  }
  room.add(ribs);

  // LED strips. Blue on the left wall (z < 0), violet on the right; a cool strip on both end walls.
  const BLUE = 0x2f6bff, VIOLET = 0x8a5cff;
  const strips = [];
  const ledMat = (hex, k) => { const m = new THREE.MeshBasicMaterial(); m.color.set(hex).multiplyScalar(k); m.fog = false; return m; };
  const haloTex = glowTexture(THREE, [[0, 'rgba(255,255,255,0)'], [0.5, 'rgba(255,255,255,1)'], [1, 'rgba(255,255,255,0)']]);
  const led = (len, pos, ry, hex, k = 2.2, thick = 0.035) => {
    const g = new THREE.Group();
    g.position.set(...pos);
    g.rotation.y = ry;
    g.add(new THREE.Mesh(new THREE.BoxGeometry(len, thick, 0.02), ledMat(hex, k)));
    const halo = new THREE.Mesh(new THREE.PlaneGeometry(len, 0.9), new THREE.MeshBasicMaterial({ map: haloTex, color: hex, transparent: true, opacity: 0.2, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }));
    halo.position.z = 0.02;
    g.add(halo);
    room.add(g);
    strips.push(g);
  };
  led(W * 2 - 1.2, [0, 2.35, -D + 0.12], 0, BLUE);
  led(W * 2 - 1.2, [0, 0.55, -D + 0.12], 0, BLUE, 1.4, 0.02);
  led(W * 2 - 1.2, [0, 2.35, D - 0.12], Math.PI, VIOLET);
  led(W * 2 - 1.2, [0, 0.55, D - 0.12], Math.PI, VIOLET, 1.4, 0.02);
  led(D * 2 - 1.2, [W - 0.12, 2.35, 0], -Math.PI / 2, 0x6f8cff, 1.6);
  led(D * 2 - 1.2, [-W + 0.12, 2.35, 0], Math.PI / 2, 0x7a6cff, 1.6);

  // Direct light: a soft key from above the front right, coloured rims from the strip walls.
  const hemi = new THREE.HemisphereLight(0x8696b8, 0x07070a, 0.3);
  scene.add(hemi);
  const key = new THREE.DirectionalLight(0xffffff, 1.25);
  key.position.set(3.5, 7, 2.5);
  if (tier === 'high') {
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    const s = 3.6;
    Object.assign(key.shadow.camera, { left: -s, right: s, top: s, bottom: -s, near: 1, far: 16 });
    key.shadow.bias = -0.0006;
    key.shadow.normalBias = 0.03;
    key.shadow.radius = 6;
  }
  scene.add(key);
  const rimBlue = new THREE.DirectionalLight(BLUE, 0.9);
  rimBlue.position.set(-2, 4.5, -8);
  scene.add(rimBlue);
  const rimViolet = new THREE.DirectionalLight(VIOLET, 0.8);
  rimViolet.position.set(-1, 4.5, 8);
  scene.add(rimViolet);

  // Soft contact shadow under the vehicle.
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({ map: shadowTexture(THREE), transparent: true, opacity: 0.9, depthWrite: false }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.006;
  shadow.renderOrder = 1;
  scene.add(shadow);

  return {
    scene, room, floor, lights: { hemi, key, rimBlue, rimViolet }, contactShadow: shadow,
    /** Size the contact shadow to a vehicle footprint (metres). */
    setFootprint(length, width, x = 0, z = 0) {
      shadow.scale.set(length * 1.25, width * 1.6, 1);
      shadow.position.set(x, 0.006, z);
    },
    dispose() {
      envTarget.dispose();
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => { m.map?.dispose(); m.dispose(); });
      });
    },
  };
}
