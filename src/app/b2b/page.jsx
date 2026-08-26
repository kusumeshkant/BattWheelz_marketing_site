import { b2bPage } from "@/content/pagesContent";
import { buildMetadata } from "@/utils/seo";
import {
  PageHero,
  FeatureGrid,
  StepSection,
  Testimonials,
  FaqAccordion,
  ClosingCta,
} from "@/components/sections";

export const metadata = buildMetadata(b2bPage.meta);

export default function B2BPage() {
  return (
    <>
      <PageHero content={b2bPage.hero} />
      <FeatureGrid content={b2bPage.plan} id="plan" tone="raised" columns={3} cardLayout="media" />
      <FeatureGrid content={b2bPage.kyc} id="kyc" columns={3} />
      <FeatureGrid content={b2bPage.cities} id="cities" tone="raised" columns={4} />
      <StepSection content={b2bPage.howToJoin} id="b2b-join" tone="dark" />
      <Testimonials id="b2b-testimonials" />
      <FaqAccordion content={b2bPage.faq} id="b2b-faq" />
      <ClosingCta content={b2bPage.cta} id="b2b-get-started" />
    </>
  );
}
