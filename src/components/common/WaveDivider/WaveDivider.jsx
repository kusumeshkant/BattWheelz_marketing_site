import clsx from "@/utils/clsx";
import styles from "./WaveDivider.module.css";

/**
 * A decorative wave band that bridges two sections.
 *
 * Pure ornament: `aria-hidden`, no text, no interactivity. It exists to soften
 * the hard horizontal edge between a dark section and the light one beneath it.
 *
 * `from` is the colour flowing INTO the wave (the section above), so the shape
 * reads as that section spilling downward. It defaults to a gradient matching
 * the hero's own left-to-right travel — a flat fill would butt against the
 * hero's gradient and leave a visible seam across the join. Pass a CSS colour
 * to override with a solid.
 *
 * @param {object} props
 * @param {string} [props.from]  Fill for the wave shape. Defaults to the hero gradient.
 * @param {boolean} [props.flip] Mirror vertically, for a light-into-dark join.
 */
export function WaveDivider({ from, flip = false, className }) {
  const gradientId = "bw-wave-gradient";

  return (
    <svg
      className={clsx(styles.divider, flip && styles.flip, className)}
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {/*
        preserveAspectRatio="none" lets the path stretch to any viewport width
        without the wave changing height — the alternative is a shape that grows
        absurdly tall on a wide monitor.
      */}
      {from ? null : (
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--bw-color-surface-inverse)" />
            <stop offset="100%" stopColor="var(--bw-color-surface-inverse-deep)" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M0 0h1440v28c-120 26-260 39-420 39S742 41 600 30 300 8 168 22C112 28 56 40 0 58Z"
        fill={from ?? `url(#${gradientId})`}
      />
    </svg>
  );
}

export default WaveDivider;
