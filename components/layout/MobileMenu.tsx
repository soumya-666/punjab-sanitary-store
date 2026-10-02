"use client";

import { AnimatePresence, m } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { Wordmark } from "@/components/layout/Wordmark";
import { EASE } from "@/components/motion/easing";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { cn } from "@/lib/cn";
import { mainNav, privacyNav, site, whatsappHref } from "@/lib/site";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  pathname: string;
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

const actionClass =
  "flex min-h-11 items-center justify-center gap-2.5 px-3 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] whitespace-nowrap transition-colors duration-300";

/**
 * Navigation for phones and tablets: a compact sheet that drops from the top
 * edge, only as tall as its contents, over a dimmed page. Every row is a
 * comfortable 44px touch target, and the whole menu fits a small phone
 * without scrolling.
 */
export function MobileMenu({ open, onClose, pathname }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      // Keep keyboard focus inside the open menu.
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Dimmed page behind the sheet. Tapping it closes the menu. */}
          <m.div
            aria-hidden="true"
            onClick={onClose}
            className="absolute inset-0 bg-espresso/60 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />

          <m.div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="on-dark relative max-h-svh overflow-y-auto overscroll-contain border-b border-amber/25 bg-espresso text-ivory shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)]"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="container-site flex h-16 items-center justify-between">
              <Link href="/" onClick={onClose} className="-my-2 py-2">
                <Wordmark />
                <span className="sr-only"> — home</span>
              </Link>
              <button
                ref={closeRef}
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="-mr-2.5 inline-flex size-11 shrink-0 items-center justify-center"
              >
                <X aria-hidden="true" strokeWidth={1.25} className="size-6" />
              </button>
            </div>

            <nav aria-label="Primary" className="container-site">
              <m.ul
                className="border-t border-ivory/10"
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.045, delayChildren: 0.18 } } }}
              >
                {mainNav.map((item, index) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <m.li
                      key={item.href}
                      className="border-b border-ivory/10"
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex min-h-11 items-center gap-4 py-1.5 transition-colors duration-300",
                          active ? "text-ivory" : "text-ivory/80",
                        )}
                      >
                        <span aria-hidden="true" className="w-5 text-[0.625rem] font-semibold tracking-[0.18em] text-amber/70">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-[1.3125rem] leading-none tracking-[-0.005em]">{item.label}</span>
                        {active ? <span aria-hidden="true" className="ml-auto size-1.5 rounded-full bg-amber" /> : null}
                      </Link>
                    </m.li>
                  );
                })}
              </m.ul>
            </nav>

            <m.div
              className="container-site pt-4 pb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.42, ease: "easeOut" }}
            >
              {/* Side by side, except on the very narrowest phones. */}
              <div className={cn("grid gap-2", whatsappHref && "min-[360px]:grid-cols-2")}>
                {whatsappHref ? (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className={cn(actionClass, "border border-amber/40 text-amber active:bg-amber active:text-espresso")}
                  >
                    <WhatsAppIcon className="size-4 shrink-0" />
                    <span>WhatsApp</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : null}
                <Link href="/location" onClick={onClose} className={cn(actionClass, "bg-ivory text-espresso active:bg-amber")}>
                  Visit Showroom
                </Link>
              </div>

              <div className="mt-3 flex items-center justify-between gap-4 text-[0.75rem] leading-snug text-ivory/55">
                <p>
                  {site.address.area}, {site.address.locality}
                </p>
                <Link
                  href={privacyNav.href}
                  onClick={onClose}
                  aria-current={isActive(pathname, privacyNav.href) ? "page" : undefined}
                  className="-my-3 inline-flex min-h-11 shrink-0 items-center underline decoration-ivory/25 underline-offset-4"
                >
                  {privacyNav.label}
                </Link>
              </div>
            </m.div>
          </m.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
