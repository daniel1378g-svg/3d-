// Procedural textures for the circuit, its buildings, people and cars.
//
// Every texture is drawn once at load time: most into a 2D canvas, the shared surface detail into
// typed arrays (a DataTexture, so Node tests can build it too). Seeded generators (createRng) and
// the shared noise (env/noise.js) make the result identical on every load. Canvas pixel
// coordinates have (0, 0) at the top-left; with three's default flipY that row ends up at v = 1.
import {
  CanvasTexture,
  DataTexture,
  LinearMipmapLinearFilter,
  RepeatWrapping,
  RGBAFormat,
  SRGBColorSpace,
} from 'three';
import { sampleNoise } from './env/noise.js';
import { createRng } from './util/rng.js';

/**
 * Draws `width` x `height` pixels with `draw(context, width, height)` and wraps the canvas in a
 * CanvasTexture.
 *
 * @param {object} [options]
 * @param {boolean} [options.repeat=true] RepeatWrapping on both axes (tiling textures)
 * @param {boolean} [options.srgb=true] colour data (sRGB); false for alpha-only masks/shadows
 * @param {number} [options.aniso=8] anisotropic filtering level
 */
function canvasTexture(width, height, draw, { repeat = true, srgb = true, aniso = 8 } = {}) {
  let canvas = document.createElement('canvas');
  ((canvas.width = width), (canvas.height = height));
  let context = canvas.getContext('2d');
  draw(context, width, height);
  let texture = new CanvasTexture(canvas);
  return (
    repeat && (texture.wrapS = texture.wrapT = RepeatWrapping),
    srgb && (texture.colorSpace = SRGBColorSpace),
    (texture.anisotropy = aniso),
    texture
  );
}

/**
 * Kerb, 64 x 512, one tile = 6 m along the track (v): six 1 m blocks, blue #2F86D0 and white
 * #ECEEF0 (references §4.4), each with a little dirt towards its ends, thin dark joints, and two
 * shallow grooves along the kerb (u across: 0 at the asphalt edge, 1 at the run-off).
 */
function kerbTexture() {
  return canvasTexture(64, 512, (context, width, height) => {
    const block = height / 6;
    for (let i = 0; i < 6; i++) {
      context.fillStyle = i % 2 ? '#eceef0' : '#2f86d0';
      context.fillRect(0, i * block, width, block);
      const gradient = context.createLinearGradient(0, i * block, 0, (i + 1) * block);
      gradient.addColorStop(0, 'rgba(60,52,40,.10)');
      gradient.addColorStop(0.2, 'rgba(60,52,40,0)');
      gradient.addColorStop(0.8, 'rgba(60,52,40,0)');
      gradient.addColorStop(1, 'rgba(60,52,40,.12)');
      context.fillStyle = gradient;
      context.fillRect(0, i * block, width, block);
      context.fillStyle = 'rgba(20,22,26,.35)';
      context.fillRect(0, i * block, width, 2);
    }
    context.fillStyle = 'rgba(0,0,0,.10)';
    for (const u of [0.34, 0.67]) context.fillRect(Math.round(u * width), 0, 2, height);
    context.fillStyle = 'rgba(0,0,0,.08)';
    context.fillRect(0, 0, 4, height);
  });
}

/**
 * Tyre wall wrapped in a conveyor-belt cover, 512 x 128, one tile = 7 m along the wall (u), v from
 * the foot (0) to the top (1) of the 0.95 m wall (references §4.5): black tyres showing at the foot
 * and along the top edge with dust on them, belt panels alternating orange #E5772E and white #E9ECEE
 * (four per tile) with two darker straps and bolt heads, and road dirt splashed up from the foot.
 */
function barrierTexture() {
  return canvasTexture(512, 128, (context, width, height) => {
    context.fillStyle = '#2a2a2a';
    context.fillRect(0, 0, width, height);
    // tyre ends along the foot and the top (canvas y = 0 is the top of the wall)
    context.fillStyle = '#1b1b1c';
    for (let x = 0; x < width; x += 16) {
      context.beginPath();
      context.arc(x + 8, height - 6, 7, 0, Math.PI * 2);
      context.arc(x + 8, 5, 6, 0, Math.PI * 2);
      context.fill();
    }
    context.fillStyle = 'rgba(90,85,75,.55)';
    context.fillRect(0, 0, width, 3);
    const panel = width / 4;
    for (let i = 0; i < 4; i++) {
      context.fillStyle = i % 2 ? '#e9ecee' : '#e5772e';
      context.fillRect(i * panel + 1, 10, panel - 2, height - 24);
      context.fillStyle = 'rgba(0,0,0,.13)';
      context.fillRect(i * panel + 1, 30, panel - 2, 5);
      context.fillRect(i * panel + 1, 76, panel - 2, 5);
      context.fillStyle = 'rgba(40,40,40,.55)';
      for (let k = 0; k < 4; k++)
        for (const y of [32, 78]) context.fillRect(i * panel + 10 + k * (panel / 4), y, 3, 2);
    }
    const dirt = context.createLinearGradient(0, height, 0, height - 46);
    dirt.addColorStop(0, 'rgba(98,84,62,.55)');
    dirt.addColorStop(1, 'rgba(98,84,62,0)');
    context.fillStyle = dirt;
    context.fillRect(0, height - 46, width, 46);
  });
}

