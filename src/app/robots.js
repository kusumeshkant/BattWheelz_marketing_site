import { isDemoEnv } from "@/config/env";
import { absoluteUrl } from "@/utils/seo";

// Statically generated at build time — required by `output: "export"`.
export const dynamic = "force-static";

/**
 * robots.txt.
 *
 * Production is fully open — this is a marketing site and every page is meant
 * to be indexed; the value robots.txt carries there is the sitemap pointer.
 *
 * A demo build disallows everything and omits the sitemap entirely: pointing a
 * crawler at a list of URLs it has just been told not to fetch is a mixed
 * signal, and Google treats a disallowed-but-sitemapped URL as a candidate for
 * a URL-only index entry.
 *
 * Belt and braces with the `noindex` meta tag from utils/seo.js — and they do
 * different jobs. robots.txt stops the crawl; `noindex` stops indexing of a
 * page reached some other way (an inbound link, a shared preview). Neither
 * alone is sufficient.
 */
export default function robots() {
  if (isDemoEnv) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
