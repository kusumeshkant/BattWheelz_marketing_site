/**
 * Route paths and other cross-cutting constants.
 *
 * Routes live here rather than being typed as string literals in content and
 * components, so renaming `/rent-to-own` is a one-line change that updates the
 * nav, the footer, every CTA, and the sitemap at once.
 */

export const routes = {
  home: "/",
  about: "/about",
  impact: "/impact",
  greequity: "/greequity",
  contact: "/contact",

  // Offering pages
  b2b: "/b2b",
  rentToOwn: "/rent-to-own",
  foco: "/foco",
  lastMile: "/last-mile-delivery",

  // Company pages
  investors: "/investor-relations",
  careers: "/careers",

  // Legal pages. Currently placeholders: the text is the client's to supply
  // with their own legal review, and inventing a privacy policy would be a
  // materially worse kind of placeholder than invented marketing copy.
  privacy: "/privacy",
  terms: "/terms",
};

/**
 * The routes that actually render a page — the sitemap is generated from this.
 *
 * `priority` is the weight the page SHOULD carry once it is real; `stub: true`
 * marks a route that currently renders only a coming-soon placeholder.
 *
 * Stubs stay in the sitemap — they are real, reachable URLs and hiding them
 * would only make them look like something we are concealing. What they lose is
 * their weighting: a placeholder that advertises priority 0.9 is telling a
 * crawler to prefer it over pages with actual content. `sitemap.js` floors them
 * instead. Delete the `stub` flag as each real page lands and the intended
 * priority takes effect with no other edit.
 */
export const sitemapRoutes = [
  { path: routes.home, changeFrequency: "monthly", priority: 1.0 },
  { path: routes.about, changeFrequency: "yearly", priority: 0.7 },
  { path: routes.impact, changeFrequency: "yearly", priority: 0.6 },
  { path: routes.greequity, changeFrequency: "yearly", priority: 0.6 },
  { path: routes.contact, changeFrequency: "yearly", priority: 0.6 },

  { path: routes.b2b, changeFrequency: "monthly", priority: 0.8 },
  { path: routes.rentToOwn, changeFrequency: "monthly", priority: 0.8 },
  { path: routes.lastMile, changeFrequency: "yearly", priority: 0.7 },
  { path: routes.foco, changeFrequency: "yearly", priority: 0.6 },

  { path: routes.careers, changeFrequency: "monthly", priority: 0.4 },
  // Deliberately low: a single-purpose page for a small audience who arrive by
  // being sent the link, not by finding it in search.
  { path: routes.investors, changeFrequency: "yearly", priority: 0.3 },

  { path: routes.privacy, changeFrequency: "yearly", priority: 0.2, stub: true },
  { path: routes.terms, changeFrequency: "yearly", priority: 0.2, stub: true },
];

/** Weight given to a route that is still a placeholder. */
export const STUB_SITEMAP_PRIORITY = 0.1;

/** Scroll distance (px) past which the header condenses. */
export const HEADER_CONDENSE_OFFSET = 24;

export default routes;
