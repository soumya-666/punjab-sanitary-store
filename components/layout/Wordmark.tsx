import { cn } from "@/lib/cn";

/**
 * Typographic wordmark. Replace with the official logo file when one is
 * supplied — keep this component's outer size so the header does not shift.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span className="font-display text-[1.5rem] font-medium uppercase tracking-[0.26em]">Punjab</span>{" "}
      <span className="mt-1.5 text-[0.5625rem] font-semibold uppercase tracking-[0.42em]">Sanitary Store</span>
    </span>
  );
}