/**
 * Soft white cloud / dust puff, 256 x 128, transparent background: 26 overlapping radial
 * gradients scattered around the centre. `seed` varies the shape.
 */
function puffTexture(seed = 1) {
  return canvasTexture(
    256,
    128,
    (context, width, height) => {
      let random = createRng(seed);
      for (let blob = 0; blob < 26; blob++) {
        // Draw order per blob: x, y, radius.
        let x = width * (0.18 + random() * 0.64),
          y = height * (0.45 + (random() - 0.5) * 0.35),
          radius = 18 + random() * 34,
          gradient = context.createRadialGradient(x, y, 0, x, y, radius);
        (gradient.addColorStop(0, 'rgba(255,255,255,.55)'),
          gradient.addColorStop(1, 'rgba(255,255,255,0)'),
          (context.fillStyle = gradient),
          context.beginPath(),
          context.arc(x, y, radius, 0, Math.PI * 2),
          context.fill());
      }
    },
    { repeat: false },
  );
}

/** Round blob shadow, 128 px, black with radial alpha falloff (alpha-only, linear). */
function blobShadowTexture() {
  return canvasTexture(
    128,
    128,
    (context, width, height) => {
      let gradient = context.createRadialGradient(width / 2, height / 2, 4, width / 2, height / 2, width / 2);
      (gradient.addColorStop(0, 'rgba(0,0,0,.55)'),
        gradient.addColorStop(0.6, 'rgba(0,0,0,.22)'),
        gradient.addColorStop(1, 'rgba(0,0,0,0)'),
        (context.fillStyle = gradient),
        context.fillRect(0, 0, width, height));
    },
    { repeat: false, srgb: false },
  );
}

/**
 * Rounded-rectangle contact shadow (black, alpha only), drawn with a signed distance field.
 * All shape options are fractions of the texture size, measured from the centre (so 0.5 reaches
 * the edge of the texture):
 *
 * @param {number} [width=256] texture width in pixels
 * @param {number} [height=128] texture height in pixels
 * @param {object} [shape]
 * @param {number} [shape.hx=0.36] half extent of the rectangle across u
 * @param {number} [shape.hy=0.27] half extent of the rectangle across v
 * @param {number} [shape.rr=0.12] corner radius
 * @param {number} [shape.fade=0.13] edge softness; alpha ramps from full at 0.3*fade inside the
 *   rounded rectangle to zero at 0.7*fade outside it
 * @param {number} [shape.core=0.45] how much the alpha also falls off radially from the centre
 *   (0 = flat, 1 = fades to nothing at the edge)
 * @param {number} [shape.alpha=0.8] peak opacity
 */
function roundedShadowTexture(
  width = 256,
  height = 128,
  { hx = 0.36, hy = 0.27, rr = 0.12, fade = 0.13, core = 0.45, alpha = 0.8 } = {},
) {
  return canvasTexture(
    width,
    height,
    (context) => {
      let image = context.createImageData(width, height),
        pixels = image.data;
      for (let row = 0; row < height; row++)
        for (let column = 0; column < width; column++) {
          // Distance from the centre in texture fractions, folded into one quadrant.
          let du = Math.abs(column / (width - 1) - 0.5),
            dv = Math.abs(row / (height - 1) - 0.5),
            insetU = du - (hx - rr),
            insetV = dv - (hy - rr),
            // Signed distance to the rounded rectangle (negative inside).
            distance =
              Math.hypot(Math.max(insetU, 0), Math.max(insetV, 0)) +
              Math.min(Math.max(insetU, insetV), 0) -
              rr,
            edge = Math.min(1, Math.max(0, 1 - (distance + fade * 0.3) / fade));
          edge = edge * edge * (3 - 2 * edge);
          let radial = 1 - core * Math.min(1, Math.hypot(du / (hx + fade), dv / (hy + fade))),
            offset = (row * width + column) * 4;
          ((pixels[offset] = pixels[offset + 1] = pixels[offset + 2] = 0),
            (pixels[offset + 3] = Math.round(255 * alpha * edge * radial)));
        }
      context.putImageData(image, 0, 0);
    },
    { repeat: false, srgb: false },
  );
}

