import { images, type ImageKey } from "@/lib/images";

export const galleryCategories = [
  "Bathrooms",
  "Showroom",
  "Sanitaryware",
  "Faucets",
  "Showers",
  "Wash Basins",
  "Toilets",
  "Vanities",
  "LED Mirrors",
  "Accessories",
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export type GalleryItem = { image: ImageKey; category: GalleryCategory };

/**
 * Gallery order. Add a picture to lib/images.ts, then list it here.
 * Finished bathrooms and showroom displays alternate, and tall and wide
 * pictures are mixed, so the masonry columns stay balanced.
 */
export const galleryItems: GalleryItem[] = [
  { image: "bathroomDaylight", category: "Bathrooms" },
  { image: "rainShower", category: "Showers" },
  { image: "sanitarywareWall", category: "Showroom" },
  { image: "bathCandlelight", category: "Bathrooms" },
  { image: "showersBlack", category: "Showers" },
  { image: "washBasins", category: "Wash Basins" },
  { image: "mirrorBacklit", category: "LED Mirrors" },
  { image: "showroomFloor01", category: "Showroom" },
  { image: "ledMirrors", category: "LED Mirrors" },
  { image: "vanityOak", category: "Vanities" },
  { image: "wcNiche", category: "Toilets" },
  { image: "faucets", category: "Faucets" },
  { image: "showerEnclosure", category: "Showers" },
  { image: "toilets", category: "Toilets" },
  { image: "vanityGarden", category: "Vanities" },
  { image: "vanityUnits", category: "Vanities" },
  { image: "bathtub", category: "Bathrooms" },
  { image: "ledMirrorVanity", category: "LED Mirrors" },
  { image: "stoneWall", category: "Sanitaryware" },
  { image: "accessories", category: "Accessories" },
  { image: "faucetsDetail", category: "Faucets" },
  { image: "showers", category: "Showers" },
  { image: "showroomFloor02", category: "Toilets" },
  { image: "washBasinsCloseup", category: "Wash Basins" },
];

/** Gallery items with their image data resolved, ready to pass to the client gallery. */
export const resolveGallery = () =>
  galleryItems.map(({ image, category }) => ({
    src: images[image].src.src,
    width: images[image].src.width,
    height: images[image].src.height,
    alt: images[image].alt,
    category,
  }));
