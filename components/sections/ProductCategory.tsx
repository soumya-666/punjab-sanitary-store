import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";
import type { Category } from "@/lib/categories";
import { cn } from "@/lib/cn";
import { images } from "@/lib/images";

type ProductCategoryProps = {
  category: Category;
  /** Shown as a two-digit index, e.g. 3 → "03". */
  number: number;
  /** Tailwind aspect-ratio classes for the image frame. */
  aspect: string;
  /** `sizes` attribute matching the tile's rendered width. */
  sizes: string;
  /** Large tiles get a bigger title. */
  large?: boolean;
  headingLevel?: "h2" | "h3";
  className?: string;
  delay?: number;
};

/**
 * One category in the editorial collection layouts: image, name, short
 * description and an Explore link. Everything is visible without hover, so
 * it reads the same on touch screens.
 */
export function ProductCategory({
  category,
  number,
  aspect,
  sizes,
  large = false,
  headingLevel: Heading = "h3",
  className,
  delay = 0,
}: ProductCategoryProps) {
  const image = images[category.image];

  return (
    <Reveal className={className} delay={delay}>
      <Link href={category.href} className="group block">
        <div className={cn("relative overflow-clip bg-stone", aspect)}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.03]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-espresso/0 transition-colors duration-700 ease-editorial group-hover:bg-espresso/15"
          />
        </div>

        <div className="mt-4 transition-transform duration-700 ease-editorial group-hover:translate-x-1 lg:mt-6">
          <p className="eyebrow text-ink/70">{String(number).padStart(2, "0")}</p>
          <Heading
            className={cn(
              "mt-1 font-display leading-[1.08] font-medium tracking-tight text-ink",
              large
                ? "text-[clamp(1.875rem,1.3rem+2.4vw,3.25rem)]"
                : "text-[clamp(1.375rem,1.1rem+1.2vw,2.25rem)]",
            )}
          >
            {category.name}
          </Heading>
          <p className="mt-2 max-w-sm text-[0.875rem] leading-relaxed text-ink/70 sm:text-[0.9375rem]">
            {category.tagline}
          </p>
          <span className="eyebrow mt-3 inline-flex min-h-6 items-center gap-2.5 text-bronze">
            Explore
            <ArrowRight
              aria-hidden="true"
              strokeWidth={1.25}
              className="size-4 transition-transform duration-500 ease-editorial group-hover:translate-x-1.5"
            />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
