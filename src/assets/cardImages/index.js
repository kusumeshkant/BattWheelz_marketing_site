/**
 * "What you get" card photography — the single import point for the six tiles.
 *
 * Keyed by the EXACT card title as written in `siteContent.js`, exactly as
 * `assets/logos/index.js` keys partner artwork by partner name. Content stays a
 * plain list of cards and this file decides which of them has a photo; a title
 * with no entry here falls back to its icon tile, which is the intended
 * behaviour rather than a gap (see `Card`'s media band).
 *
 * Each export is `{ src, alt }` where `src` is a Next static import, so width
 * and height ride along and a tile never shifts as the image loads.
 *
 * Artwork was supplied by the client and approved per card in
 * `what_you _get_section Images/Card_Image_Selection_for_Client_Review.docx`.
 * Each file here is centre-cropped to the tile's 16:9 and resized to 900px wide
 * — regenerate with `scripts/normalise-card-images.py`, which records the
 * client's pick as an OPTION NUMBER and re-derives the source filename with the
 * same ordering the review document used.
 */

import insuranceAndRecoverySrc from "./insurance-and-recovery.webp";
import liveGpsTrackingSrc from "./live-gps-tracking.webp";
import vehicleAndBatterySrc from "./vehicle-and-battery.webp";
import riderSupportSrc from "./rider-support.webp";
import servicingAndMaintenanceSrc from "./servicing-and-maintenance.webp";
import aRateThatCannotMoveSrc from "./a-rate-that-cannot-move.webp";

/**
 * `alt` is empty on purpose, and this is the one decision here worth reading.
 *
 * Unlike a partner chip — where the logo IS the content and its `alt` is the
 * only thing a screen-reader user gets — each of these photos sits inside a
 * card that already states its title and a full sentence of body copy. The
 * photo illustrates that text; it does not add to it. Giving it a description
 * would make the whole card announce the same idea twice ("A Battwheelz bike
 * with its battery pack… Vehicle and battery… A road-ready electric
 * two-wheeler with its battery pack…"), which is noise, not access.
 *
 * So the images are marked decorative and the card's own text carries the
 * meaning. If a photo is ever used somewhere its text is NOT adjacent, give it
 * a real description at that call site rather than changing it here.
 */
export const cardImages = {
  "Vehicle and battery": { src: vehicleAndBatterySrc, alt: "" },
  "Servicing and maintenance": { src: servicingAndMaintenanceSrc, alt: "" },
  "Insurance and recovery": { src: insuranceAndRecoverySrc, alt: "" },
  "Live GPS tracking": { src: liveGpsTrackingSrc, alt: "" },
  "A rate that cannot move": { src: aRateThatCannotMoveSrc, alt: "" },
  "Rider support": { src: riderSupportSrc, alt: "" },
};

export default cardImages;
