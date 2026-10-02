import Image from "next/image";
import type { ReactNode } from "react";

import { Enter, EnterLines, EnterMedia, EnterRule } from "@/components/motion/Enter";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/cn";
import type { SiteImage } from "@/lib/images";
import type { Crumb } from "@/lib/schema";

type PageHeroProps = {
  /** Breadcrumb trail after "Home"; the last entry is this page. */
  trail: Crumb[];
  eyebrow: string;
  /** H1 text, one entry per line. */
  heading: string[];
  intro?: string;
  image: SiteImage;
  /** "full": photograph behind the text. "split": text panel beside the photograph. */
  variant?: "full" | "split";
  /** Background of the text panel. */
  tone?: "espresso" | "walnut";
  /** CSS object-position for the photograph. */
  focus?: string;
  children?: ReactNode;
};

/**
 * Opening section for every inner page. Always dark, so the header can overlay
 * it. It opens the way the home hero does — a veil lifts while the photograph
 * settles — and on scroll the photograph holds back and darkens as the page
 * rises over it.
 */
export function PageHero({
  trail,
  eyebrow,
  heading,
  intro,
  image,
  variant = "full",
  tone = "espresso",
  focus = "50% 50%",
  children,
}: PageHeroProps) {
  const text = (
    <>
      <Enter delay={0.05} y={10}>
        <Breadcrumbs trail={trail} />
      </Enter>
      <Enter delay={0.12} y={12}>
        <p className="eyebrow mt-8 flex items-center gap-4 text-sand lg:mt-12">
          <span aria-hidden="true" className="h-px w-8 bg-amber" />
          {eyebrow}
        </p>
      </Enter>
      <h1 className={cn(variant === "split" ? "text-h2" : "text-h1", "mt-5 lg:mt-7")}>
        <EnterLines lines={heading} delay={0.2} stagger={0.12} />
      </h1>
      {intro ? (
        <Enter delay={0.5} y={18}>
          <p className="text-lead mt-6 max-w-[36rem] text-ivory/80 lg:mt-8">{intro}</p>
        </Enter>
      ) : null}
      {children ? (
        <Enter delay={0.62} y={16} className="mt-8 lg:mt-10">
          {children}
        </Enter>
      ) : null}
    </>
  );

  if (variant === "split") {
    return (
      <section
        data-hero=""
        className={cn(
          "on-dark relative isolate grid overflow-clip text-ivory lg:min-h-[max(40rem,84svh)] lg:grid-cols-2",
          tone === "walnut" ? "bg-walnut" : "bg-espresso",
        )}
      >
        <div aria-hidden="true" className="lamplight" />
        <div className="relative isolate order-first aspect-[4/3] overflow-clip sm:aspect-[16/9] lg:order-last lg:aspect-auto">
          <EnterMedia>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              preload
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              style={{ objectPosition: focus }}
            />
          </EnterMedia>
          {/* Keeps the header legible where it crosses the photograph. */}
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-espresso/75 to-transparent" />
        </div>
        <div className="flex flex-col justify-end px-[clamp(1.25rem,5vw,5rem)] pt-10 pb-14 lg:pt-40 lg:pb-20">{text}</div>
      </section>
    );
  }

  return (
    <section data-hero="" className="on-dark relative isolate flex min-h-[max(34rem,78svh)] flex-col justify-end overflow-clip bg-espresso text-ivory lg:min-h-[max(40rem,84svh)]">
      <EnterMedia>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          preload
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: focus }}
        />
      </EnterMedia>
      {/* Warm, neutral toning only, light enough that the photograph stays luminous:
          an overall tone, a band behind the header and a base for the type. */}
      <div
        aria-hidden="true"
        className={cn("absolute inset-0 -z-10", tone === "walnut" ? "bg-walnut/25" : "bg-espresso/15")}
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-44 bg-linear-to-b from-espresso/70 to-transparent" />
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 bottom-0 -z-10 h-[88%] bg-linear-to-t from-[4%] via-[48%] to-transparent md:h-[82%] md:via-[42%]",
          tone === "walnut" ? "from-walnut via-walnut/70 md:via-walnut/55" : "from-espresso via-espresso/70 md:via-espresso/55",
        )}
      />

      <div className="hero-content hero-legible container-site relative pt-32 pb-12 lg:pb-16">
        <div className="max-w-5xl">{text}</div>
        <EnterRule delay={0.8} className="mt-12 block h-px w-full bg-ivory/20 lg:mt-16" />
      </div>
    </section>
  );
}
