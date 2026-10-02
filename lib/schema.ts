import type { Faq } from "@/lib/faqs";
import { site } from "@/lib/site";

const abs = (path: string) => new URL(path, site.url).toString();

export const ORGANIZATION_ID = `${site.url}/#organization`;
export const STORE_ID = `${site.url}/#store`;
export const WEBSITE_ID = `${site.url}/#website`;

type JsonLdNode = Record<string, unknown>;

/**
 * Organization, LocalBusiness/Store and WebSite, rendered once in the root layout.
 * Telephone, opening hours and map link are only emitted when they have been
 * supplied in lib/site.ts. Ratings, reviews and price range are never emitted.
 */
export function siteGraph(): JsonLdNode {
  const store: JsonLdNode = {
    "@type": ["LocalBusiness", "Store"],
    "@id": STORE_ID,
    name: site.name,
    description: site.description,
    url: site.url,
    image: abs("/og.jpg"),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.street}, ${site.address.area}`,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.countryCode,
    },
    areaServed: { "@type": "City", name: site.address.locality },
    parentOrganization: { "@id": ORGANIZATION_ID },
  };

  if (site.contact.phone) store.telephone = site.contact.phone;
  if (site.contact.email) store.email = site.contact.email;
  if (site.maps.placeUrl) store.hasMap = site.maps.placeUrl;
  if (site.openingHours) {
    store.openingHoursSpecification = site.openingHours.map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: entry.days,
      opens: entry.opens,
      closes: entry.closes,
    }));
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: site.name,
        url: site.url,
      },
      store,
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: site.name,
        url: site.url,
        inLanguage: "en-IN",
        publisher: { "@id": ORGANIZATION_ID },
      },
    ],
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: abs(crumb.path),
    })),
  };
}

/** Only pass FAQs that are visibly rendered on the same page. */
export function faqSchema(faqs: Faq[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
