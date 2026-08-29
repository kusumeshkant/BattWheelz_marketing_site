import { home } from "@/content/siteContent";
import { buildMetadata, buildFaqSchema } from "@/utils/seo";
import { WaveDivider } from "@/components/common";
import {
  Hero,
  WhatsIncluded,
  LiveStats,
  PartnerChips,
  WhyChoose,
  HowToStart,
  SavingsCalculator,
  Testimonials,
  FaqAccordion,
  ClosingCta,
  ContactSection,
} from "@/components/sections";

/**
 * Home. A server component: it composes sections, owns the page's metadata and
 * its structured data, and ships no JavaScript of its own. Only the sections
 * that animate or hold state opt into the client.
 *
 * Sections are listed in reading order and nothing else — the ordering of the
 * page IS this file, which makes reordering the narrative a two-line diff.
 */
export const metadata = buildMetadata({ ...home.meta, isHome: true });

export default function HomePage() {
  return (
    <>
      {/* FAQ structured data. Server-rendered; see buildFaqSchema. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(home.faq.items)) }}
      />

      <Hero />
      {/* Decorative join between the dark hero and the light section below. */}
      <WaveDivider />
      <WhatsIncluded />
      <LiveStats />

      {/* Client-supplied partner logos where we hold artwork; names elsewhere. */}
      <PartnerChips content={home.deliveryPartners} id="delivery-partners" tone="raised" />
      <PartnerChips content={home.ecosystemPartners} id="ecosystem-partners" />
      <WhyChoose />
      <HowToStart />
      <SavingsCalculator />
      <Testimonials />
      <FaqAccordion />
      <ClosingCta />
      <ContactSection condensed />
    </>
  );
}
