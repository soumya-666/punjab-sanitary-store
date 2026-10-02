import { addressOneLine, brand, site } from "@/lib/site";

export type Faq = { question: string; answer: string };

/**
 * Frequently asked questions. The same list renders the visible accordion and
 * the FAQPage structured data, so the two can never drift apart.
 * Answers must only state what the business has confirmed.
 */
export const faqs: Faq[] = [
  {
    question: `Where is ${site.name} located?`,
    answer: `${site.name} is at ${addressOneLine}. The showroom is in D.S. Estates on Old Ambala Road, in the Dhakoli area of Zirakpur.`,
  },
  {
    question: `What products are available at ${site.name}?`,
    answer:
      "The showroom displays sanitaryware, faucets, showers, wash basins, toilets, bathroom accessories, vanity units and LED mirrors — everything needed to put a complete bathroom together.",
  },
  {
    question: `Does ${site.name} sell ${brand} products?`,
    answer: `Yes. ${brand} bathroom products and fittings are available at ${site.name} in Dhakoli, Zirakpur.`,
  },
  {
    question: "Where can I find sanitaryware in Zirakpur?",
    answer: `You can see sanitaryware in Zirakpur at ${site.name} on Old Ambala Road, Dhakoli. Toilets, wash basins and countertop basins are on display at the showroom.`,
  },
  {
    question: "Where can I find bathroom fittings in Zirakpur?",
    answer: `${site.name} in Dhakoli, Zirakpur displays bathroom fittings including faucets, mixers, showers, hand showers and accessories.`,
  },
  {
    question: "Can I visit the showroom?",
    answer: `Yes. You are welcome to visit the showroom at ${site.address.street}, ${site.address.area}, ${site.address.locality} and see the products in person. Use the Get Directions link on this site to find us.`,
  },
];
