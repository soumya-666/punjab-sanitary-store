import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Entrance animations for content above the fold.
 *
 * These are plain CSS animations (see "Above-the-fold entrance" in
 * styles/globals.css), so they start at first paint instead of waiting for
 * JavaScript. That keeps the hero text — the largest contentful paint on
 * phones — on screen as early as possible. Everything further down the page
 * uses the scroll reveals in this folder.
 */

const vars = (delay: number, y?: number) =>
  ({
    "--enter-delay": `${Math.round(delay * 1000)}ms`,
    ...(y === undefined ? {} : { "--enter-y": `${y}px` }),
  }) as CSSProperties;

type EnterProps = {
  children: ReactNode;
  className?: string;
  /** Seconds after first paint. */
  delay?: number;
  /** Distance travelled upward, in pixels. Use 0 for a plain fade. */
  y?: number;
};

/** Fades content upward into place on page load. */
export function Enter({ children, className, delay = 0, y = 20 }: EnterProps) {
  return (
    <div className={cn("animate-enter", className)} style={vars(delay, y)}>
      {children}
    </div>
  );
}

type EnterLinesProps = {
  /** One entry per visual line. */
  lines: string[];
  delay?: number;
  stagger?: number;
  /** Index of a line to emphasise, and the class that styles it (e.g. an italic face). */
  emphasis?: number;
  emphasisClassName?: string;
};

/** Reveals a heading line by line from behind a mask on page load. */
export function EnterLines({ lines, delay = 0, stagger = 0.12, emphasis, emphasisClassName }: EnterLinesProps) {
  return (
    <span className="block">
      {lines.map((text, index) => (
        // Padding keeps ascenders and descenders from being clipped by the mask.
        <span key={index} className="-my-[0.1em] block overflow-x-visible overflow-y-clip py-[0.1em]">
          <span
            className={cn("animate-enter-line block will-change-transform", index === emphasis && emphasisClassName)}
            style={vars(delay + index * stagger)}
          >
            {text}
          </span>
          {index < lines.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}

/**
 * Page hero photograph. It opens the way the home hero does — a dark veil
 * lifts while the picture settles from a slight zoom — and on scroll it holds
 * back and darkens as the page rises over it ("Hero motion" in
 * styles/globals.css; the scroll part needs scroll-driven animations).
 */
export function EnterMedia({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0 -z-20 overflow-clip">
      <div className="hero-scroll">
        <div className="animate-enter-settle absolute inset-0 will-change-transform">{children}</div>
      </div>
      <div aria-hidden="true" className="hero-dim" />
      <div aria-hidden="true" className="animate-enter-veil pointer-events-none absolute inset-0 bg-espresso" />
    </div>
  );
}

/** Thin decorative rule that draws in from the left. */
export function EnterRule({ className, delay = 0 }: { className?: string; delay?: number }) {
  return <span aria-hidden="true" className={cn("animate-enter-rule", className)} style={vars(delay)} />;
}
