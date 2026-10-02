import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { displayItalicLazy } from "@/lib/fonts/display-italic-lazy";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="on-dark relative isolate flex min-h-svh items-end overflow-clip bg-walnut text-ivory">
      <div aria-hidden="true" className="warm-glow absolute inset-0 -z-10" />
      <div aria-hidden="true" className="lamplight" />
      <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10" />
      <div className="container-site pt-40 pb-[calc(4rem+env(safe-area-inset-bottom)+2rem)] md:pb-24">
        <p className="eyebrow text-ivory/70">Error 404</p>
        <h1 className="text-display mt-6">
          This page
          <br />
          <span className={displayItalicLazy.className}>isn&rsquo;t here.</span>
        </h1>
        <p className="text-lead mt-7 max-w-md text-ivory/80">
          The page you were looking for may have moved. The collections and the showroom are still right where you
          left them.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" variant="ivory">
            Back to Home
          </ButtonLink>
          <ButtonLink href="/products" variant="outline-light">
            Explore Collection
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
