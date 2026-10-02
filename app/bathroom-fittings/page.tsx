import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { FeatureList, type FeatureItem } from "@/components/sections/FeatureList";
import { ImagePair } from "@/components/sections/ImagePair";
import { PageHero } from "@/components/sections/PageHero";
import { RelatedCategories } from "@/components/sections/RelatedCategories";
import { SplitSection } from "@/components/sections/SplitSection";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `Bathroom Fittings in Zirakpur | ${site.name}`,
  description:
    "Bathroom fittings in Zirakpur — faucets, mixers, showers, hand showers and accessories in matte black, chrome and brushed finishes at Punjab Sanitary Store, Dhakoli.",
  path: "/bathroom-fittings",
  image: images.showers,
});

const fittings: FeatureItem[] = [
  {
    title: "Faucets",
    text: "Basin faucets for countertop and wall-mounted installation, in a range of heights and finishes.",
    link: { label: "Explore faucets", href: "/faucets" },
  },
  {
    title: "Mixers",
    text: "Single-lever mixers and diverters that set temperature and flow with one considered movement.",
    link: { label: "See faucets and mixers", href: "/faucets" },
  },
  {
    title: "Showers",
    text: "Overhead showers in round and square forms, displayed as complete sets on the wall.",
    link: { label: "Explore showers", href: "/showers" },
  },
  {
    title: "Hand showers",
    text: "On a slide rail or a wall bracket, paired with the overhead shower and its controls.",
    link: { label: "See shower sets", href: "/showers" },
  },
  {
    title: "Accessories",
    text: "Towel rails, holders, shelves and dispensers that carry the finish through the room.",
    link: { label: "Explore accessories", href: "/bathroom-accessories" },
  },
  {
    title: "Fittings",
    text: "The supporting pieces — flush plates, spouts and controls — that complete an installation.",
  },
];

// The material palette this collection is built around.
const materials = [
  { name: "Matte black", swatch: "bg-[#0d0b0a]" },
  { name: "Brushed metal", swatch: "bg-linear-to-b from-[#c4bcb0] to-[#958b7e]" },
  { name: "Ivory", swatch: "bg-ivory" },
  { name: "Dark stone", swatch: "bg-[#4a3f36]" },
  { name: "Warm brass", swatch: "bg-linear-to-b from-[#d9b074] to-[#a87a3f]" },
];

const linkClass =
  "font-medium text-ivory underline decoration-ivory/40 underline-offset-4 transition-colors duration-300 hover:decoration-ivory";

export default function BathroomFittingsPage() {
  return (
    <div className="bg-espresso">
      <PageHero
        trail={[
          { name: "Collections", path: "/products" },
          { name: "Bathroom Fittings", path: "/bathroom-fittings" },
        ]}
        eyebrow="Bathroom fittings"
        heading={["The details", "make the bathroom."]}
        intro="Faucets, mixers, showers and the pieces between them. The parts of a bathroom you use every day deserve the closest look."
        image={images.showers}
        focus="50% 40%"
      />

      <SplitSection
        id="fittings-range"
        tone="dark"
        eyebrow="The collection"
        lines={["Six parts,", "one composed room."]}
        className="bg-espresso"
        sticky
        lead="See fittings mounted on stone and ceramic, so finish, weight and proportion can be judged as they will be at home."
      >
        <FeatureList items={fittings} tone="dark" />
      </SplitSection>

      <section aria-labelledby="fittings-materials" className="on-dark bg-espresso pb-[clamp(4.5rem,10vw,10.5rem)] text-ivory">
        <div className="container-site">
          <Reveal>
            <h2 id="fittings-materials" className="eyebrow text-ivory/60">
              Material palette
            </h2>
          </Reveal>
          <ul className="mt-6 grid grid-cols-5 gap-2 sm:gap-4 lg:gap-6">
            {materials.map((material, index) => (
              <Reveal as="li" key={material.name} delay={index * 0.06}>
                <div className={`aspect-[2/5] border border-ivory/15 sm:aspect-[3/4] lg:aspect-[4/3] ${material.swatch}`} />
                <p className="mt-3 text-[0.6875rem] leading-snug font-medium text-ivory/70 sm:text-[0.8125rem]">
                  {material.name}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ImagePair
        primary={images.faucets}
        secondary={images.showersBlack}
        caption="Faucets, mixers and showers on display"
        tone="dark"
        className="on-dark bg-espresso"
      />

      <section aria-labelledby="fittings-local" className="on-dark relative isolate overflow-clip bg-walnut text-ivory">
        <div aria-hidden="true" className="warm-glow absolute inset-0 -z-10" />
        <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10" />
        <div className="container-site section-y-tight grid gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-8">
            <Reveal y={12}>
              <p className="eyebrow text-ivory/70">Dhakoli · Zirakpur</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 id="fittings-local" className="text-h3 mt-5 max-w-3xl">
                Bathroom fittings in Zirakpur, shown together so you can match them before you buy.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-ivory/75">
                Visit {site.name} on Old Ambala Road, Dhakoli to compare{" "}
                <Link href="/faucets" className={linkClass}>
                  faucets
                </Link>
                ,{" "}
                <Link href="/showers" className={linkClass}>
                  showers
                </Link>{" "}
                and{" "}
                <Link href="/bathroom-accessories" className={linkClass}>
                  bathroom accessories
                </Link>{" "}
                side by side — or{" "}
                <Link href="/contact" className={linkClass}>
                  send an enquiry
                </Link>{" "}
                first.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.25} className="flex flex-col sm:block lg:col-span-4 lg:text-right">
            <ButtonLink href="/location" variant="ivory">
              Visit Showroom
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <RelatedCategories
        slugs={["faucets", "showers", "bathroom-accessories"]}
        eyebrow="Explore the fittings"
        lines={["Start with", "a category."]}
        className="bg-ivory"
      />

      <CTASection />
    </div>
  );
}
