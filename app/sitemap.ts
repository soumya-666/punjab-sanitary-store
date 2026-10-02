import type { MetadataRoute } from "next";

import { categories } from "@/lib/categories";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Array<{ path: string; priority: number }> = [
    { path: "/", priority: 1 },
    { path: "/products", priority: 0.9 },
    { path: "/bathroom-fittings", priority: 0.9 },
    { path: "/jaquar", priority: 0.9 },
    ...categories.map((category) => ({ path: category.href, priority: 0.8 })),
    { path: "/location", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/gallery", priority: 0.6 },
    { path: "/privacy-policy", priority: 0.3 },
  ];

  return pages.map(({ path, priority }) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
