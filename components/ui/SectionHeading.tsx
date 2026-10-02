import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { RevealLines } from "@/components/motion/RevealLines";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  /** Heading text, one entry per line. */
  lines: string[];
  /** Supporting copy below the heading. */
  children?: ReactNode;
  as?: "h1" | "h2" | "h3";
  size?: "h1" | "h2";
  tone?: "light" | "dark";
  className?: string;
  id?: string;
};

/** Eyebrow, editorial serif heading and optional supporting copy. */
export function SectionHeading({
  eyebrow,
  lines,
  children,
  as: Heading = "h2",
  size = "h2",
  tone = "light",
  className,
  id,
}: SectionHeadingProps) {
  const dark = tone === "dark";

  return (
    <div className={className}>
      {eyebrow ? (
        <Reveal y={12}>
          <Eyebrow accent={dark ? "amber" : "copper"} className={dark ? "text-sand" : "text-bronze"}>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}
      <Heading
        id={id}
        className={cn(size === "h1" ? "text-h1" : "text-h2", eyebrow && "mt-6 lg:mt-8", dark ? "text-ivory" : "text-ink")}
      >
        <RevealLines lines={lines} />
      </Heading>
      {children ? (
        <Reveal delay={0.15} className={cn("text-lead mt-7 max-w-xl lg:mt-9", dark ? "text-ivory/75" : "text-ink/75")}>
          {children}
        </Reveal>
      ) : null}
    </div>
  );
}
