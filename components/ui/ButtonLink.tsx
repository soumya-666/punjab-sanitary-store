import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type Variant = "ivory" | "walnut" | "outline-light" | "outline-dark";

/** Resting colours, and the colour of the fill that rises on hover. */
const variants: Record<Variant, { base: string; fill: string }> = {
  ivory: { base: "bg-ivory text-espresso", fill: "bg-amber" },
  walnut: { base: "bg-walnut text-ivory", fill: "bg-timber" },
  "outline-light": {
    base: "border border-ivory/35 text-ivory hover:border-ivory hover:text-espresso focus-visible:text-espresso active:text-espresso",
    fill: "bg-ivory",
  },
  "outline-dark": {
    base: "border border-ink/30 text-ink hover:border-walnut hover:text-ivory focus-visible:text-ivory active:text-ivory",
    fill: "bg-walnut",
  },
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Opens in a new tab with an outward arrow. Use for maps, phone and WhatsApp links. */
  external?: boolean;
  className?: string;
  compact?: boolean;
};

/**
 * Primary call-to-action link. Always at least 48px tall for comfortable touch.
 * On hover the fill rises from the bottom edge and the arrow is replaced by
 * its twin — see "Buttons" in styles/globals.css.
 */
export function ButtonLink({
  href,
  children,
  variant = "walnut",
  external = false,
  compact = false,
  className,
}: ButtonLinkProps) {
  const { base, fill } = variants[variant];
  const classes = cn(
    "btn inline-flex items-center justify-center gap-3 text-center text-[0.75rem] font-semibold uppercase leading-none tracking-[0.2em]",
    compact ? "min-h-11 px-5" : "min-h-13 px-5 sm:px-7",
    "sm:whitespace-nowrap",
    base,
    className,
  );
  const Arrow = external ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      <span aria-hidden="true" className={cn("btn-fill", fill)} />
      <span>{children}</span>
      <span aria-hidden="true" className="btn-arrow size-4" data-direction={external ? "out" : undefined}>
        <Arrow strokeWidth={1.25} className="size-4" />
        <Arrow strokeWidth={1.25} className="size-4" />
      </span>
    </>
  );

  // Phone and email links hand off to the device, so they stay in the same tab.
  if (/^(tel:|mailto:)/.test(href)) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
