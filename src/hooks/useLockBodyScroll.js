"use client";

import { useEffect } from "react";

/**
 * Freezes background scrolling while `locked` is true — for the mobile nav
 * overlay.
 *
 * Compensates for the disappearing scrollbar by padding the body, so locking
 * does not shift the page sideways on desktop browsers that reserve gutter
 * space. Restores whatever was there before rather than assuming empty values.
 */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined;

    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [locked]);
}

export default useLockBodyScroll;
