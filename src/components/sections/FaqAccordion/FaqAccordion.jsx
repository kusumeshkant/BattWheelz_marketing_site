"use client";

import { useState } from "react";
import { home } from "@/content/siteContent";
import { Section, SectionHeader, AnimatedReveal } from "@/components/common";
import clsx from "@/utils/clsx";
import styles from "./FaqAccordion.module.css";


/** Chevron. Decorative — the button's `aria-expanded` carries the state. */
function Chevron({ open }) {
  return (
    <svg
      className={clsx(styles.chevron, open && styles.chevronOpen)}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m5.5 8 4.5 4.5L14.5 8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * FAQ accordion.
 *
 * All panels start collapsed (`openIds` begins as an empty Set), so the
 * section opens as a scannable list of questions rather than a wall of answers.
 *
 * Multiple panels may be open at once. A single-open accordion silently closes
 * the answer someone was reading when they open a second one, which is exactly
 * wrong for a page where a rider is comparing two answers.
 *
 * Accessibility, which is most of the work in an accordion:
 *  - Each trigger is a real `<button>`, so Enter, Space and focus all work
 *    without a keydown handler, and the button is in the tab order by default.
 *  - `aria-expanded` on the trigger announces open/closed state.
 *  - `aria-controls` points at the panel; the panel's `aria-labelledby` points
 *    back at the trigger, so a screen reader landing in the panel knows which
 *    question it answers.
 *  - The panel stays in the DOM when closed (see the `inert` note below), so
 *    its text remains in the server-rendered HTML for crawlers.
 *  - No `role="region"` on the panels: six of them would add six landmarks to
 *    the page for very little benefit, which the ARIA authoring practices warn
 *    against. `aria-controls` carries the association.
 *
 * The heading level is passed down so the questions sit correctly under the
 * section's h2 rather than hardcoding h3 here.
 */
export function FaqAccordion({ content = home.faq, id = "faq", headingLevel = 3 }) {
  const faq = content;
  const [openIds, setOpenIds] = useState(() => new Set());

  const toggle = (id) =>
    setOpenIds((current) => {
      // New Set rather than mutating — React compares by reference.
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const Heading = `h${headingLevel}`;

  return (
    <Section id={id} tone="raised" ariaLabelledBy={`${id}-heading`}>
      <SectionHeader eyebrow={faq.eyebrow} heading={faq.heading} headingId={`${id}-heading`} />

      <AnimatedReveal className={styles.list}>
        {faq.items.map((item, index) => {
          const open = openIds.has(item.id);
          const triggerId = `${id}-trigger-${item.id}`;
          const panelId = `${id}-panel-${item.id}`;

          return (
            <div key={item.id} className={clsx(styles.item, open && styles.itemOpen)}>
              <Heading>
                <button
                  type="button"
                  id={triggerId}
                  className={styles.trigger}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => toggle(item.id)}
                >
                  {/* Numbered from the index, not baked into the copy — the
                      numbering stays correct if questions are reordered or one
                      is removed, and translators never have to maintain it. */}
                  <span className={styles.number} aria-hidden="true">
                    {index + 1}.
                  </span>
                  <span className={styles.question}>{item.question}</span>
                  <Chevron open={open} />
                </button>
              </Heading>

              <div
                id={panelId}
                aria-labelledby={triggerId}
                className={clsx(styles.panel, open && styles.panelOpen)}
              >
                {/*
                  `inert` rather than `hidden`: `hidden` sets display:none, and
                  an element cannot animate out of display:none — the open
                  transition would never run. `inert` takes the closed answer
                  out of the tab order and out of the accessibility tree while
                  leaving it displayed at zero height, so the grid-rows
                  animation still works and the text stays in the HTML for
                  crawlers.
                */}
                <div className={styles.panelInner} inert={!open || undefined}>
                  <p className={styles.answer}>{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </AnimatedReveal>
    </Section>
  );
}

export default FaqAccordion;
