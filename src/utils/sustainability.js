/**
 * The live sustainability projection — its inputs, and the per-second rates
 * derived from them.
 *
 * Pure: no React, no DOM, and deliberately no clock. This file only says how
 * fast each figure moves; `useLiveCounter` is what reads the time.
 *
 * SINGLE SOURCE OF TRUTH. Every number the Impact tracker shows is computed
 * from `assumptions` below — nothing downstream hardcodes a rate, a fleet size
 * or a fuel price. Change an assumption here and all four counters follow.
 *
 * WHAT THIS IS, AND IS NOT. These are FLEET AVERAGES extrapolated over elapsed
 * time, not metered telemetry. The marketing site has no backend and reads no
 * vehicle data; the counters are an honest projection and the UI labels them as
 * one. Do not reword the tracker's caption into a claim of measured data.
 *
 * It replaces the earlier static row (48M km / Rs 9.2Cr / 7,400t) that the
 * client supplied and confirmed. Those figures are gone on purpose — see the
 * note above `impactPage.environmental` in pagesContent.js.
 */

/**
 * Every input, in one frozen object so a stray assignment cannot rewrite the
 * fleet's fuel price at runtime.
 *
 * `secondsPerMonth` assumes a 30-day month. That is the assumption the client's
 * own figures were built on, so it stays — a calendar-accurate month would put
 * these counters slightly out of step with the numbers they quote elsewhere.
 */
export const assumptions = Object.freeze({
  fleetSize: 2400,
  kmPerVehiclePerMonth: 4000,
  petrolPricePerLitre: 105,
  mileageKmPerLitre: 40,
  emissionFactorKgPerLitre: 2.31,
  secondsPerMonth: 30 * 24 * 60 * 60,
});

// Computed once at module load, not per frame: the rAF loop reads these sixty
// times a second and none of them can change while the page is open.
const kmPerSecond =
  (assumptions.fleetSize * assumptions.kmPerVehiclePerMonth) / assumptions.secondsPerMonth;

const litresPerSecond = kmPerSecond / assumptions.mileageKmPerLitre;

const co2KgPerSecond = litresPerSecond * assumptions.emissionFactorKgPerLitre;

const costPerSecond = litresPerSecond * assumptions.petrolPricePerLitre;

/** Grams are never shown; the row renders tonnes, so the conversion lives here. */
const KG_PER_TONNE = 1000;

/**
 * The four rates, each already in the unit its counter displays.
 *
 * `co2Kg` is the rate the emissions factor actually produces and is kept as the
 * readable statement of the formula; `co2Tonnes` is what the row renders, so no
 * component has to carry a bare `/ 1000`.
 */
export const ratesPerSecond = Object.freeze({
  km: kmPerSecond,
  litres: litresPerSecond,
  co2Kg: co2KgPerSecond,
  co2Tonnes: co2KgPerSecond / KG_PER_TONNE,
  rupees: costPerSecond,
});

/**
 * Where the projection counts from — the start of the current financial year.
 *
 * A fixed, recent date, NOT the company's founding: the counters are a
 * projection of current fleet activity, and running one back to inception would
 * dress an extrapolation up as a cumulative historical total.
 *
 * `Date.UTC` rather than a parsed string so the build machine's timezone can
 * never shift the epoch relative to a visitor's.
 */
export const PROJECTION_EPOCH_MS = Date.UTC(2026, 3, 1); // 1 April 2026, 00:00 UTC

/**
 * The instant the pre-hydration render uses.
 *
 * The site is a static export: the HTML is generated at build time and hydrated
 * later on a machine whose clock says something else. If the first client render
 * called `Date.now()` it would disagree with the baked-in markup and React would
 * throw a hydration mismatch — so both renders agree on this fixed instant, and
 * the live clock takes over on the frame after mount.
 *
 * It is also what a crawler and any JS-less visitor read, which is why it is a
 * real figure rather than a zero. Bump it whenever this page's copy is next
 * revised; nothing breaks if it drifts, the number just reads a little low
 * before the counters start.
 */
export const PRERENDER_REFERENCE_MS = Date.UTC(2026, 7, 29); // 29 August 2026, 00:00 UTC

export default ratesPerSecond;
