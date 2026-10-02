import Image from "next/image";

import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/lib/images";
import { directionsUrl, phoneHref, site, whatsappHref } from "@/lib/site";

/** Split section: the showroom on one side, the invitation to visit on the other. */
export function ShowroomSection() {
  return (
    <section aria-labelledby="showroom-heading" className="bg-linen">
      <div className="grid lg:grid-cols-12">
        {/* The photograph opens from a slightly inset frame as it scrolls into view,
            and drifts inside the frame as it crosses the screen. */}
        <div className="scroll-open relative aspect-[4/3] overflow-clip bg-stone sm:aspect-[16/9] lg:col-span-7 lg:aspect-auto lg:min-h-[48rem]">
          <Image
            src={images.sanitarywareWall.src}
            alt={images.sanitarywareWall.alt}
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="parallax object-cover"
          />
        </div>

        <div className="flex flex-col justify-center px-[clamp(1.25rem,5vw,5rem)] py-16 lg:col-span-5 lg:py-24">
          <SectionHeading
            id="showroom-heading"
            eyebrow="The showroom"
            lines={["See it.", "Feel it.", "Choose it."]}
          >
            Visit {site.name} in Dhakoli, Zirakpur and explore premium bathroom products and fittings in person.
          </SectionHeading>

          <Reveal delay={0.2} className="rule-t mt-10 pt-8 text-ink">
            <p className="eyebrow text-ink/70">Address</p>
            <address className="mt-3 font-display text-[clamp(1.375rem,1.15rem+0.9vw,1.875rem)] leading-snug not-italic">
              {site.address.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </Reveal>

          <Reveal delay={0.3} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={directionsUrl} variant="walnut" external>
              Get Directions
            </ButtonLink>
            {phoneHref ? (
              <ButtonLink href={phoneHref} variant="outline-dark">
                Call Showroom
              </ButtonLink>
            ) : null}
            {whatsappHref ? (
              <ButtonLink href={whatsappHref} variant="outline-dark" external>
                WhatsApp Us
              </ButtonLink>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
