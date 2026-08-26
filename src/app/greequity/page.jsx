import { greequityPage } from "@/content/pagesContent";
import { buildMetadata } from "@/utils/seo";
import { PageHero, FeatureGrid, ClosingCta } from "@/components/sections";

export const metadata = buildMetadata(greequityPage.meta);

export default function GreequityPage() {
  return (
    <>
      <PageHero content={greequityPage.hero} />
      <FeatureGrid
        content={greequityPage.features}
        id="greequity-features"
        tone="raised"
        columns={3}
      />
      <ClosingCta content={greequityPage.cta} id="greequity-cta" />
    </>
  );
}
