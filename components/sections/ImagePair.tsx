import Image from "next/image";

import { MaskReveal } from "@/components/motion/MaskReveal";
import { cn } from "@/lib/cn";
import type { SiteImage } from "@/lib/images";

type ImagePairProps = {
  /** Wide image, on the left on desktop. */
  primary: SiteImage;
  /** Narrower image, offset downward on the right. */
  secondary: SiteImage;
  caption?: string;
  tone?: "light" | "dark";
  className?: string;
};

/** Asymmetric pair of photographs: one wide, one narrow and offset. */
export function ImagePair({ primary, secondary, caption, tone = "light", className = "bg-ivory" }: ImagePairProps) {
  return (
    <section className={cn("pb-[clamp(4.5rem,10vw,10.5rem)]", className)}>
      <div className="container-site">
        <div className="grid grid-cols-12 items-start gap-x-3 sm:gap-x-6 lg:gap-x-10">
          <MaskReveal className="col-span-8 aspect-[4/3] bg-stone lg:col-span-7 lg:aspect-[3/2]">
            <Image
              src={primary.src}
              alt={primary.alt}
              fill
              sizes="(min-width: 1024px) 56vw, 66vw"
              className="parallax object-cover"
            />
          </MaskReveal>
          <MaskReveal
            delay={0.15}
            className="col-span-4 mt-[22%] aspect-[3/5] bg-stone sm:aspect-[3/4] lg:col-start-9 lg:mt-40"
          >
            <Image
              src={secondary.src}
              alt={secondary.alt}
              fill
              sizes="(min-width: 1024px) 30vw, 33vw"
              className="parallax object-cover"
            />
          </MaskReveal>
        </div>
        {caption ? (
          <p className={cn("eyebrow mt-5", tone === "dark" ? "text-ivory/60" : "text-ink/70")}>{caption}</p>
        ) : null}
      </div>
    </section>
  );
}
