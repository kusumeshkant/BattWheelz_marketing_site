import { investorsPage } from "@/content/pagesContent";
import { buildMetadata } from "@/utils/seo";
import { PageHero, ProseSection, ClosingCta } from "@/components/sections";

/**
 * Investor relations — deliberately a short, single-purpose page.
 *
 * It carries NO financial figures of any kind: no revenue, funding, EBITDA,
 * valuation, ROI or growth projections, real or placeholder. See the note above
 * `investorsPage` in pagesContent.js for why. The page states the thesis
 * qualitatively and routes enquiries to Contact.
 */
export const metadata = buildMetadata(investorsPage.meta);

export default function InvestorRelationsPage() {
  return (
    <>
      <PageHero content={investorsPage.hero} />
      <ProseSection content={investorsPage.approach} id="approach" />
      <ClosingCta content={investorsPage.cta} id="investor-enquiries" />
    </>
  );
}
