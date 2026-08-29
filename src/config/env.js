/**
 * Build-time environment configuration. The ONLY place `process.env` is read.
 *
 * These are `NEXT_PUBLIC_*` because the values are needed in components that
 * ship to the browser (siteContent.js is imported by the Header and Hero). Next
 * inlines them at BUILD time by literal text substitution — which is why each
 * one must be written out as a full `process.env.NEXT_PUBLIC_X` member access
 * below. Destructuring or dynamic lookup breaks the substitution and yields
 * `undefined` in the bundle.
 *
 * Values come from `.env.production` for a production build, or the shell.
 */

/**
 * Base URL the site is served from. Feeds canonical links, Open Graph URLs and
 * sitemap.xml, so it MUST match the domain actually being deployed to — a
 * canonical pointing somewhere else tells Google to index the other place.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.battwheelz.com";

/**
 * Marks this build as a temporary client-preview deployment rather than the
 * real site. When true the whole site is served `noindex, nofollow` and
 * robots.txt disallows everything.
 *
 * ONE flag, read in exactly two places (utils/seo.js and app/robots.js), so
 * going live is: flip this to false and rebuild.
 *
 * Follows the same convention as the backend's feature flags — on only for an
 * explicit "true" or "1", so a typo fails safe. Note the safe direction here is
 * inverted: a typo leaves the preview INDEXABLE. That is deliberate, because the
 * alternative failure mode is silently noindexing the real production site,
 * which is far harder to notice and far more expensive to recover from.
 */
export const isDemoEnv =
  process.env.NEXT_PUBLIC_IS_DEMO_ENV === "true" ||
  process.env.NEXT_PUBLIC_IS_DEMO_ENV === "1";

/**
 * Web3Forms access key — what the enquiry form POSTs with.
 *
 * PUBLIC BY DESIGN, and it has to be: the form submits straight from the
 * browser (this is a static export, there is no server to hide a secret
 * behind), so the key is inlined into the JS bundle and is readable by anyone
 * who views source. Web3Forms documents it as public-safe — it only lets a
 * caller send mail to the address the key is registered to. Do not treat this
 * as a credential, and do not put anything that IS a credential in a
 * NEXT_PUBLIC_ variable.
 *
 * It lives in an env var rather than inline so a different key can be used per
 * environment without a code change. Empty when unset — the form checks for
 * that and refuses to pretend it sent anything. See EnquiryForm.
 */
export const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

const env = { siteUrl, isDemoEnv, web3formsKey };

export default env;
