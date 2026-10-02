"use client";

import { LayoutGrid, Navigation, PenLine, Phone, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";
import { directionsUrl, phoneHref } from "@/lib/site";

type Action = { label: string; href: string; icon: LucideIcon; external?: boolean };

// WhatsApp is not here: it has its own floating button (WhatsAppButton) just
// above this bar. Call appears automatically once a phone number is added to
// lib/site.ts.
const actions: Action[] = [
  ...(phoneHref ? [{ label: "Call", href: phoneHref, icon: Phone, external: true }] : []),
  { label: "Directions", href: directionsUrl, icon: Navigation, external: true },
  { label: "Collections", href: "/products", icon: LayoutGrid },
  { label: "Enquire", href: "/contact", icon: PenLine },
];

const itemClass =
  "flex h-16 flex-1 flex-col items-center justify-center gap-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 active:bg-timber";

/** Fixed bottom bar on phones with the quickest routes to the showroom. */
export function MobileActionBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Quick actions"
      className="on-dark fixed inset-x-0 bottom-0 z-40 border-t border-ivory/10 bg-espresso/95 pb-[env(safe-area-inset-bottom)] text-ivory backdrop-blur-md md:hidden"
    >
      <ul className="flex divide-x divide-ivory/10">
        {actions.map(({ label, href, icon: Icon, external }) => {
          const selected = !external && pathname.startsWith(href);
          const content = (
            <>
              <Icon aria-hidden="true" strokeWidth={1.25} className="size-5" />
              <span>{label}</span>
            </>
          );
          return (
            <li key={label} className="flex flex-1">
              {external ? (
                <a
                  href={href}
                  className={itemClass}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {content}
                </a>
              ) : (
                <Link
                  href={href}
                  aria-current={selected ? "page" : undefined}
                  className={cn(itemClass, selected && "bg-timber")}
                >
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
