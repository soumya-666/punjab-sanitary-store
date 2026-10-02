import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before animating. */
  delay?: number;
  /** Distance travelled upward, in pixels. */
  y?: number;
  as?: "div" | "li" | "p" | "figure";
};

/**
 * Fades content upward into place as it scrolls into view.
 *
 * Rendered on the server with no JavaScript of its own: the transition is CSS
 * ("Scroll reveals" in styles/globals.css) and a single shared observer
 * (RevealObserver) switches it on. Dozens of these cost nothing to hydrate.
 */
export function Reveal({ children, className, delay = 0, y = 28, as: Tag = "div" }: RevealProps) {
  const style = {
    ...(delay ? { "--reveal-delay": `${Math.round(delay * 1000)}ms` } : {}),
    ...(y !== 28 ? { "--reveal-y": `${y}px` } : {}),
  } as CSSProperties;

  return (
    <Tag data-reveal="up" className={className} style={style}>
      {children}
    </Tag>
  );
}
