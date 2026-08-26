import { Section, SectionHeader, Card, Stagger, StaggerItem } from "@/components/common";
import clsx from "@/utils/clsx";
import styles from "./FeatureGrid.module.css";

/**
 * A heading plus a grid of icon cards. The workhorse section — most inner pages
 * are two or three of these plus a hero.
 *
 * Content-driven so a new page is a content edit, not a new component: pass the
 * block from siteContent and it renders. Card layout and tone are props rather
 * than forks of this file.
 *
 * @param {object} props
 * @param {{eyebrow?:string, heading:string, subheading?:string, items:Array}} props.content
 * @param {string} props.id            Anchor + aria-labelledby target.
 * @param {2|3|4} [props.columns]
 * @param {"default"|"media"} [props.cardLayout]
 * @param {"page"|"raised"|"sunken"} [props.tone]
 * @param {"default"|"raised"} [props.cardTone]
 * @param {"start"|"center"} [props.align]
 */
export function FeatureGrid({
  content,
  id,
  columns = 3,
  cardLayout = "default",
  tone = "page",
  cardTone = "default",
  align = "start",
}) {
  const headingId = `${id}-heading`;

  return (
    <Section id={id} tone={tone} ariaLabelledBy={headingId}>
      <SectionHeader
        eyebrow={content.eyebrow}
        heading={content.heading}
        subheading={content.subheading}
        headingId={headingId}
        align={align}
      />

      <Stagger className={clsx(styles.grid, styles[`cols-${columns}`])} stagger={0.07}>
        {content.items.map((item) => (
          <StaggerItem key={item.title}>
            <Card
              icon={item.icon}
              title={item.title}
              body={item.body}
              href={item.href}
              layout={cardLayout}
              tone={cardTone}
            />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

export default FeatureGrid;
