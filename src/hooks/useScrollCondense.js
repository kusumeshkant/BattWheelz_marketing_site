"use client";

import { useEffect, useState } from "react";
import { HEADER_CONDENSE_OFFSET } from "@/utils/constants";

/**
 * True once the page has scrolled past `offset`. Drives the header's
 * shrink-on-scroll state.
 *
 * Deliberately reads only `window.scrollY` (a cheap, cached value) and never
 * measures an element, so it cannot cause layout thrash. Updates are coalesced
 * into a single animation frame, and state is only set when the boolean
 * actually flips — so a long scroll produces two renders, not two hundred.
 *
 * @param {number} [offset] Scroll distance in px before condensing.
 */
export function useScrollCondense(offset = HEADER_CONDENSE_OFFSET) {
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      // Functional update: React bails out of the re-render when unchanged.
      setCondensed(window.scrollY > offset);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(read);
    };

    read(); // Sync up on mount — the page may load already scrolled.
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [offset]);

  return condensed;
}

export default useScrollCondense;
