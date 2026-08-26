import { focoPage } from "@/content/pagesContent";
import { buildMetadata } from "@/utils/seo";
import {
  PageHero,
  FeatureGrid,
  ProseSection,
  StepSection,
  FaqAccordion,
  ClosingCta,
} from "@/components/sections";

/**
 * Franchise partnerships.
 *
 * The reference structure this follows leads with a headline ROI figure driven
 * by an investment calculator. Neither is reproduced: a stated return is a
 * financial promotion whether the number is real or invented. This page
 * explains the model and asks for a conversation instead.
 */
export const metadata = buildMetadata(focoPage.meta);

export default function FocoPage() {
  return (
    <>
      <PageHero content={focoPage.hero} />
      <FeatureGrid content={focoPage.whyChoose} id="why-franchise" tone="raised" columns={4} />
      <ProseSection content={focoPage.model} id="model" />
      <StepSection content={focoPage.journey} id="franchise-journey" tone="dark" />
      <FaqAccordion content={focoPage.faq} id="foco-faq" />
      <ClosingCta content={focoPage.cta} id="foco-get-started" />
    </>
  );
}
