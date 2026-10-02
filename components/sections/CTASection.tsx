import { Reveal } from "@/components/motion/Reveal";
import { RevealLines } from "@/components/motion/RevealLines";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { displayItalicLazy } from "@/lib/fonts/display-italic-lazy";
import { site } from "@/lib/site";

type CTASectionProps = {
  lines?: string[];
  copy?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/**
 * Closing call to action: dark timber and lamplight, in the palette of the
 * hero photograph. The lamplight drifts slowly across the section and the
 * headline slides into place as it is scrolled into view.
 */
export function CTASection({
  lines = ["Your bathroom", "starts here."],
  copy = `Explore premium sanitaryware and bathroom solutions at ${site.name}, Dhakoli, Zirakpur.`,
  primary = { label: "Explore Collection", href: "/products" },
  secondary = { label: "Visit Showroom", href: "/location" },
}: CTASectionProps) {
  return (
    <section aria-labelledby="cta-heading" className="on-dark relative isolate overflow-clip bg-walnut text-ivory">
      <div aria-hidden="true" className="warm-glow absolute inset-0 -z-10" />
      <div aria-hidden="true" className="lamplight" />
      <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10" />

      <div className="container-site section-y grid gap-y-10 lg:grid-cols-12 lg:items-end lg:gap-x-10">
        <div className="lg:col-span-8">
          <Reveal y={12}>
            <Eyebrow accent="amber" className="text-sand">Visit the showroom</Eyebrow>
          </Reveal>
          <h2 id="cta-heading" className="scroll-slide text-display mt-6 lg:mt-8">
            <RevealLines lines={lines} emphasis={lines.length - 1} emphasisClassName={displayItalicLazy.className} />
          </h2>
        </div>

        <div className="lg:col-span-4 lg:pb-4">
          <Reveal delay={0.15}>
            <p className="text-lead max-w-md text-ivory/80">{copy}</p>
          </Reveal>
          <Reveal delay={0.25} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={primary.href} variant="ivory">
              {primary.label}
            </ButtonLink>
            <ButtonLink href={secondary.href} variant="outline-light">
              {secondary.label}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
