import { home } from "@/content/siteContent";
import { Section, SectionHeader, Card, Stagger, StaggerItem } from "@/components/common";
import { cardImages } from "@/assets/cardImages";
import styles from "./WhatsIncluded.module.css";

const { whatsIncluded } = home;

/**
 * "What's included" — the tangible contents of the subscription.
 *
 * Cards use the "media" layout — a band across the top, centred text beneath —
 * and each card is a single link rather than carrying a link inside it: one
 * target per card is easier to hit on a phone, and a screen reader is not made
 * to announce two links to the same destination.
 *
 * The band shows client-approved photography, looked up by card title in
 * `assets/cardImages`. `icon` is still passed: a title with no photo in the
 * registry falls back to its icon tile, so adding a seventh card degrades to
 * the old look instead of rendering an empty band.
 *
 * A server component. `Stagger`/`StaggerItem` are the only client parts, and
 * they wrap rather than replace the markup, so the full card text is in the
 * server-rendered HTML.
 */
export function WhatsIncluded() {
  return (
    <Section id="whats-included" tone="raised" ariaLabelledBy="whats-included-heading">
      <SectionHeader
        eyebrow={whatsIncluded.eyebrow}
        heading={whatsIncluded.heading}
        subheading={whatsIncluded.subheading}
        headingId="whats-included-heading"
      />

      <Stagger className={styles.grid} stagger={0.07}>
        {whatsIncluded.items.map((item) => (
          <StaggerItem key={item.title}>
            <Card
              icon={item.icon}
              image={cardImages[item.title]}
              title={item.title}
              body={item.body}
              href={item.href}
              layout="media"
              tone="default"
            />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

export default WhatsIncluded;
