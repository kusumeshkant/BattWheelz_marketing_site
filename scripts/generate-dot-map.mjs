/**
 * Generates the dot-grid world map used by the coverage section.
 *
 * ORIGINAL ARTWORK. The continent outlines below are coarse polygons written by
 * hand from general world geography — nothing is traced, copied or derived from
 * a third-party map file, dataset or image. They are deliberately simplified:
 * the goal is a silhouette that reads as "the world" at a glance, not an atlas.
 *
 * Method: rasterise the polygons onto a lon/lat grid, keep the cells that fall
 * on land, and project each to x/y with a plain equirectangular projection.
 * Output is a plain data module the component renders — so the map costs no
 * runtime geometry work and no mapping dependency.
 *
 * Run:  node scripts/generate-dot-map.mjs
 */

import { writeFileSync } from "fs";

/* Grid resolution in degrees. Lower = denser dots and a heavier DOM. */
const STEP = 3.6;

/* Visible window. Antarctica is cropped — it adds a band of dots and no meaning. */
const LON_MIN = -170, LON_MAX = 180;
const LAT_MIN = -56, LAT_MAX = 78;

/** [lon, lat] rings. Coarse by design. */
const LAND = [
  // North America
  [[-168,65],[-160,71],[-140,70],[-125,70],[-110,68],[-95,68],[-85,70],[-80,73],[-70,68],
   [-60,58],[-55,52],[-65,45],[-70,42],[-75,35],[-81,25],[-85,30],[-90,29],[-97,26],[-97,22],
   [-105,20],[-110,24],[-115,30],[-124,35],[-125,45],[-130,55],[-140,60],[-150,60],[-165,60]],
  // Central America
  [[-92,17],[-84,15],[-79,9],[-77,8],[-83,8],[-88,13],[-92,15]],
  // Greenland
  [[-45,60],[-55,70],[-45,80],[-25,82],[-20,72],[-30,62]],
  // South America
  [[-77,8],[-72,11],[-60,10],[-52,5],[-50,0],[-44,-2],[-35,-5],[-35,-8],[-39,-13],[-48,-25],
   [-53,-34],[-58,-38],[-62,-40],[-65,-45],[-68,-52],[-74,-52],[-73,-45],[-71,-30],[-70,-18],
   [-75,-14],[-80,-5],[-79,2]],
  // Africa
  [[-17,15],[-16,20],[-10,26],[0,31],[10,34],[20,32],[25,32],[32,31],[35,25],[39,15],[43,11],
   [51,12],[48,5],[41,-2],[40,-10],[35,-18],[32,-26],[28,-33],[20,-35],[18,-30],[14,-22],
   [12,-15],[9,-2],[9,4],[3,6],[-5,5],[-13,9]],
  // Madagascar
  [[44,-12],[50,-15],[48,-25],[44,-22]],
  // Europe + Asia as one landmass
  [[-10,36],[-9,43],[-2,48],[2,51],[8,54],[10,58],[8,62],[18,69],[30,70],[45,72],[60,73],
   [75,76],[100,77],[115,75],[130,73],[145,72],[160,70],[172,67],[178,65],[165,60],[150,59],
   [142,54],[135,48],[130,43],[126,38],[122,32],[118,24],[110,21],[105,10],[100,6],[98,8],
   [97,16],[94,20],[90,22],[88,21],[80,15],[77,8],[72,20],[68,24],[62,25],[58,23],[50,28],
   [44,38],[36,40],[28,41],[23,40],[18,40],[14,38],[12,45],[6,44],[0,42],[-6,37]],
  // British Isles
  [[-6,50],[-6,58],[-2,58],[0,53],[-2,51]],
  // Japan
  [[130,32],[137,36],[142,42],[146,45],[143,40],[138,35],[133,33]],
  // Indonesia / Malay archipelago
  [[95,6],[105,2],[118,0],[128,2],[140,-2],[140,-8],[130,-8],[118,-8],[108,-7],[98,0]],
  // Philippines
  [[120,6],[126,8],[126,16],[121,18],[119,12]],
  // Australia
  [[113,-22],[114,-35],[118,-35],[129,-32],[137,-35],[145,-38],[150,-37],[153,-28],[146,-19],
   [142,-11],[135,-12],[130,-11],[125,-14],[117,-20]],
  // New Zealand
  [[166,-46],[174,-41],[178,-37],[173,-34],[167,-43]],
];

/** Ray-casting point-in-polygon. */
function inside(lon, lat, ring) {
  let hit = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if ((yi > lat) !== (yj > lat) && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

const W = 1000;
const H = Math.round((W * (LAT_MAX - LAT_MIN)) / (LON_MAX - LON_MIN));
const project = (lon, lat) => [
  ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * W,
  ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * H,
];

const dots = [];
for (let lat = LAT_MAX; lat >= LAT_MIN; lat -= STEP) {
  for (let lon = LON_MIN; lon <= LON_MAX; lon += STEP) {
    if (!LAND.some((ring) => inside(lon, lat, ring))) continue;
    const [x, y] = project(lon, lat);
    dots.push([Math.round(x * 10) / 10, Math.round(y * 10) / 10]);
  }
}

const out = `/**
 * GENERATED FILE — do not edit by hand.
 * Run \`node scripts/generate-dot-map.mjs\` to regenerate.
 *
 * Original artwork: a dot-grid world silhouette rasterised from coarse,
 * hand-written continent polygons. Nothing here is traced or derived from a
 * third-party map file or dataset. See the generator for the polygons.
 */

/** viewBox dimensions the dots are laid out in. */
export const MAP_WIDTH = ${W};
export const MAP_HEIGHT = ${H};

/** Longitude/latitude window, for placing markers with the same projection. */
export const MAP_BOUNDS = { lonMin: ${LON_MIN}, lonMax: ${LON_MAX}, latMin: ${LAT_MIN}, latMax: ${LAT_MAX} };

/** Projects [lon, lat] into the map's coordinate space. */
export function projectLonLat(lon, lat) {
  const { lonMin, lonMax, latMin, latMax } = MAP_BOUNDS;
  return [
    ((lon - lonMin) / (lonMax - lonMin)) * MAP_WIDTH,
    ((latMax - lat) / (latMax - latMin)) * MAP_HEIGHT,
  ];
}

/** [x, y] per land dot. */
export const MAP_DOTS = ${JSON.stringify(dots)};

export default MAP_DOTS;
`;

writeFileSync("src/assets/worldDotMap.js", out);
console.log(`worldDotMap.js written: ${dots.length} dots, viewBox ${W}x${H}`);
