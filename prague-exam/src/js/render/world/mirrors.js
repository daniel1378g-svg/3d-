// Mirrors: the scene seen from the driver's eye along heading + yaw, rendered into a small
// target per mirror and drawn over the main picture inside the mirror's rectangle, flipped left
// to right as a real mirror shows it. The mirror camera sees layer 0 only; small things that do
// not matter in a mirror (sign plates, street lamps, signal lamps) sit on layer 1.
const FAR = 160;
const MAX_W = 384, MAX_H = 192;

export function createMirrors({ renderer, scene, canvas }) {
  const cam = new THREE.PerspectiveCamera(30, 2.4, 0.3, FAR);
  cam.rotation.order = 'YXZ';
  const overlay = new THREE.Scene();
  const ortho = new THREE.OrthographicCamera(0, 1, 0, -1, -1, 1);
  // Unit quad with u reversed: that is the mirror flip.
  const quadGeo = new THREE.PlaneGeometry(1, 1);
  const uv = quadGeo.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setX(i, 1 - uv.getX(i));
  const slots = [];
  let shown = 0;

  function slot(i) {
    if (!slots[i]) {
      const material = new THREE.MeshBasicMaterial({ color: 0xe4e6e8, depthTest: false, depthWrite: false, fog: false, toneMapped: false });
      const mesh = new THREE.Mesh(quadGeo, material);
      mesh.frustumCulled = false;
      overlay.add(mesh);
      slots[i] = { target: null, material, mesh, fresh: false };
    }
    return slots[i];
  }
  function targetFor(s, m, pr) {
    const w = Math.max(32, Math.min(MAX_W, Math.ceil((m.w * pr) / 32) * 32)), h = Math.max(32, Math.min(MAX_H, Math.ceil((m.h * pr) / 32) * 32));
    if (s.target && s.target.width === w && s.target.height === h) return;
    if (s.target) s.target.dispose();
    s.target = new THREE.WebGLRenderTarget(w, h, { depthBuffer: true, stencilBuffer: false, generateMipmaps: false });
    // An sRGB target keeps the dark tones from banding (the picture is stored encoded).
    if (renderer.capabilities.isWebGL2) s.target.texture.colorSpace = THREE.SRGBColorSpace;
    s.material.map = s.target.texture;
    s.material.needsUpdate = true;
    s.fresh = false;
  }

  // Render the mirrors that are due this frame. `every` = update period in frames.
  function update(frame, frameNo, every, fog) {
    const list = frame.mirrors || [], eye = frame.eye;
    shown = Math.min(list.length, 4);
    for (let i = 0; i < slots.length; i++) slots[i].mesh.visible = i < shown;
    if (!shown) return;
    const pr = renderer.getPixelRatio(), near0 = fog.near, far0 = fog.far;
    // Below 'high' at most one mirror is redrawn per frame, in turn: with three mirrors each one
    // is then refreshed every third frame, which keeps the frame inside the draw-call budget.
    const period = every > 1 ? Math.max(every, shown) : 1;
    fog.near = Math.min(near0, FAR * 0.4); fog.far = Math.min(far0, FAR - 4);       // hide the short far plane
    for (let i = 0; i < shown; i++) {
      const m = list[i], s = slot(i);
      if (!(m.w > 1 && m.h > 1)) { s.mesh.visible = false; continue; }
      targetFor(s, m, pr);
      s.mesh.position.set(m.x + m.w / 2, -(m.y + m.h / 2), 0);
      s.mesh.scale.set(m.w, m.h, 1);
      if (s.fresh && (frameNo + i) % period !== 0) continue;
      // m.fov = horizontal field of view in radians (values above PI are read as degrees).
      let fov = m.fov > 0 ? m.fov : 0.7;
      if (fov > Math.PI) fov *= Math.PI / 180;
      cam.aspect = m.w / m.h;
      cam.fov = (2 * Math.atan(Math.tan(Math.min(fov, 2.6) / 2) / cam.aspect) * 180) / Math.PI;
      cam.updateProjectionMatrix();
      cam.position.set(eye.x, eye.y, eye.z);
      cam.rotation.set(0, -(eye.heading + (m.yaw || 0)), 0);
      renderer.setRenderTarget(s.target);
      renderer.render(scene, cam);
      s.fresh = true;
    }
    renderer.setRenderTarget(null);
    fog.near = near0; fog.far = far0;
  }

  function draw() {
    if (!shown) return;
    const w = canvas.clientWidth || 1, h = canvas.clientHeight || 1;
    if (ortho.right !== w || ortho.bottom !== -h) { ortho.right = w; ortho.bottom = -h; ortho.updateProjectionMatrix(); }
    const auto = renderer.autoClear;
    renderer.autoClear = false;
    renderer.render(overlay, ortho);
    renderer.autoClear = auto;
  }

  function invalidate() { for (const s of slots) s.fresh = false; }
  function dispose() {
    for (const s of slots) { if (s.target) s.target.dispose(); s.material.dispose(); }
    quadGeo.dispose();
  }
  return { update, draw, invalidate, dispose };
}
