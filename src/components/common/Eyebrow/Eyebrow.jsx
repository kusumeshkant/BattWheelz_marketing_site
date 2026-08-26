import clsx from "@/utils/clsx";
import styles from "./Eyebrow.module.css";

/**
 * The small uppercase label that sits above a section heading.
 *
 * Rendered as a `<p>`, never as a heading: it is a kicker, and promoting it to
 * an `<h3>` would put decorative words into the document outline that crawlers
 * and screen readers then have to wade through.
 */
export function Eyebrow({ onDark = false, className, children, ...rest }) {
  return (
    <p className={clsx(styles.eyebrow, onDark && styles.onDark, className)} {...rest}>
      {children}
    </p>
  );
}

export default Eyebrow;
