import { Marquee } from "@/components/motion/Marquee";
import { CTASection } from "@/components/sections/CTASection";
import { FAQ } from "@/components/sections/FAQ";
import { Hero } from "@/components/sections/Hero";
import { Introduction } from "@/components/sections/Introduction";
import { LocalSEOSection } from "@/components/sections/LocalSEOSection";
import { ShowroomSection } from "@/components/sections/ShowroomSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { categories } from "@/lib/categories";
import { displayItalic } from "@/lib/fonts/display-italic";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `${site.name} | Sanitaryware & Bathroom Fittings in Zirakpur`,
  description: site.description,
  path: "/",
});

// The home page is about the business itself. Collections, bathroom fittings,
// the brand and the gallery each have their own page and are linked from here
// rather than repeated.
export default function HomePage() {
  return (
    <>
      <Hero />
      {/* What the showroom carries, as one slow line of type under the photograph.
          Decorative: the same collections are listed, as links, in the introduction. */}
      <Marquee
        items={categories.map((category) => category.name)}
        alternateClassName={displayItalic.className}
        className="on-dark border-t border-ivory/10 bg-espresso py-5 font-display text-[clamp(1.75rem,1.1rem+2.6vw,3.5rem)] leading-none text-sand/85 lg:py-7"
      />
      <Introduction />
      <WhyChooseUs />
      <ShowroomSection />
      <LocalSEOSection />
      <FAQ />
      <CTASection />
    </>
  );
}
