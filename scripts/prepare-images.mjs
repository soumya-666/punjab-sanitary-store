// Crops, colour-grades and exports the supplied source imagery into public/images.
//
//   node scripts/prepare-images.mjs "<folder containing the source images>"
//
// Crops deliberately exclude text and logos that were baked into the source
// renders, so every exported image is clean photography. next/image then
// generates the responsive AVIF/WebP variants at request time.
//
// The two home hero photographs are kept in this project, in assets/hero
// (hero-desktop.webp and hero-mobile.webp). Replace those files and re-run
// this script to change the hero. If their proportions or contents change,
// update the "Hero motion" positions in styles/globals.css as well.
//
// Golden-hour grade
// -----------------
// The hero photograph sets the look of the whole site: taupe stone, walnut
// timber and amber light. The other source pictures were made in cool, neutral
// light, so each one is graded toward the hero before export — white balance
// pulled warm, a pool of low sunlight laid in from the window side and the
// corners deepened. `grade` is the strength: 1 for the grey showroom renders,
// less for pictures that are already warm and for the real photographs (which
// should stay recognisably the real showroom), 0 to leave a picture untouched.

import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { isAbsolute, join, resolve } from "node:path";

const SOURCE_DIR = resolve(process.argv[2] ?? "../Home Image");
const OUT_DIR = resolve("public/images");
const HERO_DIR = resolve("assets/hero");

/** Small crops are enlarged so they hold up on high-density screens. */
const MIN_LONG_EDGE = 1400;

const SRC = {
  reference: "ChatGPT Image Sep 30, 2026, 11_52_33 AM.png",
  bathroom: "ChatGPT Image Sep 30, 2026, 12_06_10 PM.png",
  heroDesktop: join(HERO_DIR, "hero-desktop.webp"),
  heroMobile: join(HERO_DIR, "hero-mobile.webp"),
  sanitaryWall: "ChatGPT Image Sep 30, 2026, 12_12_46 PM.png",
  mirrors: "ChatGPT Image Sep 30, 2026, 12_24_33 PM.png",
  showers: "ChatGPT Image Sep 30, 2026, 12_26_10 PM.png",
  basins: "ChatGPT Image Sep 30, 2026, 12_31_36 PM.png",
  vanities: "ChatGPT Image Sep 30, 2026, 12_36_04 PM.png",
  floorA: "rawparts 1.webp",
  floorB: "raw parts 2.webp",
};

/** { name, src, crop?: {left, top, width, height}, grade?: 0…1, light?: "left" | "right" } */
const JOBS = [
  // Home hero — one composition for wide screens, one for phones. Never graded:
  // they are the reference everything else is matched to.
  { name: "hero-bathroom", src: "heroDesktop" },
  { name: "hero-bathroom-portrait", src: "heroMobile" },

  // Details cut from the phone hero photograph.
  { name: "bath-candlelight", src: "heroMobile", crop: { left: 0, top: 1070, width: 500, height: 470 } },
  { name: "vanity-garden-light", src: "heroMobile", crop: { left: 96, top: 560, width: 460, height: 560 } },
  { name: "rain-shower-glass", src: "heroMobile", crop: { left: 500, top: 310, width: 441, height: 800 } },

  // Reference image: the text-free band (basin, lit stone wall, wall-hung WC).
  { name: "stone-wall-basin-wc", src: "reference", crop: { left: 0, top: 398, width: 1671, height: 364 }, grade: 0.25 },

  // The same bathroom as the hero in softer light, and details cut from it.
  { name: "bathroom-daylight", src: "bathroom", grade: 0.6 },
  { name: "vanity-oak-stone", src: "bathroom", crop: { left: 0, top: 230, width: 720, height: 660 }, grade: 0.6, light: "left" },
  { name: "shower-enclosure", src: "bathroom", crop: { left: 716, top: 0, width: 440, height: 720 }, grade: 0.6 },
  { name: "bathtub-detail", src: "bathroom", crop: { left: 880, top: 440, width: 656, height: 584 }, grade: 0.6 },
  { name: "mirror-backlit", src: "bathroom", crop: { left: 96, top: 30, width: 520, height: 540 }, grade: 0.6 },
  { name: "wc-stone-niche", src: "bathroom", crop: { left: 1140, top: 215, width: 330, height: 470 }, grade: 0.6 },

  // Showroom displays.
  { name: "showroom-sanitaryware-wall", src: "sanitaryWall", grade: 1, light: "left" },
  { name: "toilets-display", src: "sanitaryWall", crop: { left: 150, top: 470, width: 1150, height: 520 }, grade: 1, light: "left" },
  { name: "faucets-mixers-wall", src: "sanitaryWall", crop: { left: 300, top: 150, width: 760, height: 470 }, grade: 1, light: "left" },
  { name: "led-mirrors-display", src: "mirrors", grade: 1 },
  { name: "showers-display", src: "showers", grade: 1 },
  { name: "showers-matte-black", src: "showers", crop: { left: 20, top: 0, width: 620, height: 1000 }, grade: 1 },
  { name: "wash-basins-display", src: "basins", crop: { left: 0, top: 290, width: 1448, height: 796 }, grade: 1, light: "left" },
  { name: "wash-basins-closeup", src: "basins", crop: { left: 0, top: 600, width: 1100, height: 486 }, grade: 1, light: "left" },
  { name: "vanity-units-display", src: "vanities", crop: { left: 0, top: 185, width: 1448, height: 901 }, grade: 1 },
  { name: "vanity-accessories-detail", src: "vanities", crop: { left: 630, top: 560, width: 470, height: 520 }, grade: 1 },
  { name: "led-mirror-vanity", src: "vanities", crop: { left: 40, top: 185, width: 600, height: 760 }, grade: 1 },

  // Photographs taken in the showroom — graded lightly, so they stay true to the room.
  { name: "showroom-floor-01", src: "floorA", grade: 0.75, light: "left" },
  { name: "showroom-floor-02", src: "floorB", grade: 0.75, light: "left" },
  { name: "faucets-wall-detail", src: "floorB", crop: { left: 0, top: 30, width: 574, height: 480 }, grade: 0.75, light: "left" },
];

