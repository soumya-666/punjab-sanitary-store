import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { FeatureList, type FeatureItem } from "@/components/sections/FeatureList";
import { ImagePair } from "@/components/sections/ImagePair";
import { PageHero } from "@/components/sections/PageHero";
import { ShowroomSection } from "@/components/sections/ShowroomSection";
import { SplitSection } from "@/components/sections/SplitSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { brand, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `About ${site.name} | Sanitaryware Showroom in Zirakpur`,
  description: `${site.name} is a sanitaryware and bathroom fittings showroom in Dhakoli, Zirakpur, with contemporary bathroom products and in-person assistance.`,
  path: "/about",
  image: images.bathroomDaylight,
});

// What the showroom offers. Company history is deliberately not written here
// until the business supplies it.
const focus: FeatureItem[] = [
  {
    title: "Premium sanitaryware",
    text: "Toilets, wash basins and countertop designs, chosen for clean lines and lasting finish.",
    link: { label: "Explore sanitaryware", href: "/sanitaryware" },
  },
  {
    title: "Bathroom fittings",
    text: "Faucets, mixers, showers and accessories, displayed so finishes can be compared directly.",
    link: { label: "Explore bathroom fittings", href: "/bathroom-fittings" },
  },
  {
    title: "The showroom experience",
    text: "Products are out on display at full scale, so you can see, touch and compare before deciding.",
    link: { label: "Plan a visit", href: "/location" },
  },
  {
    title: "Contemporary design",
    text: "A collection shaped around the way modern bathrooms are designed: calm, uncluttered and considered.",
    link: { label: "View the gallery", href: "/gallery" },
  },
  {
    title: "Customer assistance",
    text: "Our team helps you compare options and put together a bathroom that suits your space.",
    link: { label: "Send an enquiry", href: "/contact" },
  },
  {
    title: `${brand} products`,
    text: `${brand} bathroom products and fittings are available at the showroom.`,
    link: { label: `Explore ${brand}`, href: "/jaquar" },
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        trail={[{ name: "About", path: "/about" }]}
        eyebrow={`About ${site.name}`}
        heading={["A showroom devoted", "to the bathroom."]}
        intro="Premium sanitaryware, bathroom fittings and contemporary bathroom solutions, brought together in Dhakoli, Zirakpur."
        image={images.bathroomDaylight}
        focus="50% 55%"
      />

      <section aria-labelledby="about-statement" className="section-y bg-ivory">
        <div className="container-site grid gap-y-10 lg:grid-cols-12 lg:gap-x-10">
          <Reveal y={12} className="lg:col-span-3">
            <p className="eyebrow flex items-center gap-4 text-bronze">
              <span aria-hidden="true" className="h-px w-8 bg-copper" />
              Our approach
            </p>
          </Reveal>
          <div className="lg:col-span-9">
            <Reveal>
              <h2
                id="about-statement"
                className="font-display text-[clamp(1.75rem,1.2rem+2.6vw,3.5rem)] leading-[1.14] tracking-tight text-ink"
              >
                A bathroom is the most personal room in a home. We believe it should be chosen in person — by
                seeing the material, feeling the finish and comparing one design with the next.
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-6 text-ink/75 md:grid-cols-2 md:gap-10 lg:mt-14">
              <Reveal delay={0.1}>
                <p>
                  {site.name} is a sanitaryware and bathroom fittings showroom at {site.address.street},{" "}
                  {site.address.area}, {site.address.locality}. We bring premium sanitaryware, fittings and complete
                  bathroom solutions together in one place.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p>
                  Whether you are a homeowner planning a single bathroom, or an architect or interior designer
                  specifying for a project, the showroom is arranged to make choosing simpler — with our team on
                  hand to help.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <ImagePair
        primary={images.washBasins}
        secondary={images.showroomFloor01}
        caption={`Inside ${site.name}, Dhakoli`}
      />

      <SplitSection
        id="about-focus"
        eyebrow="What we do"
        lines={["Six things", "we care about."]}
        className="bg-linen"
        sticky
      >
        <FeatureList items={focus} />
      </SplitSection>

      <WhyChooseUs />
      <ShowroomSection />
      <CTASection />
    </>
  );
}
