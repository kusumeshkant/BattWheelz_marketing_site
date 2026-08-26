import { about } from "@/content/pagesContent";
import { Icon } from "@/assets/icons";
import { Section, SectionHeader, StepFlow, AnimatedReveal } from "@/components/common";
import styles from "./Roadmap.module.css";

const { roadmap } = about;

/** Renders a `{ text, highlight }` parts array — the heroes' convention. */
function Parts({ parts }) {
  return parts.map((part, index) => (
    // Fixed, ordered list from content — never reordered, so the index is a
    // stable key.
    <span key={index} className={part.highlight ? styles.highlight : undefined}>
      {part.text}
    </span>
  ));
}

/**
 * "Where Battwheelz is headed".
 *
 * Forward-looking goals rather than a historical timeline — the company has no
 * multi-year past to recount. See the PLACEHOLDER note on the FY27 figures in
 * siteContent.js; they are targets supplied with the copy, not verified numbers.
 *
 * Uses the shared StepFlow, which gained optional per-step icons and stat chips
 * for this section; the home page's flow passes neither and is unchanged.
 */
export function Roadmap() {
  return (
    <Section id="roadmap" ariaLabelledBy="roadmap-heading">
      <SectionHeader
        eyebrow={roadmap.eyebrow}
        heading={<Parts parts={roadmap.heading} />}
        subheading={roadmap.subheading}
        headingId="roadmap-heading"
      />

      <StepFlow steps={roadmap.steps} tone="light" />

      <AnimatedReveal className={styles.banner}>
        <span className={styles.bannerIcon} aria-hidden="true">
          <Icon name={roadmap.banner.icon} size={24} />
        </span>
        <p className={styles.bannerText}>
          <Parts parts={roadmap.banner.text} />
        </p>
      </AnimatedReveal>
    </Section>
  );
}

export default Roadmap;
