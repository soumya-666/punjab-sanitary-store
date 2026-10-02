import { Gallery } from "@/components/gallery/Gallery";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { resolveGallery } from "@/lib/gallery";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `Showroom Gallery | ${site.name}, Zirakpur`,
  description:
    "Bathrooms, sanitaryware, faucets, showers, wash basins, toilets, vanity units, LED mirrors and accessories from Punjab Sanitary Store in Dhakoli, Zirakpur.",
  path: "/gallery",
  image: images.ledMirrors,
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        trail={[{ name: "Gallery", path: "/gallery" }]}
        eyebrow="Gallery"
        heading={["A closer look", "at the collection."]}
        intro="Finished bathrooms, and the sanitaryware, fittings, vanities and mirrors on display. Select any image to view it larger, or filter by category."
        image={images.ledMirrors}
        focus="50% 45%"
      />

      <section aria-label="Image gallery" className="section-y-tight bg-ivory">
        <div className="container-site">
          <Gallery items={resolveGallery()} filters />
        </div>
      </section>

      <CTASection
        lines={["Better seen", "in person."]}
        copy={`Photographs only go so far. Visit ${site.name} in Dhakoli, Zirakpur and see the collection at full scale.`}
        primary={{ label: "Visit Showroom", href: "/location" }}
        secondary={{ label: "Explore Collection", href: "/products" }}
      />
    </>
  );
}
