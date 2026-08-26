import Image from "next/image";
import { about } from "@/content/pagesContent";
import { Section, Eyebrow, AnimatedReveal } from "@/components/common";
import styles from "./AboutStory.module.css";

const { story } = about;

/**
 * The founding story: centred prose, then a full-width image.
 *
 * `body` is an array of paragraphs rather than one string with newlines in it —
 * copy decides where the breaks fall, and the component just maps.
 */
export function AboutStory() {
  return (
    <Section id="story" ariaLabelledBy="story-heading">
      <AnimatedReveal className={styles.wrap}>
        <Eyebrow>{story.eyebrow}</Eyebrow>
        <h2 id="story-heading">{story.heading}</h2>
        {story.body.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className={styles.body}>
            {paragraph}
          </p>
        ))}
      </AnimatedReveal>

      <AnimatedReveal className={styles.media} delay={0.1}>
        {/* <Image
          src={story.image.src}
          alt={story.image.alt}
          className={styles.image}
          sizes="(min-width: 1216px) 1152px, 100vw"
        /> */}
      </AnimatedReveal>
    </Section>
  );
}

export default AboutStory;
