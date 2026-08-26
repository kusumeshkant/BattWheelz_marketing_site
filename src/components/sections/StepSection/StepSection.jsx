import { Section, SectionHeader, StepFlow } from "@/components/common";
import clsx from "@/utils/clsx";
import styles from "./StepSection.module.css";

/**
 * A section header plus the shared connected-step flow.
 *
 * Exists so the several pages that show a numbered sequence do not each repeat
 * the same header-plus-StepFlow wiring.
 *
 * Steps are normalised here because two content shapes feed it: the shared
 * `journeySteps` array uses `summary` (its `detail` is for the long-form How It
 * Works page), while page-specific step lists use `body`. Normalising at the
 * boundary keeps StepFlow itself unaware of either.
 *
 * @param {object} props
 * @param {{eyebrow?:string, heading:string, subheading?:string, steps:Array}} props.content
 * @param {string} props.id
 * @param {"light"|"dark"} [props.tone]
 */
export function StepSection({ content, id, tone = "dark" }) {
  const headingId = `${id}-heading`;
  const steps = content.steps.map((step) => ({
    id: step.id,
    title: step.title,
    body: step.body ?? step.summary,
  }));

  return (
    <Section
      id={id}
      className={clsx(tone === "dark" && styles.dark)}
      ariaLabelledBy={headingId}
    >
      <SectionHeader
        eyebrow={content.eyebrow}
        heading={content.heading}
        subheading={content.subheading}
        headingId={headingId}
      />
      <StepFlow steps={steps} tone={tone} />
    </Section>
  );
}

export default StepSection;
