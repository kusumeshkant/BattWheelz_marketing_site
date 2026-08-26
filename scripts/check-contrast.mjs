/**
 * WCAG contrast check for every text-on-background pair the theme defines.
 *
 * Run with:  node scripts/check-contrast.mjs
 *
 * Exists because "that looks readable" is not a measurement, and because a
 * palette swap is exactly when a pair quietly stops passing — the gold fill
 * that replaced the old green fill is a LIGHT colour, so its label had to flip
 * from white to black. This script is what catches that class of mistake.
 *
 * Thresholds are WCAG 2.1: 4.5:1 for body text, 3:1 for large text (>=24px, or
 * >=18.66px bold) and for UI component boundaries.
 */

import { colors, palette } from "../src/theme/colors.js";

const hexToRgb = (hex) => {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? [...h].map((c) => c + c).join("") : h;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
};

/** Relative luminance, per WCAG. */
const luminance = (hex) => {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const ratio = (a, b) => {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

/**
 * Flattens a translucent colour against an opaque backdrop.
 *
 * The header is a black scrim, not a black surface — what sits behind it shows
 * through. Measuring its text against pure black would flatter it, because the
 * bar is at its LIGHTEST exactly where the page beneath is white. This composites
 * the scrim over that worst case so the number below is the one a visitor on the
 * About page actually gets.
 */
const composite = (rgba, backdropHex) => {
  const [r, g, b, a] = rgba.match(/[\d.]+/g).map(Number);
  const back = hexToRgb(backdropHex);
  const mix = [r, g, b].map((c, i) => Math.round(c * a + back[i] * (1 - a)));
  return `#${mix.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
};

/** The header bar as it actually renders over a light page. */
const headerRest = composite(colors.surface.headerScrimDark, colors.surface.page);
const headerCondensed = composite(colors.surface.headerScrimDarkCondensed, colors.surface.page);

/** [label, foreground, background, minimum] */
const checks = [
  // --- Light surfaces ---
  ["Body text on white", colors.text.primary, colors.surface.page, 4.5],
  ["Secondary text on white", colors.text.secondary, colors.surface.page, 4.5],
  ["Muted text on white", colors.text.muted, colors.surface.page, 4.5],
  ["Body text on raised", colors.text.primary, colors.surface.raised, 4.5],
  ["Secondary text on raised", colors.text.secondary, colors.surface.raised, 4.5],
  ["Accent text on white", colors.brand.primaryText, colors.surface.page, 4.5],
  ["Accent text on raised", colors.brand.primaryText, colors.surface.raised, 4.5],
  ["Accent text on sunken", colors.brand.primaryText, colors.surface.sunken, 4.5],
  ["Accent on brand-soft chip", colors.brand.primaryText, colors.brand.primarySoft, 4.5],

  // --- The brand fill. Gold is LIGHT, so its label is black. ---
  ["Button label on gold fill", colors.text.onPrimary, colors.brand.primary, 4.5],
  ["Button label on gold hover", colors.text.onPrimary, colors.brand.primaryHover, 4.5],
  // The fill itself cannot meet 3:1 on white and is not required to —
  // what must be perceivable is the component BOUNDARY, which the border
  // provides. Both are measured.
  ["Gold button EDGE vs white page", colors.brand.primaryEdge, colors.surface.page, 3],
  ["Gold button EDGE vs gold fill", colors.brand.primaryEdge, colors.brand.primary, 3],

  // --- Dark surfaces ---
  ["Body text on black", colors.text.inverse, colors.surface.inverse, 4.5],
  ["Secondary text on black", colors.text.inverseSecondary, colors.surface.inverse, 4.5],
  ["Muted text on black", colors.text.inverseMuted, colors.surface.inverse, 4.5],
  ["Gold accent on black", colors.brand.primaryOnDark, colors.surface.inverse, 4.5],
  ["Ember accent on black", colors.brand.secondary, colors.surface.inverse, 4.5],
  ["Body text on raised black", colors.text.inverse, colors.surface.inverseRaised, 4.5],
  ["Gold accent on raised black", colors.brand.primaryOnDark, colors.surface.inverseRaised, 4.5],

  // --- Gradient ends used as TEXT (background-clip: text) ---
  ["accentSweep start on white (large)", palette.ember[400], colors.surface.page, 3],
  ["accentSweep end on white (large)", palette.ember[600], colors.surface.page, 3],
  ["accentSweep start on raised (large)", palette.ember[400], colors.surface.raised, 3],
  ["brandOnDark start on black (large)", palette.gold[500], colors.surface.inverse, 3],
  ["brandOnDark end on black (large)", palette.ember[400], colors.surface.inverse, 3],

  // --- The header. Dark chrome over a page that may be light, so each pair is
  //     measured against the composited bar rather than against pure black.
  //     Over the home page's black hero the bar IS black, which is the easier
  //     case and is already covered by the dark-surface rows above.
  ["Nav link on header (over light page)", colors.text.inverseSecondary, headerRest, 4.5],
  ["Nav link hover/active on header", colors.text.inverse, headerRest, 4.5],
  ["Nav link on condensed header", colors.text.inverseSecondary, headerCondensed, 4.5],
  // The active-page underline is a UI indicator, not text — 3:1 applies.
  ["Nav underline vs header", colors.brand.primary, headerRest, 3],
  ["Menu toggle icon on header", colors.text.inverse, headerRest, 4.5],

  // --- Header dropdown panel (a lifted black, not the bar's own black) ---
  ["Dropdown link on panel", colors.text.inverseSecondary, colors.surface.inverseRaised, 4.5],
  ["Dropdown link hover on panel", colors.text.inverse, colors.surface.inverseRaised, 4.5],

  // --- Mobile drawer. Takes the header's ground, so the current-page marker is
  //     gold; the ember used for the same job on light surfaces fails on black.
  ["Drawer current-page link on black", colors.brand.primaryOnDark, colors.surface.inverse, 4.5],
  ["Drawer sub-link on black", colors.text.inverseSecondary, colors.surface.inverse, 4.5],

  // --- Status ---
  ["Danger text on white", colors.status.dangerText, colors.surface.page, 4.5],
  ["Warning on black", colors.status.warning, colors.surface.inverse, 4.5],
];

let failed = 0;
const rows = checks.map(([label, fg, bg, min]) => {
  const r = ratio(fg, bg);
  const pass = r >= min;
  if (!pass) failed += 1;
  return { label, fg, bg, r, min, pass };
});

const width = Math.max(...rows.map((row) => row.label.length));
for (const row of rows) {
  const mark = row.pass ? "PASS" : "FAIL";
  console.log(
    `${mark}  ${row.label.padEnd(width)}  ${row.r.toFixed(2).padStart(6)}:1  (min ${row.min})  ${row.fg} on ${row.bg}`
  );
}

console.log(`\n${rows.length - failed}/${rows.length} pairs pass.`);
process.exit(failed ? 1 : 0);
