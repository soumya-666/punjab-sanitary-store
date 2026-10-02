import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { MaskReveal } from "@/components/motion/MaskReveal";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { TextLink } from "@/components/ui/TextLink";
import { categories, collectionPages } from "@/lib/categories";
import { cn } from "@/lib/cn";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `Bathroom Collections in Zirakpur | ${site.name}`,
  description:
    "Browse every collection at Punjab Sanitary Store, Zirakpur: sanitaryware, faucets, showers, wash basins, toilets, bathroom accessories, vanity units and LED mirrors.",
  path: "/products",
  image: images.washBasins,
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        trail={[{ name: "Collections", path: "/products" }]}
        eyebrow="Collections"
        heading={["Everything for", "a beautiful bathroom."]}
        intro="Eight collections that cover the whole room — from sanitaryware and faucets to vanity units and LED mirrors. Start with a category, or visit the showroom and see them together."
        image={images.washBasins}
        focus="50% 60%"
      />

      <section aria-label="All collections" className="section-y bg-ivory">
        <ol className="container-site space-y-20 lg:space-y-36">
          {categories.map((category, index) => {
            const image = images[category.heroImage ?? category.image];
            const flip = index % 2 === 1;
            return (
              <li key={category.slug}>
                <Link
                  href={category.href}
                  className="group grid items-center gap-y-6 lg:grid-cols-12 lg:gap-x-10"
                >
                  <MaskReveal
                    className={cn(
                      "aspect-[4/3] bg-stone lg:col-span-7 lg:aspect-[3/2]",
                      flip && "lg:order-2 lg:col-start-6",
                    )}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 56vw, 100vw"
                      className="parallax object-cover transition-[scale] duration-[1400ms] ease-editorial group-hover:scale-[1.04]"
                    />
                  </MaskReveal>

                  <Reveal
                    delay={0.1}
                    className={cn("lg:col-span-4", flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-9")}
                  >
                    <p className="eyebrow text-ink/70">
                      {String(index + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}
                    </p>
                    <h2 className="text-h2 mt-3 text-ink transition-transform duration-700 ease-editorial group-hover:translate-x-1.5">
                      {category.name}
                    </h2>
                    <p className="mt-5 max-w-md text-ink/75">{category.hero.intro}</p>
                    <span className="eyebrow mt-6 inline-flex min-h-11 items-center gap-3 text-bronze">
                      Explore {category.name}
                      <ArrowRight
                        aria-hidden="true"
                        strokeWidth={1.25}
                        className="size-4 transition-transform duration-500 ease-editorial group-hover:translate-x-1.5"
                      />
                    </span>
                  </Reveal>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <section aria-labelledby="more-collections" className="on-dark section-y-tight bg-espresso text-ivory">
        <div className="container-site">
          <Reveal y={12}>
            <h2 id="more-collections" className="eyebrow text-ivory/60">
              Also at the showroom
            </h2>
          </Reveal>
          <ul className="mt-8 grid border-t border-ivory/15 md:grid-cols-2 md:gap-x-10">
            {collectionPages.map((page, index) => (
              <Reveal as="li" key={page.href} delay={index * 0.08} className="border-b border-ivory/15 py-9 lg:py-12">
                <p className="text-h3">{page.name}</p>
                <p className="mt-3 max-w-md text-ivory/70">{page.tagline}</p>
                <TextLink href={page.href} className="mt-4 text-ivory">
                  Explore {page.name}
                </TextLink>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}
