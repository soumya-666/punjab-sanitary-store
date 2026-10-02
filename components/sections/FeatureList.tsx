import { Reveal } from "@/components/motion/Reveal";
import { TextLink } from "@/components/ui/TextLink";
import { cn } from "@/lib/cn";

export type FeatureItem = {
  title: string;
  text: string;
  link?: { label: string; href: string };
};

type FeatureListProps = {
  items: FeatureItem[];
  tone?: "light" | "dark";
  headingAs?: "h2" | "h3";
  className?: string;
};

/**
 * Numbered rows divided by hairlines — large serif titles, short supporting
 * copy. Each hairline draws in from the left as its row is revealed.
 */
export function FeatureList({ items, tone = "light", headingAs: Heading = "h3", className }: FeatureListProps) {
  const dark = tone === "dark";

  return (
    <ul className={cn("border-b", dark ? "border-ivory/15 text-ivory" : "border-ink/15 text-ink", className)}>
      {items.map((item, index) => (
        <Reveal as="li" key={item.title} delay={Math.min(index * 0.05, 0.25)} className="rule-t py-7 lg:py-10">
          <div className="flex gap-5 lg:gap-8">
            <span aria-hidden="true" className={cn("eyebrow pt-2.5", dark ? "text-amber/80" : "text-bronze")}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <Heading className="text-h3">{item.title}</Heading>
              <p className={cn("mt-3 max-w-lg", dark ? "text-ivory/70" : "text-ink/70")}>{item.text}</p>
              {item.link ? (
                <TextLink href={item.link.href} className={cn("mt-3", dark ? "text-ivory" : "text-walnut")}>
                  {item.link.label}
                </TextLink>
              ) : null}
            </div>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
