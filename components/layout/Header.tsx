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

/** Below this the header always shows; past it, it steps aside while reading down. */
const HIDE_AFTER = 480;

/**
 * Sticky site header, the same on every screen size. It sits transparently
 * over the page hero, condenses onto a full-width blurred espresso bar once
 * the visitor starts scrolling, steps out of the way while they read down the
 * page and returns the moment they scroll back up. A thin amber line along
 * its lower edge shows how far down the page they are.
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
          "on-dark fixed inset-x-0 top-0 z-50 border-b text-ivory transition-[background-color,border-color,backdrop-filter,transform] duration-500 ease-editorial focus-within:translate-y-0",
          scrolled ? "border-ivory/10 bg-espresso/88 backdrop-blur-md" : "border-transparent bg-transparent",
          away && !menuOpen && "-translate-y-full",
        )}
      >
        <div
          className={cn(
            "container-site flex items-center justify-between gap-6 transition-[height] duration-500 ease-editorial",
            scrolled ? "h-14 lg:h-[4.5rem]" : "h-16 lg:h-24",
          )}
        >
          <Link href="/" className="-my-2 shrink-0 py-2">
            <Wordmark className={cn("origin-left transition-transform duration-500 ease-editorial", scrolled && "scale-90")} />
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

        {/* Reading progress. Scroll-driven in CSS; invisible where that is unsupported. */}
        <span aria-hidden="true" className="scroll-progress absolute inset-x-0 -bottom-px block h-px bg-amber/80" />
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} pathname={pathname} />
    </>
  );
}
