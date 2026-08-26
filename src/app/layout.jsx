import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { brand, navigation, seo } from "@/content/siteContent";
import { colors } from "@/theme";
import { buildThemeCss } from "@/theme/cssVariables";
import { buildMetadata, buildOrganizationSchema } from "@/utils/seo";
import { Header, Footer } from "@/components/layout";
import "./globals.css";

/*
 * Fonts are self-hosted by next/font: the files are downloaded at build time and
 * served from our own origin, so there is no third-party request on the critical
 * path and no CLS from a late-arriving stylesheet. Each exposes a CSS variable
 * that src/theme/typography.js composes its fallback stack around.
 */
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--bw-typeface-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--bw-typeface-body",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--bw-typeface-mono",
  display: "swap",
});

/** Root metadata. Pages override title/description via their own `metadata`. */
export const metadata = {
  metadataBase: new URL(seo.siteUrl),
  ...buildMetadata({
    title: seo.defaultTitle,
    description: seo.defaultDescription,
    path: "/",
    isHome: true,
  }),
  applicationName: brand.name,
  authors: [{ name: brand.legalName }],
  // `robots` is deliberately NOT set here — buildMetadata above supplies it from
  // the single demo-env flag, and a value written here would silently win over
  // the spread and re-index a preview build.
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
};

export const viewport = {
  // Read from the theme rather than duplicated as a literal — the browser
  // needs a concrete colour here, but it does not need a SECOND copy of it.
  themeColor: colors.surface.inverse,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  const organizationSchema = buildOrganizationSchema();

  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        {/*
         * The design tokens, generated from src/theme/*.js into a single :root
         * rule. Inlined rather than imported as a stylesheet so the variables are
         * available on the very first paint — a component styled with a var()
         * that has not resolved yet renders unstyled for a frame.
         */}
        <style
          id="bw-theme-tokens"
          dangerouslySetInnerHTML={{ __html: buildThemeCss() }}
        />
        {/*
         * NO canonical link here. It is emitted per page by buildMetadata via
         * `alternates.canonical`. A hardcoded one in the layout applies to every
         * route, so /about shipped two canonicals — the root one first, telling
         * a crawler that the homepage is the canonical version of every page on
         * the site. Anything that must differ per route belongs in metadata,
         * not in this shared <head>.
         */}
        {/* Organization schema, site-wide. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <a className="bw-skip-link" href="#main-content">
          {navigation.skipToContent}
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
