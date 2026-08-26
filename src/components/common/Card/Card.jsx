import Link from "next/link";
import { Icon } from "@/assets/icons";
import clsx from "@/utils/clsx";
import styles from "./Card.module.css";

/**
 * Generic content card: optional icon, title, body.
 *
 * Two layouts, because two sections want genuinely different things:
 *  - default  — icon in a small chip, text left-aligned. Dense grids.
 *  - "media"  — icon in a full-width tinted band across the top of the card
 *               (rounded to the card's top corners), text centred beneath.
 *
 * Passing `href` makes the WHOLE card the link rather than adding a link
 * inside it. One target per card is easier to hit on a phone, and it stops a
 * screen reader announcing two separate links to the same place.
 *
 * @param {object} props
 * @param {string} [props.icon]     Icon name from the registry in assets/icons.
 * @param {string} props.title
 * @param {string} [props.body]
 * @param {string} [props.href]     Makes the entire card a link.
 * @param {"default"|"media"} [props.layout]
 * @param {"default"|"raised"|"inverse"} [props.tone]
 * @param {boolean} [props.interactive] Hover lift. Implied by `href`.
 * @param {number} [props.headingLevel] Keeps the document outline correct.
 */
export function Card({
  icon,
  title,
  body,
  href,
  layout = "default",
  tone = "default",
  interactive = false,
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
      {icon ? (
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
