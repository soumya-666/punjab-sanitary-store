import type { StaticImageData } from "next/image";

import bathCandlelight from "@/public/images/bath-candlelight.jpg";
import bathroomDaylight from "@/public/images/bathroom-daylight.jpg";
import bathtubDetail from "@/public/images/bathtub-detail.jpg";
import faucetsMixersWall from "@/public/images/faucets-mixers-wall.jpg";
import faucetsWallDetail from "@/public/images/faucets-wall-detail.jpg";
import heroBathroom from "@/public/images/hero-bathroom.jpg";
import heroBathroomPortrait from "@/public/images/hero-bathroom-portrait.jpg";
import ledMirrorVanity from "@/public/images/led-mirror-vanity.jpg";
import ledMirrorsDisplay from "@/public/images/led-mirrors-display.jpg";
import mirrorBacklit from "@/public/images/mirror-backlit.jpg";
import rainShowerGlass from "@/public/images/rain-shower-glass.jpg";
import showerEnclosure from "@/public/images/shower-enclosure.jpg";
import showersDisplay from "@/public/images/showers-display.jpg";
import showersMatteBlack from "@/public/images/showers-matte-black.jpg";
import showroomFloor01 from "@/public/images/showroom-floor-01.jpg";
import showroomFloor02 from "@/public/images/showroom-floor-02.jpg";
import showroomSanitarywareWall from "@/public/images/showroom-sanitaryware-wall.jpg";
import stoneWallBasinWc from "@/public/images/stone-wall-basin-wc.jpg";
import toiletsDisplay from "@/public/images/toilets-display.jpg";
import vanityAccessoriesDetail from "@/public/images/vanity-accessories-detail.jpg";
import vanityGardenLight from "@/public/images/vanity-garden-light.jpg";
import vanityOakStone from "@/public/images/vanity-oak-stone.jpg";
import vanityUnitsDisplay from "@/public/images/vanity-units-display.jpg";
import washBasinsCloseup from "@/public/images/wash-basins-closeup.jpg";
import washBasinsDisplay from "@/public/images/wash-basins-display.jpg";
import wcStoneNiche from "@/public/images/wc-stone-niche.jpg";

export type SiteImage = {
  src: StaticImageData;
  /** Descriptive alt text. Describe what is in the picture, not the file. */
  alt: string;
};

/**
 * Every image used on the site, with its alt text, in one place.
 * To swap a picture, replace the file in /public/images (or add a new import)
 * and update the alt text here.
 *
 * The files are produced by scripts/prepare-images.mjs, which also grades each
 * picture to the warm light of the hero photograph.
 */
export const images = {
  hero: {
    src: heroBathroom,
    alt: "Sunlit contemporary bathroom with a stone vanity, countertop wash basin, glass rain shower, wall-hung toilet and freestanding bathtub",
  },
  heroPortrait: {
    src: heroBathroomPortrait,
    alt: "Sunlit contemporary bathroom with a freestanding bathtub, stone vanity, wash basin and glass rain shower",
  },
  stoneWall: {
    src: stoneWallBasinWc,
    alt: "Countertop wash basin with wall-mounted faucet beside a wall-hung toilet on a softly lit stone wall",
  },
  bathroomDaylight: {
    src: bathroomDaylight,
    alt: "Sunlit bathroom with walnut vanity unit, stone countertop, wash basin, walk-in shower and wall-hung toilet",
  },
  bathCandlelight: {
    src: bathCandlelight,
    alt: "Freestanding bathtub in evening sunlight with a wooden bath tray, candle and folded towel",
  },
  vanityGarden: {
    src: vanityGardenLight,
    alt: "Countertop wash basin and chrome faucet on a stone vanity beside a garden window, with a backlit mirror above",
  },
  rainShower: {
    src: rainShowerGlass,
    alt: "Rain shower running inside a frameless glass enclosure, with a hand shower and a wall-hung toilet beside it",
  },
  mirrorBacklit: {
    src: mirrorBacklit,
    alt: "Wide backlit mirror above a countertop wash basin, its warm light washing down a stone wall",
  },
  wcNiche: {
    src: wcStoneNiche,
    alt: "Wall-hung toilet with a concealed cistern, flush plate and a softly lit stone niche above",
  },
  vanityOak: {
    src: vanityOakStone,
    alt: "Wall-hung walnut vanity unit with stone countertop, white wash basin and chrome faucet",
  },
  showerEnclosure: {
    src: showerEnclosure,
    alt: "Glass shower enclosure with overhead rain shower and hand shower on a stone wall",
  },
  bathtub: {
    src: bathtubDetail,
    alt: "Freestanding bathtub with floor-mounted faucet beside a wall-hung toilet",
  },
  sanitarywareWall: {
    src: showroomSanitarywareWall,
    alt: "Sanitaryware showroom display of wall-hung toilets, faucets and showers at Punjab Sanitary Store in Dhakoli, Zirakpur",
  },
  toilets: {
    src: toiletsDisplay,
    alt: "Row of wall-hung and floor-standing toilets on display at Punjab Sanitary Store in Zirakpur",
  },
  faucets: {
    src: faucetsMixersWall,
    alt: "Bathroom faucets and mixers in matte black, chrome and brushed finishes at Punjab Sanitary Store",
  },
  faucetsDetail: {
    src: faucetsWallDetail,
    alt: "Wall-mounted faucets, mixers and diverters in chrome, black and warm metallic finishes at Punjab Sanitary Store, Dhakoli",
  },
  ledMirrors: {
    src: ledMirrorsDisplay,
    alt: "Wall of LED mirrors in round, oval and rectangular shapes at Punjab Sanitary Store in Zirakpur",
  },
  ledMirrorVanity: {
    src: ledMirrorVanity,
    alt: "Backlit LED mirror above a countertop wash basin and vanity unit",
  },
  showers: {
    src: showersDisplay,
    alt: "Shower display with overhead rain showers and hand showers at Punjab Sanitary Store in Zirakpur",
  },
  showersBlack: {
    src: showersMatteBlack,
    alt: "Matte black overhead shower, hand shower and diverter on a dark stone panel",
  },
  washBasins: {
    src: washBasinsDisplay,
    alt: "Premium wash basin display at Punjab Sanitary Store in Zirakpur",
  },
  washBasinsCloseup: {
    src: washBasinsCloseup,
    alt: "Countertop wash basins in white, marble-pattern and charcoal finishes with tall basin mixers",
  },
  vanityUnits: {
    src: vanityUnitsDisplay,
    alt: "Vanity units with countertop basins and LED mirrors at Punjab Sanitary Store in Zirakpur",
  },
  accessories: {
    src: vanityAccessoriesDetail,
    alt: "Bathroom accessories on a vanity: soap dispenser, wall-mounted faucet and folded towels",
  },
  showroomFloor01: {
    src: showroomFloor01,
    alt: "Inside Punjab Sanitary Store, Dhakoli: toilets, faucets and overhead showers on display",
  },
  showroomFloor02: {
    src: showroomFloor02,
    alt: "Toilets in a range of colours below wall-mounted faucets and mixers at Punjab Sanitary Store",
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
