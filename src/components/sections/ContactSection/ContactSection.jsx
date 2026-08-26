import { brand, enquiryForm } from "@/content/siteContent";
import { Icon } from "@/assets/icons";
import { Section, SectionHeader, AnimatedReveal, EnquiryForm } from "@/components/common";
import styles from "./ContactSection.module.css";

/**
 * The enquiry section.
 *
 * A server component wrapping the form, which is the only client part — so the
 * headings, the contact details and the form's labels are all in the static
 * HTML, and only the interactive behaviour is hydrated.
 *
 * The direct contact details sit alongside the form deliberately. Some people
 * will not fill in a form, and while the form is not wired to a backend these
 * are the only routes that actually reach anyone.
 *
 * @param {object} props
 * @param {boolean} [props.condensed]    The shorter home-page treatment.
 * @param {number} [props.headingLevel]  2 as a band inside another page; pass 1
 *        on the Contact page, where this section IS the page and therefore owns
 *        its only h1. Without this the Contact page would ship with no h1.
 */
export function ContactSection({ condensed = false, headingLevel = 2 }) {
  return (
    <Section id="contact" tone="raised" ariaLabelledBy="contact-heading">
      <SectionHeader
        eyebrow={enquiryForm.eyebrow}
        heading={enquiryForm.heading}
        subheading={enquiryForm.subheading}
        headingId="contact-heading"
        headingLevel={headingLevel}
      />

      <AnimatedReveal className={styles.layout}>
        <div className={styles.aside}>
          <address className={styles.direct}>
            <span className={styles.directRow}>
              <Icon name="support" size={20} />
              <a href={`mailto:${brand.contact.email}`}>{brand.contact.email}</a>
            </span>
            <span className={styles.directRow}>
              <Icon name="pin" size={20} />
              <a href={brand.contact.phoneHref}>{brand.contact.phoneDisplay}</a>
            </span>
          </address>
        </div>

        <EnquiryForm condensed={condensed} />
      </AnimatedReveal>
    </Section>
  );
}

export default ContactSection;
