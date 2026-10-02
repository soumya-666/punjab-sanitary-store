import Link from "next/link";
import type { ReactNode } from "react";

import { Enter, EnterLines, EnterRule } from "@/components/motion/Enter";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { enquiryMode } from "@/lib/enquiry";
import { pageMetadata } from "@/lib/seo";
import { addressOneLine, privacyNav, site, whatsappDisplay, whatsappHref } from "@/lib/site";

export const metadata = pageMetadata({
  title: `Privacy Policy | ${site.name}`,
  description: `How ${site.name}, Dhakoli, Zirakpur handles the details you share through this website, the enquiry form and WhatsApp.`,
  path: privacyNav.href,
});

/**
 * Update this date whenever the policy changes.
 *
 * The policy describes how this website actually works. If that changes —
 * analytics are added, the enquiry form is connected to a different service,
 * an email address or phone line is published — change the wording here too.
 * The enquiry-form paragraph already follows `enquiryMode` (lib/enquiry.ts).
 */
const LAST_UPDATED = "2 October 2026";

const linkClass =
  "font-medium text-walnut underline decoration-walnut/30 underline-offset-4 transition-colors duration-300 hover:decoration-walnut";

const External = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
    {children}
    <span className="sr-only"> (opens in a new tab)</span>
  </a>
);

const WhatsApp = () =>
  whatsappHref ? <External href={whatsappHref}>WhatsApp at {whatsappDisplay}</External> : <>WhatsApp</>;

/** How the enquiry form delivers a message — written for whichever way is switched on. */
const enquiryDelivery: Record<typeof enquiryMode, ReactNode> = {
  whatsapp: (
    <>
      The form does not send or store these details itself. When you press &ldquo;Send on WhatsApp&rdquo;, it opens
      WhatsApp on your device with your enquiry written out as a message to our business number
      {whatsappDisplay ? `, ${whatsappDisplay}` : ""}. Nothing reaches us until you press send in WhatsApp. If you
      close WhatsApp without sending, we receive nothing.
    </>
  ),
  endpoint: (
    <>
      When you press &ldquo;Send Enquiry&rdquo;, these details are sent over an encrypted connection to the service
      that delivers enquiries to us, and from there to the showroom.
    </>
  ),
  none: <>The enquiry form is not connected at present, and nothing typed into it is sent or stored.</>,
};

type Section = { id: string; title: string; body: ReactNode };

