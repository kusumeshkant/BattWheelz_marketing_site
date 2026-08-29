import { impactPage } from "@/content/pagesContent";
import { Icon } from "@/assets/icons";
import { Section, SectionHeader, Stagger, StaggerItem } from "@/components/common";
import LiveTracker from "@/components/sections/LiveTracker";
import styles from "./Impact.module.css";

const impact = impactPage;

/**
 * Impact: the environmental case, then the rider case.
 *
 * One section with two bands rather than two sections — they answer the same
 * question ("what does this change?") from two directions, and splitting them
 * would put a full section break between halves of one argument.
 *
 * The environmental band's prose carries no Battwheelz-specific emissions
 * figure — the 40% statistic is industry-wide and is phrased that way on
 * purpose. The numbers beneath it come from `LiveTracker`, which derives and
 * labels them. See the note on `impactPage.environmental` in pagesContent.js.
 */
export function Impact() {
  const { environmental, riders } = impact;

  return (
    <Section id="impact" tone="raised" ariaLabelledBy="impact-heading">
      <div className={styles.environmental}>
        <SectionHeader
          eyebrow={environmental.eyebrow}
          heading={environmental.heading}
          headingId="impact-heading"
          align="center"
        />
        <p className={styles.body}>{environmental.body}</p>
      </div>

      {/*
        Outside the 46rem prose column on purpose. The copy above wants a
        readable measure; four live counters, each several digits wide, want the
        full container — inside the narrow column the rupee figure has about
        180px of track and wraps.
      */}
      <LiveTracker content={environmental.tracker} />

      <div className={styles.riders}>
        <SectionHeader
          eyebrow={riders.eyebrow}
          heading={riders.heading}
          subheading={riders.subheading}
          headingId="impact-riders-heading"
          headingLevel={3}
          align="center"
        />

        <Stagger as="ul" className={styles.grid} stagger={0.05}>
          {riders.items.map((item) => (
            <StaggerItem as="li" key={item.label} className={styles.item}>
              <span className={styles.icon} aria-hidden="true">
                <Icon name={item.icon} size={24} />
              </span>
              {item.label}
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}

export default Impact;
