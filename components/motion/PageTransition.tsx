"use client";

import { m } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

// The first page a visitor lands on must paint immediately (it holds the LCP
// element), so the fade only applies to navigations made after that.
let hasNavigated = false;

/**
 * Wraps each page (via app/template.tsx, so it re-mounts on every navigation).
 * It fades pages in on client-side navigation and runs the one shared
 * IntersectionObserver that triggers every scroll reveal on the page.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const [animateIn] = useState(() => hasNavigated);

  useEffect(() => {
    hasNavigated = true;
  }, []);

  useEffect(() => {
    const pending = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])");
    const show = (element: Element) => element.setAttribute("data-revealed", "");

    if (!("IntersectionObserver" in window)) {
      pending.forEach(show);
      return;
    }

    // The observed area runs from far above the page down to 8% short of the
    // viewport's bottom edge. Extending it upward means an element counts as
    // seen once it has crossed that line at all — so a fast fling that skips
    // right past it, or a reload part-way down the page, still reveals it.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show(entry.target);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "1000000px 0px -8% 0px" },
    );

    pending.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <m.div
      initial={animateIn ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </m.div>
  );
}
