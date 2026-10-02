import { BadgeCheck, Bath, Gem, Headset, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brand } from "@/lib/site";

type Feature = { icon: LucideIcon; title: string; text: string };

const features: Feature[] = [
  {
    icon: Gem,
    title: "Premium Quality Products",
    text: "Sanitaryware and fittings chosen for their finish, their feel and the way they hold up to daily use.",
  },
  {
    icon: BadgeCheck,
    title: `Genuine ${brand} Products`,
    text: `${brand} bathroom products and fittings, available at the showroom.`,
  },
  {
    icon: Bath,
    title: "Complete Bathroom Solutions",
    text: "From toilets and basins to showers, vanities, mirrors and accessories — everything for the room, in one place.",
  },
  {
    icon: Headset,
    title: "Expert Support",
    text: "Guidance from our team to help you compare options and choose what suits your space.",
  },
];

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-heading" className="section-y bg-ivory">
      <div className="container-site grid gap-y-14 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading id="why-heading" eyebrow="Why choose us" lines={["A better way", "to choose", "a bathroom."]} />
          </div>
        </div>

        <ul className="border-b border-ink/15 lg:col-span-6 lg:col-start-7">
          {features.map(({ icon: Icon, title, text }, index) => (
            // Each row's hairline draws in from the left as the row is revealed.
            <Reveal as="li" key={title} delay={index * 0.06} className="group rule-t py-8 text-ink lg:py-11">
              <div className="flex items-start gap-5 lg:gap-8">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-bronze/25 text-bronze transition-colors duration-500 ease-editorial group-hover:border-bronze group-hover:bg-walnut group-hover:text-amber lg:size-16">
                  <Icon aria-hidden="true" strokeWidth={1} className="size-7 lg:size-8" />
                </span>
                <div>
                  <h3 className="text-h3">{title}</h3>
                  <p className="mt-3 max-w-md text-ink/70">{text}</p>
                </div>
                <span aria-hidden="true" className="eyebrow ml-auto hidden pt-2 text-ink/60 sm:block">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
