"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { brand, navigation } from "@/content/siteContent";
import { duration, easing } from "@/theme";
import { Container, Button, Logo } from "@/components/common";
import useScrollCondense from "@/hooks/useScrollCondense";
import useLockBodyScroll from "@/hooks/useLockBodyScroll";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import useReducedMotion from "@/hooks/useReducedMotion";
import clsx from "@/utils/clsx";
import NavGroup from "./NavGroup";
import styles from "./Header.module.css";

const drawerVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0 },
};

/** Trailing-slash tolerant, so `/about` and `/about/` both match. */
const normalise = (value) => (value !== "/" ? String(value).replace(/\/$/, "") : "/");

/**
 * Site header: sticky, condenses on scroll, grouped dropdowns on desktop and a
 * full-screen accordion drawer below the desktop breakpoint.
 *
 * Nav entries come from content and are one of two shapes — a link (`href`) or
 * a group (`items`). Adding a page to the menu is a content edit.
 *
 * A client component because it reacts to scroll, route and viewport. It is the
 * only client component in the page shell — the sections below it stay
 * server-rendered, so the HTML a crawler receives is complete.
 */
export function Header() {
  const pathname = usePathname();
  const condensed = useScrollCondense();
  const isDesktop = useIsDesktop();
  const prefersReducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const [openMobileGroup, setOpenMobileGroup] = useState(null);
  const drawerId = useId();
  const drawerRef = useRef(null);
  // The portal target only exists in the browser, so the drawer is not
  // rendered during the static prerender. Nothing is lost: it is closed then.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useLockBodyScroll(menuOpen);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeGroup = useCallback(() => setOpenGroup(null), []);

  // Growing past the breakpoint leaves the drawer orphaned behind the desktop
  // nav — close it rather than let an invisible overlay keep scroll locked.
  useEffect(() => {
    if (isDesktop) closeMenu();
    else closeGroup();
  }, [isDesktop, closeMenu, closeGroup]);

  // Navigating from inside any menu must dismiss it.
  useEffect(() => {
    closeMenu();
    closeGroup();
    setOpenMobileGroup(null);
  }, [pathname, closeMenu, closeGroup]);

  /*
   * Focus management for the drawer.
   *
   * Needed because the drawer is portalled to <body>: it is no longer a DOM
   * sibling of the toggle that opened it, so Tab would otherwise walk the whole
   * page before reaching it, and Shift+Tab out of it would land in the footer.
   * Focus moves in on open, cycles while open, and returns to the toggle on close.
   */
  useEffect(() => {
    if (!menuOpen) return undefined;

    const opener = document.activeElement;
    // Recomputed per keypress rather than captured once — the accordions add and
    // remove their sub-links while the drawer is open.
    const focusables = () =>
      Array.from(
        drawerRef.current?.querySelectorAll("a[href], button:not([disabled])") ?? []
      );

    focusables()[0]?.focus();

    const onKeyDown = (event) => {
      if (event.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      opener?.focus?.();
    };
  }, [menuOpen]);

  // Escape closes whichever menu is open, as any overlay must.
  useEffect(() => {
    if (!menuOpen && !openGroup) return undefined;
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      closeMenu();
      closeGroup();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, openGroup, closeMenu, closeGroup]);

  // A click anywhere outside the header closes an open dropdown.
  useEffect(() => {
    if (!openGroup) return undefined;
    const onPointerDown = (event) => {
      if (!event.target.closest?.(`.${styles.header}`)) closeGroup();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openGroup, closeGroup]);

  const isCurrent = (href) => normalise(pathname) === normalise(String(href).split("#")[0]);
  const groupIsCurrent = (group) => group.items.some((item) => isCurrent(item.href));

  return (
    <header className={clsx(styles.header, condensed && styles.condensed)}>
      <Container className={styles.inner}>
        <Logo height={condensed ? 26 : 32} />

        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList}>
            {navigation.primary.map((entry) =>
              entry.items ? (
                <NavGroup
                  key={entry.label}
                  group={entry}
                  isOpen={openGroup === entry.label}
                  isCurrent={groupIsCurrent(entry)}
                  onOpen={() => setOpenGroup(entry.label)}
                  onClose={closeGroup}
                  onToggle={() =>
                    setOpenGroup((current) => (current === entry.label ? null : entry.label))
                  }
                />
              ) : (
                <li key={entry.href} className={styles.navItem}>
                  <Link
                    href={entry.href}
                    className={clsx(styles.navLink, isCurrent(entry.href) && styles.navLinkActive)}
                    aria-current={isCurrent(entry.href) ? "page" : undefined}
                    onMouseEnter={closeGroup}
                  >
                    {entry.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button href={navigation.cta.href} size="sm" className={styles.desktopCta}>
            {navigation.cta.label}
          </Button>

          <button
            type="button"
            className={clsx(styles.toggle, menuOpen && styles.toggleOpen)}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls={drawerId}
            aria-label={menuOpen ? navigation.menuCloseLabel : navigation.menuOpenLabel}
          >
            <span className={styles.toggleBars} aria-hidden="true">
              <span className={styles.toggleBar} />
              <span className={styles.toggleBar} />
              <span className={styles.toggleBar} />
            </span>
          </button>
        </div>
      </Container>

      {/*
        Portalled to <body>. `backdrop-filter` on .header establishes a
        containing block for fixed-position descendants, so while the drawer
        lived inside the header its `inset` resolved against the 72px bar and it
        rendered as a ~104px strip instead of covering the viewport.
      */}
      {mounted
        ? createPortal(
            <AnimatePresence>
          {menuOpen ? (
            <motion.div
              id={drawerId}
              ref={drawerRef}
              className={styles.drawer}
              variants={drawerVariants}
              initial={prefersReducedMotion ? false : "hidden"}
              animate="visible"
              exit={prefersReducedMotion ? undefined : "hidden"}
              transition={{ duration: duration.fast, ease: easing.out }}
            >
              {/*
                Groups become accordions here rather than dropdowns. A hover panel
                has no meaning on a touch device, and a nested overlay inside an
                overlay is a back-button trap.
              */}
              <nav aria-label="Mobile">
                <ul className={styles.drawerList}>
                  {navigation.primary.map((entry) =>
                    entry.items ? (
                      <li key={entry.label}>
                        <button
                          type="button"
                          className={clsx(styles.drawerLink, styles.drawerGroupButton)}
                          aria-expanded={openMobileGroup === entry.label}
                          onClick={() =>
                            setOpenMobileGroup((current) =>
                              current === entry.label ? null : entry.label
                            )
                          }
                        >
                          {entry.label}
                          <span
                            className={clsx(
                              styles.drawerChevron,
                              openMobileGroup === entry.label && styles.drawerChevronOpen
                            )}
                            aria-hidden="true"
                          >
                            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                              <path
                                d="m5.5 8 4.5 4.5L14.5 8"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </button>

                        {openMobileGroup === entry.label ? (
                          <ul className={styles.drawerSubList}>
                            {entry.items.map((item) => (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  className={clsx(
                                    styles.drawerSubLink,
                                    isCurrent(item.href) && styles.drawerLinkActive
                                  )}
                                  aria-current={isCurrent(item.href) ? "page" : undefined}
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </li>
                    ) : (
                      <li key={entry.href}>
                        <Link
                          href={entry.href}
                          className={clsx(
                            styles.drawerLink,
                            isCurrent(entry.href) && styles.drawerLinkActive
                          )}
                          aria-current={isCurrent(entry.href) ? "page" : undefined}
                        >
                          {entry.label}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </nav>

              <div className={styles.drawerFooter}>
                <Button href={navigation.cta.href} size="lg" fullWidth withArrow>
                  {navigation.cta.label}
                </Button>
                <p className={styles.drawerContact}>
                  <a href={brand.contact.phoneHref}>{brand.contact.phoneDisplay}</a>
                </p>
              </div>
            </motion.div>
          ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </header>
  );
}

export default Header;
