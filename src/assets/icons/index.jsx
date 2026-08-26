/**
 * Icon registry. The single source of truth for line icons.
 *
 * Content refers to an icon by NAME (`icon: "lock"` in siteContent.js) and this
 * maps the name to markup — so copy stays free of SVG paths, and components
 * stay free of a `switch` over icon names.
 *
 * House style, kept consistent so the set reads as one family:
 *  - 24x24 viewBox, 1.75 stroke, round caps and joins
 *  - stroke `currentColor`, no fills — the icon takes its colour from context
 *  - decorative by default (`aria-hidden`); the label always lives in the copy
 *    beside it, never in the icon
 */

const PATHS = {
  /** A locked rate. */
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="9.5" rx="2.5" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
      <path d="M12 14.5v2" />
    </>
  ),
  /** Servicing and maintenance. */
  wrench: (
    <>
      <path d="M15.2 4.4a4.5 4.5 0 0 0-5.6 5.6l-5.1 5.1a2 2 0 0 0 0 2.9l1.5 1.5a2 2 0 0 0 2.9 0l5.1-5.1a4.5 4.5 0 0 0 5.6-5.6l-2.6 2.6-2.4-.5-.5-2.4Z" />
    </>
  ),
  /** Building equity / growth. */
  chart: (
    <>
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <path d="m7.5 15.5 3.5-4 3 2.5 4.5-6" />
    </>
  ),
  /** Telematics, safety, recovery. */
  shield: (
    <>
      <path d="M12 3.5 5 6.3v5c0 4.3 2.9 8.2 7 9.2 4.1-1 7-4.9 7-9.2v-5L12 3.5Z" />
      <path d="m9.2 11.8 2 2 3.6-3.8" />
    </>
  ),
  /** Electric / charge. */
  bolt: (
    <>
      <path d="M13.2 3 6 13.4h4.8L10.2 21 18 10.4h-5L13.2 3Z" />
    </>
  ),
  /** Hubs and locations. */
  pin: (
    <>
      <path d="M12 21s6.5-5.6 6.5-10.5a6.5 6.5 0 0 0-13 0C5.5 15.4 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.5" />
    </>
  ),
  /** Rider support. */
  support: (
    <>
      <path d="M5 13.5v-2a7 7 0 0 1 14 0v2" />
      <rect x="3" y="13" width="4" height="6" rx="1.8" />
      <rect x="17" y="13" width="4" height="6" rx="1.8" />
      <path d="M19 19v.5a2.5 2.5 0 0 1-2.5 2.5H13" />
    </>
  ),
  /** Money / billing. */
  rupee: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.5 8h5M9.5 11h5M13 8c1.5 0 2 1.5 2 2.5S14 13 12.5 13H10l4 4" />
    </>
  ),
  /** Continuous motion / uptime — a cycle that does not stop. */
  refresh: (
    <>
      <path d="M20 11.5a8 8 0 0 0-13.7-5.2L3.5 9" />
      <path d="M4 12.5a8 8 0 0 0 13.7 5.2L20.5 15" />
      <path d="M3.5 4.5V9H8" />
      <path d="M20.5 19.5V15H16" />
    </>
  ),
  /** Earnings, plans and money kept. */
  wallet: (
    <>
      <path d="M3.5 7.5A2.5 2.5 0 0 1 6 5h11a1.5 1.5 0 0 1 1.5 1.5v1.5" />
      <rect x="3.5" y="7.5" width="17" height="11.5" rx="2.5" />
      <path d="M20.5 11.5h-4a2 2 0 0 0 0 4h4" />
    </>
  ),
  /** A profile or external link. Generic on purpose — see the note in TeamGrid. */
  link: (
    <>
      <path d="M10.5 13.5a4 4 0 0 0 5.7 0l3.3-3.3a4 4 0 0 0-5.7-5.7L12 6.3" />
      <path d="M13.5 10.5a4 4 0 0 0-5.7 0l-3.3 3.3a4 4 0 0 0 5.7 5.7l1.8-1.8" />
    </>
  ),
  /** Email. */
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m4 7.5 8 6 8-6" />
    </>
  ),
  /** Confirmation. */
  check: (
    <>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </>
  ),
};

/** Icon names available to content. Useful when adding a new `icon:` value. */
export const iconNames = Object.keys(PATHS);

/**
 * @param {object} props
 * @param {keyof typeof PATHS} props.name
 * @param {number} [props.size]
 * @param {string} [props.title] Supply ONLY when the icon carries meaning no
 *        adjacent text conveys. Otherwise it stays decorative.
 */
export function Icon({ name, size = 24, title, ...rest }) {
  const path = PATHS[name];

  // A missing icon is a content bug, not a crash — render nothing and let the
  // surrounding layout hold, rather than taking the page down over a typo.
  if (!path) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[Icon] unknown icon name: "${name}". Known: ${iconNames.join(", ")}`);
    }
    return null;
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : "true"}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {path}
    </svg>
  );
}

export default Icon;
