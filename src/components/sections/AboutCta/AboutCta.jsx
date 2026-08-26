import { about } from "@/content/siteContent";
import { Section, Eyebrow, Button, AnimatedReveal } from "@/components/common";
import styles from "./AboutCta.module.css";

const { cta } = about;

/** Closing CTA for the About page: narrow, centred, two audiences. */
export function AboutCta() {
  return (
    <Section
      id="work-with-us"
      className={styles.section}
      spacing="lg"
      ariaLabelledBy="about-cta-heading"
    >
      <AnimatedReveal className={styles.wrap}>
        <Eyebrow onDark>{cta.eyebrow}</Eyebrow>
        <h2 id="about-cta-heading" className={styles.heading}>
          {cta.heading}
        </h2>
        <p className={styles.body}>{cta.body}</p>
        <div className={styles.actions}>
          <Button href={cta.primaryCta.href} size="lg" withArrow>
            {cta.primaryCta.label}
          </Button>
          <Button href={cta.secondaryCta.href} size="lg" variant="ghostOnDark">
            {cta.secondaryCta.label}
          </Button>
        </div>
      </AnimatedReveal>
    </Section>
  );
}

export default AboutCta;
