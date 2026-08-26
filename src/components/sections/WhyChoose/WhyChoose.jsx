import { home } from "@/content/siteContent";
import { Section, SectionHeader, Card, Stagger, StaggerItem } from "@/components/common";
import styles from "./WhyChoose.module.css";

const { whyChoose } = home;

/**
 * "Why Battwheelz" — the operating advantages.
 *
 * Structurally identical to WhatsIncluded and deliberately not merged with it:
 * the two answer different questions ("what do I get" vs "why is yours
 * better"), sit either side of the stats band, and will diverge in layout as
 * the design matures. What IS shared — the card itself and the grid behaviour —
 * lives in the Card primitive.
 */
export function WhyChoose() {
  return (
    <Section id="why-battwheelz" ariaLabelledBy="why-battwheelz-heading">
      <SectionHeader
        eyebrow={whyChoose.eyebrow}
        heading={whyChoose.heading}
        subheading={whyChoose.subheading}
        headingId="why-battwheelz-heading"
      />

      <Stagger className={styles.grid} stagger={0.08}>
        {whyChoose.items.map((item) => (
          <StaggerItem key={item.title}>
            <Card icon={item.icon} title={item.title} body={item.body} tone="raised" />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

export default WhyChoose;
