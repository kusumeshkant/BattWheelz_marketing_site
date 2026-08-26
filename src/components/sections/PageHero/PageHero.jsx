import { Container, Eyebrow, Button, Stagger, StaggerItem } from "@/components/common";
import styles from "./PageHero.module.css";

/**
 * The opening band shared by every inner page.
 *
 * Owns the page's single `h1`. Entrance is triggered on mount rather than on
 * scroll — the band is already on screen, so an intersection-based reveal would
 * wait for an event that never fires.
 *
 * `headline` is an array of `{ text, highlight }` parts so which words carry the
 * brand gradient is content, not markup.
 *
 * @param {object} props
 * @param {{eyebrow?:string, headline:Array, subheadline?:string, primaryCta?:object, secondaryCta?:object}} props.content
 */
export function PageHero({ content }) {
  return (
    <section className={styles.hero} aria-labelledby="page-hero-heading">
      <Container>
        <Stagger className={styles.inner} trigger="mount" stagger={0.1}>
          {content.eyebrow ? (
            <StaggerItem>
              <Eyebrow>{content.eyebrow}</Eyebrow>
            </StaggerItem>
          ) : null}

          <StaggerItem as="h1" id="page-hero-heading" className={styles.headline}>
            {content.headline.map((part, index) => (
              // Fixed, ordered list from content — never reordered, so the
              // index is a stable key.
              <span key={index} className={part.highlight ? styles.highlight : undefined}>
                {part.text}
              </span>
            ))}
          </StaggerItem>

          {content.subheadline ? (
            <StaggerItem as="p" className={styles.subheadline}>
              {content.subheadline}
            </StaggerItem>
          ) : null}

          {content.primaryCta ? (
            <StaggerItem className={styles.actions}>
              <Button href={content.primaryCta.href} size="lg" withArrow>
                {content.primaryCta.label}
              </Button>
              {content.secondaryCta ? (
                <Button href={content.secondaryCta.href} size="lg" variant="secondary">
                  {content.secondaryCta.label}
                </Button>
              ) : null}
            </StaggerItem>
          ) : null}
        </Stagger>
      </Container>
    </section>
  );
}

export default PageHero;
