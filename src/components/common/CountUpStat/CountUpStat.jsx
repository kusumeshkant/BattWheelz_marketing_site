"use client";

import useCountUp from "@/hooks/useCountUp";
import { formatStat } from "@/utils/format";

/**
 * One animated statistic. Shared by the live-stats band and the fleet-impact
 * band so the two can never diverge in behaviour or formatting.
 *
 * Two things worth knowing about the markup:
 *
 * 1. The animated number is `aria-hidden`, and the final value is repeated in a
 *    visually-hidden span. A screen reader announcing a number that changes
 *    sixty times a second is useless — and worse, a live-updating node can
 *    interrupt the reader mid-sentence. Assistive tech gets the answer; sighted
 *    users get the animation.
 *
 * 2. That hidden span also means the REAL figure is present in the server
 *    rendered HTML. The animated node starts at zero, so without it a crawler
 *    (or anyone with JS off) would read every stat on the page as "0".
 *
 * The hook must be called per-stat, which is why this is its own component
 * rather than a loop inside the parent — hooks cannot run in a map.
 *
 * @param {object} props
 * @param {number} props.value
 * @param {boolean} props.active   Start counting (parent supplies "in view").
 * @param {string} [props.prefix]
 * @param {string} [props.suffix]
 * @param {number} [props.decimals]
 * @param {string} props.srLabel   What this number MEANS, for the hidden text.
 */
export function CountUpStat({
  value,
  active,
  prefix = "",
  suffix = "",
  decimals = 0,
  srLabel,
  className,
}) {
  const current = useCountUp(value, active, { decimals });

  return (
    <>
      <span className={className} aria-hidden="true">
        {formatStat({ value: current, prefix, suffix, decimals })}
      </span>
      <span className="bw-visually-hidden">
        {formatStat({ value, prefix, suffix, decimals })}
        {srLabel ? ` ${srLabel}` : null}
      </span>
    </>
  );
}

export default CountUpStat;
