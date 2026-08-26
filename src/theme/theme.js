/**
 * The single combined theme object.
 *
 * Anything that needs a design token in JS (a Framer Motion variant, a
 * matchMedia query) imports from here. Anything that needs one in CSS uses the
 * generated custom properties instead — see cssVariables.js. Both are produced
 * from these same source files, so JS and CSS can never drift apart.
 */

import colors, { palette } from "./colors";
import typography from "./typography";
import spacing, {
  sectionSpacing,
  radii,
  shadows,
  layout,
  breakpoints,
  mediaQuery,
  zIndex,
} from "./spacing";
import motionTokens, {
  duration,
  easing,
  revealVariants,
  fadeVariants,
  staggerContainer,
  viewportOnce,
} from "./motion";

export const theme = Object.freeze({
  colors,
  palette,
  typography,
  spacing,
  sectionSpacing,
  radii,
  shadows,
  layout,
  breakpoints,
  mediaQuery,
  zIndex,
  motion: motionTokens,
});

export {
  colors,
  palette,
  typography,
  spacing,
  sectionSpacing,
  radii,
  shadows,
  layout,
  breakpoints,
  mediaQuery,
  zIndex,
  duration,
  easing,
  revealVariants,
  fadeVariants,
  staggerContainer,
  viewportOnce,
};

export default theme;
