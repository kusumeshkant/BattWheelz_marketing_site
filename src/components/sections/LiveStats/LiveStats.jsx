import { home } from "@/content/siteContent";
import { Container, StatBand } from "@/components/common";
import styles from "./LiveStats.module.css";

const { liveStats } = home;

/**
 * The live stats band on the home page.
 *
 * Thin: the count-up behaviour, formatting and screen-reader treatment all live
 * in the shared `StatBand` primitive. This only supplies the content and the
 * dark full-bleed ground.
 */
export function LiveStats() {
  return (
    <section className={styles.band} aria-label={liveStats.srLabel}>
      <Container>
        <StatBand items={liveStats.items} tone="dark" dividers />
      </Container>
    </section>
  );
}

export default LiveStats;
