import { contactPage } from "@/content/siteContent";
import { buildMetadata } from "@/utils/seo";
import { ContactSection } from "@/components/sections";

/**
 * Contact. The enquiry form is the whole page, so it renders the shared
 * ContactSection un-condensed and at heading level 1 — the section IS the page,
 * and the page still owes the document exactly one h1.
 */
export const metadata = buildMetadata(contactPage.meta);

export default function ContactPage() {
  return <ContactSection headingLevel={1} />;
}
