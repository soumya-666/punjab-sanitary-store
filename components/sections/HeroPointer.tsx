"use client";

import { useEffect, useRef, type ReactNode } from "react";

const POINTER_QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/**
 * The small amount of JavaScript the hero needs. Two jobs:
 *
 * 1. Pause the hero's motion once the visitor has scrolled past it. The hero
 *    section gets `data-offscreen`, and "Hero motion" in styles/globals.css
 *    pauses the drift and the falling water while it is set — nothing
 *    animates unseen.
 *
 * 2. On mouse devices, ease the photograph a few pixels against the pointer,
 *    as if seen through a window. The position is written to two CSS
 *    variables (--px, --py, each -0.5…0.5) which `.hero-pointer` turns into a
 *    transform. Skipped on touch screens and with reduced motion.
 */
export function HeroPointer({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const host = element?.closest("section");
    if (!element || !host) return;

    const cleanups: Array<() => void> = [];

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(([entry]) => {
        host.toggleAttribute("data-offscreen", !entry.isIntersecting);
      });
      observer.observe(host);
      cleanups.push(() => observer.disconnect());
    }

    if (window.matchMedia(POINTER_QUERY).matches) {
      let frame = 0;
      let targetX = 0;
      let targetY = 0;
      let x = 0;
      let y = 0;

      // Ease toward the pointer instead of snapping to it.
      const step = () => {
        x += (targetX - x) * 0.06;
        y += (targetY - y) * 0.06;
        element.style.setProperty("--px", x.toFixed(4));
        element.style.setProperty("--py", y.toFixed(4));
        frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.001 ? requestAnimationFrame(step) : 0;
      };

      const onMove = (event: PointerEvent) => {
        const rect = host.getBoundingClientRect();
        targetX = (event.clientX - rect.left) / rect.width - 0.5;
        targetY = (event.clientY - rect.top) / rect.height - 0.5;
        if (!frame) frame = requestAnimationFrame(step);
      };

      const onLeave = () => {
        targetX = 0;
        targetY = 0;
        if (!frame) frame = requestAnimationFrame(step);
      };

      host.addEventListener("pointermove", onMove, { passive: true });
      host.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        host.removeEventListener("pointermove", onMove);
        host.removeEventListener("pointerleave", onLeave);
        cancelAnimationFrame(frame);
      });
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return (
    <div ref={ref} className="hero-pointer">
      {children}
    </div>
  );
}
