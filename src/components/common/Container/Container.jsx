import clsx from "@/utils/clsx";
import styles from "./Container.module.css";

/**
 * Horizontal layout constraint. The one place the site's max-width and gutter
 * are applied, so page width is consistent by construction rather than by
 * everyone remembering the same number.
 *
 * @param {object} props
 * @param {"default"|"narrow"|"wide"} [props.width]
 * @param {React.ElementType} [props.as] Element to render — use a semantic one.
 */
export function Container({ as: Tag = "div", width = "default", className, children, ...rest }) {
  return (
    <Tag
      className={clsx(
        styles.container,
        width === "narrow" && styles.narrow,
        width === "wide" && styles.wide,
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Container;
