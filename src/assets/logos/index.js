/**
 * Partner logo registry — the single import point for third-party marks.
 *
 * Keyed by the EXACT partner name as written in `siteContent.js`, so content
 * stays a plain list of names and this file decides which of those names has
 * artwork. A name with no entry here renders as a text chip, which is the
 * intended fallback rather than a gap: see `PartnerChips`.
 *
 * Each export is `{ src, alt }` where `src` is a Next static import (width and
 * height ride along, so a chip never shifts as the image loads).
 *
 * Artwork was supplied by the client (`partner_logo_images/Website Logo1.docx`).
 * Each file here has been trimmed of its baked-in margin, scaled so its area
 * matches the others, and centred on a shared 3:1 plate — which is what lets
 * every chip give every mark ONE identical box without a per-logo tweak. Regen
 * them with `scripts/normalise-partner-logos.py`. Anything the client did not
 * supply is deliberately absent below, and renders as a name chip instead.
 */

import altmobilitySrc from "./altmobility.png";
import amazonSrc from "./amazon.png";
import astranovaSrc from "./astranova.png";
import autovertSrc from "./autovert.png";
import batterysmartSrc from "./batterysmart.png";
import bbnowSrc from "./bbnow.png";
import bgSrc from "./bg.png";
import blinkitSrc from "./blinkit.png";
import boltearthSrc from "./boltearth.png";
import delhiverySrc from "./delhivery.png";
import flipkartminutesSrc from "./flipkartminutes.png";
import iciciSrc from "./icici.png";
import indofastSrc from "./indofast.png";
import instamartSrc from "./instamart.png";
import intellicarSrc from "./intellicar.png";
import kazamSrc from "./kazam.png";
import lectrixSrc from "./lectrix.png";
import liciousSrc from "./licious.png";
import loconavSrc from "./loconav.png";
import pidgeSrc from "./pidge.png";
import rapidoSrc from "./rapido.png";
import swiggySrc from "./swiggy.png";
import zeptoSrc from "./zepto.png";
import zomatoSrc from "./zomato.png";

/**
 * `alt` names the company, because that is exactly what a sighted reader gets
 * from the mark. It is not a description of the artwork — "red circle with a
 * lightning bolt" tells a screen-reader user nothing about who the partner is.
 */
export const partnerLogos = {
  // Delivery and commerce
  Blinkit: { src: blinkitSrc, alt: "Blinkit logo" },
  "BB Now": { src: bbnowSrc, alt: "BB Now logo" },
  Swiggy: { src: swiggySrc, alt: "Swiggy logo" },
  Zepto: { src: zeptoSrc, alt: "Zepto logo" },
  Rapido: { src: rapidoSrc, alt: "Rapido logo" },
  Licious: { src: liciousSrc, alt: "Licious logo" },
  Amazon: { src: amazonSrc, alt: "Amazon logo" },
  "Flipkart Minutes": { src: flipkartminutesSrc, alt: "Flipkart Minutes logo" },
  Delhivery: { src: delhiverySrc, alt: "Delhivery logo" },
  Pidge: { src: pidgeSrc, alt: "Pidge logo" },
  Zomato: { src: zomatoSrc, alt: "Zomato logo" },
  Instamart: { src: instamartSrc, alt: "Instamart logo" },

  // EV OEM and telematics
  Lectrix: { src: lectrixSrc, alt: "Lectrix logo" },
  Intellicar: { src: intellicarSrc, alt: "Intellicar logo" },
  BG: { src: bgSrc, alt: "BGauss logo" },
  LocoNav: { src: loconavSrc, alt: "LocoNav logo" },

  // Capital
  "ICICI Bank": { src: iciciSrc, alt: "ICICI Bank logo" },
  "alt.mobility": { src: altmobilitySrc, alt: "alt.mobility logo" },
  AUTOVERT: { src: autovertSrc, alt: "AUTOVERT logo" },
  Astranova: { src: astranovaSrc, alt: "Astranova Mobility logo" },

  // Energy infrastructure
  Kazam: { src: kazamSrc, alt: "Kazam logo" },
  "Battery Smart": { src: batterysmartSrc, alt: "Battery Smart logo" },
  "Indofast Energy": { src: indofastSrc, alt: "Indofast Energy logo" },
  "Bolt.Earth": { src: boltearthSrc, alt: "Bolt.Earth logo" },
};

export default partnerLogos;
