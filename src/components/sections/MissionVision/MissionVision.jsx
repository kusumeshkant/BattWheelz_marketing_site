import { about } from "@/content/pagesContent";
import { Icon } from "@/assets/icons";
import { Section, SectionHeader, Eyebrow, Stagger, StaggerItem } from "@/components/common";
import styles from "./MissionVision.module.css";

const { missionVision } = about;

/**
 * Mission and vision, as two statement cards.
 *
 * Not the shared `Card` primitive: these carry a gradient-highlighted heading
 * and a four-item feature row, neither of which Card does — and widening Card
 * to cover one section's layout would push a page-specific shape into a
 * primitive every other section depends on.
 *
 * What IS reused: the `{ text, highlight }` heading-parts convention from the
 * heroes, and the icon-chip treatment from the About hero's feature row.
 */
export function MissionVision() {
  return (
    <Section
      id="mission"
      tone="raised"
      ariaLabelledBy="mission-heading"
      className={styles.section}
    >
      <SectionHeader
        eyebrow={missionVision.eyebrow}
        heading={missionVision.heading}
        subheading={missionVision.subheading}
        headingId="mission-heading"
        align="center"
      />

      <Stagger className={styles.grid} stagger={0.12}>
        {missionVision.items.map((item) => (
          <StaggerItem key={item.label}>
            <article className={styles.card}>
              <span className={styles.icon} aria-hidden="true">
                <Icon name={item.icon} size={28} />
              </span>

              <Eyebrow>{item.label}</Eyebrow>

              {/*
                h3: SectionHeader above owns this section's h2, so the two
                statements sit one level under it.
              */}
              <h3 className={styles.heading}>
                {item.heading.map((part, index) => (
                  // Fixed, ordered list from content — never reordered, so the
                  // index is a stable key.
                  <span key={index} className={part.highlight ? styles.highlight : undefined}>
                    {part.text}
                  </span>
                ))}
              </h3>

              <p className={styles.body}>{item.body}</p>

              <ul className={styles.features}>
                {item.features.map((feature) => (
                  <li key={feature.label} className={styles.feature}>
                    <span className={styles.featureIcon} aria-hidden="true">
                      <Icon name={feature.icon} size={18} />
                    </span>
                    {feature.label}
                  </li>
                ))}
              </ul>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

export default MissionVision;
