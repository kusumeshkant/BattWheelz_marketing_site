/**
 * Typography tokens — the ONLY place a font-family, size or weight is declared.
 *
 * PLACEHOLDER TYPE PAIRING. Swapping to the client's brand fonts is: change the
 * two stacks below, and change the <link> / next/font declaration in
 * src/app/layout.jsx to match. Nothing else in the codebase names a font.
 *
 * Pairing rationale: a single geometric-grotesk family across display and body
 * keeps the page fast (one family, two weights streamed) and reads the way
 * mobility brands read — engineered, not editorial. A separate mono stack is
 * kept for stat figures so digits are tabular and counters don't jitter while
 * animating.
 */

export const typography = {
  /**
   * The `--bw-typeface-*` variables are supplied by next/font in
   * src/app/layout.jsx, which self-hosts the files and gives each a hashed
   * family name. Referencing them here keeps the fallback chain — the part that
   * actually matters for CLS — under design control, in this file.
   */
  fontFamily: {
    display: `var(--bw-typeface-display), "Segoe UI", system-ui, -apple-system, sans-serif`,
    body: `var(--bw-typeface-body), "Segoe UI", system-ui, -apple-system, sans-serif`,
    mono: `var(--bw-typeface-mono), ui-monospace, "Cascadia Mono", Consolas, monospace`,
  },

  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  /**
   * Fluid type scale. Every step is a clamp() so the site never needs a
   * font-size media query — the ramp is continuous from 360px to 1440px.
   */
  fontSize: {
    xs: "clamp(0.75rem, 0.73rem + 0.10vw, 0.8125rem)",
    sm: "clamp(0.875rem, 0.85rem + 0.12vw, 0.9375rem)",
    base: "clamp(1rem, 0.97rem + 0.15vw, 1.0625rem)",
    lg: "clamp(1.125rem, 1.07rem + 0.28vw, 1.25rem)",
    xl: "clamp(1.25rem, 1.16rem + 0.45vw, 1.5rem)",
    "2xl": "clamp(1.5rem, 1.34rem + 0.80vw, 2rem)",
    "3xl": "clamp(1.875rem, 1.60rem + 1.35vw, 2.75rem)",
    "4xl": "clamp(2.25rem, 1.83rem + 2.10vw, 3.5rem)",
    "5xl": "clamp(2.75rem, 2.05rem + 3.50vw, 4.5rem)",
  },

  lineHeight: {
    tight: 1.08,
    snug: 1.22,
    normal: 1.5,
    relaxed: 1.68,
  },

  letterSpacing: {
    tighter: "-0.03em",
    tight: "-0.015em",
    normal: "0",
    wide: "0.04em",
    widest: "0.14em", // eyebrow / overline labels
  },
};

export default typography;
