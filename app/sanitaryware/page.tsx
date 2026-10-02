import Image from "next/image";
import Link from "next/link";

import { MaskReveal } from "@/components/motion/MaskReveal";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { FeatureList, type FeatureItem } from "@/components/sections/FeatureList";
import { ImagePair } from "@/components/sections/ImagePair";
import { PageHero } from "@/components/sections/PageHero";
import { RelatedCategories } from "@/components/sections/RelatedCategories";
import { SplitSection } from "@/components/sections/SplitSection";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getCategory } from "@/lib/categories";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { brand, site } from "@/lib/site";

const category = getCategory("sanitaryware")!;

export const metadata = pageMetadata({
  title: category.seo.title,
  description: category.seo.description,
  path: category.href,
  image: images.sanitarywareWall,
});

const range: FeatureItem[] = [
  {
    title: "Toilets",
    text: "Wall-hung and floor-standing designs, shown in a row so size, height and profile are easy to compare.",
    link: { label: "Explore toilets", href: "/toilets" },
  },
  {
    title: "Wash basins",
    text: "Basins for every kind of bathroom, from compact wall-hung pieces to generous rectangular forms.",
    link: { label: "Explore wash basins", href: "/wash-basins" },
  },
  {
    title: "Countertop basins",
    text: "Vessel basins that sit on the counter and become the centrepiece of the vanity.",
    link: { label: "See vanity units", href: "/vanity-units" },
  },
  {
    title: "Wall-mounted designs",
    text: "Sanitaryware fixed to the wall keeps the floor clear, makes cleaning easier and lets a small room feel larger.",
  },
  {
    title: "Contemporary sanitaryware",
    text: "Clean geometry and quiet detailing, in classic white as well as colour and pattern.",
  },
];

const linkClass =
  "font-medium text-walnut underline decoration-walnut/30 underline-offset-4 transition-colors duration-300 hover:decoration-walnut";

export default function SanitarywarePage() {
  return (
    <>
      <PageHero
        trail={[
          { name: "Collections", path: "/products" },
          { name: category.name, path: category.href },
        ]}
        eyebrow={category.hero.eyebrow}
        heading={category.hero.heading}
        intro={category.hero.intro}
        image={images.sanitarywareWall}
        focus="50% 60%"
      >
        <div className="flex flex-col sm:block">
          <ButtonLink href="/location" variant="ivory">
            Explore the showroom
          </ButtonLink>
        </div>
      </PageHero>

      <SplitSection
        id="sanitaryware-local"
        eyebrow="Dhakoli · Zirakpur"
        lines={["Sanitaryware in Zirakpur,", "seen in person."]}
      >
        <div className="text-lead space-y-6 text-ink/80">
          <Reveal>
            <p>
              {site.name} is a sanitaryware shop in Zirakpur where the products are out on display, not hidden in a
              catalogue. The showroom is in Dhakoli, on Old Ambala Road, and it is arranged so that toilets, wash
              basins and countertop designs can be seen next to one another.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              That matters with sanitaryware. Proportion, the depth of a basin, the height of a seat, the quality of
              a glaze — these are things you judge with your eyes and hands. If you are choosing sanitaryware in
              Zirakpur for a new home or a renovation, a visit will answer most of your questions in one go.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p>
              {brand} products are available at the showroom too — see the{" "}
              <Link href="/jaquar" className={linkClass}>
                {brand} collection
              </Link>
              , or{" "}
              <Link href="/contact" className={linkClass}>
                send us an enquiry
              </Link>{" "}
              before you visit.
            </p>
          </Reveal>
        </div>
      </SplitSection>

      <section className="bg-ivory pb-[clamp(4.5rem,10vw,10.5rem)]">
        <div className="container-site">
          <MaskReveal className="aspect-[3/2] bg-stone sm:aspect-[5/2] lg:aspect-[1671/364]">
            <Image
              src={images.stoneWall.src}
              alt={images.stoneWall.alt}
              fill
              sizes="(min-width: 1600px) 1440px, 92vw"
              className="object-cover object-[31%_50%] sm:object-center"
            />
          </MaskReveal>
        </div>
      </section>

      <SplitSection
        id="sanitaryware-range"
        eyebrow="The collection"
        lines={["What you will", "find here."]}
        className="bg-linen"
        sticky
        lead="A guide to the sanitaryware on display. Ask our team about what is currently available."
      >
        <FeatureList items={range} />
      </SplitSection>

      <div className="bg-ivory pt-[clamp(4.5rem,10vw,10.5rem)]">
        <ImagePair
          primary={images.toilets}
          secondary={images.showroomFloor02}
          caption="Sanitaryware on display · Punjab Sanitary Store, Dhakoli"
        />
      </div>

      <RelatedCategories
        slugs={category.related}
        eyebrow="Explore further"
        lines={["From sanitaryware", "to the full bathroom."]}
        className="bg-ivory border-t border-stone"
      />

      <CTASection
        lines={["See sanitaryware", "at full scale."]}
        primary={{ label: "Explore the showroom", href: "/location" }}
        secondary={{ label: "Send an enquiry", href: "/contact" }}
      />
    </>
  );
}
