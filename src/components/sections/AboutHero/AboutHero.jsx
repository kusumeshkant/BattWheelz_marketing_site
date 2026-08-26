import { about } from "@/content/siteContent";
import { Icon } from "@/assets/icons";
import { Container, Button, Stagger, StaggerItem } from "@/components/common";
import styles from "./AboutHero.module.css";

const { hero } = about;

/**
 * About page hero. Single column on the light ground: headline, a four-item
 * feature row, then the actions. No artwork — the feature row carries the
 * introduction that the prose paragraph and the fleet illustration used to.
 *
 * Entrance is triggered on mount rather than on scroll — the section is already
 * on screen, so an intersection-based reveal would wait for an event that never
 * fires.
 */
export function AboutHero() {
  return (
    <section className={styles.hero} aria-labelledby="about-hero-heading">
      <Container>
        <Stagger className={styles.copy} trigger="mount" stagger={0.12}>
          <StaggerItem as="h1" id="about-hero-heading" className={styles.headline}>
            {hero.headline.map((part, index) => (
              <span
                // Fixed, ordered list from content — the list never reorders,
                // so the index is a stable key.
                key={index}
                className={part.highlight ? styles.highlight : undefined}
              >
                {part.text}
              </span>
            ))}
          </StaggerItem>

          <StaggerItem as="ul" className={styles.features}>
            {hero.features.map((feature) => (
              <li key={feature.title} className={styles.feature}>
                <span className={styles.featureIcon} aria-hidden="true">
                  <Icon name={feature.icon} size={24} />
                </span>
                {/*
                  h2, not a styled div: these are the section's real subheadings
                  and the page's outline should say so. SectionHeader elsewhere
                  defaults to the same level, so the one-h1-per-page rule holds.
                */}
                <h2 className={styles.featureTitle}>{feature.title}</h2>
                <p className={styles.featureBody}>{feature.body}</p>
              </li>
            ))}
          </StaggerItem>

          <StaggerItem className={styles.actions}>
            <Button href={hero.primaryCta.href} size="lg" withArrow>
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} size="lg" variant="secondary">
              {hero.secondaryCta.label}
            </Button>
          </StaggerItem>
        </Stagger>
      </Container>
    </section>
  );
}

export default AboutHero;
