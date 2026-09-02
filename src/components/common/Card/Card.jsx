import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/assets/icons";
import clsx from "@/utils/clsx";
import styles from "./Card.module.css";

/**
 * Generic content card: optional icon, title, body.
 *
 * Two layouts, because two sections want genuinely different things:
 *  - default  — icon in a small chip, text left-aligned. Dense grids.
 *  - "media"  — a full-width band across the top of the card (rounded to the
 *               card's top corners), text centred beneath. The band holds a
 *               PHOTO when `image` is given, and falls back to the tinted icon
 *               tile when it is not.
 *
 * Passing `href` makes the WHOLE card the link rather than adding a link
 * inside it. One target per card is easier to hit on a phone, and it stops a
 * screen reader announcing two separate links to the same place.
 *
 * @param {object} props
 * @param {string} [props.icon]     Icon name from the registry in assets/icons.
 * @param {{src: any, alt: string}} [props.image]
 *   Photo for the media band, from a registry such as `assets/cardImages`.
 *   `media` layout only, and takes precedence over `icon` there.
 * @param {string} props.title
 * @param {string} [props.body]
 * @param {string} [props.href]     Makes the entire card a link.
 * @param {"default"|"media"} [props.layout]
 * @param {"default"|"raised"|"inverse"} [props.tone]
 * @param {boolean} [props.interactive] Hover lift. Implied by `href`.
 * @param {number} [props.index] Optional ordinal badge, for numbered grids.
 * @param {string} [props.label] Optional overline above the title.
 * @param {number} [props.headingLevel] Keeps the document outline correct.
 */
export function Card({
  icon,
  image,
  title,
  body,
  href,
  layout = "default",
  tone = "default",
  interactive = false,
  index,
  label,
  headingLevel = 3,
  className,
  children,
  ...rest
}) {
  const Heading = `h${headingLevel}`;
  const isMedia = layout === "media";

  const classes = clsx(
    styles.card,
    styles[`tone-${tone}`],
    isMedia && styles.media,
    (interactive || href) && styles.interactive,
    className
  );

  const content = (
    <>
      {/* Decorative: the order is already carried by the grid's source order. */}
      {index ? (
        <span className={styles.index} aria-hidden="true">
          {index}
        </span>
      ) : null}

      {isMedia && image ? (
        /*
         * A photo fills the band edge to edge. No `sizes` and no `srcset`:
         * `next.config.mjs` sets `images: { unoptimized: true }` (forced by
         * `output: "export"`), so Next emits the file as authored and one asset
         * serves every breakpoint — the responsive sizing is done ahead of time
         * by `scripts/normalise-card-images.py`. The static import still
         * carries width and height, which is what keeps the tile from shifting.
         */
        <span className={clsx(styles.mediaBand, styles.mediaBandPhoto)}>
          <Image src={image.src} alt={image.alt} className={styles.mediaImage} />
        </span>
      ) : icon ? (
        isMedia ? (
          <span className={styles.mediaBand}>
            <Icon name={icon} size={34} />
          </span>
        ) : (
          <span className={styles.icon}>
            <Icon name={icon} size={24} />
          </span>
        )
      ) : null}

      <span className={styles.text}>
        {label ? <span className={styles.label}>{label}</span> : null}
        <Heading className={styles.title}>{title}</Heading>
        {body ? <p className={styles.body}>{body}</p> : null}
        {children}
      </span>
    </>
  );

  if (href) {
    // `article` would be wrong here — the whole thing is a link, and an <a>
    // may not contain interactive descendants, so children stay non-interactive.
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <article className={classes} {...rest}>
      {content}
    </article>
  );
}

export default Card;
