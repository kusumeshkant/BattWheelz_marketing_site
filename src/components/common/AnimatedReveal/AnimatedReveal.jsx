"use client";

import { motion } from "framer-motion";
import { revealVariants, fadeVariants, staggerContainer, viewportOnce } from "@/theme";
import useReducedMotion from "@/hooks/useReducedMotion";

const VARIANTS = {
  rise: revealVariants,
  fade: fadeVariants,
};

/**
 * Internal. Renders `as` either as a Framer motion element with the supplied
 * animation props, or — when the visitor has asked for reduced motion — as the
 * plain element with no animation props at all.
 *
 * This exists so the reduced-motion branch is written once. Every animated
 * wrapper below is a thin call into it, which means a component can never be
 * added that animates but forgets to honour the preference.
 */
function Motionable({ as = "div", motionProps, className, children, ...rest }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    const Static = as;
    return (
      <Static className={className} {...rest}>
        {children}
      </Static>
    );
  }

  const Animated = motion[as] ?? motion.div;
  return (
    <Animated className={className} {...motionProps} {...rest}>
      {children}
    </Animated>
  );
}

/**
 * Two ways to start an animation:
 *  - `inView` (default) — for everything below the fold.
 *  - `mount`            — for above-the-fold content like the hero, which is
 *                         already on screen and would otherwise wait for an
 *                         intersection event that never fires.
 */
function triggerProps(trigger) {
  return trigger === "mount"
    ? { initial: "hidden", animate: "visible" }
    : { initial: "hidden", whileInView: "visible", viewport: viewportOnce };
}

/**
 * The site's reveal animation. THE reveal — there is no other.
 *
 * Every fade-in and slide-up on the site goes through this component or the
 * `Stagger` pair below, so "the reveals feel too slow" is a one-line change in
 * theme/motion.js rather than a hunt through twenty sections.
 *
 * Animates transform and opacity only — both compositor properties, so a reveal
 * never triggers layout or paint.
 *
 * @param {object} props
 * @param {"rise"|"fade"} [props.variant]
 * @param {"inView"|"mount"} [props.trigger]
 * @param {number} [props.delay]         Seconds before this element reveals.
 * @param {React.ElementType} [props.as] Element to render. Keep it semantic.
 */
export function AnimatedReveal({
  as = "div",
  variant = "rise",
  trigger = "inView",
  delay = 0,
  ...rest
}) {
  return (
    <Motionable
      as={as}
      motionProps={{
        variants: VARIANTS[variant],
        custom: delay,
        ...triggerProps(trigger),
      }}
      {...rest}
    />
  );
}

/**
 * Reveals its children in sequence.
 *
 * The stagger is orchestrated here, so children are plain `<StaggerItem>`s that
 * know nothing about their own index — which is what stops per-section
 * `delay={index * 0.1}` arithmetic from spreading everywhere.
 */
export function Stagger({ as = "div", stagger = 0.1, trigger = "inView", ...rest }) {
  return (
    <Motionable
      as={as}
      motionProps={{
        variants: staggerContainer,
        custom: stagger,
        ...triggerProps(trigger),
      }}
      {...rest}
    />
  );
}

/** One item inside a `<Stagger>`. Inherits its timing from the parent. */
export function StaggerItem({ as = "div", variant = "rise", ...rest }) {
  return <Motionable as={as} motionProps={{ variants: VARIANTS[variant] }} {...rest} />;
}

export default AnimatedReveal;
