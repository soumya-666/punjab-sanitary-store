"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

import { MobileMenu } from "@/components/layout/MobileMenu";
import { Wordmark } from "@/components/layout/Wordmark";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/cn";
import { mainNav } from "@/lib/site";

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

const subscribeToScroll = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
};

/** Below this the desktop header always shows; past it, it steps aside while reading down. */
const HIDE_AFTER = 480;

/**
 * Site header. It sits transparently over the page hero, then changes once the
 * visitor starts scrolling:
 *
 *  - on phones and tablets the wordmark and menu button gather into a floating
 *    capsule that stays in view all the way down the page;
 *  - on desktop it condenses onto a blurred espresso bar, steps out of the way
 *    while the visitor reads down and returns the moment they scroll back up,
 *    with a thin amber line along its lower edge showing reading progress.
 */
export function Header() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 24,
    () => false,
  );
  const [away, setAway] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      // Ignore the small reversals of a resting finger or trackpad.
      if (Math.abs(y - last) < 8) return;
      setAway(y > last && y > HIDE_AFTER);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  return (
    <>
      <header
        className={cn(
          "on-dark fixed inset-x-0 top-0 z-50 text-ivory transition-transform duration-500 ease-editorial focus-within:translate-y-0",
          // Only the desktop bar steps aside; the capsule on phones stays put.
          away && !menuOpen && "lg:-translate-y-full",
        )}
      >
        {/* Desktop: the full-width bar. */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 hidden border-b transition-[background-color,border-color,backdrop-filter] duration-500 ease-editorial lg:block",
            scrolled ? "border-ivory/10 bg-espresso/88 backdrop-blur-md" : "border-transparent bg-transparent",
          )}
        />

        {/* Phones and tablets: once scrolling, the row lifts off the edges and becomes a capsule. */}
        <div
          className={cn(
            "relative transition-[padding] duration-500 ease-editorial lg:p-0",
            scrolled ? "px-3 pt-2.5" : "px-0 pt-0",
          )}
        >
          <div
            className={cn(
              "container-site flex items-center justify-between gap-6 transition-[height,background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-editorial max-lg:rounded-full max-lg:border",
              scrolled
                ? "h-14 max-lg:border-amber/25 max-lg:bg-espresso/85 max-lg:shadow-[0_14px_34px_-14px_rgb(0_0_0/0.7)] max-lg:backdrop-blur-md lg:h-[4.5rem]"
                : "h-16 max-lg:border-transparent lg:h-24",
            )}
          >
            <Link href="/" className="-my-2 shrink-0 py-2">
              <Wordmark className={cn("origin-left transition-transform duration-500 ease-editorial", scrolled && "scale-[0.82] lg:scale-90")} />
              <span className="sr-only"> — home</span>
            </Link>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-7 xl:gap-10">
                {mainNav.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "link-underline inline-flex min-h-11 items-center text-[0.75rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-300",
                          active ? "text-ivory [background-size:100%_1px]" : "text-ivory/75 hover:text-ivory",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Wrapper controls visibility so it never fights the button's own display class. */}
            <div className="hidden shrink-0 lg:block">
              <ButtonLink href="/location" variant="outline-light" compact>
                Visit Showroom
              </ButtonLink>
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
              className="group -mr-2.5 inline-flex size-11 shrink-0 flex-col items-end justify-center gap-[7px] pr-2.5 lg:hidden"
            >
              <span aria-hidden="true" className="h-px w-6 bg-ivory" />
              <span aria-hidden="true" className="h-px w-4 bg-ivory transition-[width] duration-500 ease-editorial group-hover:w-6" />
            </button>
          </div>
        </div>

        {/* Reading progress, on the desktop bar. Scroll-driven in CSS; invisible where that is unsupported. */}
        <span aria-hidden="true" className="scroll-progress absolute inset-x-0 -bottom-px hidden h-px bg-amber/80 lg:block" />
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} pathname={pathname} />
    </>
  );
}
