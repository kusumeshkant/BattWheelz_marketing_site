"use client";

import { useEffect, useState } from "react";
import { mediaQuery } from "@/theme";

/**
 * Subscribes to a CSS media query from JS.
 *
 * Only for behaviour that CSS cannot express on its own — closing the mobile
 * nav when the viewport grows past the desktop breakpoint, for instance.
 * Anything that is purely visual must stay in CSS.
 *
 * Returns `false` on the server and on the first client render, so markup
 * matches between the two and React never reports a hydration mismatch.
 *
 * @param {string} query A media query string. Prefer `mediaQuery.lg` etc.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    const update = (event) => setMatches(event.matches);

    setMatches(list.matches);
    list.addEventListener("change", update);

    return () => list.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** Convenience: true at the desktop breakpoint and above. */
export const useIsDesktop = () => useMediaQuery(mediaQuery.lg);

export default useMediaQuery;
