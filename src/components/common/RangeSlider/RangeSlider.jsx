"use client";

import { useId } from "react";
import clsx from "@/utils/clsx";
import styles from "./RangeSlider.module.css";

/**
 * A labelled range input with a value read-out and min/max bounds.
 *
 * Lives in /common because a rider-facing self-serve calculator is a likely
 * follow-on and will want exactly this control.
 *
 * Built on the native `<input type="range">` — see the note in the stylesheet
 * for why that is not negotiable.
 *
 * @param {object} props
 * @param {string} props.label      Visible label. Also the accessible name.
 * @param {number} props.value
 * @param {(value: number) => void} props.onChange  Receives a NUMBER, not an event.
 * @param {number} props.min
 * @param {number} props.max
 * @param {number} [props.step]
 * @param {(value: number) => string} [props.formatValue] For the read-out and
 *        for `aria-valuetext` — screen readers should hear "120 km", not "120".
 */
export function RangeSlider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  formatValue = (v) => String(v),
  className,
}) {
  const id = useId();

  // Percentage of the track that is filled, handed to CSS as a custom property
  // so the fill and the thumb cannot drift apart.
  const fill = ((value - min) / (max - min)) * 100;

  return (
    <div className={clsx(styles.wrap, className)}>
      <div className={styles.labelRow}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        <output className={styles.value} htmlFor={id}>
          {formatValue(value)}
        </output>
      </div>

      <input
        id={id}
        className={styles.input}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-valuetext={formatValue(value)}
        style={{ "--bw-fill": `${fill}%` }}
      />

      <div className={styles.bounds} aria-hidden="true">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
}

export default RangeSlider;
