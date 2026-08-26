import clsx from "@/utils/clsx";
import styles from "./StarRating.module.css";

const STAR_PATH =
  "M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.45L12 17.45 6.2 20.5l1.1-6.45-4.7-4.6 6.5-.95L12 2.6Z";

/**
 * A star rating, supporting halves.
 *
 * Half stars are drawn with a `<clipPath>` over a full star rather than a
 * separate half-star glyph, so the filled and empty halves are guaranteed to
 * share the exact same outline — two different paths never quite line up.
 *
 * The whole row carries one `aria-label` ("4.5 out of 5 stars") and the stars
 * themselves are hidden: a screen reader should hear the rating once, not five
 * separate "star" announcements.
 *
 * @param {object} props
 * @param {number} props.value   e.g. 4.5
 * @param {number} [props.max]
 * @param {number} [props.size]
 */
export function StarRating({ value, max = 5, size = 18, className }) {
  // Snap to the nearest half — the component draws halves, so a 4.3 that
  // renders as 4.5 should also be *described* as 4.5.
  const rounded = Math.round(value * 2) / 2;

  return (
    <span
      className={clsx(styles.row, className)}
      role="img"
      aria-label={`${rounded} out of ${max} stars`}
    >
      {Array.from({ length: max }, (_, index) => {
        const fill = Math.min(Math.max(rounded - index, 0), 1); // 0, 0.5 or 1
        // Ids must be unique per star per row, or a second row on the page
        // reuses the first row's clip paths.
        const clipId = `bw-star-${index}-${String(rounded).replace(".", "-")}`;

        return (
          <svg
            key={index}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path d={STAR_PATH} className={styles.empty} />
            {fill > 0 ? (
              <>
                {fill < 1 ? (
                  <defs>
                    <clipPath id={clipId}>
                      <rect x="0" y="0" width={24 * fill} height="24" />
                    </clipPath>
                  </defs>
                ) : null}
                <path
                  d={STAR_PATH}
                  className={styles.filled}
                  clipPath={fill < 1 ? `url(#${clipId})` : undefined}
                />
              </>
            ) : null}
          </svg>
        );
      })}
    </span>
  );
}

export default StarRating;
