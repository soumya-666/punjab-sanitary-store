import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { Reveal } from "@/components/motion/Reveal";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { CTASection } from "@/components/sections/CTASection";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `Contact ${site.name} | Dhakoli, Zirakpur`,
  description: `Contact ${site.name} at SCO 96A, D.S. Estates, Old Ambala Road, Dhakoli, Zirakpur. Send an enquiry or get directions to the showroom.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        variant="split"
        trail={[{ name: "Contact", path: "/contact" }]}
        eyebrow="Contact"
        heading={["Let's create a better", "bathroom."]}
        intro="Tell us what you are planning. Send an enquiry below, or visit the showroom in Dhakoli, Zirakpur."
        image={images.heroPortrait}
        focus="50% 35%"
      />

      <section aria-labelledby="contact-enquiry" className="section-y bg-ivory">
        <div className="container-site grid gap-y-16 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-6">
            <SectionHeading id="contact-enquiry" eyebrow="Enquiry" lines={["Tell us about", "your bathroom."]}>
              Share a few details and what you are looking for. The more we know, the more useful our reply.
            </SectionHeading>
            <Reveal delay={0.2} className="mt-12 lg:mt-16">
              <EnquiryForm />
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal y={12}>
              <h2 className="eyebrow flex items-center gap-4 text-bronze">
                <span aria-hidden="true" className="h-px w-8 bg-copper" />
                Showroom details
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <ContactDetails className="mt-6 lg:mt-8" />
            </Reveal>
            <Reveal delay={0.15}>
              <MapEmbed className="mt-10 aspect-[4/3]" />
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection
        lines={["Prefer to see it", "in person?"]}
        copy={`Visit ${site.name} at ${site.address.street}, ${site.address.area}, ${site.address.locality}.`}
        primary={{ label: "Visit Showroom", href: "/location" }}
        secondary={{ label: "Explore Collection", href: "/products" }}
      />
    </>
  );
}
