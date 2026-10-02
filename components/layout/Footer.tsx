import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";
import { TextLink } from "@/components/ui/TextLink";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { directionsUrl, emailHref, footerNav, phoneHref, site, whatsappDisplay, whatsappHref } from "@/lib/site";

const linkClass =
  "link-underline inline-flex min-h-11 min-w-11 items-center text-[0.9375rem] text-ivory/70 transition-colors duration-300 hover:text-ivory lg:min-h-9";

const headingClass = "eyebrow text-sand/80";

export function Footer() {
  return (
    <footer className="on-dark relative isolate overflow-clip bg-espresso text-ivory">
      {/* A low pool of lamplight in the corner, as in the hero photograph. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(55%_70%_at_0%_100%,rgb(108_63_29/0.42),transparent_70%)]"
      />

      <div className="container-site pt-20 pb-10 lg:pt-28">
        <div className="grid gap-x-10 gap-y-12 pb-14 md:grid-cols-12 lg:pb-20">
          <Reveal className="md:col-span-12 lg:col-span-6">
            <p className="font-display text-[clamp(2.25rem,1.6rem+2.6vw,4rem)] leading-none tracking-tight">
              {site.name}
            </p>
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-ivory/65">{site.tagline}</p>

            {whatsappHref ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex min-h-13 items-center gap-4 border border-amber/35 pr-6 pl-5 text-amber transition-colors duration-500 ease-editorial hover:border-amber hover:bg-amber hover:text-espresso"
              >
                <WhatsAppIcon className="size-5 shrink-0" />
                <span className="text-[0.75rem] font-semibold tracking-[0.2em] uppercase">Chat on WhatsApp</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
          </Reveal>

          <Reveal as="div" delay={0.08} className="md:col-span-6 lg:col-span-3">
            <nav aria-labelledby="footer-nav">
              <h2 id="footer-nav" className={headingClass}>
                Navigation
              </h2>
              {/* Two columns on phones keeps the footer short. */}
              <ul className="mt-5 grid grid-cols-2 gap-x-6 md:grid-cols-1">
                {footerNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          <Reveal as="div" delay={0.16} className="md:col-span-6 lg:col-span-3">
            <h2 className={headingClass}>Showroom</h2>
            <address className="mt-5 text-[0.9375rem] leading-relaxed text-ivory/80 not-italic">
              {site.address.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="block">
                {site.address.region}, {site.address.country}
              </span>
            </address>

            {phoneHref || whatsappHref || emailHref ? (
              <ul className="mt-4 text-[0.9375rem]">
                {phoneHref ? (
                  <li>
                    <a href={phoneHref} className={linkClass}>
                      {site.contact.phone}
                    </a>
                  </li>
                ) : null}
                {whatsappHref ? (
                  <li>
                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      <span className="sr-only">WhatsApp </span>
                      {whatsappDisplay}
                    </a>
                  </li>
                ) : null}
                {emailHref ? (
                  <li>
                    <a href={emailHref} className={linkClass}>
                      {site.contact.email}
                    </a>
                  </li>
                ) : null}
              </ul>
            ) : null}

            <TextLink href={directionsUrl} external className="mt-3 text-ivory">
              Get Directions
            </TextLink>
          </Reveal>
        </div>

        {/* Bottom padding on phones keeps this line clear of the fixed action bar.
            The floating WhatsApp button watches for this row (data-footer-credit)
            and moves up when it comes into view, so the credit is never covered. */}
        <div
          data-reveal="up"
          data-footer-credit=""
          className="rule-t flex flex-col gap-3 pt-8 pb-[calc(4rem+env(safe-area-inset-bottom))] text-[0.8125rem] text-ivory/60 [--reveal-y:0px] [--rule-opacity:0.14] md:flex-row md:items-center md:justify-between md:pb-0"
        >
          <p>© 2026 {site.name}. All rights reserved.</p>
          <p>Designed &amp; developed by Soumya Rout</p>
        </div>
      </div>
    </footer>
  );
}