const sections: Section[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          {site.name} is a sanitaryware and bathroom fittings showroom at {addressOneLine}. In this policy,
          &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; mean {site.name}.
        </p>
        <p>
          This policy explains what personal information we receive through this website and when you contact us,
          what we do with it, and the choices you have.
        </p>
      </>
    ),
  },
  {
    id: "in-short",
    title: "In short",
    body: (
      <ul>
        <li>This website has no accounts, no online ordering and no payments.</li>
        <li>It does not use analytics, advertising trackers or cookies of its own.</li>
        <li>
          We receive personal information only when you choose to give it to us — through the enquiry form, on
          WhatsApp or in person at the showroom.
        </li>
        <li>We use it to answer you and to help with your bathroom. We do not sell it.</li>
      </ul>
    ),
  },
  {
    id: "what-you-give-us",
    title: "Information you give us",
    body: (
      <>
        <h3>The enquiry form</h3>
        <p>
          The form on our <Link href="/contact" className={linkClass}>Contact page</Link> asks for your name, your phone
          number, what you are looking for and, if you wish, your email address and a message.
        </p>
        <p>{enquiryDelivery[enquiryMode]}</p>

        <h3>WhatsApp</h3>
        <p>
          When you message us on WhatsApp we receive your phone number, your WhatsApp profile name and whatever you
          send us — messages, photographs, drawings or documents. WhatsApp is run by WhatsApp LLC, part of Meta, which
          handles your messages under its own privacy policy.
        </p>

        <h3>At the showroom</h3>
        <p>
          If you visit or speak to us and share details such as your name, phone number, address or the plan of your
          bathroom, so that we can prepare a quotation, take an order or arrange a delivery, we keep those details
          for that purpose.
        </p>
      </>
    ),
  },
  {
    id: "collected-automatically",
    title: "Information collected automatically",
    body: (
      <>
        <p>
          The website does not set cookies of its own and does not use analytics or advertising tools, so we do not
          follow how you move around it and we do not build a profile of you.
        </p>
        <p>
          Like every website, it is delivered by a hosting provider whose servers briefly record technical details of
          each request — such as the IP address, the type of browser and the date and time — to keep the service
          secure and running. We do not use these records to identify you.
        </p>
      </>
    ),
  },
  {
    id: "other-services",
    title: "Other services this website connects to",
    body: (
      <>
        <p>Two outside services appear on this website. Each handles information under its own policy, not ours.</p>
        <ul>
          <li>
            <strong>Google Maps.</strong> The Location and Contact pages show a map from Google Maps, and the
            &ldquo;Get Directions&rdquo; links open Google Maps. When a map loads, Google receives your IP address
            and details of your device, and may set its own cookies. See{" "}
            <External href="https://policies.google.com/privacy">Google&rsquo;s privacy policy</External>.
          </li>
          <li>
            <strong>WhatsApp.</strong> The WhatsApp buttons and the enquiry form open WhatsApp, in the app or in your
            browser. See{" "}
            <External href="https://www.whatsapp.com/legal/privacy-policy">WhatsApp&rsquo;s privacy policy</External>.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use your information",
    body: (
      <>
        <p>We use the details you give us only to:</p>
        <ul>
          <li>reply to your enquiry and answer questions about products and availability;</li>
          <li>prepare quotations and help you choose products for your space;</li>
          <li>arrange a showroom visit, an order or a delivery that you have asked for;</li>
          <li>keep the records the law requires us to keep.</li>
        </ul>
        <p>
          We do this on the basis of your consent, which you give when you choose to contact us. We will not add you
          to promotional messages or broadcast lists unless you ask us to.
        </p>
      </>
    ),
  },
  {
    id: "who-we-share-it-with",
    title: "Who we share it with",
    body: (
      <>
        <p>We do not sell or rent personal information. We share it only:</p>
        <ul>
          <li>with members of the showroom team who need it to help you;</li>
          <li>with the people who carry out a delivery or installation, if you ask us to arrange one;</li>
          <li>when the law requires us to.</li>
        </ul>
      </>
    ),
  },
  {
    id: "how-long-we-keep-it",
    title: "How long we keep it",
    body: (
      <p>
        We keep enquiry messages and contact details for as long as we need them to deal with your enquiry and any
        order that follows. Records connected with a purchase are kept for as long as tax and accounting law
        requires. You can ask us to delete your details sooner — see &ldquo;Your choices and rights&rdquo; below.
      </p>
    ),
  },
  {
    id: "security",
    title: "Keeping it safe",
    body: (
      <p>
        Enquiries are seen only by the showroom team, and we take reasonable care to keep them private. Messages
        sent through WhatsApp are end-to-end encrypted by WhatsApp. No way of sending or storing information is
        completely secure, so please do not send bank, card or other sensitive details through the enquiry form or
        WhatsApp.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your choices and rights",
    body: (
      <>
        <p>Under India&rsquo;s Digital Personal Data Protection Act, 2023, you can ask us to:</p>
        <ul>
          <li>tell you what personal information of yours we hold;</li>
          <li>correct or update it;</li>
          <li>delete it;</li>
          <li>stop using it, by withdrawing your consent at any time.</li>
        </ul>
        <p>
          You may also name another person to exercise these rights for you. To make a request, or to raise a concern
          about how your information has been handled, message us on <WhatsApp /> or visit the showroom. If you are
          not satisfied with our reply, you may complain to the Data Protection Board of India.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        This website is meant for adults planning a bathroom. We do not knowingly collect personal information from
        anyone under 18. If you believe a child has sent us personal information, please contact us and we will
        delete it.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        If the way this website works changes — for example, if we add another way to send an enquiry — we will
        update this page and the date at the top.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <>
        <p>For any question about this policy or about your personal information:</p>
        <address className="not-italic">
          <span className="block font-medium text-ink">{site.name}</span>
          {site.address.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <span className="block">
            {site.address.region}, {site.address.country}
          </span>
          {whatsappHref ? (
            <span className="mt-3 block">
              <WhatsApp />
            </span>
          ) : null}
        </address>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Dark opening band, so the header can sit over it like every other page. */}
      <section className="on-dark relative isolate overflow-clip bg-espresso text-ivory">
        <div aria-hidden="true" className="warm-glow absolute inset-0 -z-10" />
        <div aria-hidden="true" className="lamplight" />
        <div className="container-site pt-32 pb-12 lg:pt-44 lg:pb-16">
          <Enter delay={0.05} y={10}>
            <Breadcrumbs trail={[{ name: privacyNav.label, path: privacyNav.href }]} />
          </Enter>
          <Enter delay={0.12} y={12}>
            <p className="eyebrow mt-8 flex items-center gap-4 text-sand lg:mt-12">
              <span aria-hidden="true" className="h-px w-8 bg-amber" />
              Your information
            </p>
          </Enter>
          <h1 className="text-h1 mt-5 lg:mt-7">
            <EnterLines lines={["Privacy Policy"]} delay={0.2} />
          </h1>
          <Enter delay={0.45} y={18}>
            <p className="text-lead mt-6 max-w-[38rem] text-ivory/80 lg:mt-8">
              What we receive when you use this website or contact the showroom, what we do with it, and the choices
              you have.
            </p>
          </Enter>
          <Enter delay={0.55} y={0}>
            <p className="eyebrow mt-8 text-ivory/60">Last updated {LAST_UPDATED}</p>
          </Enter>
          <EnterRule delay={0.7} className="mt-10 block h-px w-full bg-ivory/20 lg:mt-14" />
        </div>
      </section>

      <section aria-label="Privacy policy" className="section-y-tight sunlit bg-ivory">
        <div className="container-site grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
          <nav aria-labelledby="policy-contents" className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal y={12}>
                <h2 id="policy-contents" className="eyebrow text-bronze">
                  On this page
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <ol className="mt-5 grid gap-x-8 border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-1">
                  {sections.map((section, index) => (
                    <li key={section.id} className="border-b border-ink/15">
                      <a
                        href={`#${section.id}`}
                        className="group flex min-h-11 items-baseline gap-4 py-2.5 text-[0.9375rem] text-ink/75 transition-colors duration-300 hover:text-walnut"
                      >
                        <span aria-hidden="true" className="eyebrow w-5 shrink-0 text-bronze">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="transition-transform duration-500 ease-editorial group-hover:translate-x-1">
                          {section.title}
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </nav>

          <div className="lg:col-span-7 lg:col-start-6">
            {sections.map((section, index) => (
              <Reveal
                key={section.id}
                as="div"
                y={18}
                className={index === 0 ? "pb-10 lg:pb-14" : "rule-t py-10 text-ink lg:py-14"}
              >
                <section id={section.id} aria-labelledby={`${section.id}-heading`} className="scroll-mt-28">
                  <p aria-hidden="true" className="eyebrow text-bronze">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 id={`${section.id}-heading`} className="text-h3 mt-3 text-ink">
                    {section.title}
                  </h2>
                  {/* Long-form copy: paragraph, list and sub-heading rhythm for the policy text. */}
                  <div className="mt-6 max-w-2xl space-y-4 text-ink/80 [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-[1.375rem] [&_h3]:leading-snug [&_h3]:font-medium [&_h3]:text-ink [&_li]:relative [&_li]:pl-6 [&_li]:before:absolute [&_li]:before:top-[0.8em] [&_li]:before:left-0 [&_li]:before:h-px [&_li]:before:w-3 [&_li]:before:bg-copper [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:space-y-2.5">
                    {section.body}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        lines={["Questions?", "Ask us."]}
        copy={`The showroom team is glad to help — on WhatsApp, or in person at ${site.address.area}, ${site.address.locality}.`}
        primary={{ label: "Contact the showroom", href: "/contact" }}
        secondary={{ label: "Visit Showroom", href: "/location" }}
      />
    </>
  );
}
