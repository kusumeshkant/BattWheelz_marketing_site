import { brand, comingSoon } from "@/content/siteContent";
import { Section, Eyebrow, Button } from "@/components/common";
import styles from "./ComingSoon.module.css";

/**
 * Placeholder body for a route that is linked but not built yet.
 *
 * A server component with no animation — this is scaffolding, and spending
 * motion on it would make an unfinished page feel more finished than it is.
 *
 * It still renders inside the normal `Section` and page shell so a visitor who
 * clicks a nav item lands somewhere that belongs to the site, rather than on a
 * 404 that reads as broken.
 *
 * @param {object} props
 * @param {keyof typeof comingSoon.pages} props.page Key into content.comingSoon.pages.
 */
export function ComingSoon({ page }) {
  const content = comingSoon.pages[page];

  return (
    <Section spacing="lg" ariaLabelledBy="coming-soon-heading">
      <div className={styles.wrap}>
        <Eyebrow>{comingSoon.eyebrow}</Eyebrow>

        {/* The page's only h1 — a stub still owes the document one. */}
        <h1 id="coming-soon-heading">{content.heading}</h1>

        <p className={styles.body}>{content.body}</p>

        {content.showContactDetails ? (
          <address className={styles.contact}>
            <a href={`mailto:${brand.contact.email}`}>{brand.contact.email}</a>
            <a href={brand.contact.phoneHref}>{brand.contact.phoneDisplay}</a>
          </address>
        ) : null}

        <div className={styles.actions}>
          <Button href={comingSoon.backCta.href} variant="secondary" withArrow>
            {comingSoon.backCta.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}

export default ComingSoon;