const path = (key) => (isAbsolute(SRC[key]) ? SRC[key] : join(SOURCE_DIR, SRC[key]));

/** Warm white balance, then low sunlight from one side and deeper corners. */
async function goldenHour(buffer, strength, light) {
  const { width, height } = await sharp(buffer).metadata();
  const s = strength;

  const toned = await sharp(buffer)
    .recomb([
      [1 + 0.1 * s, 0.05 * s, 0],
      [0.02 * s, 1 - 0.02 * s, 0],
      [0, 0.04 * s, 1 - 0.24 * s],
    ])
    .linear([1.04, 1.02, 1], [-4 * s, -5 * s, -6 * s])
    .modulate({ saturation: 1 + 0.14 * s, brightness: 1.02 })
    .toBuffer();

  const cx = light === "left" ? "12%" : "88%";
  const svg = (body) =>
    Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${body}</svg>`);

  const sunlight = svg(`<defs><radialGradient id="g" cx="${cx}" cy="18%" r="90%">
      <stop offset="0" stop-color="#ffd9a0" stop-opacity="${0.42 * s}"/>
      <stop offset="0.55" stop-color="#ffb870" stop-opacity="${0.1 * s}"/>
      <stop offset="1" stop-color="#ffb870" stop-opacity="0"/>
    </radialGradient></defs><rect width="100%" height="100%" fill="url(#g)"/>`);

  const corners = svg(`<defs><radialGradient id="v" cx="50%" cy="46%" r="78%">
      <stop offset="0.55" stop-color="#1b120c" stop-opacity="0"/>
      <stop offset="1" stop-color="#1b120c" stop-opacity="${0.4 * s}"/>
    </radialGradient></defs><rect width="100%" height="100%" fill="url(#v)"/>`);

  return sharp(toned)
    .composite([
      { input: sunlight, blend: "soft-light" },
      { input: corners, blend: "over" },
    ])
    .png()
    .toBuffer();
}

await mkdir(OUT_DIR, { recursive: true });

for (const { name, src, crop, grade = 0, light = "right" } of JOBS) {
  let image = sharp(path(src));
  if (crop) image = image.extract(crop);
  let buffer = await image.png().toBuffer();

  if (grade > 0) buffer = await goldenHour(buffer, grade, light);

  // Enlarge small crops, then restore a little of the edge the resampling softens.
  const { width, height } = await sharp(buffer).metadata();
  const scale = Math.min(2, MIN_LONG_EDGE / Math.max(width, height));
  let output = sharp(buffer);
  if (crop && scale > 1.05) {
    output = output
      .resize({ width: Math.round(width * scale), kernel: "lanczos3" })
      .sharpen({ sigma: 0.7, m1: 0.6, m2: 1.4 });
  }

  const info = await output.jpeg({ quality: 90, mozjpeg: true }).toFile(join(OUT_DIR, `${name}.jpg`));
  console.log(`${name}.jpg  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}kB`);
}

// Social share image (Open Graph / Twitter), 1200×630.
const og = await sharp(SRC.heroDesktop)
  .resize({ width: 1200, height: 630, fit: "cover", position: "centre" })
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(resolve("public/og.jpg"));
console.log(`og.jpg  ${og.width}x${og.height}  ${(og.size / 1024).toFixed(0)}kB`);
