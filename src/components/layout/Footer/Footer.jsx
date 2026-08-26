import Link from "next/link";
import { brand, footer } from "@/content/siteContent";
import { Container, Logo } from "@/components/common";
import styles from "./Footer.module.css";

/**
 * Site footer. A server component — it is entirely static, so none of it needs
 * to ship as JavaScript.
 *
 * The copyright year is computed here at BUILD time rather than in the browser.
 * On a statically exported site that means it is baked into the HTML, which
 * keeps it out of the hydration path; the trade-off is that a site left
 * un-rebuilt across New Year shows last year. Redeploying is the fix, and that
 * is preferable to shipping a client component for four characters.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <div className={styles.brandBlock}>
            <Logo height={34} />
            <p className={styles.blurb}>{footer.blurb}</p>
            <address className={styles.contactList}>
              <a href={`mailto:${brand.contact.email}`}>{brand.contact.email}</a>
              <a href={brand.contact.phoneHref}>{brand.contact.phoneDisplay}</a>
            </address>
          </div>

          <div className={styles.columns}>
            {footer.columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className={styles.columnTitle}>{column.title}</h2>
                <ul className={styles.columnList}>
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <p>{footer.copyright(year)}</p>

          <ul className={styles.legalLinks}>
            {footer.legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>

          <ul className={styles.social}>
            {brand.social.map((entry) => (
              <li key={entry.href}>
                <a href={entry.href} target="_blank" rel="noopener noreferrer">
                  {entry.label}
                </a>
              </li>
            ))}
          </ul>

          <p className={styles.builtNote}>{footer.builtNote}</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
