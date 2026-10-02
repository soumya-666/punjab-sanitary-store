/**
 * Single source of truth for business information.
 *
 * Anything set to `null` is treated as "not supplied": the site hides the
 * related UI (call button, WhatsApp button, opening hours, …) and leaves the
 * field out of structured data. Fill a value in here and it appears everywhere.
 * Never put guessed or placeholder contact details in this file.
 */

const resolveSiteUrl = () => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
};

export type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

/** e.g. { label: "Monday – Saturday", days: ["Monday", …], opens: "10:00", closes: "20:00" } */
export type OpeningHours = { label: string; days: DayOfWeek[]; opens: string; closes: string };

type Site = {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  url: string;
  address: {
    street: string;
    area: string;
    locality: string;
    region: string;
    country: string;
    countryCode: string;
    lines: string[];
  };
  contact: {
    /** E.164, e.g. "+919876543210" */
    phone: string | null;
    /** E.164, e.g. "+919876543210" */
    whatsapp: string | null;
    email: string | null;
  };
  openingHours: OpeningHours[] | null;
  maps: {
    /**
     * Verified Google Maps link to the showroom's own listing
     * (Google Maps → the listing → Share → Copy link). Used by every
     * "Get Directions" button.
     */
    placeUrl: string | null;
    /**
     * Verified embed address for the same listing
     * (Share → Embed a map → the `src` value inside the iframe code).
     */
    embedUrl: string | null;
  };
  brand: {
    /** Display name of the primary brand carried. Change it here to update all copy. */
    name: string;
    /**
     * The brand's logo: a file under /public and its size in pixels. The file is
     * made by scripts/prepare-brand-logo.mjs, which recolours the supplied logo
     * (assets/brand/brand-logo.png) to the site palette.
     */
    logo: { src: string; width: number; height: number } | null;
    /**
     * Whether the showroom is an authorized dealer of the brand. When true, the
     * brand page says "Authorized Dealer of …". Only set this if it is the case.
     */
    authorizedDealer: boolean;
  };
};

export const site: Site = {
  name: "Punjab Sanitary Store",
  shortName: "Punjab Sanitary",
  tagline: "Premium Sanitaryware & Bathroom Solutions",
  description:
    "Premium sanitaryware, bathroom fittings, faucets, showers and complete bathroom solutions at Punjab Sanitary Store, Old Ambala Road, Dhakoli, Zirakpur.",
  url: resolveSiteUrl(),

  address: {
    street: "SCO 96A, D.S. Estates, Old Ambala Road",
    area: "Dhakoli",
    locality: "Zirakpur",
    region: "Punjab",
    country: "India",
    countryCode: "IN",
    lines: ["SCO 96A, D.S. Estates,", "Old Ambala Road,", "Dhakoli, Zirakpur"],
  },

  contact: {
    phone: null,
    whatsapp: "+919876554291",
    email: null,
  },

  openingHours: null,

  // IMPORTANT before launch: a Google Maps search for this name and address
  // currently returns more than one "Punjab Sanitary Store" in Zirakpur.
  // Until the two verified links below are filled in, the map and the
  // directions buttons fall back to that search and may not point to the
  // right listing.
  maps: {
    placeUrl: null,
    embedUrl: null,
  },

  brand: {
    name: "Jaquar",
    logo: { src: "/brand/logo-amber.png", width: 1446, height: 514 },
    authorizedDealer: true,
  },
};

export const brand = site.brand.name;

/** "Authorized Dealer of …", or null when that has not been confirmed above. */
export const dealerLine = site.brand.authorizedDealer ? `Authorized Dealer of ${brand}` : null;

const mapsQuery = encodeURIComponent(
  `${site.name}, ${site.address.street}, ${site.address.area}, ${site.address.locality}, ${site.address.region}`,
);

/**
 * Directions link. Uses the verified place link when one is supplied,
 * otherwise a Google Maps search for the published name and address.
 */
export const directionsUrl =
  site.maps.placeUrl ?? `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;

/** Map shown on the Location and Contact pages. Same fallback as above. */
export const mapEmbedUrl = site.maps.embedUrl ?? `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

export const phoneHref = site.contact.phone ? `tel:${site.contact.phone}` : null;

/**
 * WhatsApp click-to-chat link: opens a chat with the showroom's number with
 * `message` already typed. Nothing is sent until the visitor presses send in
 * WhatsApp. Returns null when no WhatsApp number is set above.
 */
export const whatsappLink = (message: string) =>
  site.contact.whatsapp
    ? `https://wa.me/${site.contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`
    : null;

/** Default WhatsApp link, used by every "WhatsApp" button on the site. */
export const whatsappHref = whatsappLink(
  `Hello ${site.name}, I would like to know more about your bathroom products.`,
);

/** The WhatsApp number as written for people, e.g. "+91 98765 54291". */
export const whatsappDisplay = site.contact.whatsapp
  ? site.contact.whatsapp.replace(/^(\+\d{2})(\d{5})(\d{5})$/, "$1 $2 $3")
  : null;

export const emailHref = site.contact.email ? `mailto:${site.contact.email}` : null;

export const addressOneLine = `${site.address.street}, ${site.address.area}, ${site.address.locality}, ${site.address.region}, ${site.address.country}`;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Collections", href: "/products" },
  { label: brand, href: "/jaquar" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export const privacyNav: NavItem = { label: "Privacy Policy", href: "/privacy-policy" };

/** Footer and mobile menu: the main pages, then the privacy policy. */
export const footerNav: NavItem[] = [...mainNav, privacyNav];
