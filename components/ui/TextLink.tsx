import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
};

/** Quiet inline call-to-action: small caps label, hairline, travelling arrow. */
export function TextLink({ href, children, external = false, className }: TextLinkProps) {
  const classes = cn(
    "group inline-flex min-h-11 items-center gap-3 text-[0.75rem] font-semibold uppercase tracking-[0.2em]",
    className,
  );
  const Arrow = external ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      <span className="link-underline pb-1">{children}</span>
      <Arrow
        aria-hidden="true"
        strokeWidth={1.25}
        className="size-4 shrink-0 transition-transform duration-500 ease-editorial group-hover:translate-x-1.5"
      />
    </>
  );

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
