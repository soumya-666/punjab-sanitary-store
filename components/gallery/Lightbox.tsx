"use client";

import { AnimatePresence, m } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, type PointerEvent } from "react";
import { createPortal } from "react-dom";

import type { GalleryEntry } from "@/components/gallery/Gallery";
import { EASE } from "@/components/motion/easing";

type LightboxProps = {
  items: GalleryEntry[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

const FOCUSABLE = "button:not([disabled])";
const SWIPE_THRESHOLD = 48;

const controlClass =
  "inline-flex size-12 items-center justify-center border border-ivory/20 text-ivory transition-colors duration-300 hover:border-ivory hover:bg-ivory hover:text-espresso";

/**
 * Accessible image viewer: modal dialog with a focus trap, Escape to close,
 * arrow keys and swipe to move between images, and a live position readout.
 */
export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pointerStart = useRef<number | null>(null);
  const didSwipe = useRef(false);
  const item = items[index];
  const total = items.length;

  const previous = useCallback(() => onNavigate((index - 1 + total) % total), [index, total, onNavigate]);
  const next = useCallback(() => onNavigate((index + 1) % total), [index, total, onNavigate]);

  useEffect(() => {
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.documentElement.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowLeft") previous();
      else if (event.key === "ArrowRight") next();
      else if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, previous, next]);

  const onPointerDown = (event: PointerEvent) => {
    pointerStart.current = event.clientX;
  };

  const onPointerUp = (event: PointerEvent) => {
    if (pointerStart.current === null) return;
    const delta = event.clientX - pointerStart.current;
    pointerStart.current = null;
    // A drag must not also count as a click on the backdrop.
    didSwipe.current = Math.abs(delta) > SWIPE_THRESHOLD;
    if (delta > SWIPE_THRESHOLD) previous();
    else if (delta < -SWIPE_THRESHOLD) next();
  };

  return createPortal(
    <m.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="on-dark fixed inset-0 z-[80] flex flex-col bg-espresso/97 text-ivory backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <div className="flex shrink-0 items-center justify-between gap-4 px-4 pt-4 sm:px-8 sm:pt-6">
        <p className="eyebrow text-ivory/70" aria-live="polite">
          <span className="sr-only">Image </span>
          {String(index + 1).padStart(2, "0")} <span aria-hidden="true">/</span>
          <span className="sr-only"> of </span> {String(total).padStart(2, "0")}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close image viewer" className={controlClass}>
          <X aria-hidden="true" strokeWidth={1.25} className="size-5" />
        </button>
      </div>

      <div
        className="relative min-h-0 flex-1 touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onClick={(event) => {
          if (event.target === event.currentTarget && !didSwipe.current) onClose();
          didSwipe.current = false;
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={index}
            className="pointer-events-none absolute inset-x-4 inset-y-4 sm:inset-x-24 sm:inset-y-6"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 640px) 80vw, 100vw"
              quality={85}
              className="object-contain"
            />
          </m.div>
        </AnimatePresence>
      </div>

      <div className="flex shrink-0 items-end justify-between gap-6 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:px-8 sm:pb-6">
        <div className="min-w-0">
          <p className="eyebrow text-ivory/60">{item.category}</p>
          <p className="mt-1.5 line-clamp-2 max-w-2xl text-[0.875rem] leading-snug text-ivory/85">{item.alt}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={previous} aria-label="Previous image" className={controlClass}>
            <ChevronLeft aria-hidden="true" strokeWidth={1.25} className="size-5" />
          </button>
          <button type="button" onClick={next} aria-label="Next image" className={controlClass}>
            <ChevronRight aria-hidden="true" strokeWidth={1.25} className="size-5" />
          </button>
        </div>
      </div>
    </m.div>,
    document.body,
  );
}
