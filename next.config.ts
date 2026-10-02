import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80, 85],
  },
  experimental: {
    // The stylesheet is small and atomic; inlining it removes a render-blocking request for first-time visitors.
    inlineCss: true,
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async redirects() {
    return [
      // The brand is Jaquar; "Jaguar" is a common misspelling, and was this page's address before.
      { source: "/jaguar", destination: "/jaquar", permanent: true },
      { source: "/collections", destination: "/products", permanent: true },
      { source: "/accessories", destination: "/bathroom-accessories", permanent: true },
      { source: "/vanities", destination: "/vanity-units", permanent: true },
    ];
  },
};

export default nextConfig;
