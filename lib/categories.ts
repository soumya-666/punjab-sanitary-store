import type { ImageKey } from "@/lib/images";
import { brand } from "@/lib/site";

export type CategorySlug =
  | "sanitaryware"
  | "faucets"
  | "showers"
  | "wash-basins"
  | "toilets"
  | "bathroom-accessories"
  | "vanity-units"
  | "led-mirrors";

export type Category = {
  slug: CategorySlug;
  href: string;
  name: string;
  /** One short line for tiles and lists. */
  tagline: string;
  seo: { title: string; description: string };
  hero: { eyebrow: string; heading: string[]; intro: string };
  /** Tile and gallery image. */
  image: ImageKey;
  /** Page hero image when the tile image is too small to lead a page. Defaults to `image`. */
  heroImage?: ImageKey;
  secondaryImage: ImageKey;
  body: { heading: string[]; paragraphs: string[] };
  /** What a visitor can expect to see. Product types only — never model names or specifications. */
  range: { title: string; text: string }[];
  /** Short paragraph that places the category in its local context. */
  local: string;
  related: CategorySlug[];
};

/**
 * Product categories. Edit copy, swap images (keys from lib/images.ts) or
 * reorder here — the home page, /products, the footer, the sitemap and each
 * category page all read from this list.
 */