/**
 * Ambient-occlusion fade, 4 x 128: black whose alpha falls from 0.5 at canvas row 0 (v = 1 with
 * flipY) to 0 at the last row. Laid on the ground along wall bases.
 */
function aoFadeTexture() {
  return canvasTexture(
    4,
    128,
    (context, width, height) => {
      let gradient = context.createLinearGradient(0, 0, 0, height);
      (gradient.addColorStop(0, 'rgba(0,0,0,.5)'),
        gradient.addColorStop(0.35, 'rgba(0,0,0,.2)'),
        gradient.addColorStop(1, 'rgba(0,0,0,0)'),
        (context.fillStyle = gradient),
        context.fillRect(0, 0, width, height));
    },
    { repeat: false, srgb: false, aniso: 1 },
  );
}

/**
 * Garage roller door, 64 x 256 (one per door): sky blue #2F86C0 (references §4.6) with a slat every
 * 8 px (12 cm on a 3.9 m door), a band of small dark panels at 60 % of the door height and a darker
 * bottom rail.
 */
function shutterTexture() {
  return canvasTexture(64, 256, (context, width, height) => {
    context.fillStyle = '#2f86c0';
    context.fillRect(0, 0, width, height);
    for (let slatTop = 0; slatTop < height; slatTop += 8) {
      const gradient = context.createLinearGradient(0, slatTop, 0, slatTop + 8);
      gradient.addColorStop(0, 'rgba(255,255,255,.22)');
      gradient.addColorStop(0.45, 'rgba(255,255,255,0)');
      gradient.addColorStop(0.8, 'rgba(0,0,0,.08)');
      gradient.addColorStop(1, 'rgba(0,0,0,.25)');
      context.fillStyle = gradient;
      context.fillRect(0, slatTop, width, 8);
    }
    // band of vision panels at 60 % of the door height (canvas row 0 is the top of the door)
    const band = Math.round(height * 0.4) - 6;
    context.fillStyle = '#1d2a33';
    for (let x = 3; x < width - 6; x += 10) context.fillRect(x, band, 7, 10);
    context.fillStyle = 'rgba(255,255,255,.18)';
    for (let x = 3; x < width - 6; x += 10) context.fillRect(x, band, 7, 2);
    context.fillStyle = '#5c6670';
    context.fillRect(0, height - 6, width, 6);
  });
}

/**
 * Glazed facade, 256 x 128: blue-grey sky-reflection gradient, white mullions every 32 px, a
 * transom at 62 % height and faint diagonal reflection streaks.
 */
function glazingTexture() {
  return canvasTexture(256, 128, (context, width, height) => {
    let gradient = context.createLinearGradient(0, 0, 0, height);
    (gradient.addColorStop(0, '#9fb3bf'),
      gradient.addColorStop(0.55, '#6e8592'),
      gradient.addColorStop(1, '#4b5d68'),
      (context.fillStyle = gradient),
      context.fillRect(0, 0, width, height),
      (context.fillStyle = 'rgba(245,243,238,.85)'));
    // Mullions (3 px) and the transom (2 px).
    for (let x = 0; x < width; x += 32) context.fillRect(x, 0, 3, height);
    (context.fillRect(0, height * 0.62, width, 2), (context.fillStyle = 'rgba(255,255,255,.08)'));
    // One slanted reflection quad per pane.
    for (let x = 0; x < width; x += 32)
      (context.beginPath(),
        context.moveTo(x + 6, height),
        context.lineTo(x + 18, 0),
        context.lineTo(x + 26, 0),
        context.lineTo(x + 14, height),
        context.fill());
  });
}

/**
 * Grass tuft, 128 px, transparent background: 110 blades rooted along the bottom edge, darker at the
 * root and paler (drier) towards the tip; the instance colour tints it to the ground below.
 */
