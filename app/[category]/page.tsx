import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MaskReveal } from "@/components/motion/MaskReveal";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { FeatureList } from "@/components/sections/FeatureList";
import { PageHero } from "@/components/sections/PageHero";
import { RelatedCategories } from "@/components/sections/RelatedCategories";
import { SplitSection } from "@/components/sections/SplitSection";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { getCategory, inSentence, templatedCategories } from "@/lib/categories";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { directionsUrl, site } from "@/lib/site";

type PageProps = { params: Promise<{ category: string }> };

// Only the categories listed in lib/categories.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return templatedCategories.map((category) => ({ category: category.slug }));
}

const find = (slug: string) => templatedCategories.find((category) => category.slug === slug);

export async function generateMetadata({ params }: PageProps) {
  const { category: slug } = await params;
  const category = find(slug);
  if (!category) return {};

  return pageMetadata({
    title: category.seo.title,
    description: category.seo.description,
    path: category.href,
    image: images[category.image],
  });
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = find(slug);
  if (!category) notFound();

  const secondary = images[category.secondaryImage];
  const sanitaryware = getCategory("sanitaryware");

  return (
    <>
      <PageHero
        variant="split"
        trail={[
          { name: "Collections", path: "/products" },
          { name: category.name, path: category.href },
        ]}
        eyebrow={category.hero.eyebrow}
        heading={category.hero.heading}
        intro={category.hero.intro}
        image={images[category.heroImage ?? category.image]}
      />

      <section aria-labelledby="category-body" className="section-y bg-ivory">
        <div className="container-site grid gap-y-12 lg:grid-cols-12 lg:items-center lg:gap-x-10">
          <div className="lg:col-span-5">
            <SectionHeading id="category-body" eyebrow={`${category.name} at the showroom`} lines={category.body.heading} />
            <div className="mt-8 space-y-5 text-ink/75 lg:mt-10">
              {category.body.paragraphs.map((paragraph, index) => (
                <Reveal key={paragraph} delay={0.1 + index * 0.08}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <figure className="lg:col-span-6 lg:col-start-7">
            <MaskReveal className="aspect-[4/3] bg-stone lg:aspect-[5/4]">
              <Image
                src={secondary.src}
                alt={secondary.alt}
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="parallax object-cover"
              />
            </MaskReveal>
          </figure>
        </div>
      </section>

      <SplitSection
        id="category-range"
        eyebrow="What you will find"
        lines={["On display", "at the showroom."]}
        className="bg-linen"
        sticky
        lead={<>A guide to the kinds of {inSentence(category.name)} you can expect to see and compare in person.</>}
      >
        <FeatureList items={category.range} />
      </SplitSection>

      <section aria-labelledby="category-local" className="section-y-tight bg-ivory">
        <div className="container-site grid gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-7">
            <Reveal y={12}>
              <p className="eyebrow text-bronze">Dhakoli · Zirakpur</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 id="category-local" className="text-h3 mt-5 max-w-3xl text-ink">
                {category.local}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-ink/75">
                {site.name} brings {inSentence(category.name)} together with the rest of the bathroom, from{" "}
                {sanitaryware ? (
                  <Link
                    href={sanitaryware.href}
                    className="font-medium text-walnut underline decoration-walnut/30 underline-offset-4 hover:decoration-walnut"
                  >
                    sanitaryware
                  </Link>
                ) : (
                  "sanitaryware"
                )}{" "}
                to{" "}
                <Link
                  href="/bathroom-fittings"
                  className="font-medium text-walnut underline decoration-walnut/30 underline-offset-4 hover:decoration-walnut"
                >
                  bathroom fittings
                </Link>
                . Have a question before you visit?
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.25} className="flex flex-col gap-4 sm:flex-row sm:items-center lg:col-span-5 lg:justify-end">
            <ButtonLink href={directionsUrl} variant="walnut" external>
              Get Directions
            </ButtonLink>
            <TextLink href="/contact" className="justify-center text-walnut sm:px-3">
              Send an enquiry
            </TextLink>
          </Reveal>
        </div>
      </section>

      <RelatedCategories slugs={category.related} className="bg-ivory border-t border-stone" />

      <CTASection />
    </>
  );
}
