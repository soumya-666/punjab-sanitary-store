import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/cn";

type MaskRevealProps = {
  children: ReactNode;
  /** Must give the frame a size, e.g. an aspect-ratio class. */
  className?: string;
  delay?: number;
};

/** Unveils an image from the bottom edge upward while it settles from a slight zoom. */
export function MaskReveal({ children, className, delay = 0 }: MaskRevealProps) {
  const style = (delay ? { "--reveal-delay": `${Math.round(delay * 1000)}ms` } : {}) as CSSProperties;

  return (
    <div data-reveal="mask" className={cn("relative overflow-clip", className)} style={style}>
      <div className="reveal-mask absolute inset-0">
        <div className="reveal-zoom absolute inset-0">{children}</div>
      </div>
    </div>
  );
}
