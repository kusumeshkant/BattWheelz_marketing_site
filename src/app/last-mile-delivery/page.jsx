import { lastMilePage } from "@/content/pagesContent";
import { buildMetadata } from "@/utils/seo";
import { PageHero, ProseSection, FeatureGrid, FaqAccordion, ClosingCta } from "@/components/sections";

export const metadata = buildMetadata(lastMilePage.meta);

export default function LastMilePage() {
  return (
    <>
      <PageHero content={lastMilePage.hero} />
      <ProseSection content={lastMilePage.intro} id="managed" tone="raised" />
      <FeatureGrid content={lastMilePage.toolkit} id="toolkit" columns={3} cardLayout="media" />
      <FaqAccordion content={lastMilePage.faq} id="3pl-faq" />
      <ClosingCta content={lastMilePage.cta} id="3pl-get-started" />
    </>
  );
}
