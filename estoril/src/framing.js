// Where the journey's camera frames its subject: the parts of the stage the page leaves free, worked
// out from the boxes the page actually lays out (home.js updateFraming() measures them on resize and
// passes the result to the scene; camera-director.js frames the car and the circuit in them). Pure
// arithmetic on [left, top, right, bottom] boxes in CSS px, so scripts can run it on any layout.
//
//   open   the stage between the fixed bars above it and the ticker, clear of the stage buttons and
//          the skip link: the aerial frames the circuit in it, and car shots use it while no panel
//          is shown;
//   panel  for car shots while a panel is shown. Where the panels leave a quarter of the width or
//          more beside them (desktop, and landscape phones, whose panel is a card on the left) the
//          column right of the widest panel, clear of the controls standing in it; where they are
//          bottom sheets (portrait phones and tablets, narrow screens taller than 500 px) the band
//          of the open area above the tallest panel or, where that is under a tenth of the height,
//          the part beside the controls (short phones: left of the skip link, under the stage
//          buttons), and the band grown over the top of the sheet only where neither is that tall.
//
// The controls are cleared one at a time, top first, in one of two ways:
//   docked   a control standing at the top edge of the area (up to 960 px wide the stage buttons
//            stand in a row right under the site header and the skip link under them) is always
//            cleared, by keeping the part left of it or, for one wider than tall, the part below it;
//            of all the ways to clear every control, the one that leaves room for the largest car
//            wins (landscape phones: below the controls where that band is tall enough, else left of
//            the skip link and under the buttons; never under them);
//   beside   a control standing lower down at the side of the area (desktop: the stage buttons at
//            mid-height at the right edge, the skip link at the foot) is cleared by the part left of
//            it if that is a quarter of the width wide, or below it (if wider than tall) if that is a
//            tenth of the height tall, whichever holds the larger car; with neither, the car may pass
//            under it (4:3 tablets: the column between the panels and the buttons is too narrow).

/** Width over height of the car's outline in the car shots (2.1–3.2 in scripts/test-camera.mjs). */
const CAR_ASPECT = 2.5;
/** Space (CSS px) kept between the panels and the column right of them, and above a bottom sheet. */
const PANEL_GAP = 24;
const SHEET_GAP = 10;

/** Width (px) of the largest car (CAR_ASPECT) that fits in `area`, 0 if it is empty. */
function carIn(area) {
  const w = area[2] - area[0];
  const h = area[3] - area[1];
  return w > 0 && h > 0 ? Math.min(w, CAR_ASPECT * h) : 0;
}

/** Whether box c stands outside `area`. */
function apart(area, c) {
  return c[0] >= area[2] || c[2] <= area[0] || c[1] >= area[3] || c[3] <= area[1];
}

/**
 * The free areas of a stage layout (CSS px, the stage's top-left corner at 0, 0):
 *   width, height  the stage (the canvas, which fills the viewport while the journey is shown)
 *   gapX, gapY     the page's gaps around its stage UI
 *   strip          bottom of the preview strip fixed at the top of the viewport (0 without one)
 *   header         bottom of the site header's layout box (fixed under the strip; 0 without one): its
 *                  band counts as page UI where the stage controls are docked right under it
 *   bottom         top of the ticker at the foot of the stage
 *   controls       boxes of the stage buttons and the skip link (null where absent)
 *   panels         layout boxes of the stage panels (not moved by their slide transforms)
 * Returns { panel, open } as [left, top, right, bottom] boxes.
 */
function framingAreas({ width, height, gapX, gapY, strip, header, bottom, controls, panels }) {
  const quarter = width * 0.25;
  const tenth = height * 0.1;
  const list = controls.filter(Boolean).sort((a, b) => a[1] - b[1]);
  // the fixed bars above the stage: the preview strip, and the site header where the page docks the
  // stage controls right under it (up to 960 px wide: site.css puts them at --hdr + --strip)
  let top = strip + gapY;
  if (header > strip && list.some((c) => c[1] <= header + gapY + 1)) top = header + gapY;
  const ground = bottom - gapY;

  /** `area` cleared of the controls standing in it (see the header), a new box. */
  function clear(area) {
    let best = area.slice();
    let bestPassed = Infinity;
    let bestCar = -1;
    const visit = (a, i, passed) => {
      if (i === list.length) {
        const car = carIn(a);
        if (passed < bestPassed || (passed === bestPassed && car > bestCar)) {
          best = a;
          bestPassed = passed;
          bestCar = car;
        }
        return;
      }
      const c = list[i];
      if (apart(a, c)) return visit(a, i + 1, passed);
      const left = [a[0], a[1], c[0] - gapX, a[3]];
      const below = [a[0], c[3] + gapY, a[2], a[3]];
      const wide = c[2] - c[0] > c[3] - c[1];
      const docked = c[1] <= a[1] + 1;
      const options = [];
      if (left[2] - left[0] >= (docked ? 1 : quarter)) options.push(left);
      if (wide && below[3] - below[1] >= (docked ? 1 : tenth)) options.push(below);
      if (!options.length) return visit(a, i + 1, passed + 1);
      for (const option of options) visit(option, i + 1, passed);
    };
    visit(area.slice(), 0, 0);
    return best;
  }

  const open = clear([gapX, top, width - gapX, ground]);
  let right = 0;
  let sheet = ground;
  for (const box of panels) {
    right = Math.max(right, box[2]);
    sheet = Math.min(sheet, box[1] - SHEET_GAP);
  }
  let panel;
  if (right <= width - quarter) {
    // a side column: right of the widest panel; one narrower than a quarter of the width (desktop
    // windows just over 960 px) grows left over the panels' edge
    const column = [right + PANEL_GAP, top, width - gapX, ground];
    panel = clear(column);
    if (column[2] - column[0] < quarter) panel[0] = Math.min(panel[0], panel[2] - quarter);
  } else {
    // bottom sheets: the band of the open area above them, or the part beside the controls, or the
    // band grown down over the top of the sheet (a fifth of the height and a bit)
    panel = [open[0], open[1], open[2], Math.min(open[3], sheet)];
    if (panel[3] - panel[1] < tenth) {
      const beside = clear([gapX, top, width - gapX, sheet]);
      if (beside[3] - beside[1] >= tenth && list.every((c) => apart(beside, c))) panel = beside;
      else panel[3] = Math.min(ground, panel[1] + height * 0.22);
    }
  }
  return { panel, open };
}

export { CAR_ASPECT, framingAreas };
