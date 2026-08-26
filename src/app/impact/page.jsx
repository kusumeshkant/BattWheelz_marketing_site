import { impactPage } from "@/content/pagesContent";
import { buildMetadata } from "@/utils/seo";
import { Impact } from "@/components/sections";

export const metadata = buildMetadata(impactPage.meta);

export default function ImpactPage() {
  return <Impact />;
}
