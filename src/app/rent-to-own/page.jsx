import { rentToOwnPage } from "@/content/pagesContent";
import { buildMetadata } from "@/utils/seo";
import {
  PageHero,
  FeatureGrid,
  StepSection,
  ProseSection,
  Testimonials,
  FaqAccordion,
  ClosingCta,
} from "@/components/sections";

export const metadata = buildMetadata(rentToOwnPage.meta);

export default function RentToOwnPage() {
  return (
    <>
      <PageHero content={rentToOwnPage.hero} />
      <FeatureGrid content={rentToOwnPage.whyChoose} id="why-rent-to-own" tone="raised" columns={3} />
      <StepSection content={rentToOwnPage.howItWorks} id="how-rto-works" tone="dark" />
      <ProseSection content={rentToOwnPage.eligibility} id="eligibility" />
      <Testimonials id="rto-testimonials" />
      <FaqAccordion content={rentToOwnPage.faq} id="rto-faq" />
      <ClosingCta content={rentToOwnPage.cta} id="rto-get-started" />
    </>
  );
}
