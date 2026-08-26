/**
 * Spacing, layout, radii, shadows and breakpoints.
 *
 * The scale is a 4px base with a 1.5x-ish ramp. Components never write a raw
 * px value for margin/padding/gap — they use var(--bw-space-*), so tightening
 * the whole site's rhythm is an edit here.
 */

export const spacing = {
  0: "0",
  1: "0.25rem", //  4px
  2: "0.5rem", //   8px
  3: "0.75rem", // 12px
  4: "1rem", //    16px
  5: "1.5rem", //  24px
  6: "2rem", //    32px
  7: "2.5rem", //  40px
  8: "3rem", //    48px
  9: "4rem", //    64px
  10: "5rem", //   80px
  11: "6.5rem", // 104px
  12: "8rem", //  128px
};

/** Vertical rhythm between page sections — fluid, so mobile isn't cavernous. */
export const sectionSpacing = {
  sm: "clamp(2.5rem, 1.8rem + 3.5vw, 4rem)",
  md: "clamp(3.5rem, 2.4rem + 5.5vw, 6rem)",
  lg: "clamp(4.5rem, 3.0rem + 7.5vw, 8rem)",
};

export const radii = {
  none: "0",
  sm: "0.375rem",
  md: "0.625rem",
  lg: "1rem",
  xl: "1.5rem",
  "2xl": "2rem",
  pill: "999px",
};

export const shadows = {
  none: "none",
  sm: "0 1px 2px var(--bw-shadow-color-ambient)",
  md: "0 4px 16px -4px var(--bw-shadow-color-ambient)",
  lg: "0 16px 40px -12px var(--bw-shadow-color-lifted)",
  xl: "0 28px 64px -20px var(--bw-shadow-color-lifted)",
  brand: "0 12px 32px -10px var(--bw-shadow-color-brand)",
};

export const layout = {
  containerMaxWidth: "76rem", // 1216px
  containerNarrowMaxWidth: "52rem", // long-form prose measure
  containerGutter: "clamp(1rem, 0.5rem + 2.5vw, 2.5rem)",
  headerHeight: "4.5rem",
  headerHeightCondensed: "3.5rem",
};

/**
 * Breakpoints. Exported as JS numbers as well as CSS vars because a handful of
 * behaviours (the mobile nav) need the same value in a matchMedia call — one
 * definition, two consumers, no drift.
 */
export const breakpoints = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
};

export const mediaQuery = Object.fromEntries(
  Object.entries(breakpoints).map(([key, px]) => [key, `(min-width: ${px}px)`])
);

export const zIndex = {
  base: 0,
  raised: 10,
  sticky: 100,
  header: 200,
  overlay: 300,
  modal: 400,
};

export default spacing;
