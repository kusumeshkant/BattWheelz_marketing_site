/**
 * SEO helpers.
 *
 * Pages never hand-write a <title>, a meta description or an OG tag. They call
 * `buildMetadata(content.meta)` and Next renders the full set — canonical,
 * Open Graph, Twitter card — from the single `seo` block in siteContent.js.
 * That is what keeps the page title in the tab, in a Google result and in a
 * WhatsApp preview from ever disagreeing.
 */

import { isDemoEnv } from "@/config/env";
import { brand, seo } from "@/content/siteContent";

/**
 * The `robots` directive every page carries.
 *
 * A preview build is served `noindex, nofollow` site-wide. `nocache` and
 * `noimageindex` are added too: without them a page that was crawled before the
 * flag went on can linger in a cached snapshot, and images can be indexed
 * separately from the page that contains them.
 *
 * Returned as a Next Metadata `robots` object, so it lands as a real
 * `<meta name="robots">` on every page — including any page added later, since
 * pages inherit it through buildMetadata rather than declaring their own.
 */
export const robotsDirective = isDemoEnv
  ? { index: false, follow: false, nocache: true, noimageindex: true }
  : { index: true, follow: true };

/** Absolute URL for a site-relative path — Open Graph rejects relative ones. */
export function absoluteUrl(path = "/") {
  const base = seo.siteUrl.replace(/\/$/, "");
  if (!path || path === "/") return `${base}/`;
  return `${base}/${String(path).replace(/^\//, "")}`;
}

/**
 * Builds a Next.js Metadata object for one page.
 *
 * @param {object} meta
 * @param {string} meta.title        Page title, WITHOUT the brand suffix.
 * @param {string} meta.description  Meta description, ~150-160 chars.
 * @param {string} meta.path         Site-relative path, used for the canonical.
 * @param {boolean} [meta.isHome]    Home uses the full default title verbatim,
 *                                   so it does not read "Battwheelz | Battwheelz".
 */
export function buildMetadata({ title, description, path = "/", isHome = false }) {
  const fullTitle = isHome ? seo.defaultTitle : seo.titleTemplate.replace("%s", title);
  const canonical = absoluteUrl(path);
  const ogImage = {
    url: absoluteUrl(seo.openGraphImage.url),
    width: seo.openGraphImage.width,
    height: seo.openGraphImage.height,
    alt: seo.openGraphImage.alt,
  };

  return {
    title: fullTitle,
    description,
    keywords: seo.keywords,
    robots: robotsDirective,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: brand.name,
      locale: seo.locale,
      url: canonical,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      site: seo.twitterHandle,
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
  };
}

/**
 * Organization schema, emitted once from the root layout.
 *
 * `Organization` rather than `LocalBusiness`: Battwheelz operates hubs but does
 * not sell to walk-in customers at a storefront, and claiming LocalBusiness
 * without real per-branch addresses and opening hours invites a structured-data
 * penalty. Revisit once the client confirms public hub addresses.
 */
export function buildOrganizationSchema() {
  const { address } = brand.contact;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    legalName: brand.legalName,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icon.svg"),
    description: seo.defaultDescription,
    foundingDate: String(brand.foundedYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: brand.contact.email,
        telephone: brand.contact.phoneDisplay,
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
    ],
    sameAs: brand.social.map((entry) => entry.href),
  };
}

/**
 * FAQPage schema.
 *
 * Emitted from the page (a server component) rather than from the accordion,
 * which is a client component — structured data belongs in the server-rendered
 * HTML, and there is no reason to ship it to the browser as JavaScript.
 *
 * Google requires the answer text in the markup to match what the user can
 * actually see, which it does: the accordion keeps every answer in the DOM and
 * only collapses it visually.
 */
export function buildFaqSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Breadcrumbs for any page below the root. */
export function buildBreadcrumbSchema(trail) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: absoluteUrl(crumb.href),
    })),
  };
}

export default buildMetadata;
