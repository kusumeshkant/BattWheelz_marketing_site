import { Section, SectionHeader, Stagger, StaggerItem } from "@/components/common";
import styles from "./PartnerChips.module.css";

/**
 * Partner names, as TEXT CHIPS.
 *
 * ================= DELIBERATELY NOT LOGOS =================
 * Every name here belongs to a third party whose mark we do not have permission
 * to display. This component therefore takes no image, has no logo slot, and
 * cannot be pointed at one by passing different content — swapping to real
 * artwork is a code change, which is the point: it forces the permission
 * question to be answered per company first. See the note above
 * `home.deliveryPartners` in siteContent.js.
 * ==========================================================
 *
 * Handles both shapes so the two partner sections share one implementation:
 *  - `names`  — a flat list
 *  - `groups` — `{ label, names }`, rendered as labelled rows
 *
 * @param {object} props
 * @param {{eyebrow?:string, heading:string, subheading?:string, names?:string[], groups?:Array}} props.content
 * @param {string} props.id
 * @param {"page"|"raised"|"sunken"} [props.tone]
 */
export function PartnerChips({ content, id, tone = "page" }) {
  const headingId = `${id}-heading`;

  return (
    <Section id={id} tone={tone} ariaLabelledBy={headingId}>
      <SectionHeader
        eyebrow={content.eyebrow}
        heading={content.heading}
        subheading={content.subheading}
        headingId={headingId}
        align="center"
      />

      {content.names ? <ChipList names={content.names} /> : null}

      {content.groups
        ? content.groups.map((group) => (
            <div key={group.label} className={styles.group}>
              {/*
                h3, one level under the section's h2. The label names the list
                beneath it, so the list points back at it for its accessible name.
              */}
              <h3 id={`${id}-${slug(group.label)}`} className={styles.groupLabel}>
                {group.label}
              </h3>
              <ChipList names={group.names} labelledBy={`${id}-${slug(group.label)}`} />
            </div>
          ))
        : null}
    </Section>
  );
}

const slug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/** One row of name chips. */
function ChipList({ names, labelledBy }) {
  return (
    <Stagger as="ul" className={styles.list} stagger={0.04} aria-labelledby={labelledBy}>
      {names.map((name) => (
        <StaggerItem as="li" key={name} className={styles.chip}>
          {name}
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export default PartnerChips;
