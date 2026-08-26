/**
 * Generates public/og-image.png — the 1200x630 card shown when a Battwheelz
 * link is shared on WhatsApp, LinkedIn, Slack, X, iMessage and so on.
 *
 * Run with:  node scripts/generate-og-image.mjs
 *
 * Everything the card shows comes from a real source rather than a copy:
 *  - colours from `src/theme/colors.js` (that module has no imports, so plain
 *    Node can read it — no mirrored hex block to drift out of date)
 *  - copy from `src/content/ogCard.js` (kept alias-free for the same reason)
 *  - the logo from `src/assets/brand/battwheelz-logo.svg`, the same artwork the
 *    site renders
 *
 * So a rebrand or a headline change regenerates a correct card instead of
 * leaving a stale one. Re-run this after touching any of those three.
 *
 * The logo is composited as a raster layer rather than inlined into the card's
 * SVG: the badge is a 30KB multi-path file, and nesting it would mean managing
 * two coordinate systems and colliding gradient ids for no benefit.
 */

import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { readFileSync } from "node:fs";
import sharp from "sharp";

import { colors, palette } from "../src/theme/colors.js";
import { ogCard } from "../src/content/ogCard.js";

const here = dirname(fileURLToPath(import.meta.url));
const WIDTH = 1200;
const HEIGHT = 630;

/** Generic stack, so the script resolves fonts on any machine. */
const FONT_STACK = "Segoe UI, Inter, Helvetica Neue, Arial, sans-serif";

/* -------------------------------------------------------------------------- */

const LOGO_HEIGHT = 58;
const logoPath = resolve(here, "..", "src", "assets", "brand", "battwheelz-logo.svg");
const logoSvg = readFileSync(logoPath);
// Native artwork is 2150.86 x 607.156.
const logoWidth = Math.round(LOGO_HEIGHT * (2150.86 / 607.156));
const logo = await sharp(logoSvg).resize(logoWidth, LOGO_HEIGHT).png().toBuffer();

/** Splits the headline parts into lines and emits one <text> per line. */
function renderHeadline(parts, x, firstBaseline, lineHeight) {
  const lines = [[]];
  for (const part of parts) {
    if (part.lineBreakBefore) lines.push([]);
    lines[lines.length - 1].push(part);
  }

  return lines
    .map((line, index) => {
      const spans = line
        .map((part) =>
          part.accent
            ? `<tspan fill="url(#brandSweep)">${part.text}</tspan>`
            : `<tspan>${part.text}</tspan>`
        )
        .join("");
      // xml:space="preserve" — without it the renderer collapses the trailing
      // space inside a <tspan>, so "of " + "Everyday" came out as "ofEveryday".
      return `<text x="${x}" y="${firstBaseline + index * lineHeight}" font-family="${FONT_STACK}"
        font-size="72" font-weight="700" fill="${colors.text.inverse}"
        letter-spacing="-2.5" xml:space="preserve">${spans}</text>`;
    })
    .join("\n  ");
}

const proofPoints = ogCard.proofPoints
  .map(
    (label, index) => `
    <g transform="translate(${80 + index * 470} 522)">
      <circle cx="9" cy="-7" r="5" fill="${colors.brand.primary}"/>
      <text x="26" y="0" font-family="${FONT_STACK}" font-size="21" font-weight="600"
            fill="${colors.text.inverseSecondary}">${label}</text>
    </g>`
  )
  .join("");

const card = `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="brandSweep" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${palette.gold[500]}"/>
      <stop offset="100%" stop-color="${palette.ember[400]}"/>
    </linearGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${palette.gold[500]}"/>
      <stop offset="100%" stop-color="${palette.ember[400]}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${palette.gold[500]}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${palette.gold[500]}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- The dark ground is flat black, matching the site's dark surfaces. -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${colors.surface.inverse}"/>
  <circle cx="1030" cy="170" r="420" fill="url(#glow)"/>

  ${renderHeadline(ogCard.headline, 80, 290, 88)}

  <text x="80" y="452" font-family="${FONT_STACK}" font-size="26" font-weight="400"
        fill="${colors.text.inverseSecondary}">${ogCard.supporting}</text>

  ${proofPoints}

  <rect x="0" y="${HEIGHT - 10}" width="${WIDTH}" height="10" fill="url(#rule)"/>
</svg>
`;

const outputPath = resolve(here, "..", "public", "og-image.png");

await sharp(Buffer.from(card))
  // The real badge sits top-left, at the same optical position as the site header.
  .composite([{ input: logo, left: 80, top: 62 }])
  .png({ compressionLevel: 9 })
  .toFile(outputPath);

const meta = await sharp(outputPath).metadata();
console.log(`og-image.png written: ${meta.width}x${meta.height} -> ${outputPath}`);
