"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { home } from "@/content/siteContent";
import { Icon } from "@/assets/icons";
import { duration, easing } from "@/theme";
import { Container, Button, Eyebrow, Stagger, StaggerItem } from "@/components/common";
import useReducedMotion from "@/hooks/useReducedMotion";
import styles from "./Hero.module.css";

const { hero } = home;

/** Small tick used by the assurance list. Decorative. */
function TickIcon() {
  return (
    <svg
      className={styles.assuranceTick}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m3.5 8.5 3 3 6-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Home hero.
 *
 * A client component because of the entrance choreography, but the h1, the
 * subheading and both CTAs are still rendered into the initial HTML by the
 * server — Framer only sets an inline transform on them. A crawler with
 * JavaScript disabled sees the full copy; the animation is decoration on top.
 *
 * LCP note: the hero image carries `priority`, which is the one image on the
 * site that must NOT be lazy-loaded. Everything below the fold is lazy by
 * default via next/image.
 */
export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  /**
   * Slow vertical drift on the artwork. Transform-only so it runs on the
   * compositor; dropped entirely under reduced motion, where an endlessly
   * moving element is exactly what the preference exists to prevent.
   */
  const floatProps = prefersReducedMotion
    ? {}
    : {
        animate: { y: [0, -14, 0] },
        transition: { duration: 7, ease: easing.inOut, repeat: Infinity },
      };

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <Container>
        <div className={styles.grid}>
          {/* Copy ------------------------------------------------------- */}
          <Stagger className={styles.copy} trigger="mount" stagger={0.12}>
            <StaggerItem>
              <Eyebrow onDark>{hero.eyebrow}</Eyebrow>
            </StaggerItem>

            <StaggerItem as="h1" id="hero-heading" className={styles.headline}>
              {hero.headline.map((part, index) => (
                <span
                  // Copy parts are a fixed, ordered list from siteContent — index
                  // is a stable key here because the list never reorders.
                  key={index}
                  className={part.highlight ? styles.highlight : undefined}
                >
                  {part.text}
                </span>
              ))}
            </StaggerItem>

            <StaggerItem className={styles.ctaRow}>
              <Button href={hero.primaryCta.href} size="lg" withArrow>
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} size="lg" variant="ghostOnDark">
                {hero.secondaryCta.label}
              </Button>
            </StaggerItem>

            <StaggerItem as="ul" className={styles.assurances}>
              {hero.assurances.map((assurance) => (
                <li key={assurance} className={styles.assurance}>
                  <TickIcon />
                  {assurance}
                </li>
              ))}
            </StaggerItem>

            <StaggerItem className={styles.scrollHint} aria-hidden="true">
              <span className={styles.scrollHintTrack} />
              {hero.scrollHint}
            </StaggerItem>
          </Stagger>

          {/* Artwork ---------------------------------------------------- */}
          <motion.div
            className={styles.media}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: duration.deliberate, ease: easing.out, delay: 0.15 }}
          >
            <motion.div className={styles.mediaFrame} {...floatProps}>
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                className={styles.image}
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
              />
              <div className={styles.badge}>
                <span className={styles.badgeValue}>{hero.badge.value}</span>
                <span className={styles.badgeLabel}>{hero.badge.label}</span>
                <span className={styles.badgeCaption}>{hero.badge.caption}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/*
          The pitch row sits BELOW the two-column grid, full width. Four icons
          inside the hero's ~36rem copy column would each get about 8rem — not
          enough for a title and a line of body. Full width gives them room and
          keeps the hero's own reading order intact.
        */}
        <Stagger className={styles.pitch} trigger="mount" stagger={0.08}>
          <StaggerItem as="h2" className={styles.pitchHeading}>
            {hero.pitch.heading}
          </StaggerItem>

          <StaggerItem as="ul" className={styles.pitchGrid}>
            {hero.pitch.items.map((item) => (
              <li key={item.title} className={styles.pitchItem}>
                <span className={styles.pitchIcon}>
                  <Icon name={item.icon} size={22} />
                </span>
                <span className={styles.pitchTitle}>{item.title}</span>
                <span className={styles.pitchBody}>{item.body}</span>
              </li>
            ))}
          </StaggerItem>
        </Stagger>
      </Container>
    </section>
  );
}

export default Hero;
