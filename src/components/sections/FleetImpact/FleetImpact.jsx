import { home } from "@/content/siteContent";
import { Section, SectionHeader, StatBand } from "@/components/common";
import styles from "./FleetImpact.module.css";

const { fleetImpact } = home;

/**
 * Fleet-wide impact figures. Same shared `StatBand` as the live-stats row, on
 * the light ground — so the two can never diverge in formatting or behaviour.
 *
 * The disclaimer is rendered, not merely written in a comment: these are
 * estimates, and an environmental claim presented as measured fact is a
 * regulatory problem in several markets.
 */
export function FleetImpact() {
  return (
    <Section id="impact" tone="raised" ariaLabelledBy="impact-heading">
      <SectionHeader
        eyebrow={fleetImpact.eyebrow}
        heading={fleetImpact.heading}
        subheading={fleetImpact.subheading}
        headingId="impact-heading"
      />
      <StatBand items={fleetImpact.items} tone="light" wideGap />
      <p className={styles.disclaimer}>{fleetImpact.disclaimer}</p>
    </Section>
  );
}

export default FleetImpact;
