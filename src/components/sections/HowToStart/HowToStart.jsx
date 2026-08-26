import { home } from "@/content/siteContent";
import { Section, SectionHeader, Button, StepFlow } from "@/components/common";
import styles from "./HowToStart.module.css";

const { howToStart } = home;

/**
 * The onboarding sequence on the home page.
 *
 * The connected-step layout lives in the shared `StepFlow` primitive; this
 * supplies the content, the dark ground and the CTA.
 *
 * Steps come from the shared `journeySteps` array, so this and the full How It
 * Works page always describe the same process. `summary` is the condensed line;
 * StepFlow takes a generic `body`.
 */
export function HowToStart() {
  const steps = howToStart.steps.map((step) => ({
    id: step.id,
    title: step.title,
    body: step.summary,
  }));

  return (
    <Section
      id="how-to-start"
      className={styles.section}
      ariaLabelledBy="how-to-start-heading"
    >
      <SectionHeader
        eyebrow={howToStart.eyebrow}
        heading={howToStart.heading}
        subheading={howToStart.subheading}
        headingId="how-to-start-heading"
      />

      <StepFlow steps={steps} tone="dark" />

      <div className={styles.actions}>
        <Button href={howToStart.cta.href} variant="ghostOnDark" withArrow>
          {howToStart.cta.label}
        </Button>
      </div>
    </Section>
  );
}

export default HowToStart;
