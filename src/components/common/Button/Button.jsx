"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { duration, easing } from "@/theme";
import useReducedMotion from "@/hooks/useReducedMotion";
import clsx from "@/utils/clsx";
import styles from "./Button.module.css";

const MotionLink = motion.create(Link);

/** Micro-interaction: a barely-there lift on hover, a definite press on tap. */
const interaction = {
  whileHover: { y: -2, scale: 1.015 },
  whileTap: { y: 0, scale: 0.98 },
  transition: { duration: duration.fast, ease: easing.spring },
};

/** Trailing chevron for CTAs that navigate. Decorative, hidden from AT. */
function ArrowIcon() {
  return (
    <span className={styles.icon} aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M3 8h9M8.5 4.5 12 8l-3.5 3.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * The only button on the site.
 *
 * Renders a `next/link` when given an `href` and a real `<button>` otherwise —
 * so a thing that navigates is always an anchor (right-click, middle-click,
 * "open in new tab" all work) and a thing that acts is always a button. Getting
 * this wrong is the single most common accessibility defect on marketing sites.
 *
 * @param {object} props
 * @param {string} [props.href]     Present => renders a link.
 * @param {"primary"|"secondary"|"ghostOnDark"|"link"} [props.variant]
 * @param {"sm"|"md"|"lg"} [props.size]
 * @param {boolean} [props.withArrow]  Show the trailing chevron.
 * @param {boolean} [props.fullWidth]
 */
export function Button({
  href,
  variant = "primary",
  size = "md",
  withArrow = false,
  fullWidth = false,
  className,
  children,
  ...rest
}) {
  const prefersReducedMotion = useReducedMotion();

  const classes = clsx(
    styles.button,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    fullWidth && styles.fullWidth,
    className
  );

  const content = (
    <>
      {children}
      {withArrow ? <ArrowIcon /> : null}
    </>
  );

  // Reduced motion keeps the CSS colour transitions (they convey state) but
  // drops the transform-based hover/tap play (it conveys nothing).
  const motionProps = prefersReducedMotion ? {} : interaction;

  if (href) {
    // External links get the security rel; internal ones use client routing.
    const isExternal = /^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");

    if (isExternal) {
      return (
        <motion.a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...motionProps}
          {...rest}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <MotionLink href={href} className={classes} {...motionProps} {...rest}>
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button type="button" className={classes} {...motionProps} {...rest}>
      {content}
    </motion.button>
  );
}

export default Button;
