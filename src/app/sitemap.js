import { sitemapRoutes, STUB_SITEMAP_PRIORITY } from "@/utils/constants";
import { absoluteUrl } from "@/utils/seo";

// Statically generated at build time — required by `output: "export"`.
export const dynamic = "force-static";

/**
 * sitemap.xml, generated at build time from the route table in
 * utils/constants.js — so adding a page to the site adds it to the sitemap, and
 * a page can never be shipped that crawlers are not told about.
 */
export default function sitemap() {
  const lastModified = new Date();

  return sitemapRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    // A coming-soon placeholder is listed, but does not get to claim the weight
    // its finished version will earn. See sitemapRoutes in utils/constants.js.
    priority: route.stub ? STUB_SITEMAP_PRIORITY : route.priority,
  }));
}
