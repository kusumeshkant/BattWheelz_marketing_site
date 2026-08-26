import Image from "next/image";
import { home } from "@/content/siteContent";
import { Section, Eyebrow, Button, AnimatedReveal } from "@/components/common";
import styles from "./ClosingCta.module.css";


/**
 * The last conversion push before the footer.
 *
 * Two CTAs on purpose, pointing at the two audiences the site serves: a rider
 * starting an application, and a fleet partner who needs a conversation. One
 * button would force the second group through a form built for the first.
 */
export function ClosingCta({ content = home.closingCta, id = "get-started" }) {
  const closingCta = content;
  return (
    <Section
      id={id}
      className={styles.section}
      spacing="lg"
      ariaLabelledBy={`${id}-heading`}
    >
      <AnimatedReveal className={styles.layout}>
        <div className={styles.copy}>
          <Eyebrow onDark>{closingCta.eyebrow}</Eyebrow>
          <h2 id={`${id}-heading`} className={styles.heading}>
            {closingCta.heading}
          </h2>
          <p className={styles.body}>{closingCta.body}</p>
          <div className={styles.actions}>
            <Button href={closingCta.primaryCta.href} size="lg" withArrow>
              {closingCta.primaryCta.label}
            </Button>
            {/* Optional: several pages have a single next step, and a lone
                ghost button beside nothing reads as a missing link. */}
            {closingCta.secondaryCta ? (
              <Button href={closingCta.secondaryCta.href} size="lg" variant="ghostOnDark">
                {closingCta.secondaryCta.label}
              </Button>
            ) : null}
          </div>
        </div>

        {closingCta.image ? (
          <div className={styles.media}>
            <Image
              src={closingCta.image.src}
              alt={closingCta.image.alt}
              className={styles.image}
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
          </div>
        ) : null}
      </AnimatedReveal>
    </Section>
  );
}

export default ClosingCta;