export const categories: Category[] = [
  {
    slug: "sanitaryware",
    href: "/sanitaryware",
    name: "Sanitaryware",
    tagline: "Toilets, basins and ceramics with a contemporary line.",
    seo: {
      title: "Premium Sanitaryware in Zirakpur | Punjab Sanitary Store",
      description:
        "Explore premium sanitaryware in Zirakpur — toilets, wash basins, countertop basins and wall-mounted designs at Punjab Sanitary Store, Old Ambala Road, Dhakoli.",
    },
    hero: {
      eyebrow: "Sanitaryware",
      heading: ["Premium Sanitaryware", "for Modern Bathrooms"],
      intro:
        "Toilets, wash basins and contemporary ceramics, displayed so you can compare shape, proportion and finish side by side.",
    },
    image: "sanitarywareWall",
    secondaryImage: "stoneWall",
    body: { heading: [], paragraphs: [] },
    range: [],
    local: "",
    related: ["toilets", "wash-basins", "vanity-units"],
  },
  {
    slug: "faucets",
    href: "/faucets",
    name: "Faucets",
    tagline: "Basin mixers and taps in considered finishes.",
    seo: {
      title: "Bathroom Faucets in Zirakpur | Punjab Sanitary Store",
      description:
        "See bathroom faucets, basin mixers and wall-mounted taps in Zirakpur at Punjab Sanitary Store, Dhakoli. Compare finishes and forms in person at the showroom.",
    },
    hero: {
      eyebrow: "Faucets",
      heading: ["Faucets that finish", "the room."],
      intro:
        "The faucet is the part of a bathroom you touch most. See basin mixers, wall-mounted taps and matching fittings together, and choose by hand as much as by eye.",
    },
    image: "faucetsDetail",
    heroImage: "faucets",
    secondaryImage: "washBasinsCloseup",
    body: {
      heading: ["Chosen by hand,", "not from a catalogue."],
      paragraphs: [
        "Weight, movement and finish are difficult to judge from a photograph. At the showroom, faucets are mounted on display panels so you can see how each one sits against stone and ceramic and how the finish reads under light.",
        "Bring your basin choice, or choose the two together. Our team can help you match spout height and reach to the basin so the pairing works in daily use.",
      ],
    },
    range: [
      { title: "Basin mixers", text: "Single-lever and tall-body mixers for countertop and under-counter basins." },
      { title: "Wall-mounted faucets", text: "Concealed designs that keep the counter clear and the wall composed." },
      { title: "Bath and shower mixers", text: "Diverters and mixers that pair with the shower collection." },
      { title: "Finishes", text: "Chrome, matte black and warm metallic tones on display side by side." },
    ],
    local:
      "If you are looking for faucets in Zirakpur, the showroom on Old Ambala Road in Dhakoli lets you compare designs in one visit rather than across several shops.",
    related: ["showers", "wash-basins", "bathroom-accessories"],
  },
  {
    slug: "showers",
    href: "/showers",
    name: "Showers",
    tagline: "Overhead, hand and complete shower systems.",
    seo: {
      title: "Bathroom Showers in Zirakpur | Punjab Sanitary Store",
      description:
        "Overhead showers, hand showers and shower systems in Zirakpur. Visit Punjab Sanitary Store on Old Ambala Road, Dhakoli to compare designs and finishes.",
    },
    hero: {
      eyebrow: "Showers",
      heading: ["The shower,", "considered."],
      intro:
        "Overhead showers, hand showers and the mixers that control them — shown as complete sets so you can see how the pieces work together on the wall.",
    },
    image: "showers",
    secondaryImage: "rainShower",
    body: {
      heading: ["A daily ritual", "deserves a second look."],
      paragraphs: [
        "A shower is a small system: the head overhead, the hand shower, the diverter and the fittings behind the wall. Seeing them assembled makes it far easier to plan than choosing parts one at a time.",
        "The shower display at Punjab Sanitary Store sets round and square heads, slim rails and concealed mixers against light and dark stone, so you can picture them in your own bathroom.",
      ],
    },
    range: [
      { title: "Overhead showers", text: "Round and square heads in a range of sizes for a rain-style shower." },
      { title: "Hand showers", text: "On a slide rail or wall bracket, paired with a flexible hose." },
      { title: "Shower mixers and diverters", text: "Exposed and concealed controls to switch between outlets." },
      { title: "Finishes", text: "Chrome, matte black and warm metallic tones, matched to the faucet collection." },
    ],
    local:
      "For showers in Zirakpur, visit the display at our Dhakoli showroom on Old Ambala Road and see complete shower sets installed on the wall.",
    related: ["faucets", "bathroom-accessories", "toilets"],
  },
  {
    slug: "wash-basins",
    href: "/wash-basins",
    name: "Wash Basins",
    tagline: "Countertop, wall-hung and statement basins.",
    seo: {
      title: "Wash Basins in Zirakpur | Punjab Sanitary Store",
      description:
        "Countertop, wall-hung and designer wash basins in Zirakpur. See shapes, sizes and finishes at Punjab Sanitary Store, Old Ambala Road, Dhakoli.",
    },
    hero: {
      eyebrow: "Wash Basins",
      heading: ["The basin as", "centrepiece."],
      intro:
        "Countertop and wall-hung wash basins in a range of shapes and finishes, displayed on stone so you can judge scale and proportion before you choose.",
    },
    image: "washBasins",
    secondaryImage: "washBasinsCloseup",
    body: {
      heading: ["Shape, depth", "and proportion."],
      paragraphs: [
        "A wash basin sets the tone for the whole vanity. Rounded or rectangular, shallow or deep, plain white or patterned — the differences are subtle on paper and obvious in person.",
        "At the showroom the basins sit at counter height beside faucets and mirrors, which makes it simple to check how a basin pairs with a mixer and how much counter it leaves free.",
      ],
    },
    range: [
      { title: "Countertop basins", text: "Vessel basins that sit on the counter, in round, oval and rectangular forms." },
      { title: "Wall-hung basins", text: "Space-saving designs fixed to the wall, suited to compact bathrooms." },
      { title: "Statement finishes", text: "Marble-pattern, charcoal and coloured ceramics alongside classic white." },
      { title: "Matching faucets", text: "Tall basin mixers and wall-mounted taps to complete the set." },
    ],
    local:
      "Choosing wash basins in Zirakpur is easier when you can see them together. Our Dhakoli showroom on Old Ambala Road displays basins at working height.",
    related: ["faucets", "vanity-units", "led-mirrors"],
  },
  {
    slug: "toilets",
    href: "/toilets",
    name: "Toilets",
    tagline: "Wall-hung and floor-standing designs.",
    seo: {
      title: "Toilets in Zirakpur | Punjab Sanitary Store",
      description:
        "Wall-hung and floor-standing toilets in Zirakpur. Compare shapes, colours and flush plates at Punjab Sanitary Store, Old Ambala Road, Dhakoli.",
    },
    hero: {
      eyebrow: "Toilets",
      heading: ["Quietly", "well designed."],
      intro:
        "Wall-hung and floor-standing toilets in clean contemporary shapes, shown in a row so the differences in size, height and profile are easy to see.",
    },
    image: "toilets",
    secondaryImage: "wcNiche",
    body: {
      heading: ["The fixture you", "choose once."],
      paragraphs: [
        "A toilet is chosen for comfort and built to stay. Wall-hung designs lift the pan off the floor for a lighter look and easier cleaning; floor-standing designs are straightforward to fit and suit most bathrooms.",
        "The showroom displays both types together, in white and in colour, along with the flush plates that go with concealed cisterns. Our team can talk you through what suits your bathroom layout.",
      ],
    },
    range: [
      { title: "Wall-hung toilets", text: "Mounted on the wall with a concealed cistern for a clean floor line." },
      { title: "Floor-standing toilets", text: "One-piece and close-coupled designs with an integrated cistern." },
      { title: "Colours and patterns", text: "Classic white alongside black, pastel and decorated ceramics." },
      { title: "Flush plates", text: "Plates in several finishes to pair with concealed cisterns." },
    ],
    local:
      "See toilets in Zirakpur side by side at Punjab Sanitary Store, on Old Ambala Road in Dhakoli, before you decide.",
    related: ["wash-basins", "sanitaryware", "bathroom-accessories"],
  },
  {
    slug: "bathroom-accessories",
    href: "/bathroom-accessories",
    name: "Bathroom Accessories",
    tagline: "The finishing pieces, matched to your fittings.",
    seo: {
      title: "Bathroom Accessories in Zirakpur | Punjab Sanitary Store",
      description:
        "Bathroom accessories in Zirakpur — towel rails, holders, shelves and dispensers to match your fittings. Visit Punjab Sanitary Store, Dhakoli.",
    },
    hero: {
      eyebrow: "Bathroom Accessories",
      heading: ["The finishing", "pieces."],
      intro:
        "Towel rails, holders, shelves and dispensers that carry the finish of your faucets and showers through the rest of the room.",
    },
    image: "accessories",
    heroImage: "vanityOak",
    secondaryImage: "vanityGarden",
    body: {
      heading: ["Small things,", "seen every day."],
      paragraphs: [
        "Accessories are the last decision in a bathroom and among the most visible. When they match the fittings in finish and line, the room feels complete; when they do not, it shows.",
        "Choose accessories alongside your faucets and showers at the showroom so the finishes can be compared directly, in the same light.",
      ],
    },
    range: [
      { title: "Towel rails and rings", text: "Single and double rails, rings and hooks for towels and robes." },
      { title: "Holders and shelves", text: "Paper holders, glass shelves and corner storage." },
      { title: "Soap dishes and dispensers", text: "Counter and wall-mounted pieces for the basin and the shower." },
      { title: "Matched finishes", text: "Coordinated with the faucet and shower collections." },
    ],
    local:
      "For bathroom accessories in Zirakpur, visit our showroom in D.S. Estates on Old Ambala Road, Dhakoli, and match them to your fittings on the spot.",
    related: ["faucets", "showers", "vanity-units"],
  },
  {
    slug: "vanity-units",
    href: "/vanity-units",
    name: "Vanity Units",
    tagline: "Storage and surface, composed as one.",
    seo: {
      title: "Vanity Units in Zirakpur | Punjab Sanitary Store",
      description:
        "Bathroom vanity units in Zirakpur with countertop basins and storage. See wall-hung vanities and finishes at Punjab Sanitary Store, Dhakoli.",
    },
    hero: {
      eyebrow: "Vanity Units",
      heading: ["Storage and", "surface, composed."],
      intro:
        "Vanity units bring the basin, the counter and the storage together. See wall-hung designs with countertop basins and mirrors, arranged as they would be at home.",
    },
    image: "vanityUnits",
    secondaryImage: "vanityOak",
    body: {
      heading: ["The furniture", "of the bathroom."],
      paragraphs: [
        "A good vanity keeps the bathroom calm: everything has a place, the counter stays clear and the basin sits at the right height. Wood tones, dark matte fronts and stone tops change the character of the room entirely.",
        "At Punjab Sanitary Store the vanity units are shown as complete settings — basin, faucet and LED mirror together — so you can choose a combination rather than assembling it in your head.",
      ],
    },
    range: [
      { title: "Wall-hung vanities", text: "Floating units that keep the floor clear and the room feeling larger." },
      { title: "Countertop pairings", text: "Units shown with vessel basins and matching faucets." },
      { title: "Fronts and tops", text: "Wood-tone and dark matte fronts with stone-look counters." },
      { title: "Mirrors to match", text: "LED mirrors sized and shaped to sit above the vanity." },
    ],
    local:
      "Looking for vanity units in Zirakpur? Our Dhakoli showroom on Old Ambala Road displays them as complete settings.",
    related: ["wash-basins", "led-mirrors", "faucets"],
  },
  {
    slug: "led-mirrors",
    href: "/led-mirrors",
    name: "LED Mirrors",
    tagline: "Light and reflection in a single piece.",
    seo: {
      title: "LED Mirrors in Zirakpur | Punjab Sanitary Store",
      description:
        "LED bathroom mirrors in Zirakpur in round, oval and rectangular shapes. See them lit at Punjab Sanitary Store, Old Ambala Road, Dhakoli.",
    },
    hero: {
      eyebrow: "LED Mirrors",
      heading: ["Light,", "where you need it."],
      intro:
        "LED mirrors combine even lighting with a clean, frameless look. See round, oval, rectangular and organic shapes switched on, on the wall.",
    },
    image: "ledMirrors",
    secondaryImage: "mirrorBacklit",
    body: {
      heading: ["A mirror that", "lights the room."],
      paragraphs: [
        "A lit mirror changes how a bathroom feels in the morning and at night. The light falls evenly on the face, and the glow behind the glass gives the wall depth.",
        "Light is best judged switched on. The mirror wall at the showroom shows different shapes and lighting styles together, so you can compare them directly and pick the size that suits your vanity.",
      ],
    },
    range: [
      { title: "Shapes", text: "Round, oval, rectangular and soft organic outlines." },
      { title: "Lighting styles", text: "Front-lit borders and backlit halos, shown switched on." },
      { title: "Sizes", text: "From compact mirrors for a single basin to wider pieces for a long vanity." },
      { title: "Paired with vanities", text: "Displayed above vanity units so proportions are easy to judge." },
    ],
    local:
      "See LED mirrors in Zirakpur lit and on the wall at Punjab Sanitary Store, Old Ambala Road, Dhakoli.",
    related: ["vanity-units", "wash-basins", "bathroom-accessories"],
  },
];

export const getCategory = (slug: string) => categories.find((category) => category.slug === slug);

export const getCategories = (slugs: CategorySlug[]) =>
  slugs.map((slug) => getCategory(slug)).filter((category): category is Category => Boolean(category));

/** Categories rendered by the shared template at app/[category]/page.tsx. */
export const templatedCategories = categories.filter((category) => category.slug !== "sanitaryware");

/** Landing pages that group categories. */
export const collectionPages = [
  {
    href: "/bathroom-fittings",
    name: "Bathroom Fittings",
    tagline: "Faucets, mixers, showers and the details between.",
  },
  {
    href: "/jaquar",
    name: `${brand} Collection`,
    tagline: `${brand} bathroom products and fittings at the showroom.`,
  },
] as const;

/** Category name for use mid-sentence: lower case, with acronyms such as "LED" left intact. */
export const inSentence = (name: string) =>
  name
    .split(" ")
    .map((word) => (word === word.toUpperCase() ? word : word.toLowerCase()))
    .join(" ");
