import { home } from "@/content/siteContent";
import Image from "next/image";
import { Icon } from "@/assets/icons";
import { Section, SectionHeader, StarRating, Stagger, StaggerItem } from "@/components/common";
import styles from "./Testimonials.module.css";


/**
 * Rider testimonials.
 *
 * ================== THESE QUOTES ARE INVENTED PLACEHOLDERS ==================
 * There are no real Battwheelz riders yet. Every quote, name and figure here
 * was written to demonstrate the layout.
 *
 * The section therefore renders a visible notice saying so. That is not
 * decoration and should not be removed to "clean up the design" — presenting a
 * fabricated endorsement as a genuine one is a consumer-protection issue, and
 * the notice is what keeps this section honest until real, consented rider
 * stories replace the content in siteContent.js. Delete `placeholderNotice`
 * from content at the same time as the quotes, and this disappears on its own.
 * ===========================================================================
 */
export function Testimonials({ content = home.testimonials, id = "testimonials" }) {
  const testimonials = content;
  return (
    <Section id={id} ariaLabelledBy={`${id}-heading`}>
      <SectionHeader
        eyebrow={testimonials.eyebrow}
        heading={testimonials.heading}
        headingId={`${id}-heading`}
      />

      {testimonials.placeholderNotice ? (
        <p className={styles.notice}>
          <Icon name="bolt" size={16} />
          {testimonials.placeholderNotice}
        </p>
      ) : null}

      <Stagger className={styles.grid} stagger={0.09}>
        {testimonials.items.map((item) => (
          <StaggerItem key={item.id}>
            {/* <figure>/<blockquote>/<figcaption> is the correct structure for
                a quotation with an attribution — it ties the two together for
                assistive tech rather than leaving them as adjacent text. */}
            <figure className={styles.card}>
              {/* Sits half outside the card; the wrapper reserves the space so
                  the overlap never collides with the text below. */}
              <span className={styles.avatarWrap}>
                <Image
                  src={item.avatar.src}
                  alt={item.avatar.alt}
                  className={styles.avatar}
                  sizes="96px"
                />
              </span>

              <figcaption className={styles.person}>
                <span className={styles.name}>{item.name}</span>
                <StarRating value={item.rating} />
                <span className={styles.role}>{item.role}</span>
              </figcaption>

              <blockquote className={styles.quote}>{item.quote}</blockquote>
              <span className={styles.metric}>{item.metric}</span>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

export default Testimonials;
