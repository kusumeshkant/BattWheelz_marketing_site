"use client";

import { Icon } from "@/assets/icons";
import useInView from "@/hooks/useInView";
import useLiveCounter from "@/hooks/useLiveCounter";
import { formatNumber } from "@/utils/format";
import {
  PRERENDER_REFERENCE_MS,
  PROJECTION_EPOCH_MS,
  ratesPerSecond,
} from "@/utils/sustainability";
import styles from "./LiveTracker.module.css";

/**
 * The four metrics, in display order.
 *
 * Rate and precision live here; the words live in content. Splitting them that
 * way keeps `pagesContent.js` free of arithmetic and keeps this file free of
 * copy — `key` is the join, and both sides use the same four.
 *
 * PRECISION is chosen per metric so each counter visibly moves without claiming
 * precision it does not have. Distance and rupees move several units a second
 * at whole numbers; litres and tonnes are far slower, so they carry decimals
 * rather than sitting apparently frozen. Nothing here goes finer than the
 * underlying assumption would support.
 */
const METRICS = [
  { key: "distance", icon: "bolt", rate: ratesPerSecond.km, suffix: " km", decimals: 0 },
  { key: "petrol", icon: "plug", rate: ratesPerSecond.litres, suffix: " L", decimals: 1 },
  { key: "co2", icon: "shield", rate: ratesPerSecond.co2Tonnes, suffix: " t", decimals: 3 },
  { key: "cost", icon: "rupee", rate: ratesPerSecond.rupees, prefix: "₹", decimals: 0 },
];

/**
 * The live sustainability tracker on the Impact page.
 *
 * Replaces the static 48M km / Rs 9.2Cr / 7,400t row that used to sit here. The
 * figures are a PROJECTION from fleet averages — this site has no backend and
 * reads no vehicle data — so the row carries a caption saying so, and is styled
 * as a stat row rather than as an instrument panel. See `utils/sustainability.js`.
 *
 * ONE `useInView` for the whole row, matching `StatBand`: every counter starts
 * and stops together, and a row that is scrolled away stops re-rendering
 * entirely.
 *
 * All three viewport options are overridden, because the shared `viewportOnce`
 * config is tuned for reveal animations and this is not one. `once: false` — it
 * is a gate on "is anyone looking", not a one-shot trigger. `amount: 0` and
 * `margin: "0px"` — a reveal should wait until an element is meaningfully on
 * screen, but a counter that is visible at all must already be ticking, or a
 * visitor scrolling slowly watches a frozen number.
 *
 * @param {object} props
 * @param {{caption: string, metrics: Record<string, {label: string, caption: string}>}} props.content
 */
export function LiveTracker({ content }) {
  const [ref, inView] = useInView({ once: false, amount: 0, margin: "0px" });

  return (
    <div className={styles.tracker}>
      <ul ref={ref} className={styles.stats}>
        {METRICS.map((metric) => (
          <LiveStat key={metric.key} metric={metric} copy={content.metrics[metric.key]} active={inView} />
        ))}
      </ul>
      <p className={styles.caption}>
        <span className={styles.pulse} aria-hidden="true" />
        {content.caption}
      </p>
    </div>
  );
}

/**
 * One live figure. Its own component because `useLiveCounter` has to be called
 * per metric and a hook cannot run inside a map — the same reason `CountUpStat`
 * exists next to `StatBand`.
 *
 * The ticking number is `aria-hidden` with the figure repeated in a
 * visually-hidden span, exactly as `CountUpStat` does it: a node that changes
 * sixty times a second would interrupt a screen reader mid-sentence, and the
 * hidden copy is also what a crawler reads. The hidden text is deliberately NOT
 * a live region.
 */
function LiveStat({ metric, copy, active }) {
  const { icon, rate, prefix = "", suffix = "", decimals = 0 } = metric;

  const value = useLiveCounter(rate, PROJECTION_EPOCH_MS, {
    active,
    prerenderNowMs: PRERENDER_REFERENCE_MS,
  });

  const formatted = `${prefix}${formatNumber(value, decimals)}${suffix}`;

  return (
    <li className={styles.stat}>
      <span className={styles.statIcon} aria-hidden="true">
        <Icon name={icon} size={22} />
      </span>
      <span className={styles.statValue} aria-hidden="true">
        {formatted}
      </span>
      <span className="bw-visually-hidden">{`${formatted} ${copy.label}`}</span>
      <span className={styles.statLabel}>{copy.label}</span>
      <span className={styles.statCaption}>{copy.caption}</span>
    </li>
  );
}

export default LiveTracker;
