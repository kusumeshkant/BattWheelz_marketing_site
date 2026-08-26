import clsx from "@/utils/clsx";
import Container from "@/components/common/Container";
import Eyebrow from "@/components/common/Eyebrow";
import AnimatedReveal from "@/components/common/AnimatedReveal";
import styles from "./Section.module.css";

/**
 * A page section: semantic `<section>`, vertical rhythm, background tone, and
 * a Container inside it.
 *
 * Every band on every page goes through this, which is why the page never
 * develops one-off `padding: 72px` values and why the light/dark alternation
 * stays consistent.
 *
 * @param {object} props
 * @param {string} [props.id]        Anchor target. Required if anything links to it.
 * @param {"page"|"raised"|"sunken"|"inverse"|"gradient"} [props.tone]
 * @param {"sm"|"md"|"lg"|"none"} [props.spacing]
 * @param {"default"|"narrow"|"wide"} [props.containerWidth]
 * @param {string} [props.ariaLabelledBy] Id of this section's heading — gives
 *        the landmark an accessible name in a screen reader's landmark list.
 */
export function Section({
  id,
  tone = "page",
  spacing = "md",
  containerWidth = "default",
  ariaLabelledBy,
  className,
  children,
  ...rest
}) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={clsx(
        styles.section,
        styles[`tone-${tone}`],
        styles[`spacing-${spacing}`],
        className
      )}
      {...rest}
    >
      <Container width={containerWidth}>{children}</Container>
    </section>
  );
}

/**
 * The eyebrow / heading / subheading trio that opens most sections.
 *
 * Extracted because it appeared identically in six places, and because it is
 * where the heading-level discipline lives: sections default to `h2`, so the
 * document keeps exactly one `h1` per page without each section having to think
 * about it.
 */
export function SectionHeader({
  eyebrow,
  heading,
  subheading,
  headingId,
  headingLevel = 2,
  align = "start",
  className,
}) {
  const Heading = `h${headingLevel}`;

  return (
    <AnimatedReveal
      className={clsx(styles.header, align === "center" && styles.headerCentered, className)}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading id={headingId} className={styles.heading}>
        {heading}
      </Heading>
      {subheading ? <p className={styles.subheading}>{subheading}</p> : null}
    </AnimatedReveal>
  );
}

export default Section;
