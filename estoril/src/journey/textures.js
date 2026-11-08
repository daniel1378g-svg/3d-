// Procedural canvas textures for the circuit, its buildings, people and cars.
//
// Every texture is drawn once into a 2D canvas at load time. Seeded generators (createRng) and the
// seeded noise (fbm2) make the result identical on every load. Canvas pixel coordinates have
// (0, 0) at the top-left; with three's default flipY that row ends up at v = 1.
import { CanvasTexture, RepeatWrapping, SRGBColorSpace } from 'three';
import { fbm2 } from './util/noise.js';
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

/** Tiling asphalt, 512 px: mid grey with low-frequency fbm blotches plus per-pixel grain. */
function asphaltTexture() {
  return canvasTexture(512, 512, (context, width, height) => {
    ((context.fillStyle = '#55585e'), context.fillRect(0, 0, width, height));
    let image = context.getImageData(0, 0, width, height),
      pixels = image.data,
      random = createRng(3);
    for (let offset = 0; offset < pixels.length; offset += 4) {
      let x = (offset / 4) % width,
        y = Math.floor(offset / 4 / width),
        shade = fbm2(x / 60, y / 60, 3) * 14 + (random() - 0.5) * 30;
      // Uint8ClampedArray: += rounds and clamps. Blue gets +1 for a faint cool cast.
      ((pixels[offset] += shade), (pixels[offset + 1] += shade), (pixels[offset + 2] += shade + 1));
    }
    context.putImageData(image, 0, 0);
  });
}

/**
 * Tiling grass, 512 px. Deliberately pale (≈ rgb 196/210/186): the ground material multiplies it
 * with per-vertex colours that carry the actual greens and browns.
 */
function grassTexture() {
  return canvasTexture(512, 512, (context, width, height) => {
    let image = context.createImageData(width, height),
      pixels = image.data,
      random = createRng(11);
    for (let y = 0; y < height; y++)
      for (let x = 0; x < width; x++) {
        let offset = (y * width + x) * 4,
          patch = fbm2(x / 90, y / 90, 4),
          grain = (random() - 0.5) * 14;
        ((pixels[offset] = 196 + patch * 40 + grain),
          (pixels[offset + 1] = 210 + patch * 40 + grain),
          (pixels[offset + 2] = 186 + patch * 30 + grain * 0.6),
          (pixels[offset + 3] = 255));
      }
    context.putImageData(image, 0, 0);
  });
}

/** Tiling gravel trap, 256 px: sand base with 2600 random pebbles (radius 0.6..3 px). */
function gravelTexture() {
  return canvasTexture(256, 256, (context, width, height) => {
    ((context.fillStyle = '#d6c6a2'), context.fillRect(0, 0, width, height));
    let random = createRng(5);
    for (let pebble = 0; pebble < 2600; pebble++) {
      // Draw order per pebble: radius, brightness, x, y.
      let radius = random() * 2.4 + 0.6,
        brightness = 160 + random() * 80;
      ((context.fillStyle = `rgb(${brightness},${brightness * 0.93},${brightness * 0.8})`),
        context.beginPath(),
        context.arc(random() * width, random() * height, radius, 0, Math.PI * 2),
        context.fill());
    }
  });
}

/**
 * Kerb, 128 x 512: four blue/white bands along v (so one tile = two blue + two white blocks along
 * the track) and a faint dark stripe on the u = 0 edge.
 */
function kerbTexture() {
  return canvasTexture(128, 512, (context, width, height) => {
    for (let band = 0; band < 4; band++)
      ((context.fillStyle = band % 2 ? '#f2f2ee' : '#2a63c9'),
        context.fillRect(0, (band * height) / 4, width, height / 4));
    ((context.fillStyle = 'rgba(0,0,0,.08)'), context.fillRect(0, 0, 12, height));
  });
}

/** Tyre-wall / barrier, 512 x 128: eight orange/white vertical blocks and a dark band at the bottom. */
function barrierTexture() {
  return canvasTexture(512, 128, (context, width, height) => {
    for (let block = 0; block < 8; block++)
      ((context.fillStyle = block % 2 ? '#f3efe8' : '#e8742a'),
        context.fillRect((block * width) / 8, 0, width / 8, height));
    ((context.fillStyle = 'rgba(0,0,0,.18)'), context.fillRect(0, height - 16, width, 16));
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

/** Garage roller shutter, 64 x 256: light grey with a highlight-to-shadow gradient every 8 px slat. */
function shutterTexture() {
  return canvasTexture(64, 256, (context, width, height) => {
    ((context.fillStyle = '#cfd3d6'), context.fillRect(0, 0, width, height));
    for (let slatTop = 0; slatTop < height; slatTop += 8) {
      let gradient = context.createLinearGradient(0, slatTop, 0, slatTop + 8);
      (gradient.addColorStop(0, 'rgba(255,255,255,.55)'),
        gradient.addColorStop(0.45, 'rgba(255,255,255,0)'),
        gradient.addColorStop(0.8, 'rgba(0,0,0,.10)'),
        gradient.addColorStop(1, 'rgba(0,0,0,.28)'),
        (context.fillStyle = gradient),
        context.fillRect(0, slatTop, width, 8));
    }
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
 * Grass tuft billboard, 128 px, transparent background: 70 curved blades rooted on the bottom edge.
 */
function grassTuftTexture() {
  return canvasTexture(
    128,
    128,
    (context, width, height) => {
      let random = createRng(21);
      for (let blade = 0; blade < 70; blade++) {
        // Draw order per blade: root x, blade height, lean, brightness, then line width.
        let rootX = width * (0.1 + random() * 0.8),
          bladeHeight = height * (0.35 + random() * 0.6),
          lean = (random() - 0.5) * 26,
          brightness = 70 + random() * 60;
        ((context.strokeStyle = `rgba(${brightness * 0.8},${brightness},${brightness * 0.55},1)`),
          (context.lineWidth = 1.4 + random() * 1.6),
          context.beginPath(),
          context.moveTo(rootX, height),
          context.quadraticCurveTo(
            rootX + lean * 0.3,
            height - bladeHeight * 0.6,
            rootX + lean,
            height - bladeHeight,
          ),
          context.stroke());
      }
    },
    { repeat: false },
  );
}

export {
  aoFadeTexture,
  asphaltTexture,
  barrierTexture,
  blobShadowTexture,
  glazingTexture,
  grassTexture,
  grassTuftTexture,
  gravelTexture,
  kerbTexture,
  puffTexture,
  roundedShadowTexture,
  shutterTexture,
};
