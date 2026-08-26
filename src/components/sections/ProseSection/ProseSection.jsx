import { Section, SectionHeader, Button, AnimatedReveal } from "@/components/common";
import clsx from "@/utils/clsx";
import styles from "./ProseSection.module.css";

/**
 * A heading, some paragraphs, an optional bullet list and an optional CTA.
 *
 * Deliberately plain: it carries the qualitative parts of a page — eligibility,
 * how a model works, a mission statement — where a card grid would impose
 * structure the copy does not have.
 *
 * @param {object} props
 * @param {{eyebrow?:string, heading:string, subheading?:string, body?:string[], list?:string[], cta?:object}} props.content
 * @param {string} props.id
 * @param {"page"|"raised"|"sunken"} [props.tone]
 * @param {boolean} [props.centered]
 */
export function ProseSection({ content, id, tone = "page", centered = false }) {
  const headingId = `${id}-heading`;

  return (
    <Section id={id} tone={tone} ariaLabelledBy={headingId}>
      <AnimatedReveal className={clsx(styles.wrap, centered && styles.centered)}>
        <SectionHeader
          eyebrow={content.eyebrow}
          heading={content.heading}
          subheading={content.subheading}
          headingId={headingId}
          align={centered ? "center" : "start"}
        />

        {content.body?.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className={styles.body}>
            {paragraph}
          </p>
        ))}

        {content.list ? (
          <ul className={styles.list}>
            {content.list.map((entry) => (
              <li key={entry.slice(0, 32)} className={styles.item}>
                {entry}
              </li>
            ))}
          </ul>
        ) : null}

        {content.cta ? (
          <div className={styles.actions}>
            <Button href={content.cta.href} withArrow>
              {content.cta.label}
            </Button>
          </div>
        ) : null}
      </AnimatedReveal>
    </Section>
  );
}

export default ProseSection;