function grassTuftTexture() {
  return canvasTexture(
    128,
    128,
    (context, width, height) => {
      const random = createRng(21);
      for (let blade = 0; blade < 110; blade++) {
        const rootX = width * (0.08 + random() * 0.84);
        const bladeHeight = height * (0.3 + random() * 0.68);
        const lean = (random() - 0.5) * 34;
        const tone = 0.7 + random() * 0.5;
        const gradient = context.createLinearGradient(0, height, 0, height - bladeHeight);
        gradient.addColorStop(0, `rgba(${46 * tone},${60 * tone},${28 * tone},1)`);
        gradient.addColorStop(1, `rgba(${150 * tone},${158 * tone},${96 * tone},1)`);
        context.strokeStyle = gradient;
        context.lineWidth = 1.2 + random() * 1.4;
        context.beginPath();
        context.moveTo(rootX, height);
        context.quadraticCurveTo(
          rootX + lean * 0.3,
          height - bladeHeight * 0.6,
          rootX + lean,
          height - bladeHeight,
        );
        context.stroke();
      }
    },
    { repeat: false },
  );
}

/**
 * Debris-fence mesh, 32 x 32, transparent: one diamond of galvanised wire (two 2 px diagonals). With
 * mipmaps the wires average out to a faint, even veil at a distance instead of shimmering.
 */
function fenceMeshTexture() {
  return canvasTexture(32, 32, (context, width, height) => {
    context.strokeStyle = 'rgba(205,210,212,1)';
    context.lineWidth = 2;
    context.beginPath();
    for (const offset of [-width, 0, width]) {
      context.moveTo(offset, 0);
      context.lineTo(offset + width, height);
      context.moveTo(offset + width, 0);
      context.lineTo(offset, height);
    }
    context.stroke();
  });
}

/**
 * Surface detail shared by the ground and track shaders (env/shading.js), `size` px (512; 256 on
 * 'low', where it is generated 4x faster and the finest grain is below a phone pixel anyway: every
 * feature keeps its size in metres), tileable, linear data (no colour space), sampled at world
 * positions (texel sizes below at 512 px):
 *   r  asphalt aggregate (tile 2.3 m, ~4.5 mm per texel): grain, pale stones 4–10 mm, dark pores
 *   g  grass seen from above (tile 2.7 m): short blade strokes over a speckle, in soft clumps
 *   b  gravel pebbles (tile 1.45 m, ~2.8 mm per texel): rounded pebbles 5–15 mm over dark gaps
 *   a  gravel pebble height (domes), for the bump
 * The channel means are in texture.userData.mean. Built with typed arrays (also in Node).
 * `anisotropy` follows the quality tier.
 */
