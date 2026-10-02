import { Cormorant_Garamond } from "next/font/google";

/**
 * The same italic display face without a preload, for headings further down
 * the page. It loads when first needed and never competes with the hero.
 */
export const displayItalicLazy = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  display: "swap",
  preload: false,
});
