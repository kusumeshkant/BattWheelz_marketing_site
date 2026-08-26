/**
 * Turns the JS theme into a block of CSS custom properties.
 *
 * This is the bridge that lets the rule "no component may contain a hex colour,
 * a font stack or a magic spacing value" actually hold: components are written
 * in CSS Modules against `var(--bw-*)`, and every one of those variables is
 * generated from src/theme/*.js at build time. There is no runtime styling
 * library and no per-render style recalculation — the variables are emitted
 * once, into a <style> tag in <head>, during the static build.
 */

import theme from "./theme";

/** `containerMaxWidth` -> `container-max-width`; `2xl` stays `2xl`. */
const toKebab = (key) =>
  String(key)
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();

/** Walks a nested token object, emitting `--bw-<prefix>-<path...>` entries. */
function flatten(value, prefix, out = []) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    out.push([`--bw-${prefix}`, value]);
    return out;
  }
  for (const [key, child] of Object.entries(value)) {
    flatten(child, `${prefix}-${toKebab(key)}`, out);
  }
  return out;
}

const cubicBezier = (curve) => `cubic-bezier(${curve.join(", ")})`;

function buildTokenEntries() {
  const { colors, typography, spacing, sectionSpacing, radii, shadows, layout, zIndex, breakpoints, motion } = theme;

  // Colours, minus the shadow tints — those get their own prefix so the shadow
  // tokens in spacing.js can compose them as `var(--bw-shadow-color-*)`.
  const { shadowColor, ...colorGroups } = colors;

  return [
    ...flatten(colorGroups, "color"),
    ...flatten(shadowColor, "shadow-color"),

    ...flatten(typography.fontFamily, "font"),
    ...flatten(typography.fontWeight, "weight"),
    ...flatten(typography.fontSize, "text"),
    ...flatten(typography.lineHeight, "leading"),
    ...flatten(typography.letterSpacing, "tracking"),

    ...flatten(spacing, "space"),
    ...flatten(sectionSpacing, "section"),
    ...flatten(radii, "radius"),
    ...flatten(shadows, "shadow"),
    ...flatten(layout, "layout"),
    ...flatten(zIndex, "z"),

    ...Object.entries(breakpoints).map(([k, px]) => [`--bw-breakpoint-${k}`, `${px}px`]),
    ...Object.entries(motion.duration).map(([k, s]) => [`--bw-duration-${toKebab(k)}`, `${s}s`]),
    ...Object.entries(motion.easing).map(([k, curve]) => [`--bw-ease-${toKebab(k)}`, cubicBezier(curve)]),
  ];
}

/** The `:root { ... }` rule, ready to drop into a <style> tag. */
export function buildThemeCss() {
  const declarations = buildTokenEntries()
    .map(([name, value]) => `${name}:${value};`)
    .join("");

  return `:root{${declarations}}`;
}

export default buildThemeCss;
