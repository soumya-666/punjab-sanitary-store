"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";

import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { cn } from "@/lib/cn";
import { whatsappHref } from "@/lib/site";

/** How long after the page loads the button may appear, in milliseconds. */
const APPEAR_AFTER = 5000;

/**
 * The button occupies roughly the lowest 136px of a phone screen (it sits above
 * the action bar) and less on wider screens. The page hero must end above
 * that, with a little air, before the button is allowed to show.
 */
const CLEARANCE = 160;

const subscribe = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
};

/** True once the page hero (any section marked `data-hero`) no longer reaches the button's corner. */
const clearOfHero = () => {
  const hero = document.querySelector("[data-hero]");
  return !hero || hero.getBoundingClientRect().bottom < window.innerHeight - CLEARANCE;
};

/**
 * Floating WhatsApp chat button, on every screen size, with the icon in
 * WhatsApp's own green and white so it is recognised at a glance.
 *
 *  - It never sits over a hero photograph: it waits until the visitor has
 *    scrolled the hero out of its corner of the screen, and hides again if
 *    they scroll back up to it.
 *  - It also waits five seconds after the page loads before it first appears.
 *  - On phones it sits just above the bottom action bar.
 *  - At the foot of the page it moves up, so the copyright and credit line in
 *    the footer (marked `data-footer-credit`) are never covered.
 *  - On desktop the label slides out on hover.
 *
 * Renders nothing until a WhatsApp number is set in lib/site.ts.
 */
export function WhatsAppButton() {
  // Re-render on navigation, so the new page's hero is measured.
  usePathname();
  const pastHero = useSyncExternalStore(subscribe, clearOfHero, () => false);
  const [ready, setReady] = useState(false);
  const [atFoot, setAtFoot] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), APPEAR_AFTER);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const credit = document.querySelector("[data-footer-credit]");
    if (!credit || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) => setAtFoot(entry.isIntersecting));
    observer.observe(credit);
    return () => observer.disconnect();
  }, []);

  if (!whatsappHref) return null;

  const shown = ready && pastHero;

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={shown ? undefined : -1}
      aria-hidden={shown ? undefined : true}
      className={cn(
        "on-dark group fixed right-4 bottom-[calc(4rem+env(safe-area-inset-bottom)+1rem)] z-40 inline-flex h-14 items-center rounded-full bg-espresso/95 shadow-[0_16px_36px_-12px_rgb(27_18_12/0.7)] transition-[opacity,translate,visibility] duration-700 ease-editorial md:right-6 md:bottom-6 lg:right-8 lg:bottom-8",
        shown ? "visible opacity-100" : "pointer-events-none invisible translate-y-4 opacity-0",
        // Enough to clear both lines on a phone, and the single line on wider screens.
        shown && atFoot && "-translate-y-[5.75rem] md:-translate-y-[4.75rem]",
      )}
    >
      <span aria-hidden="true" className="pulse-ring pointer-events-none absolute top-0 right-0 size-14 rounded-full border border-[#25d366]/70" />
      {/* The label opens from zero width, so the resting button is just the icon. */}
      <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-700 ease-editorial group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr]">
        <span className="min-w-0 overflow-clip">
          <span className="block pr-4 pl-6 text-[0.6875rem] font-semibold tracking-[0.2em] whitespace-nowrap text-ivory uppercase">
            Chat on WhatsApp
          </span>
        </span>
      </span>
      {/* WhatsApp's own colours: white glyph on its green. */}
      <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#25d366] text-white">
        <WhatsAppIcon className="size-7" />
      </span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
