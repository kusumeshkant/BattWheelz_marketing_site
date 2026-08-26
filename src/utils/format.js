/**
 * Number and currency formatting.
 *
 * Pinned to the `en-IN` locale rather than the visitor's, because the figures
 * on this site are rupee amounts for an Indian audience and the Indian digit
 * grouping (1,20,000 not 120,000) is part of reading them correctly. A visitor
 * browsing from elsewhere should still see the number the way the business
 * quotes it.
 */

const LOCALE = "en-IN";

const cache = new Map();

/** Cached formatter — constructing an Intl.NumberFormat is not cheap, and the
 *  count-up animation asks for one on every frame. */
function formatter(decimals) {
  if (!cache.has(decimals)) {
    cache.set(
      decimals,
      new Intl.NumberFormat(LOCALE, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    );
  }
  return cache.get(decimals);
}

/**
 * @param {number} value
 * @param {number} [decimals]
 * @returns {string} e.g. 2400 -> "2,400"
 */
export function formatNumber(value, decimals = 0) {
  return formatter(decimals).format(value ?? 0);
}

/**
 * Whole rupees. No paise — every figure on this site is an estimate or a rate,
 * and trailing ".00" implies a precision none of them have.
 */
export function formatRupees(value) {
  return `₹${formatNumber(Math.round(value ?? 0))}`;
}

/**
 * Assembles a stat for display: prefix + grouped number + suffix.
 * Used by both stat bands so they cannot format differently.
 */
export function formatStat({ value, prefix = "", suffix = "", decimals = 0 }) {
  return `${prefix}${formatNumber(value, decimals)}${suffix}`;
}
