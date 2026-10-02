import { Cormorant_Garamond } from "next/font/google";

/**
 * Italic display face, preloaded. Import this only from components that sit
 * above the fold (the home hero) — next/font preloads a font on every route
 * whose page imports it.
 */
export const displayItalic = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  display: "swap",
});
