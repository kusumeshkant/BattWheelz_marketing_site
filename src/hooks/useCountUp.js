"use client";

import { useEffect, useState } from "react";
import { animate } from "framer-motion";
import { duration as durationTokens, easing } from "@/theme";
import useReducedMotion from "./useReducedMotion";

/**
 * Counts from 0 up to `target` once `active` becomes true.
 *
 * Used by the stats band. Driven by Framer's `animate()` rather than a hand
 * rolled rAF loop so it shares the same frame scheduler as every other
 * animation on the page (one loop, not one per counter).
 *
 * Reduced motion returns the final value immediately — the information is the
 * number, not the count, so there is nothing to degrade.
 *
 * @param {number} target      Final value.
 * @param {boolean} active     Start the count (typically "scrolled into view").
 * @param {object} [options]
 * @param {number} [options.duration]  Seconds. Defaults to the `deliberate` token.
 * @param {number} [options.decimals]  Decimal places to render. Default 0.
 * @returns {number} The current value, already rounded for display.
 */
export function useCountUp(target, active, options = {}) {
  const { duration = durationTokens.deliberate, decimals = 0 } = options;
  const prefersReducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return undefined;

    if (prefersReducedMotion) {
      setValue(target);
      return undefined;
    }

    const factor = 10 ** decimals;
    const controls = animate(0, target, {
      duration,
      ease: easing.out,
      onUpdate: (latest) => setValue(Math.round(latest * factor) / factor),
    });

    // Cancel on unmount, and if `target` changes mid-flight.
    return () => controls.stop();
  }, [active, target, duration, decimals, prefersReducedMotion]);

  return value;
}

export default useCountUp;
