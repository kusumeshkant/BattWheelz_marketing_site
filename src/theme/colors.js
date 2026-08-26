/**
 * Colour tokens — the ONLY place a hex value is allowed to live.
 *
 * FINAL BRAND PALETTE, taken from the client's logo and signed off. Every token
 * below is emitted as a CSS custom property (see cssVariables.js) and components
 * only ever reference `var(--bw-color-*)`, so this file is the whole re-skin.
 *
 * The palette is gold + ember on true black and true white:
 *
 *  - `gold.500` (#FFCC29) is the brand fill. It is a LIGHT colour, so anything
 *    sitting on it takes BLACK text, not white — see `text.onPrimary`. This is
 *    the single biggest difference from the green palette it replaces, where
 *    the fill was dark and its label was white.
 *  - `ember` is the orange from the logo's scooter. The logo's own #DA6220 is
 *    only 3.8:1 on white, which fails AA for body text, so the light-surface
 *    accent is the deepened `ember.700` (#B84E18, 5.07:1). The undeepened
 *    #DA6220 is reserved for dark surfaces, where it measures 5.75:1.
 *  - Dark surfaces are PURE BLACK, not a tinted navy. The old ink/surge
 *    gradient is gone rather than darkened.
 *
 * Contrast for every pair introduced here is verified by
 * `scripts/check-contrast.mjs` — run it after touching this file.
 */

const palette = {
  // Brand signal — gold, from the logo wordmark
  gold: {
    50: "#FFF9E6",
    100: "#FFF4D1",
    200: "#FFE49A",
    300: "#FFD75A",
    400: "#FFD03D",
    500: "#FFCC29", // primary fill
    600: "#F0BC15",
    700: "#C99B0B",
    800: "#8A6A06",
    900: "#4D3B03",
  },

  // Secondary signal — ember orange, from the logo's scooter glyph
  ember: {
    50: "#FDF0E8",
    100: "#F9DCCB",
    200: "#F0B48C",
    300: "#E88B54",
    400: "#DA6220", // the logo's own orange. AA on black, NOT on white.
    500: "#C85718",
    600: "#B84E18", // text-safe on white (AA, 5.07:1)
    700: "#9A4013",
    800: "#6E2E0E",
    900: "#3F1A08",
  },

  // Ground — true black, plus lifted blacks for cards sitting on it
  ink: {
    900: "#000000",
    800: "#0A0A0A",
    700: "#141414",
    600: "#1F1E1C",
    500: "#2B2A27",
  },

  // Warm-neutral greys. Warm rather than the old cool slate, so they sit under
  // gold and ember without reading as a different temperature.
  neutral: {
    50: "#FAFAF9",
    100: "#F4F3F1",
    200: "#E7E5E1",
    300: "#D3D0CB",
    400: "#A8A49E",
    500: "#6E6A64",
    600: "#4A4744",
    700: "#33312E",
    800: "#1F1E1C",
    900: "#000000",
  },

  white: "#FFFFFF",
  black: "#000000",

  // Status / feedback. Not brand colours — these keep their conventional
  // meanings, because a red that is not red stops communicating.
  green: { 400: "#3BAE6A", 500: "#2E8B53", 600: "#236B40" },
  amber: { 400: "#F5B324", 500: "#B37905", 600: "#8A5C04" },
  red: { 400: "#F2544B", 500: "#DB342A", 600: "#B02219" },
};

/**
 * Semantic layer. Components use THESE names, never the raw palette — so a
 * rebrand that moves "primary" from gold to something else is a change here and
 * nothing downstream cares what the colour actually is.
 */
