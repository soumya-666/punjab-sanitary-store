"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

import { EASE } from "@/components/motion/easing";

const loadFeatures = () => import("@/components/motion/features").then((module) => module.default);

/**
 * Framer Motion drives the interactive motion: mobile navigation, the gallery
 * lightbox and page transitions. Its feature set loads after
 * the page is interactive, and the visitor's reduced-motion setting is
 * honoured: transforms jump to their end state and only gentle fades remain.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.9, ease: EASE }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
