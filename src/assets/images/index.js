/**
 * Image registry — the single import point for every site image.
 *
 * Each export is a descriptor `{ src, alt }` where `src` is a Next static
 * import (so width/height/blur data come along automatically and no layout
 * shift occurs) and `alt` is a sensible default. Content may override `alt`
 * per usage; nothing may reference a file path directly.
 *
 * ALL ENTRIES ARE PLACEHOLDERS. Every filename is prefixed `placeholder-`, so
 * `git grep placeholder-` finds everything the client still owes us. Replacing
 * one is: drop the new file in this folder, change the import path below.
 */

import unitOnDarkSrc from "./unit-on-dark.png";
import unitOnLightSrc from "./unit-on-light.jpeg";
import placeholderHeroSrc from "./placeholder-hero.svg";
import placeholderRiderSrc from "./placeholder-rider.svg";
import placeholderFleetSrc from "./placeholder-fleet.svg";
import placeholderHubSrc from "./placeholder-hub.svg";
import placeholderTeamGroupSrc from "./placeholder-team-group.svg";
import placeholderTeam1Src from "./placeholder-team-1.svg";
import placeholderTeam2Src from "./placeholder-team-2.svg";
import placeholderTeam3Src from "./placeholder-team-3.svg";
import placeholderTeam4Src from "./placeholder-team-4.svg";
import placeholderRider1Src from "./placeholder-rider-1.svg";
import placeholderRider2Src from "./placeholder-rider-2.svg";
import placeholderRider3Src from "./placeholder-rider-3.svg";

// Real portraits of real people — no `placeholder-` prefix, deliberately.
import chetanChaturvediSrc from "./portrait-chetan-chaturvedi.jpeg";
import sonikaChaturvediSrc from "./portrait-sonika-chaturvedi.jpeg";
import deepakPatilSrc from "./portrait-deepak-patil.jpeg";
import tejasviKhedekarSrc from "./portrait-tejasvi-khedekar.jpeg";
import naveenKumarSrc from "./portrait-naveen-kumar.jpeg";
import srijanSarkarSrc from "./portrait-srijan-sarkar.jpeg";
import ashishBhatiaSrc from "./portrait-ashish-bhatia.jpeg";
import sanjivMitalSrc from "./portrait-sanjiv-mital.jpeg";
import digbijayaMahapatraSrc from "./portrait-digbijaya-mahapatra.jpg";

/**
 * The unit photograph, supplied in TWO versions — one shot on a dark ground and
 * one on a light ground.
 *
 * This is NOT a light/dark mode: the site has no theme toggle. It is about which
 * version suits the SECTION the photo is placed in. Dropping the light-ground
 * version onto the black hero leaves a white rectangle floating on black; the
 * dark-ground version merges into it. Pick by surface, not by user preference.
 *
 * Use `resolveThemedImage(unitPhoto, "dark" | "light")` at the call site.
 */
export const unitPhoto = {
  onDark: { src: unitOnDarkSrc, alt: "A Battwheelz electric delivery bike" },
  onLight: { src: unitOnLightSrc, alt: "A Battwheelz electric delivery bike" },
};

/**
 * Picks the version matching the surface a themed image is being placed on.
 *
 * A plain function rather than a wrapper component, so callers keep full control
 * of next/image's props — `priority` on the hero's LCP image especially, which a
 * wrapper would have to re-expose one prop at a time.
 *
 * Falls back to the dark version: every themed image on this site so far sits on
 * the dark hero, so an omitted surface should give the common case rather than
 * a broken one.
 */
export function resolveThemedImage(image, surface = "dark") {
  return surface === "light" ? image.onLight : image.onDark;
}

export const placeholderHero = {
  src: placeholderHeroSrc,
  alt: "A Battwheelz electric delivery bike with a rear delivery box, charged and ready to ride",
};

export const placeholderRider = {
  src: placeholderRiderSrc,
  alt: "A gig delivery rider in a helmet and hi-vis jacket",
};

export const placeholderFleet = {
  src: placeholderFleetSrc,
  alt: "A row of Battwheelz electric bikes parked at a service hub",
};

export const placeholderHub = {
  src: placeholderHubSrc,
  alt: "A Battwheelz service and charging hub",
};

export const placeholderTeamGroup = {
  src: placeholderTeamGroupSrc,
  alt: "Illustration of the Battwheelz team standing beside an electric bike",
};

/**
 * Team portraits, indexed 1-4 so `about.team.members` can reference them by
 * position. All four are illustrations, NOT photographs of real people — see
 * the note at the top of each file. Replacing one with a real portrait is a
 * single import swap here plus the member's entry in siteContent.js.
 */
/**
 * Real team portraits, supplied by the client. Keyed by person rather than
 * indexed by position: an index says nothing about who it is, and the previous
 * indexed placeholders were reused across three different people because of it.
 *
 * `alt` is the person's NAME, not a description of the picture — a screen reader
 * should hear what a sighted reader sees, and the name is already the caption.
 */
export const teamPortraits = {
  chetanChaturvedi: { src: chetanChaturvediSrc, alt: "Chetan Chaturvedi" },
  sonikaChaturvedi: { src: sonikaChaturvediSrc, alt: "Sonika Chaturvedi" },
  deepakPatil: { src: deepakPatilSrc, alt: "Deepak Patil" },
  tejasviKhedekar: { src: tejasviKhedekarSrc, alt: "Tejasvi Khedekar" },
  naveenKumar: { src: naveenKumarSrc, alt: "Naveen Kumar" },
  srijanSarkar: { src: srijanSarkarSrc, alt: "Srijan Sarkar" },
  ashishBhatia: { src: ashishBhatiaSrc, alt: "Ashish Bhatia" },
  sanjivMital: { src: sanjivMitalSrc, alt: "Sanjiv Mital" },
  digbijayaMahapatra: { src: digbijayaMahapatraSrc, alt: "Digbijaya Mahapatra" },
};

export const placeholderTeamAvatars = [
  { src: placeholderTeam1Src, alt: "Illustrated placeholder portrait" },
  { src: placeholderTeam2Src, alt: "Illustrated placeholder portrait" },
  { src: placeholderTeam3Src, alt: "Illustrated placeholder portrait" },
  { src: placeholderTeam4Src, alt: "Illustrated placeholder portrait" },
  { src: placeholderTeam4Src, alt: "Illustrated placeholder portrait" },
  { src: placeholderTeam4Src, alt: "Illustrated placeholder portrait" },
];

/**
 * Rider portraits for the testimonials. Deliberately a SEPARATE set from the
 * team avatars — reusing the same four illustrations as both staff and
 * customers on one site reads as an oversight.
 */
export const placeholderRiderAvatars = [
  { src: placeholderRider1Src, alt: "Illustrated placeholder portrait of a rider" },
  { src: placeholderRider2Src, alt: "Illustrated placeholder portrait of a rider" },
  { src: placeholderRider3Src, alt: "Illustrated placeholder portrait of a rider" },
];

const images = {
  unitPhoto,
  placeholderHero,
  placeholderRider,
  placeholderFleet,
  placeholderHub,
  placeholderTeamGroup,
  placeholderTeamAvatars,
  teamPortraits,
  placeholderRiderAvatars,
};

export default images;
