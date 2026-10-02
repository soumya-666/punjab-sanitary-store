import Link from "next/link";
import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brand, site } from "@/lib/site";

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link
    href={href}
    className="font-medium text-walnut underline decoration-walnut/30 underline-offset-4 transition-colors duration-300 hover:decoration-walnut"
  >
    {children}
  </Link>
);

/** Plain-language local context, written for visitors first. */
export function LocalSEOSection() {
  return (
    <section aria-labelledby="local-heading" className="section-y bg-linen">
      <div className="container-site">
        <SectionHeading
          id="local-heading"
          eyebrow="Dhakoli · Zirakpur"
          lines={["Your Premium Sanitaryware Store", "in Dhakoli, Zirakpur"]}
        />

        <div className="mt-12 grid lg:mt-20 lg:grid-cols-12 lg:gap-x-10">
          <Reveal
            delay={0.1}
            className="space-y-5 text-ink/80 md:columns-2 md:gap-10 md:space-y-0 lg:col-span-9 lg:col-start-4 lg:gap-14 md:[&>p]:mb-5 md:[&>p]:break-inside-avoid"
          >
            <p>
              {site.name} is a sanitaryware shop in Zirakpur for people who would rather see a bathroom than
              imagine one. You will find the showroom at SCO 96A, D.S. Estates, on Old Ambala Road in Dhakoli, with{" "}
              <A href="/sanitaryware">sanitaryware</A> and bathroom fittings displayed so they can be compared side
              by side.
            </p>
            <p>
              If you are looking for sanitaryware in Zirakpur, the showroom brings the essentials together in one
              place: <A href="/toilets">toilets</A> in wall-hung and floor-standing designs,{" "}
              <A href="/wash-basins">wash basins</A> for countertops and compact spaces, and vanity units that pair
              storage with a basin. For anyone comparing toilets in Zirakpur or choosing wash basins in Zirakpur,
              seeing shape, size and finish in person makes the decision far simpler.
            </p>
            <p>
              The same is true of <A href="/bathroom-fittings">bathroom fittings in Zirakpur</A>. Faucets and
              mixers are shown in a range of finishes, and overhead showers and hand showers are displayed together
              as sets. Whether you need <A href="/faucets">faucets in Zirakpur</A> for a single basin or{" "}
              <A href="/showers">showers in Zirakpur</A> for a full renovation, you can match the pieces before you
              buy.
            </p>
            <p>
              {site.name} also carries {brand} products. If you are searching for {brand} sanitaryware in Zirakpur
              or {brand} bathroom fittings in Zirakpur, you can explore the{" "}
              <A href="/jaquar">{brand} collection</A> at the showroom.
            </p>
            <p>
              The finishing details matter as much as the fixtures. If you have been looking for{" "}
              <A href="/bathroom-accessories">bathroom accessories in Zirakpur</A>,{" "}
              <A href="/vanity-units">vanity units in Zirakpur</A> or{" "}
              <A href="/led-mirrors">LED mirrors in Zirakpur</A>, you can see them here and match them to your
              fittings in person.
            </p>
            <p>
              Homeowners, architects and interior designers are all welcome.{" "}
              <A href="/location">Visit us on Old Ambala Road, Dhakoli</A>, and our team will help you put together
              a bathroom that suits your space.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
