import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  /** Short rule before the label — the one decorative accent in the system. */
  rule?: boolean;
  /** Rule colour: copper on the light pages, amber on the dark timber sections. */
  accent?: "copper" | "amber";
};

export function Eyebrow({ children, className, rule = true, accent = "copper" }: EyebrowProps) {
  return (
    <p className={cn("eyebrow flex items-center gap-4", className)}>
      {rule ? (
        <span aria-hidden="true" className={cn("h-px w-8 shrink-0", accent === "amber" ? "bg-amber" : "bg-copper")} />
      ) : null}
      <span>{children}</span>
    </p>
  );
}
