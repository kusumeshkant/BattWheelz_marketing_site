"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { duration, easing } from "@/theme";
import useReducedMotion from "@/hooks/useReducedMotion";
import clsx from "@/utils/clsx";
import styles from "./Header.module.css";

/** Disclosure chevron. Decorative — `aria-expanded` carries the state. */
function Chevron({ open }) {
  return (
    <svg
      className={clsx(styles.groupChevron, open && styles.groupChevronOpen)}
      width="14"
      height="14"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m5.5 8 4.5 4.5L14.5 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * One desktop nav dropdown.
 *
 * Built as a DISCLOSURE, not an ARIA menu. The WAI-ARIA authoring practices are
 * explicit that a site-navigation dropdown should be a button that shows a plain
 * list of links: `role="menu"` puts a screen reader into application mode, where
 * arrow keys are expected to be the *only* way to move and links stop announcing
 * as links. A disclosure keeps Tab working the way people expect on a web page.
 *
 * Keyboard, as APG specifies for this pattern:
 *  - Enter / Space on the button toggles (native button behaviour, no handler)
 *  - Arrow Down / Up opens and moves focus into the list
 *  - Arrow keys cycle within the list; Home / End jump to the ends
 *  - Escape closes and returns focus to the button
 *  - Tab moves on naturally and closes the panel
 *
 * Hover opens it too, because that is what a pointer user expects of a desktop
 * nav — but hover is only ever an addition here, never the sole way in.
 */
export function NavGroup({ group, isOpen, onOpen, onClose, onToggle, isCurrent }) {
  const panelId = useId();
  const buttonRef = useRef(null);
  const panelRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Which item to focus once the panel has actually mounted. Set by the arrow
  // keys, consumed by the effect below — focusing straight after setState would
  // run before the panel exists in the DOM.
  const [pendingFocus, setPendingFocus] = useState(null);

  const links = () => Array.from(panelRef.current?.querySelectorAll("a") ?? []);

  const focusItem = (index) => {
    const items = links();
    if (!items.length) return;
    items[(index + items.length) % items.length].focus();
  };

  useEffect(() => {
    if (isOpen && pendingFocus !== null) {
      focusItem(pendingFocus);
      setPendingFocus(null);
    }
  }, [isOpen, pendingFocus]);

  const onButtonKeyDown = (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setPendingFocus(event.key === "ArrowDown" ? 0 : -1);
      onOpen();
    } else if (event.key === "Escape") {
      onClose();
    }
  };

  const onPanelKeyDown = (event) => {
    const items = links();
    const current = items.indexOf(document.activeElement);

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusItem(current + 1);
        break;
      case "ArrowUp":
        event.preventDefault();
        focusItem(current - 1);
        break;
      case "Home":
        event.preventDefault();
        focusItem(0);
        break;
      case "End":
        event.preventDefault();
        focusItem(-1);
        break;
      case "Escape":
        event.preventDefault();
        onClose();
        buttonRef.current?.focus();
        break;
      default:
        break;
    }
  };

  /** Tabbing past the last link should close the panel, not leave it hanging. */
  const onPanelBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) onClose();
  };

  return (
    <li
      className={styles.navItem}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        ref={buttonRef}
        type="button"
        className={clsx(styles.navLink, styles.groupButton, isCurrent && styles.navLinkActive)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={panelId}
        onClick={onToggle}
        onKeyDown={onButtonKeyDown}
      >
        {group.label}
        <Chevron open={isOpen} />
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.ul
            id={panelId}
            ref={panelRef}
            className={styles.groupPanel}
            onKeyDown={onPanelKeyDown}
            onBlur={onPanelBlur}
            initial={prefersReducedMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: duration.fast, ease: easing.out }}
          >
            {group.items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.groupLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </li>
  );
}

export default NavGroup;
