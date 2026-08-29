import Image from "next/image";
import { Section, SectionHeader, Stagger, StaggerItem } from "@/components/common";
import { partnerLogos } from "@/assets/logos";
import styles from "./PartnerChips.module.css";

/**
 * Partner names, as chips.
 *
 * A chip carries the partner's LOGO where the client has supplied the artwork
 * (see `@/assets/logos`) and the partner's NAME as text where they have not.
 * Content stays a flat list of names either way — the registry decides which
 * shape a given name gets, so adding artwork later is one import there and no
 * change here or in siteContent.js.
 *
 * Both shapes are laid out to the same chip height so a mixed row reads as one
 * row rather than two kinds of thing. See the notes in the stylesheet.
 *
 * Handles both content shapes so the two partner sections share one
 * implementation:
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

/** One row of chips — logo where we have one, name where we don't. */
function ChipList({ names, labelledBy }) {
  return (
    <Stagger as="ul" className={styles.list} stagger={0.04} aria-labelledby={labelledBy}>
      {names.map((name) => {
        const logo = partnerLogos[name];

        return (
          <StaggerItem
            as="li"
            key={name}
            className={[styles.chip, logo ? styles.logoChip : null].filter(Boolean).join(" ")}
          >
            {logo ? (
              /* The logo IS the name here, so its alt text carries it — the
                 chip holds no text of its own to fall back on. */
              <Image src={logo.src} alt={logo.alt} className={styles.logo} />
            ) : (
              name
            )}
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

export default PartnerChips;
