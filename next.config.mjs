/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The marketing site is fully static — no server runtime, no API routes.
  // `next build` emits plain HTML/CSS/JS that any CDN or static host can serve,
  // which is the cheapest possible hosting for a brochure site and the fastest
  // possible TTFB for crawlers.
  output: "export",
  // `output: "export"` disables the Next.js image optimizer (it needs a server),
  // so images are served as-authored. Keep source assets pre-sized.
  images: { unoptimized: true },
  // Emits /about/index.html rather than /about.html — clean, crawlable URLs
  // with no extension on every static host.
  trailingSlash: true,
};

export default nextConfig;
