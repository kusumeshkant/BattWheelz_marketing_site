"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/**
 * Whether the visitor has asked the OS to reduce motion.
 *
 * Framer's own hook returns `null` until it has read the media query (i.e.
 * during SSR and the first client render). Every consumer here wants a plain
 * boolean, and the safe default while unknown is "animate normally" — so this
 * wrapper collapses `null` to `false` in exactly one place instead of thirty
 * `?? false` sprinkled across components.
 */
export function useReducedMotion() {
  return useFramerReducedMotion() ?? false;
}

export default useReducedMotion;
