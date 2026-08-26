import { comingSoon } from "@/content/siteContent";
import { buildMetadata } from "@/utils/seo";
import { ComingSoon } from "@/components/sections";

// STUB — the client supplies this text, with their own legal review.
export const metadata = buildMetadata(comingSoon.pages.terms.meta);

export default function Page() {
  return <ComingSoon page="terms" />;
}
