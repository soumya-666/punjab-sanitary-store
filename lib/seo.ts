import type { Metadata } from "next";

import type { SiteImage } from "@/lib/images";
import { site } from "@/lib/site";

type PageMetadataInput = {
  /** Full, final title — used as-is. */
  title: string;
  description: string;
  /** Path from the site root, e.g. "/faucets". */
  path: string;
  /** Social share image. Falls back to the site default. */
  image?: SiteImage;
};

const defaultShareImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "Contemporary bathroom with stone vanity, wash basin and glass shower — Punjab Sanitary Store, Zirakpur",
};

/** Unique title, description, canonical, Open Graph and Twitter metadata for a page. */
export function pageMetadata({ title, description, path, image }: PageMetadataInput): Metadata {
  const shareImage = image
    ? { url: image.src.src, width: image.src.width, height: image.src.height, alt: image.alt }
    : defaultShareImage;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_IN",
      url: path,
      title,
      description,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: shareImage.url, alt: shareImage.alt }],
    },
  };
}
