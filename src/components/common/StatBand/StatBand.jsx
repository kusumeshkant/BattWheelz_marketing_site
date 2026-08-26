"use client";

import { Icon } from "@/assets/icons";
import CountUpStat from "@/components/common/CountUpStat";
import useInView from "@/hooks/useInView";
import clsx from "@/utils/clsx";
import styles from "./StatBand.module.css";

/**
 * A row of count-up statistics. The single implementation — the home page's
 * live-stats band, its fleet-impact band and the About page's stats row are all
 * this component with different content and tone.
 *
 * ONE `useInView` for the whole row rather than one per figure, so every number
 * starts together; staggered counters read as a loading glitch rather than a
 * deliberate effect.
 *
 * Rendered as a `<dl>`: each stat genuinely is a term and its value, and the
 * list semantics tell a screen reader how many there are.
 *
 * @param {object} props
 * @param {Array<{value:number,label:string,caption?:string,icon?:string,prefix?:string,suffix?:string,decimals?:number}>} props.items
 * @param {"light"|"dark"} [props.tone]
 * @param {boolean} [props.dividers] Rules between columns (desktop only).
 * @param {boolean} [props.wideGap]
 */
export function StatBand({ items, tone = "light", dividers = false, wideGap = false, className }) {
  const [ref, inView] = useInView();

  return (
    <dl
      ref={ref}
      className={clsx(
        styles.grid,
        styles[`tone-${tone}`],
        dividers && styles.dividers,
        wideGap && styles.gapWide,
        className
      )}
    >
      {items.map((item) => (
        <div key={item.label} className={styles.item}>
          {/* Decorative: the label right beneath it already says what this is. */}
          {item.icon ? (
            <span className={styles.icon}>
              <Icon name={item.icon} size={26} />
            </span>
          ) : null}
          <dt className={styles.label}>{item.label}</dt>
          <dd className={styles.value}>
            <CountUpStat
              value={item.value}
              active={inView}
              prefix={item.prefix}
              suffix={item.suffix}
              decimals={item.decimals}
              srLabel={item.label}
            />
          </dd>
          {item.caption ? <dd className={styles.caption}>{item.caption}</dd> : null}
        </div>
      ))}
    </dl>
  );
}

export default StatBand;
