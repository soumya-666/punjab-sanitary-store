import { TextLink } from "@/components/ui/TextLink";
import { cn } from "@/lib/cn";
import { directionsUrl, emailHref, phoneHref, site, whatsappDisplay, whatsappHref } from "@/lib/site";

const labelClass = "eyebrow text-ink/70";
const valueClass = "mt-3 font-display text-[clamp(1.375rem,1.15rem+0.9vw,1.875rem)] leading-snug text-ink";

/**
 * Business name, address and — only when supplied in lib/site.ts —
 * phone, WhatsApp, email and opening hours.
 */
export function ContactDetails({ className }: { className?: string }) {
  return (
    <dl className={cn("divide-y divide-ink/15 border-y border-ink/15", className)}>
      <div className="py-7">
        <dt className={labelClass}>Showroom</dt>
        <dd className={valueClass}>{site.name}</dd>
      </div>

      <div className="py-7">
        <dt className={labelClass}>Address</dt>
        <dd>
          <address className={cn(valueClass, "not-italic")}>
            {site.address.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="block">
              {site.address.region}, {site.address.country}
            </span>
          </address>
          <TextLink href={directionsUrl} external className="mt-4 text-walnut">
            Get Directions
          </TextLink>
        </dd>
      </div>

      {phoneHref ? (
        <div className="py-7">
          <dt className={labelClass}>Phone</dt>
          <dd className={valueClass}>
            <a href={phoneHref} className="link-underline">
              {site.contact.phone}
            </a>
          </dd>
        </div>
      ) : null}

      {whatsappHref ? (
        <div className="py-7">
          <dt className={labelClass}>WhatsApp</dt>
          <dd>
            <p className={valueClass}>{whatsappDisplay}</p>
            <TextLink href={whatsappHref} external className="mt-4 text-walnut">
              Message us on WhatsApp
            </TextLink>
          </dd>
        </div>
      ) : null}

      {emailHref ? (
        <div className="py-7">
          <dt className={labelClass}>Email</dt>
          <dd className={valueClass}>
            <a href={emailHref} className="link-underline break-all">
              {site.contact.email}
            </a>
          </dd>
        </div>
      ) : null}

      {site.openingHours ? (
        <div className="py-7">
          <dt className={labelClass}>Opening hours</dt>
          <dd className="mt-3 space-y-1 text-ink/80">
            {site.openingHours.map((entry) => (
              <p key={entry.label} className="flex justify-between gap-6">
                <span>{entry.label}</span>
                <span>
                  {entry.opens} – {entry.closes}
                </span>
              </p>
            ))}
          </dd>
        </div>
      ) : null}
    </dl>
  );
}
