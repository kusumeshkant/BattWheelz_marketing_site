"use client";

import { useEffect, useState } from "react";
import useReducedMotion from "./useReducedMotion";

/** How often the reduced-motion branch refreshes. Slow enough to read as a
 *  value that changed, not as an animation. */
const REDUCED_MOTION_INTERVAL_MS = 4000;

/**
 * A counter derived from the clock: `ratePerSecond` multiplied by the time
 * elapsed since a fixed `epochMs`.
 *
 * Distinct from `useCountUp`, and not a variant of it. That hook TWEENS to a
 * known target and stops; this one has no target — it reads the clock every
 * frame and the value simply keeps rising. Which is also why it drives a plain
 * `requestAnimationFrame` loop rather than Framer's `animate()`: there is
 * nothing here to animate between.
 *
 * Being clock-derived rather than accumulated is what makes it robust. The loop
 * can miss any number of frames — a background tab, a scrolled-away section, a
 * sleeping laptop — and the next frame still shows exactly the right number,
 * because nothing is being summed up between frames.
 *
 * @param {number} ratePerSecond  How much the figure grows each second.
 * @param {number} epochMs        Fixed reference start, as a UTC timestamp.
 * @param {object} [options]
 * @param {boolean} [options.active]         Run the loop. Pass "on screen" to
 *        stop re-rendering a counter nobody is looking at.
 * @param {number} [options.prerenderNowMs]  The instant the first render uses,
 *        before the clock takes over. Must be a constant: the server and the
 *        hydrating client both render it, and they have to agree. Defaults to
 *        `epochMs`, i.e. zero.
 * @returns {number} The current value, unrounded — formatting is the caller's.
 */
export function useLiveCounter(ratePerSecond, epochMs, options = {}) {
  const { active = true, prerenderNowMs = epochMs } = options;
  const prefersReducedMotion = useReducedMotion();

  const [value, setValue] = useState(() => valueAt(ratePerSecond, epochMs, prerenderNowMs));

  useEffect(() => {
    if (!active) return undefined;

    const tick = () => setValue(valueAt(ratePerSecond, epochMs, Date.now()));

    // Jump straight to the live figure, so the fixed pre-render value is only
    // ever on screen for the frame before hydration finishes.
    tick();

    if (prefersReducedMotion) {
      const timer = setInterval(tick, REDUCED_MOTION_INTERVAL_MS);
      return () => clearInterval(timer);
    }

    let frame = requestAnimationFrame(function loop() {
      tick();
      frame = requestAnimationFrame(loop);
    });

    return () => cancelAnimationFrame(frame);
  }, [ratePerSecond, epochMs, active, prefersReducedMotion]);

  return value;
}

function valueAt(ratePerSecond, epochMs, nowMs) {
  return (ratePerSecond * (nowMs - epochMs)) / 1000;
}

export default useLiveCounter;
