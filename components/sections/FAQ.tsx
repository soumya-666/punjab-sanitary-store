import { Plus } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs as allFaqs, type Faq } from "@/lib/faqs";
import { faqSchema } from "@/lib/schema";

type FAQProps = {
  faqs?: Faq[];
};

/**
 * FAQ accordion built on native <details>, so it is keyboard and screen-reader
 * accessible, works without JavaScript and keeps every answer in the HTML.
 * The FAQPage structured data is generated from exactly the questions shown.
 */
export function FAQ({ faqs = allFaqs }: FAQProps) {
  return (
    <section aria-labelledby="faq-heading" className="section-y bg-ivory">
      <div className="container-site grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
        <SectionHeading
          id="faq-heading"
          eyebrow="Questions"
          lines={["Good to know", "before you visit."]}
          className="lg:col-span-5"
        />

        <Reveal delay={0.1} className="border-t border-ink/15 lg:col-span-6 lg:col-start-7">
          {faqs.map((faq, index) => (
            <details key={faq.question} name="faq" open={index === 0} className="faq-item group border-b border-ink/15">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 lg:py-7 [&::-webkit-details-marker]:hidden">
                <h3 className="font-display text-[clamp(1.25rem,1.1rem+0.7vw,1.75rem)] leading-snug font-medium text-ink">
                  {faq.question}
                </h3>
                <Plus
                  aria-hidden="true"
                  strokeWidth={1.25}
                  className="size-6 shrink-0 text-bronze transition-transform duration-500 ease-editorial group-open:rotate-45"
                />
              </summary>
              <p className="max-w-2xl pr-10 pb-7 text-ink/75 lg:pb-9">{faq.answer}</p>
            </details>
          ))}
        </Reveal>
      </div>

      <JsonLd data={faqSchema(faqs)} />
    </section>
  );
}
