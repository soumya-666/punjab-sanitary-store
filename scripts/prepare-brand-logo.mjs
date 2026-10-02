// Recolours the supplied brand logo to the site's palette and exports it to
// public/brand.
//
//   node scripts/prepare-brand-logo.mjs
//
// The source (assets/brand/brand-logo.png) is the logo in its own colour on a
// white background. The artwork is not redrawn: its shape is read as a mask —
// how far each pixel is from white — and that mask is filled with one flat
// colour on a transparent background. Add an entry to VARIANTS for another
// colour (for example a dark one for light sections) and point
// `brand.logo` in lib/site.ts at the file you want.

import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const SOURCE = resolve("assets/brand/brand-logo.png");
const OUT_DIR = resolve("public/brand");

/** Output name → fill colour (tokens from styles/globals.css). */
const VARIANTS = {
  "logo-amber": "#e7b16d", // --color-amber: for the dark timber sections
};

/** Enlarged so the edges stay smooth on high-density screens. */
const SCALE = 2;

const { data, info } = await sharp(SOURCE).removeAlpha().raw().toBuffer({ resolveWithObject: true });

// The logo's colour has almost no red in it, so the red channel alone says
// how much of each pixel is logo: the minimum is solid ink, and anything at or
// above PAPER is background. PAPER sits below pure white because the supplied
// file has a white-and-pale-grey "transparency" checkerboard baked into its
// background (red 240–255), which must not come through as faint squares.
const PAPER = 236;
let ink = 255;
for (let i = 0; i < data.length; i += info.channels) ink = Math.min(ink, data[i]);

const coverage = Buffer.alloc(info.width * info.height);
for (let i = 0, p = 0; i < data.length; i += info.channels, p++) {
  coverage[p] = Math.round((Math.max(0, PAPER - data[i]) / (PAPER - ink)) * 255);
}

const mask = await sharp(coverage, { raw: { width: info.width, height: info.height, channels: 1 } })
  .resize({ width: info.width * SCALE, kernel: "lanczos3" })
  .trim({ background: "#000000", threshold: 8 })
  .extend({ top: 8, bottom: 8, left: 8, right: 8, background: "#000000" })
  .png()
  .toBuffer({ resolveWithObject: true });

await mkdir(OUT_DIR, { recursive: true });

for (const [name, colour] of Object.entries(VARIANTS)) {
  const { width, height } = mask.info;
  const out = await sharp({ create: { width, height, channels: 3, background: colour } })
    .joinChannel(mask.data)
    .png({ compressionLevel: 9 })
    .toFile(resolve(OUT_DIR, `${name}.png`));
  console.log(`${name}.png  ${out.width}x${out.height}  ${(out.size / 1024).toFixed(0)}kB`);
}
