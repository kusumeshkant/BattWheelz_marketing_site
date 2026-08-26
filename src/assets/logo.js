/**
 * THE LOGO. Single source of truth.
 *
 * The real Battwheelz badge mark, supplied by the client:
 * `src/assets/brand/battwheelz-logo.svg`.
 *
 * This replaces the earlier placeholder, and the change is more than a file
 * swap — it changes what a logo IS here:
 *
 *  - The placeholder was a single-colour inline SVG that inherited
 *    `currentColor`, so it re-tinted itself for the light header and the dark
 *    footer. This mark is FULL COLOUR (gold wordmark, orange scooter, black
 *    badge) and must not be recoloured. It is rendered as an image, not inlined.
 *  - The artwork is TRANSPARENT with a black KEYLINE — a contour hugging the
 *    wordmark and scooter. It is not a filled badge and carries no background
 *    of its own (12 paths, no rect). What that means in practice: on a light
 *    surface the keyline reads as the mark's edge, and on a dark one it drops
 *    into the ground so the gold and orange sit directly on the surface. Both
 *    are correct — verified on white, black and mid-grey. It is why the mark
 *    needs no light box behind it on the black header and the black footer.
 *  - The artwork already CONTAINS the wordmark, so nothing should render the
 *    word "Battwheelz" next to it — that would print the name twice. The
 *    accessible name is carried by the image's alt text instead.
 *
 * The favicon at `public/icon.svg` is a square crop of this same file (the
 * badge end plus the scooter glyph). If the logo is replaced, re-crop that too
 * rather than letting the two drift apart.
 */

import logoSrc from "./brand/battwheelz-logo.svg";

/** Native dimensions of the artwork, used to size it from a height alone. */
const NATIVE_WIDTH = 2150.86;
const NATIVE_HEIGHT = 607.156;

export const logo = {
  src: logoSrc,
  /** ~3.54:1. A wide horizontal lockup, not a square mark. */
  aspectRatio: NATIVE_WIDTH / NATIVE_HEIGHT,
  nativeWidth: NATIVE_WIDTH,
  nativeHeight: NATIVE_HEIGHT,
  /**
   * The artwork is the brand name, so its alt text is the brand name — not a
   * description of the picture. A screen reader should hear "Battwheelz", the
   * same thing a sighted reader sees.
   */
  alt: "Battwheelz",
};

export default logo;
