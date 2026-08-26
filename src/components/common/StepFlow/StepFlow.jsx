import { Icon } from "@/assets/icons";
import { Stagger, StaggerItem } from "@/components/common/AnimatedReveal";
import clsx from "@/utils/clsx";
import styles from "./StepFlow.module.css";

/**
 * A numbered, connected step sequence. Vertical on mobile, horizontal from
 * 900px, with the connector drawn per-step so it follows the axis change
 * without any re-measuring.
 *
 * Shared by the home page's "how to get started" flow and the About page's
 * roadmap — one implementation, two tones.
 *
 * Rendered as an ordered list, because the steps genuinely are ordered: a
 * screen reader should say "list of 4 items, item 2" rather than leaving the
 * sequence implied by a visual connector it cannot see. The numerals in the
 * markers therefore duplicate the list semantics and are hidden from assistive
 * tech.
 *
 * @param {object} props
 * @param {Array<{id:string,title:string,body:string,icon?:string,stat?:object}>} props.steps
 * @param {"light"|"dark"} [props.tone]
 * @param {number} [props.headingLevel]
 */
export function StepFlow({ steps, tone = "dark", headingLevel = 3, className }) {
  const Heading = `h${headingLevel}`;

  return (
    <Stagger
      as="ol"
      className={clsx(styles.steps, styles[`tone-${tone}`], className)}
      stagger={0.12}
    >
      {steps.map((step, index) => (
        <StaggerItem as="li" key={step.id} className={styles.step}>
          <span className={styles.marker} aria-hidden="true">
            {index + 1}
          </span>
          <div className={styles.body}>
            {/* Both optional — the home page's flow passes neither. */}
            {step.icon ? (
              <span className={styles.stepIcon} aria-hidden="true">
                <Icon name={step.icon} size={22} />
              </span>
            ) : null}

            <Heading className={styles.title}>{step.title}</Heading>
            <p>{step.body}</p>

            {step.stat ? (
              <p className={styles.stat}>
                <span className={styles.statIcon} aria-hidden="true">
                  <Icon name={step.stat.icon} size={16} />
                </span>
                <strong className={styles.statValue}>{step.stat.value}</strong>
                <span className={styles.statCaption}>{step.stat.caption}</span>
              </p>
            ) : null}
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export default StepFlow;
