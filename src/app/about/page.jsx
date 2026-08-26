import { about } from "@/content/pagesContent";
import { buildMetadata } from "@/utils/seo";
import { Section, SectionHeader, StatBand } from "@/components/common";
import {
  AboutHero,
  AboutStory,
  MissionVision,
  Roadmap,
  TeamGrid,
  Ecosystem,
  AboutCta,
} from "@/components/sections";

/**
 * About. A server component composing the page's sections in reading order.
 *
 * The stats band is inlined here rather than given its own section component:
 * it is a heading plus the shared `StatBand`, and wrapping that in a file of
 * its own would add indirection without adding anything.
 */
export const metadata = buildMetadata(about.meta);

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      <Section id="today" ariaLabelledBy="today-heading">
        <SectionHeader
          heading={about.stats.heading}
          subheading={about.stats.subheading}
          headingId="today-heading"
        />
        <StatBand items={about.stats.items} tone="light" wideGap />
      </Section>

      <AboutStory />
      <MissionVision />
      <Roadmap />
      <TeamGrid />
      <Ecosystem />
      <AboutCta />
    </>
  );
}
