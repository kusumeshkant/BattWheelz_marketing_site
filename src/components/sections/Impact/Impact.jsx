import { impactPage } from "@/content/pagesContent";
import { Icon } from "@/assets/icons";
import { Section, SectionHeader, Stagger, StaggerItem } from "@/components/common";
import styles from "./Impact.module.css";

const impact = impactPage;

/**
 * Impact: the environmental case, then the rider case.
 *
 * One section with two bands rather than two sections — they answer the same
 * question ("what does this change?") from two directions, and splitting them
 * would put a full section break between halves of one argument.
 *
 * The environmental band carries NO Battwheelz-specific emissions figure. See
 * the note on `impactPage.environmental` in pagesContent.js: the 40% statistic
 * is industry-wide and is phrased that way on purpose.
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

        {/*
          Figures provided directly by the client — real, not placeholders. See
          the note on `impactPage.environmental.stats`.
          `placeholder: true` on an item renders an em dash instead of a value,
          for any future metric that genuinely has no number yet.
        */}
        <ul className={styles.stats}>
          {environmental.stats.map((stat) => (
            <li key={stat.label} className={styles.stat}>
              <span className={styles.statIcon} aria-hidden="true">
                <Icon name={stat.icon} size={22} />
              </span>
              <span className={styles.statValue}>
                {stat.placeholder
                  ? "—"
                  : `${stat.prefix ?? ""}${stat.value.toLocaleString("en-IN")}${stat.suffix ?? ""}`}
              </span>
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={styles.statCaption}>{stat.caption}</span>
            </li>
          ))}
        </ul>
      </div>

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
