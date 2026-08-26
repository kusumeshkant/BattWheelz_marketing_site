"use client";

import { useMemo, useState } from "react";
import { home } from "@/content/siteContent";
import { Section, SectionHeader, Button, RangeSlider, AnimatedReveal } from "@/components/common";
import { calculateSavings } from "@/utils/savings";
import { formatRupees, formatNumber } from "@/utils/format";
import styles from "./SavingsCalculator.module.css";

const { savings } = home;
const { breakdownLabels: L } = savings;

/** One line in a cost breakdown. */
function Line({ label, value, total = false }) {
  return (
    <div className={total ? `${styles.line} ${styles.lineTotal}` : styles.line}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

/**
 * Interactive savings estimate.
 *
 * The only genuinely stateful section on the site. State is a single number —
 * the rider's daily distance — and everything else is derived from it, so
 * there is no state to keep in sync and nothing to get stale.
 *
 * The arithmetic lives in utils/savings.js and the numbers that feed it live in
 * content. This component only turns one number into markup.
 *
 * Note what is deliberately NOT here: no debounce, no transition on the result.
 * The figure should track the slider exactly, because a number that lags behind
 * the handle reads as broken, and an animated one reads as a slot machine.
 */
export function SavingsCalculator() {
  const [dailyKm, setDailyKm] = useState(savings.sliderDefault);

  // Recomputed only when the distance actually changes — the calculation is
  // cheap, but this keeps re-renders from re-deriving five formatted strings.
  const result = useMemo(() => calculateSavings(dailyKm, savings.assumptions), [dailyKm]);

  const formatKm = (value) => `${formatNumber(value)} ${savings.sliderUnit}`;

  return (
    <Section id="savings" className={styles.section} ariaLabelledBy="savings-heading">
      <SectionHeader
        eyebrow={savings.eyebrow}
        heading={savings.heading}
        subheading={savings.subheading}
        headingId="savings-heading"
      />

      <AnimatedReveal className={styles.layout}>
        {/* Input ------------------------------------------------------- */}
        <div className={styles.panel}>
          <RangeSlider
            label={savings.sliderLabel}
            value={dailyKm}
            onChange={setDailyKm}
            min={savings.sliderMin}
            max={savings.sliderMax}
            step={savings.sliderStep}
            formatValue={formatKm}
          />

          {/*
           * `aria-live="polite"` so a screen-reader user dragging the slider
           * hears the updated saving. Polite, not assertive: it should wait for
           * a pause rather than interrupt on every step of a drag.
           */}
          <div className={styles.result} aria-live="polite">
            <span className={styles.resultLabel}>{savings.resultLabel}</span>
            {result.savesMoney ? (
              <>
                <span className={styles.resultValue}>{formatRupees(result.savings)}</span>
                <span className={styles.resultCaption}>{savings.resultCaption}</span>
              </>
            ) : (
              <p className={styles.negative}>{savings.negativeResult}</p>
            )}
          </div>

          <div className={styles.breakdowns}>
            <div className={styles.column}>
              <h3 className={styles.columnTitle}>{L.petrol}</h3>
              <Line label={L.fuel} value={formatRupees(result.petrol.fuel)} />
              <Line label={L.maintenance} value={formatRupees(result.petrol.maintenance)} />
              <Line label={L.emi} value={formatRupees(result.petrol.emi)} />
              <Line label={L.insurance} value={formatRupees(result.petrol.insurance)} />
              <Line label={L.total} value={formatRupees(result.petrol.total)} total />
            </div>

            <div className={styles.column}>
              <h3 className={styles.columnTitle}>{L.battwheelz}</h3>
              <Line label={L.subscription} value={formatRupees(result.battwheelz.subscription)} />
              <Line label={L.charging} value={formatRupees(result.battwheelz.charging)} />
              {/* Servicing and insurance have no figure here because they are
                  inside the subscription rate — saying "included" is the point. */}
              <Line
                label={L.maintenance}
                value={<span className={styles.included}>{L.included}</span>}
              />
              <Line
                label={L.insurance}
                value={<span className={styles.included}>{L.included}</span>}
              />
              <Line label={L.total} value={formatRupees(result.battwheelz.total)} total />
            </div>
          </div>
        </div>

        {/* Assumptions ------------------------------------------------- */}
        <div>
          <div className={styles.assumptions}>
            <h3 className={styles.assumptionsTitle}>{savings.assumptionsTitle}</h3>
            <ul className={styles.assumptionsList}>
              {savings.assumptionsList.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className={styles.disclaimer}>{savings.disclaimer}</p>
          </div>

          <div className={styles.actions}>
            <Button href={savings.cta.href} withArrow>
              {savings.cta.label}
            </Button>
          </div>
        </div>
      </AnimatedReveal>
    </Section>
  );
}

export default SavingsCalculator;
