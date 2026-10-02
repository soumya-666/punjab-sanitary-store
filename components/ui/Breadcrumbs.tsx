import Link from "next/link";

import { JsonLd } from "@/components/ui/JsonLd";
import { cn } from "@/lib/cn";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";

type BreadcrumbsProps = {
  /** Trail after "Home". The last entry is the current page. */
  trail: Crumb[];
  className?: string;
};

/** Visible breadcrumb trail plus matching BreadcrumbList structured data. */
export function Breadcrumbs({ trail, className }: BreadcrumbsProps) {
  const crumbs: Crumb[] = [{ name: "Home", path: "/" }, ...trail];

  return (
    <nav aria-label="Breadcrumb" className={cn("eyebrow text-ivory/65", className)}>
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {crumbs.map((crumb, index) => {
          const current = index === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-3">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {current ? (
                <span aria-current="page" className="text-ivory">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.path}
                  className="-my-3.5 inline-flex min-h-11 items-center py-3.5 transition-colors duration-300 hover:text-ivory"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </nav>
  );
}
