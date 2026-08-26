import { about } from "@/content/siteContent";
import { Section, SectionHeader, Card, Stagger, StaggerItem } from "@/components/common";
import styles from "./MissionVision.module.css";

const { missionVision } = about;

/** Mission and vision, as a two-card split. Reuses the shared Card primitive. */
export function MissionVision() {
  return (
    <Section id="mission" tone="raised" ariaLabelledBy="mission-heading">
      <SectionHeader
        heading={missionVision.heading}
        subheading={missionVision.subheading}
        headingId="mission-heading"
        align="center"
      />

      <Stagger className={styles.grid} stagger={0.1}>
        {missionVision.items.map((item) => (
          <StaggerItem key={item.title}>
            <Card icon={item.icon} title={item.title} body={item.body} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

export default MissionVision;
