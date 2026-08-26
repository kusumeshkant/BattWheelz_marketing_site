import Link from "next/link";
import { about } from "@/content/pagesContent";
import { Section, SectionHeader, Card, Stagger, StaggerItem } from "@/components/common";
import styles from "./Ecosystem.module.css";

const { ecosystem } = about;

/**
 * The four parts of the EMAAS ecosystem: vehicles, operations, infrastructure
 * and the partners riding on top of it.
 *
 * The partners card names no companies deliberately.
 */
export function Ecosystem() {
  return (
    <Section id="ecosystem" ariaLabelledBy="ecosystem-heading">
      <SectionHeader
        eyebrow={ecosystem.eyebrow}
        heading={ecosystem.heading}
        subheading={ecosystem.subheading}
        headingId="ecosystem-heading"
      />

      <Stagger className={styles.grid} stagger={0.07}>
        {ecosystem.items.map((item) => (
          <StaggerItem key={item.title}>
            <Card icon={item.icon} title={item.title} body={item.body} tone="raised">
              <Link className={styles.cardLink} href={item.cta.href}>
                {item.cta.label}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

export default Ecosystem;
