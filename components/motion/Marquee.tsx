import { cn } from "@/lib/cn";

type MarqueeProps = {
  /** Words or short phrases, in order. */
  items: string[];
  /** Class for every second item (e.g. an italic face), so the line has a rhythm. */
  alternateClassName?: string;
  className?: string;
};

/**
 * One line of display type crossing the page, slowly. Purely decorative —
 * hidden from assistive technology, so put the same information somewhere
 * readable. It moves on its own and also leans with the scroll
 * ("Marquee" and "Scroll-driven motion" in styles/globals.css).
 */
export function Marquee({ items, alternateClassName, className }: MarqueeProps) {
  const track = (
    <ul className="marquee-track">
      {items.map((item, index) => (
        <li key={item} className="flex shrink-0 items-center">
          <span className={cn("whitespace-nowrap", index % 2 === 1 && alternateClassName)}>{item}</span>
          <span className="mx-[0.7em] block size-[0.14em] shrink-0 rotate-45 bg-amber" />
        </li>
      ))}
    </ul>
  );

  return (
    <div aria-hidden="true" className={cn("overflow-clip", className)}>
      {/* Wider than the band, so leaning with the scroll never exposes an edge. */}
      <div className="marquee-scroll -mx-[12%]">
        <div className="marquee">
          {track}
          {track}
        </div>
      </div>
    </div>
  );
}
