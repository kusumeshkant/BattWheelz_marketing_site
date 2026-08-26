/**
 * Motion tokens. Durations, easings and the shared Framer Motion variants.
 *
 * Centralised for the same reason colours are: "make the reveals slower" should
 * be one edit, not thirty. Every animated component in /components pulls its
 * variants from here rather than declaring its own inline objects.
 */

export const duration = {
  instant: 0.12,
  fast: 0.22,
  base: 0.4,
  slow: 0.65,
  deliberate: 0.9,
};

export const easing = {
  /** Default out-ease — decelerating, feels like something arriving. */
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
  /** Slight overshoot, for micro-interactions only (buttons, chips). */
  spring: [0.34, 1.56, 0.64, 1],
};

/** Distance a revealing element travels. Small on purpose — big slides feel cheap. */
export const revealDistance = 24;

/**
 * Shared variants. `custom` carries the per-item delay so a parent can stagger
 * children without every child hardcoding its own index maths.
 */
export const revealVariants = {
  hidden: { opacity: 0, y: revealDistance },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.out, delay },
  }),
};

export const fadeVariants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: duration.base, ease: easing.out, delay },
  }),
};

export const staggerContainer = {
  hidden: {},
  visible: (stagger = 0.1) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  }),
};

/** Applied to every scroll reveal — reveal once, and only when it's meaningfully on screen. */
export const viewportOnce = { once: true, amount: 0.25, margin: "0px 0px -10% 0px" };

export const motionTokens = { duration, easing, revealDistance, viewportOnce };

export default motionTokens;
