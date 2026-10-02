import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { FeatureList, type FeatureItem } from "@/components/sections/FeatureList";
import { ImagePair } from "@/components/sections/ImagePair";
import { PageHero } from "@/components/sections/PageHero";
import { SplitSection } from "@/components/sections/SplitSection";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { brand, dealerLine, directionsUrl, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `${brand} Bathroom Products in Zirakpur | ${site.name}`,
  description: `${dealerLine ? `${dealerLine} in Zirakpur. ` : ""}Explore ${brand} bathroom products in Zirakpur — ${brand} sanitaryware and bathroom fittings at ${site.name}, Old Ambala Road, Dhakoli.`,
  path: "/jaquar",
  image: images.vanityUnits,
});

const explore: FeatureItem[] = [
  {
    title: "Sanitaryware",
    text: `Ask our team which ${brand} sanitaryware is currently on display at the showroom.`,
    link: { label: "Explore sanitaryware", href: "/sanitaryware" },
  },
  {
    title: "Faucets",
    text: "Basin mixers and wall-mounted faucets, shown against stone and ceramic.",
    link: { label: "Explore faucets", href: "/faucets" },
  },
  {
    title: "Showers",
    text: "Overhead showers, hand showers and the controls that go with them.",
    link: { label: "Explore showers", href: "/showers" },
  },
  {
    title: "Bathroom fittings",
    text: "The complete set of fittings that brings a bathroom together.",
    link: { label: "Explore bathroom fittings", href: "/bathroom-fittings" },
  },
];

const linkClass =
  "font-medium text-ivory underline decoration-ivory/40 underline-offset-4 transition-colors duration-300 hover:decoration-ivory";

export default function BrandPage() {
  return (
    <>
      <PageHero
        tone="walnut"
        trail={[{ name: brand, path: "/jaquar" }]}
        eyebrow={dealerLine ?? `${brand} at ${site.name}`}
        heading={[`Genuine ${brand}.`, "Contemporary design."]}
        intro={`Explore ${brand} bathroom products and fittings available at ${site.name}.`}
        image={images.vanityUnits}
        focus="50% 55%"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/location" variant="ivory">
            Visit Showroom
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline-light">
            Ask About {brand}
          </ButtonLink>
        </div>
      </PageHero>

      <section aria-labelledby="brand-intro" className="on-dark relative isolate overflow-clip bg-walnut text-ivory">
        <div aria-hidden="true" className="warm-glow absolute inset-0 -z-10" />
        <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10" />
        <div className="container-site section-y grid gap-y-10 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-4">
            {/* The brand's logo, recoloured to the site palette, with the dealership line beneath it. */}
            {site.brand.logo ? (
              <Reveal y={12}>
                <Image
                  src={site.brand.logo.src}
                  alt={`${brand} logo`}
                  width={site.brand.logo.width}
                  height={site.brand.logo.height}
                  sizes="(min-width: 1024px) 20rem, 15rem"
                  className="h-auto w-60 lg:w-full lg:max-w-80"
                />
              </Reveal>
            ) : null}
            <Reveal y={12} delay={0.1}>
              <p className={`eyebrow flex items-center gap-4 text-sand ${site.brand.logo ? "mt-7 lg:mt-9" : ""}`}>
                <span aria-hidden="true" className="h-px w-8 shrink-0 bg-amber" />
                {dealerLine ?? "The brand"}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <h2 id="brand-intro" className="text-h3 max-w-3xl">
                {site.brand.authorizedDealer
                  ? `${site.name} is an authorized dealer of ${brand}, with ${brand} bathroom products and fittings on display at its showroom in Dhakoli, Zirakpur.`
                  : `${site.name} carries ${brand} bathroom products and fittings at its showroom in Dhakoli, Zirakpur.`}
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-lead mt-8 max-w-2xl text-ivory/75">
                If you are looking for {brand} sanitaryware in Zirakpur or {brand} bathroom fittings in Zirakpur,
                the simplest way to choose is to see the products in person. Visit us on Old Ambala Road and our
                team will show you what is available.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-2xl text-ivory/75">
                You can also browse by category — from{" "}
                <Link href="/sanitaryware" className={linkClass}>
                  sanitaryware
                </Link>{" "}
                to{" "}
                <Link href="/bathroom-fittings" className={linkClass}>
                  bathroom fittings
                </Link>{" "}
                — or{" "}
                <Link href="/contact" className={linkClass}>
                  send an enquiry
                </Link>{" "}
                to ask about a specific product.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="bg-ivory pt-[clamp(4.5rem,10vw,10.5rem)]">
        <ImagePair
          primary={images.washBasinsCloseup}
          secondary={images.ledMirrorVanity}
          caption="On display at the showroom"
        />
      </div>

      <SplitSection
        id="brand-explore"
        eyebrow="Explore by category"
        lines={["Find what", "you need."]}
        className="bg-linen"
        sticky
        lead={`Availability changes, so please ask our team about the ${brand} products currently at the showroom.`}
      >
        <FeatureList items={explore} />
      </SplitSection>

      <CTASection
        lines={[`See ${brand}`, "in person."]}
        copy={`Visit ${site.name} at ${site.address.street}, ${site.address.area}, ${site.address.locality}.`}
        primary={{ label: "Visit Showroom", href: "/location" }}
        secondary={{ label: "Send an enquiry", href: "/contact" }}
      />

      <p className="bg-walnut pb-10 text-center text-[0.75rem] text-ivory/70">
        <span className="container-site block">
          Brand names and logos are the property of their respective owners.{" "}
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-ivory"
          >
            Get directions to the showroom
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          .
        </span>
      </p>
    </>
  );
}
