import Image from "next/image";
import Link from "next/link";
import { logo } from "@/assets/logo";
import { navigation } from "@/content/siteContent";
import { routes } from "@/utils/constants";
import clsx from "@/utils/clsx";
import styles from "./Logo.module.css";

/**
 * The logo lockup, used in the header, the footer, and anywhere else the brand
 * appears. Every one of those goes through this component, so replacing the
 * client's mark stays a single edit in assets/logo.js.
 *
 * Sized by HEIGHT — width is derived from the artwork's own aspect ratio, so
 * the mark can never be squashed by a caller passing the wrong pair.
 *
 * No separate text wordmark: the artwork already contains the name. The
 * accessible name comes from the image's alt text (or, when it is a link, from
 * the link label), so the name is still announced exactly once.
 *
 * @param {object} props
 * @param {number} [props.height]  Rendered height in px.
 * @param {boolean} [props.asLink] Wrap in a link to home.
 */
export function Logo({ height = 34, asLink = true, className }) {
  const width = Math.round(height * logo.aspectRatio);

  const image = (
    <Image
      src={logo.src}
      alt={asLink ? "" : logo.alt}
      width={width}
      height={height}
      className={styles.image}
      priority
    />
  );

  if (!asLink) {
    return <span className={clsx(styles.logo, className)}>{image}</span>;
  }

  // The link carries the accessible name, so the image inside it is decorative
  // (alt="") — otherwise the name is announced twice, once for each.
  return (
    <Link
      href={routes.home}
      className={clsx(styles.logo, className)}
      aria-label={navigation.homeLinkLabel}
    >
      {image}
    </Link>
  );
}

export default Logo;
