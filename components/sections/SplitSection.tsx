import type { ReactNode } from "react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

type SplitSectionProps = {
  id: string;
  eyebrow?: string;
  lines: string[];
  /** Supporting copy under the heading (left column). */
  lead?: ReactNode;
  /** Right column. */
  children: ReactNode;
  tone?: "light" | "dark";
  /** Section background and text colour classes. */
  className?: string;
  /** Keep the heading in view while the right column scrolls (desktop). */
  sticky?: boolean;
};

/** Editorial two-column section: heading on the left, content on the right. */
export function SplitSection({
  id,
  eyebrow,
  lines,
  lead,
  children,
  tone = "light",
  className = "bg-ivory",
  sticky = false,
}: SplitSectionProps) {
  return (
    <section aria-labelledby={id} className={cn("section-y", tone === "dark" && "on-dark text-ivory", className)}>
      <div className="container-site grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-5">
          <div className={cn(sticky && "lg:sticky lg:top-32")}>
            <SectionHeading id={id} eyebrow={eyebrow} lines={lines} tone={tone}>
              {lead}
            </SectionHeading>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">{children}</div>
      </div>
    </section>
  );
}