function surfaceDetailTexture(anisotropy = 8, size = 512) {
  const S = size; // a power of two
  const k1 = S / 512; // feature sizes in texels scale with the image…
  const k2 = k1 * k1; // …and feature counts with its area
  const random = createRng(97);
  const asphalt = new Float32Array(S * S);
  const grass = new Float32Array(S * S);
  const gravel = new Float32Array(S * S).fill(0.3);
  const height = new Float32Array(S * S);
  const wrap = (v) => v & (S - 1); // S is a power of two
  const line = new Float32Array(S);
  /** 3 × 3 box blur with wrap-around, as two separable passes (in place on a copy). */
  const blur = (buffer) => {
    const out = new Float32Array(buffer);
    for (let y = 0; y < S; y++) {
      const o = y * S;
      for (let x = 0; x < S; x++) line[x] = out[o + wrap(x - 1)] + out[o + x] + out[o + wrap(x + 1)];
      out.set(line, o);
    }
    for (let x = 0; x < S; x++) {
      for (let y = 0; y < S; y++)
        line[y] = out[wrap(y - 1) * S + x] + out[y * S + x] + out[wrap(y + 1) * S + x];
      for (let y = 0; y < S; y++) out[y * S + x] = line[y] / 9;
    }
    return out;
  };
  // the texels of one ellipse: indices and r² (0 at the centre, 1 at the rim), filled by disc()
  const discIndex = new Int32Array(1024);
  const discR2 = new Float32Array(1024);
  /** Collects every texel of an ellipse of `radius` into discIndex / discR2; returns their count. */
  const disc = (cx, cy, radius, stretch = 1, angle = 0) => {
    const reach = Math.ceil(radius * Math.max(1, stretch)) + 1;
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const fx = cx % 1;
    const fy = cy % 1;
    const ix = Math.floor(cx);
    const iy = Math.floor(cy);
    const inv = 1 / (radius * radius);
    let n = 0;
    for (let dy = -reach; dy <= reach; dy++)
      for (let dx = -reach; dx <= reach; dx++) {
        const px = dx + 0.5 - fx;
        const py = dy + 0.5 - fy;
        const u = (px * c + py * s) / stretch;
        const v = -px * s + py * c;
        const r2 = (u * u + v * v) * inv;
        if (r2 < 1 && n < discIndex.length) {
          discIndex[n] = wrap(iy + dy) * S + wrap(ix + dx);
          discR2[n++] = r2;
        }
      }
    return n;
  };

  // asphalt: blurred grain, pale stones, dark pores
  for (let i = 0; i < S * S; i++) asphalt[i] = 0.5 + (random() - 0.5) * 0.55;
  const grain = blur(asphalt);
  for (let i = 0; i < S * S; i++) asphalt[i] = 0.47 + (grain[i] - 0.5) * 1.3 + (random() - 0.5) * 0.08;
  for (let k = 0; k < 2600 * k2; k++) {
    const r = (0.9 + random() * 1.4) * k1;
    const lift = 0.2 + random() * 0.25;
    const n = disc(random() * S, random() * S, r);
    for (let t = 0; t < n; t++) asphalt[discIndex[t]] += lift * (1 - discR2[t] * discR2[t]);
  }
  for (let k = 0; k < 1500 * k2; k++) {
    const r = (0.6 + random() * 1.0) * k1;
    const n = disc(random() * S, random() * S, r);
    for (let t = 0; t < n; t++) asphalt[discIndex[t]] -= 0.28 * (1 - discR2[t]);
  }

  // grass: speckle, blade strokes, clumps
  for (let i = 0; i < S * S; i++) grass[i] = 0.5 + (random() - 0.5) * 0.3;
  for (let k = 0; k < 4200 * k2; k++) {
    const length = (3 + random() * 7) * k1;
    const angle = random() * Math.PI * 2;
    const tone = 0.22 + random() * 0.65;
    let x = random() * S;
    let y = random() * S;
    for (let step = 0; step < length; step++) {
      const i = wrap(Math.floor(y)) * S + wrap(Math.floor(x));
      grass[i] = grass[i] * 0.3 + tone * 0.7;
      x += Math.cos(angle);
      y += Math.sin(angle);
    }
  }
  const grassSoft = blur(grass);
  for (let y = 0; y < S; y++)
    for (let x = 0; x < S; x++) {
      const i = y * S + x;
      const clump = sampleNoise(0, x / S, y / S); // periodic over the tile
      grass[i] = 0.5 + (grass[i] * 0.6 + grassSoft[i] * 0.4 - 0.5) * 1.1 + (clump - 0.5) * 0.22;
    }

  // gravel: rounded pebbles over dark gaps, each a dome
  for (let k = 0; k < 3400 * k2; k++) {
    const r = (1.8 + random() * random() * 4.2) * k1;
    const tone = random() < 0.12 ? 0.32 + random() * 0.2 : 0.55 + random() * 0.45;
    const stretch = 0.75 + random() * 0.5;
    const angle = random() * Math.PI;
    const n = disc(random() * S, random() * S, r, stretch, angle);
    for (let t = 0; t < n; t++) {
      const dome = Math.sqrt(1 - discR2[t]);
      gravel[discIndex[t]] = tone * (0.82 + 0.18 * dome);
      height[discIndex[t]] = dome;
    }
  }

  const bytes = new Uint8Array(S * S * 4);
  const toByte = (v) => Math.max(0, Math.min(255, Math.round(v * 255)));
  const sums = [0, 0, 0, 0];
  for (let i = 0; i < S * S; i++) {
    bytes[4 * i] = toByte(asphalt[i]);
    bytes[4 * i + 1] = toByte(grass[i]);
    bytes[4 * i + 2] = toByte(gravel[i]);
    bytes[4 * i + 3] = toByte(height[i]);
    for (let c = 0; c < 4; c++) sums[c] += bytes[4 * i + c];
  }
  const texture = new DataTexture(bytes, S, S, RGBAFormat);
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.minFilter = LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = anisotropy;
  texture.name = 'env-surface-detail';
  // per-channel means: the shaders blend lookups around them (env/shading.js envNoTile)
  texture.userData.mean = sums.map((sum) => sum / (S * S * 255));
  texture.needsUpdate = true;
  return texture;
}

export {
  aoFadeTexture,
  fenceMeshTexture,
  surfaceDetailTexture,
  barrierTexture,
  blobShadowTexture,
  glazingTexture,
  grassTuftTexture,
  kerbTexture,
  puffTexture,
  roundedShadowTexture,
  shutterTexture,
};
