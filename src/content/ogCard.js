/**
 * Copy for the Open Graph share card (`public/og-image.png`).
 *
 * Its own module, deliberately, with NO imports.
 *
 * `siteContent.js` imports `@/config/env` and `@/utils/constants`, and that `@/`
 * alias is resolved by the Next build — a plain `node scripts/*.mjs` cannot
 * follow it. Keeping the card's strings here, alias-free, means the generator
 * script can import them instead of holding its own copy that quietly goes
 * stale. This file is the single source for the card's words.
 *
 * Keep it in step with `home.hero` in siteContent.js: the card should say what
 * the page says. When the hero headline changes, change it here and re-run
 * `node scripts/generate-og-image.mjs`.
 */

export const ogCard = {
  /** Mirrors home.hero.headline. `accent` renders in the brand gradient. */
  headline: [
    { text: "Powering the Future" },
    { text: "of ", lineBreakBefore: true },
    { text: "Everyday Mobility", accent: true },
    { text: "." },
  ],

  /** Mirrors home.hero.pitch.heading. */
  supporting: "Built for gig riders. Backed by Battwheelz.",

  /** Two of home.hero.pitch items, shortened to fit the card. */
  proofPoints: ["Zero ownership burden", "Simple fixed plans. Zero surprises"],
};

export default ogCard;
