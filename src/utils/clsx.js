/**
 * Joins class names, dropping anything falsy.
 *
 * Thirty lines of dependency avoided: `clsx(styles.a, isX && styles.b)` is the
 * only pattern this codebase uses, and that is all this covers.
 *
 * @param  {...(string|false|null|undefined)} classNames
 * @returns {string}
 */
export function clsx(...classNames) {
  return classNames.filter(Boolean).join(" ");
}

export default clsx;
