"use client";

import { useRef } from "react";
import { useInView as useFramerInView } from "framer-motion";
import { viewportOnce } from "@/theme";

/**
 * "Is this element on screen yet?", with the site's shared viewport settings
 * baked in (fire once, when a quarter of the element is visible).
 *
 * Returns `[ref, inView]`. Built on IntersectionObserver via Framer, so it
 * never attaches a scroll listener and never reads layout on scroll — which is
 * the difference between a smooth page and a janky one.
 *
 * @param {object} [options] Overrides for the shared viewport config.
 */
export function useInView(options) {
  const ref = useRef(null);
  const inView = useFramerInView(ref, { ...viewportOnce, ...options });

  return [ref, inView];
}

export default useInView;
