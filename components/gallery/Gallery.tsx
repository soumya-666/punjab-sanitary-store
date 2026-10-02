"use client";

import { AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useMemo, useRef, useState, type CSSProperties } from "react";

import { Lightbox } from "@/components/gallery/Lightbox";
import { cn } from "@/lib/cn";

export type GalleryEntry = { src: string; width: number; height: number; alt: string; category: string };

type GalleryProps = {
  items: GalleryEntry[];
  /** Show the category filter. */
  filters?: boolean;
  className?: string;
};

const ALL = "All";

/**
 * Thumbnails keep each photograph's own proportions, within limits: a very
 * wide panorama would otherwise shrink to a sliver in a narrow column and be
 * hard to tap. The lightbox always shows the whole image.
 */
const thumbnailRatio = ({ width, height }: GalleryEntry) => Math.min(Math.max(width / height, 0.62), 1.6);

/**
 * Masonry gallery: two columns on phones, three on desktop. Click any image to
 * open the lightbox. The pictures arrive one after another, and again each
 * time the filter changes.
 */
export function Gallery({ items, filters = false, className }: GalleryProps) {
  const [active, setActive] = useState<string>(ALL);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const categories = useMemo(() => [ALL, ...Array.from(new Set(items.map((item) => item.category)))], [items]);
  const visible = useMemo(
    () => (active === ALL ? items : items.filter((item) => item.category === active)),
    [active, items],
  );

  const close = useCallback(() => {
    setOpenIndex(null);
    // Return focus to the thumbnail that opened the viewer.
    triggerRef.current?.focus();
  }, []);

  return (
    <div className={className}>
      {filters ? (
        <div
          role="group"
          aria-label="Filter gallery by category"
          className="-mx-[clamp(1.25rem,5vw,5rem)] mb-8 flex gap-2 overflow-x-auto px-[clamp(1.25rem,5vw,5rem)] pb-3 [scrollbar-width:none] lg:mx-0 lg:mb-12 lg:flex-wrap lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((category) => {
            const selected = category === active;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(category)}
                className={cn(
                  "eyebrow min-h-11 shrink-0 border px-5 transition-colors duration-500 ease-editorial",
                  selected
                    ? "border-walnut bg-walnut text-ivory"
                    : "border-ink/20 text-ink/75 hover:border-walnut hover:text-walnut",
                )}
              >
                {category}
              </button>
            );
          })}
        </div>
      ) : null}

      {/* Keyed by the filter, so choosing a category replays the entrance. */}
      <ul key={active} className="columns-2 gap-3 sm:gap-5 lg:columns-3 lg:gap-8">
        {visible.map((item, index) => (
          <li
            key={item.src}
            className="animate-enter mb-3 break-inside-avoid sm:mb-5 lg:mb-8"
            style={{ "--enter-delay": `${Math.min(index, 11) * 55}ms`, "--enter-y": "24px" } as CSSProperties}
          >
            <button
              type="button"
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setOpenIndex(index);
              }}
              className="group relative block w-full overflow-clip bg-stone text-left"
            >
              <span className="sr-only">View larger: </span>
              <span className="relative block" style={{ aspectRatio: thumbnailRatio(item) }}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, 50vw"
                  className="object-cover transition-[scale] duration-[1600ms] ease-editorial group-hover:scale-[1.06]"
                />
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-espresso/75 via-espresso/5 to-transparent transition-colors duration-700 group-hover:bg-espresso/20"
              />
              <span className="on-dark absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 text-ivory lg:p-5">
                <span className="eyebrow">{item.category}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  strokeWidth={1.25}
                  className="size-4 shrink-0 transition-all duration-500 ease-editorial lg:translate-y-1 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:translate-y-0 lg:group-focus-visible:opacity-100"
                />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {openIndex !== null ? (
          <Lightbox items={visible} index={openIndex} onClose={close} onNavigate={setOpenIndex} />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