export const colors = {
  brand: {
    primary: palette.gold[500],
    primaryHover: palette.gold[600],
    /** The brand used AS TEXT on light surfaces — the deepened ember, not gold.
     *  Gold on white is ~1.4:1 and would be unreadable. */
    primaryText: palette.ember[600],
    /** ...and the same job on black, where gold is the strongest option. */
    primaryOnDark: palette.gold[500],
    primarySoft: palette.gold[100],
    primaryBorder: palette.gold[200],
    /**
     * The EDGE of a gold fill sitting on white.
     *
     * Gold on white is 1.51:1 — the label on a primary button is perfectly
     * legible (13.9:1) but the button's own boundary is nearly invisible, which
     * fails WCAG 1.4.11 (Non-text Contrast, 3:1 for UI components). A deep-gold
     * border restores a perceivable edge at 5.07:1 without touching the brand
     * fill the client signed off.
     */
    primaryEdge: palette.gold[800],
    secondary: palette.ember[400],
    secondaryText: palette.ember[600],
  },

  surface: {
    page: palette.white,
    raised: palette.neutral[50],
    sunken: palette.neutral[100],
    inverse: palette.ink[900],
    inverseRaised: palette.ink[700],
    /**
     * Was the blue end of the old hero gradient. The dark ground is now flat
     * black, so this matches `inverse` — kept as a token because the wave
     * divider still composes a gradient from the pair.
     */
    inverseDeep: palette.ink[900],
    overlay: "rgba(0, 0, 0, 0.72)",

    /**
     * White scrims used ON the dark ground — icon chips, slider tracks, the
     * hero's glass badge. Tokens rather than inline `rgb(255 255 255 / .08)`
     * in a dozen stylesheets, so a future dark ground that is not black can
     * change them in one place.
     */
    tintOnDarkSubtle: "rgba(255, 255, 255, 0.04)",
    tintOnDark: "rgba(255, 255, 255, 0.08)",
    tintOnDarkStrong: "rgba(255, 255, 255, 0.16)",
    glassOnDark: "rgba(255, 255, 255, 0.10)",
    /**
     * The translucent header bar, resting and condensed.
     *
     * TWO pairs, light and dark. The header uses the DARK pair — it follows the
     * site's dark surfaces (hero, footer) rather than being its own light
     * island. The light pair is kept, not deleted: it is the named alternative
     * for a light-chrome treatment, and keeping it is what makes this a token
     * choice rather than a one-way rewrite.
     *
     * The alphas are NOT copied across from the light pair, and that is
     * deliberate. White at 0.82 over a mostly-white page is still white, so the
     * light scrim lost nothing to the page beneath it. Black at the same alpha
     * over a white page composites to ~#2E2E2E — a washed grey, not the black
     * the brand asks for. A little more opacity buys back the colour while
     * leaving the blur visible. The two-state structure is unchanged: lighter
     * at rest, closer to solid once condensed.
     */
    headerScrim: "rgba(255, 255, 255, 0.82)",
    headerScrimCondensed: "rgba(255, 255, 255, 0.94)",
    headerScrimDark: "rgba(0, 0, 0, 0.88)",
    headerScrimDarkCondensed: "rgba(0, 0, 0, 0.96)",
    /** A light pill sitting over artwork, e.g. the team card's role label. */
    pillOnMedia: "rgba(255, 255, 255, 0.92)",
  },

  text: {
    primary: palette.black,
    secondary: palette.neutral[600],
    muted: palette.neutral[500],
    inverse: palette.white,
    inverseSecondary: palette.neutral[300],
    inverseMuted: palette.neutral[400],
    /**
     * Text sitting ON the brand fill. BLACK, because the fill is gold — a light
     * colour. White here would be ~1.4:1 and illegible.
     */
    onPrimary: palette.black,
  },

  border: {
    subtle: palette.neutral[200],
    default: palette.neutral[300],
    strong: palette.neutral[400],
    inverse: "rgba(255, 255, 255, 0.16)",
  },

  status: {
    success: palette.green[500],
    warning: palette.amber[500],
    danger: palette.red[500],
    dangerText: palette.red[600],
  },

  gradient: {
    /**
     * The dark ground. Flat black by design — the brief replaced the old navy
     * gradient outright rather than darkening it. Kept as a gradient token so
     * every `background-image: var(--bw-color-gradient-hero)` still resolves.
     */
    hero: `linear-gradient(160deg, ${palette.ink[900]} 0%, ${palette.ink[900]} 100%)`,
    brand: `linear-gradient(135deg, ${palette.gold[300]} 0%, ${palette.gold[500]} 100%)`,
    /**
     * Used for the eyebrow rule and for highlighted words on LIGHT surfaces
     * (PageHero's h1), so both ends must be legible as text on white. Gold is
     * not, so this runs ember -> deepened ember rather than gold -> ember.
     */
    accentSweep: `linear-gradient(90deg, ${palette.ember[400]} 0%, ${palette.ember[600]} 100%)`,
    /** The same idea on black, where gold is the strongest end. */
    brandOnDark: `linear-gradient(100deg, ${palette.gold[500]} 0%, ${palette.ember[400]} 100%)`,
    fadeUp: `linear-gradient(180deg, rgba(255,255,255,0) 0%, ${palette.neutral[50]} 100%)`,
  },

  shadowColor: {
    ambient: "rgba(0, 0, 0, 0.08)",
    lifted: "rgba(0, 0, 0, 0.16)",
    brand: "rgba(255, 204, 41, 0.34)",
  },
};

export { palette };
export default colors;
