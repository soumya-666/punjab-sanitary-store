import type { CSSProperties } from "react";

import { cn } from "@/lib/cn";

type RevealLinesProps = {
  /** One entry per visual line. The text stays in the DOM as normal, readable text. */
  lines: string[];
  delay?: number;
  stagger?: number;
  /** Index of a line to emphasise, and the class that styles it (e.g. an italic face). */
  emphasis?: number;
  emphasisClassName?: string;
};

/**
 * Reveals a heading line by line from behind a mask as it scrolls into view.
 * Place inside the heading element: <h2><RevealLines lines={[…]} /></h2>
 */
export function RevealLines({ lines, delay = 0, stagger = 0.1, emphasis, emphasisClassName }: RevealLinesProps) {
  return (
    <span data-reveal="lines" className="block">
      {lines.map((text, index) => (
        // Padding keeps ascenders and descenders from being clipped by the mask.
        <span key={index} className="-my-[0.1em] block overflow-x-visible overflow-y-clip py-[0.1em]">
          <span
            className={cn("reveal-line", index === emphasis && emphasisClassName)}
            style={{ "--reveal-delay": `${Math.round((delay + index * stagger) * 1000)}ms` } as CSSProperties}
          >
            {text}
          </span>
          {index < lines.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
