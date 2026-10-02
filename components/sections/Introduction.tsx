import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { MaskReveal } from "@/components/motion/MaskReveal";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { categories } from "@/lib/categories";
import { images } from "@/lib/images";
import { brand, site } from "@/lib/site";

// Everything the showroom carries, as plain links. Each has its own page, so
// the home page points to them rather than repeating their photographs.
const index = [
  ...categories.map((category) => ({ name: category.name, href: category.href })),
  { name: "Bathroom Fittings", href: "/bathroom-fittings" },
  { name: `${brand} Collection`, href: "/jaquar" },
];

/** About the business: who the showroom is for, what it carries, and what it looks like inside. */
export function Introduction() {
  return (
    <section id="introduction" aria-labelledby="introduction-heading" className="section-y sunlit bg-ivory">
      <div className="container-site">
        <div className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-10">
          <div className="flex flex-col lg:col-span-6 lg:justify-between lg:py-6">
            <SectionHeading
              id="introduction-heading"
              eyebrow="About the showroom"
              lines={["Designed for spaces", "that deserve more."]}
            >
              {site.name} brings together premium sanitaryware, bathroom fittings and contemporary bathroom
              solutions for homeowners, architects, interior designers and professionals in Zirakpur and
              surrounding areas.
            </SectionHeading>

            <Reveal delay={0.2} className="mt-8 max-w-xl text-ink/75">
              <p>
                The showroom is at {site.address.street}, {site.address.area}. Products are out on display at full
                scale, so you can see the material, compare one design with the next and choose with our team on
                hand to help.
              </p>
            </Reveal>

            <Reveal delay={0.25} className="mt-8 flex flex-wrap gap-x-10 gap-y-1 lg:mt-12">
              <TextLink href="/about" className="text-walnut">
                About the showroom
              </TextLink>
              <TextLink href="/gallery" className="text-walnut">
                View the gallery
              </TextLink>
            </Reveal>
          </div>

          {/* Subtle vertical divider between the two halves of the spread. */}
          <div aria-hidden="true" className="hidden justify-center lg:col-span-1 lg:flex">
            <span className="h-full w-px bg-stone" />
          </div>

          {/* Two photographs taken inside the showroom. They are unveiled in turn and
              drift at different speeds as the page scrolls. */}
          <figure className="lg:col-span-5">
            <div className="grid grid-cols-2 items-start gap-3 sm:gap-5">
              <MaskReveal className="aspect-[9/16] bg-stone">
                <Image
                  src={images.showroomFloor01.src}
                  alt={images.showroomFloor01.alt}
                  fill
                  sizes="(min-width: 1024px) 19vw, 46vw"
                  className="parallax object-cover"
                  style={{ "--parallax": "4%" } as CSSProperties}
                />
              </MaskReveal>
              <MaskReveal delay={0.15} className="mt-10 aspect-[9/16] bg-stone lg:mt-16">
                <Image
                  src={images.showroomFloor02.src}
                  alt={images.showroomFloor02.alt}
                  fill
                  sizes="(min-width: 1024px) 19vw, 46vw"
                  className="parallax object-cover"
                />
              </MaskReveal>
            </div>
            <figcaption className="eyebrow mt-4 text-ink/70">Inside the showroom · Dhakoli, Zirakpur</figcaption>
          </figure>
        </div>

        <div className="mt-16 lg:mt-24">
          <Reveal y={12}>
            <h3 className="eyebrow text-bronze">What you will find</h3>
          </Reveal>
          <ul className="mt-6 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-5">
            {index.map((item, position) => (
              <Reveal as="li" key={item.href} delay={Math.min(position * 0.04, 0.32)} y={14} className="rule-t text-ink">
                <Link
                  href={item.href}
                  className="group flex min-h-14 items-center justify-between gap-4 py-3 transition-colors duration-300 hover:text-bronze"
                >
                  <span className="flex items-baseline gap-4 transition-transform duration-500 ease-editorial group-hover:translate-x-1.5">
                    <span aria-hidden="true" className="eyebrow text-ink/60">
                      {String(position + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[1.375rem] leading-tight font-medium">{item.name}</span>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    strokeWidth={1.25}
                    className="size-4 shrink-0 text-bronze transition-transform duration-500 ease-editorial group-hover:translate-x-1.5"
                  />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
