import Image from "next/image";
import { about } from "@/content/siteContent";
import { Icon } from "@/assets/icons";
import { Section, SectionHeader, Stagger, StaggerItem, AnimatedReveal } from "@/components/common";
import clsx from "@/utils/clsx";
import styles from "./TeamGrid.module.css";

const { team } = about;

/**
 * Maps a social network to an icon.
 *
 * Deliberately GENERIC glyphs rather than the platforms' own marks: the
 * project's branding rule forbids third-party logos, and reusing an unrelated
 * icon (a chart for LinkedIn, say) is worse than a neutral one — it tells the
 * reader something untrue about where the link goes.
 */
const SOCIAL_ICONS = {
  linkedin: "link",
  instagram: "link",
  email: "mail",
};

/**
 * One social button.
 *
 * Renders an `<a>` when there is a URL and an inert `<span>` when there is not.
 * A placeholder profile has no real profile to link to, and an `href="#"` that
 * silently does nothing is worse than no link — it is in the tab order, it
 * announces as a link, and it takes a keyboard user nowhere.
 */
function Social({ network, href, personName }) {
  const icon = SOCIAL_ICONS[network] ?? "bolt";

  if (!href) {
    return (
      <span className={clsx(styles.social, styles.socialInert)} aria-hidden="true">
        <Icon name={icon} size={18} />
      </span>
    );
  }

  return (
    <a
      className={styles.social}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      // The icon is decorative, so the link needs its own accessible name —
      // and "LinkedIn" four times over is useless without the person's name.
      aria-label={`${personName} on ${network}`}
    >
      <Icon name={icon} size={18} />
    </a>
  );
}

/**
 * Meet the team.
 *
 * Real people: names, roles, bios and photographs are all client-supplied. The
 * placeholder notice this section used to carry has been removed along with the
 * illustrated stand-ins it described — if placeholder profiles ever come back,
 * the notice has to come back with them.
 *
 * Three labelled groups under one section: founders (round portraits), the
 * wider team, and mentors (stacked full-width cards).
 *
 * Card structure: portrait left, text right — name, role, bio, social buttons.
 * Every field below `name` is optional and renders only when present.
 */
export function TeamGrid() {
  return (
    <Section id="team" tone="raised" ariaLabelledBy="team-heading">
      <SectionHeader
        eyebrow={team.eyebrow}
        heading={team.heading}
        subheading={team.subheading}
        headingId="team-heading"
      />

      <TeamGroup
        heading={team.foundersHeading}
        headingId="team-founders-heading"
        people={team.founders}
        roundAvatars
      />

      <TeamGroup
        heading={team.membersHeading}
        headingId="team-members-heading"
        people={team.members}
        autoHeight
      />

      <TeamGroup
        heading={team.mentorHeading}
        headingId="team-mentors-heading"
        people={team.mentor}
        stacked
      />
    </Section>
  );
}

/**
 * One labelled group of people — a sub-heading and its own grid.
 *
 * Both groups render through this, so founders and the wider team cannot drift
 * apart in card design. Two permitted differences: `roundAvatars` (founders)
 * Everything else is driven by which fields a person actually carries —
 * mentors show no social buttons because they have no `socials`, not because
 * a flag hides them. The heading is an `h3`: SectionHeader above already owns
 * the section's `h2`, and each grid names itself with `aria-labelledby` so the
 * two lists are distinguishable to a screen reader rather than reading as one.
 */
function TeamGroup({
  heading,
  headingId,
  people,
  roundAvatars = false,
  stacked = false,
  autoHeight = false,
}) {
  return (
    <div className={styles.group}>
      <AnimatedReveal
        as="h3"
        id={headingId}
        className={styles.groupHeading}
      >
        {heading}
      </AnimatedReveal>

      <Stagger
        className={clsx(styles.grid, stacked && styles.gridStacked, autoHeight && styles.gridAutoHeight)}
        stagger={0.09}
        aria-labelledby={headingId}
      >
        {people.map((member) => (
          <StaggerItem key={member.id}>
            <article
              className={clsx(
                styles.card,
                roundAvatars && styles.cardRound
              )}
            >
              <div className={styles.photoWrap}>
                <Image
                  src={member.avatar.src}
                  alt={member.avatar.alt}
                  className={styles.photo}
                  // Optional per-person crop override; falls back to the
                  // face-biased default in the stylesheet.
                  style={member.photoPosition ? { objectPosition: member.photoPosition } : undefined}
                  sizes="(min-width: 900px) 200px, 42vw"
                />
              </div>

              <div className={styles.info}>
                <h4 className={styles.name}>
                  {member.name}
                </h4>

                {/* Show role only if it exists */}
                {member.role && (
                  <p className={styles.role}>
                    {member.role}
                  </p>
                )}

                {member.bio && (
                  <p className={styles.bio}>
                    {member.bio}
                  </p>
                )}

                {member.socials?.length > 0 && (
                  <div className={styles.socials}>
                    {member.socials.map((social) => (
                      <Social
                        key={social.network}
                        network={social.network}
                        href={social.href}
                        personName={member.name}
                      />
                    ))}
                  </div>
                )}
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

export default TeamGrid;
