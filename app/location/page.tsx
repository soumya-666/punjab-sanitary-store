import { Reveal } from "@/components/motion/Reveal";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { CTASection } from "@/components/sections/CTASection";
import { FeatureList, type FeatureItem } from "@/components/sections/FeatureList";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { PageHero } from "@/components/sections/PageHero";
import { SplitSection } from "@/components/sections/SplitSection";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { directionsUrl, phoneHref, site, whatsappHref } from "@/lib/site";

export const metadata = pageMetadata({
  title: `Showroom Location & Directions | ${site.name}, Dhakoli`,
  description: `Find ${site.name} at SCO 96A, D.S. Estates, Old Ambala Road, Dhakoli, Zirakpur, Punjab. Get directions to the sanitaryware and bathroom fittings showroom.`,
  path: "/location",
  image: images.sanitarywareWall,
});

const visit: FeatureItem[] = [
  {
    title: "See it at full scale",
    text: "Sanitaryware, vanities and mirrors are on display, so size and proportion are easy to judge.",
  },
  {
    title: "Compare side by side",
    text: "Faucets, showers and finishes are shown together, which makes matching them straightforward.",
  },
  {
    title: "Ask our team",
    text: "Tell us about your bathroom and we will help you narrow down the options.",
    link: { label: "Send an enquiry first", href: "/contact" },
  },
];

export default function LocationPage() {
  return (
    <>
      <PageHero
        variant="split"
        trail={[{ name: "Location", path: "/location" }]}
        eyebrow="Visit the showroom"
        heading={["Find us in", "Dhakoli, Zirakpur."]}
        intro={`${site.name} is at SCO 96A in D.S. Estates, on Old Ambala Road in Dhakoli.`}
        image={images.showroomFloor01}
        focus="50% 40%"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href={directionsUrl} variant="ivory" external>
            Get Directions
          </ButtonLink>
          {phoneHref ? (
            <ButtonLink href={phoneHref} variant="outline-light">
              Call Showroom
            </ButtonLink>
          ) : null}
          {whatsappHref ? (
            <ButtonLink href={whatsappHref} variant="outline-light" external>
              WhatsApp Us
            </ButtonLink>
          ) : null}
        </div>
      </PageHero>

      <section aria-labelledby="location-address" className="section-y bg-ivory">
        <div className="container-site grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5">
            <SectionHeading id="location-address" eyebrow="Address" lines={["Old Ambala Road,", "Dhakoli."]} />
            <Reveal delay={0.15}>
              <ContactDetails className="mt-10 lg:mt-14" />
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-7">
            <MapEmbed className="aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[36rem]" />
          </Reveal>
        </div>
      </section>

      <SplitSection
        id="location-visit"
        eyebrow="Your visit"
        lines={["What to expect", "when you arrive."]}
        className="bg-linen"
      >
        <FeatureList items={visit} />
      </SplitSection>

      <CTASection
        lines={["We look forward", "to seeing you."]}
        copy={`${site.address.street}, ${site.address.area}, ${site.address.locality}, ${site.address.region}.`}
        primary={{ label: "Explore Collection", href: "/products" }}
        secondary={{ label: "Send an enquiry", href: "/contact" }}
      />
    </>
  );
}
