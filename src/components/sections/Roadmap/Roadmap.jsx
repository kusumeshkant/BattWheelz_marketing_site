import { about } from "@/content/siteContent";
import { Section, SectionHeader, StepFlow } from "@/components/common";

const { roadmap } = about;

/**
 * "Where we are going".
 *
 * This slot holds a historical timeline on the reference layout. Battwheelz has
 * no multi-year history to recount, and inventing one would be fabricating the
 * company's past — so it is built as forward-looking GOALS instead, and the
 * copy says so plainly. Same visual weight, honest content.
 *
 * Uses the shared StepFlow, on the light ground.
 */
export function Roadmap() {
  return (
    <Section id="roadmap" ariaLabelledBy="roadmap-heading">
      <SectionHeader
        eyebrow={roadmap.eyebrow}
        heading={roadmap.heading}
        subheading={roadmap.subheading}
        headingId="roadmap-heading"
      />
      <StepFlow steps={roadmap.steps} tone="light" />
    </Section>
  );
}

export default Roadmap;
